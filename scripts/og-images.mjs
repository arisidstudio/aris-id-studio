// Generates 1200×630 share images: public/og/default.jpg and public/og/{slug}.jpg.
import { mkdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import sharp from 'sharp';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const pub = (p) => path.join(root, 'public', decodeURI(p));
const outDir = pub('/og');
const W = 1200;
const H = 630;

const { PROJECTS } = await import(pathToFileURL(path.join(root, 'src/data/projects.js')).href);

await mkdir(outDir, { recursive: true });

const cover = (src, position = 'centre') => sharp(pub(src)).rotate().resize(W, H, { fit: 'cover', position });

const logo = await sharp(pub('/images/logo-arisid.png')).png().toBuffer();
await cover('/images/hero-glass.webp', 'right')
  .composite([{ input: logo, left: 64, top: 48 }])
  .jpeg({ quality: 82, mozjpeg: true })
  .toFile(path.join(outDir, 'default.jpg'));
console.log('og/default.jpg');

for (const p of PROJECTS) {
  await cover(p.hero.src, 'attention').jpeg({ quality: 82, mozjpeg: true }).toFile(path.join(outDir, `${p.slug}.jpg`));
  console.log(`og/${p.slug}.jpg`);
}
