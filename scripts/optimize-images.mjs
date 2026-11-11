// Converts every project image that is not yet in public/images/ to WebP (max 1800px, q78)
// in public/images/projets/{slug}/, then rewrites the paths in src/data/projects.js.
import { readFile, writeFile, mkdir, access } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import sharp from 'sharp';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const publicDir = path.join(root, 'public');
const dataFile = path.join(root, 'src/data/projects.js');

const { PROJECTS } = await import(pathToFileURL(dataFile).href + `?t=${Date.now()}`);

const exists = (p) => access(p).then(() => true, () => false);
const normalize = (url) => '/' + url.replace(/^\/+/, '');
const safeName = (file) =>
  path.parse(file).name.normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^A-Za-z0-9_-]+/g, '-');

const jobs = new Map(); // original public path -> { slug, target }
for (const p of PROJECTS) {
  const urls = [
    ...(p.content ?? []).filter((c) => c.type === 'image').map((c) => c.url),
    p.image,
    p.hero?.src,
    ...(p.sections ?? []).flatMap((s) => s.images.map((im) => im.src)),
  ].filter(Boolean);
  for (const url of urls) {
    const src = normalize(url);
    if (src.startsWith('/images/') || jobs.has(src)) continue;
    jobs.set(src, { slug: p.slug, target: `/images/projets/${p.slug}/${safeName(src)}.webp` });
  }
}

let source = await readFile(dataFile, 'utf8');
const missing = [];
const unreplaced = [];
let converted = 0;

for (const [src, { slug, target }] of jobs) {
  const input = path.join(publicDir, decodeURI(src));
  if (!(await exists(input))) { missing.push(src); continue; }
  const output = path.join(publicDir, target);
  if (!(await exists(output))) {
    await mkdir(path.dirname(output), { recursive: true });
    await sharp(input).rotate().resize({ width: 1800, withoutEnlargement: true }).webp({ quality: 78 }).toFile(output);
    converted++;
  }
  // Replace the exact quoted forms: 'X', '/X', "X", "/X".
  const bare = src.slice(1);
  let hit = false;
  for (const q of ["'", '"']) {
    for (const form of [src, bare]) {
      const needle = q + form + q;
      if (source.includes(needle)) { source = source.split(needle).join(q + target + q); hit = true; }
    }
  }
  if (!hit) unreplaced.push(`${src} -> ${target} (${slug})`);
}

await writeFile(dataFile, source);
console.log(`${jobs.size} images référencées hors /images/, ${converted} converties.`);
if (missing.length) console.log('Introuvables dans public/ (chemins laissés tels quels) :\n  ' + missing.join('\n  '));
if (unreplaced.length) console.log('Converties mais chemin non remplacé automatiquement (à éditer à la main) :\n  ' + unreplaced.join('\n  '));
