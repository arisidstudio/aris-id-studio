// vite-react-ssg injects the per-page <Head> tags at the top of <head>, which pushes
// <meta charset> past the first 1024 bytes. Move it back to the very start of <head>.
import { readdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const dist = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../dist');

async function htmlFiles(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const nested = await Promise.all(entries.map((e) => {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) return htmlFiles(p);
    return e.name.endsWith('.html') ? [p] : [];
  }));
  return nested.flat();
}

let fixed = 0;
for (const file of await htmlFiles(dist)) {
  const html = await readFile(file, 'utf8');
  const charset = html.match(/<meta charset="[^"]*"\s*\/?>/i);
  if (!charset) continue;
  const out = html.replace(charset[0], '').replace(/<head>/i, `<head>${charset[0]}`);
  if (out !== html) { await writeFile(file, out); fixed++; }
}
console.log(`postbuild : meta charset placé en tête dans ${fixed} pages`);
