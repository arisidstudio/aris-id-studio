// Writes public/sitemap.xml from the site's indexable routes. Runs before every build.
import { writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SITE_URL = 'https://www.arisidstudio.com';

const { PROJECTS } = await import(pathToFileURL(path.join(root, 'src/data/projects.js')).href);

const routes = [
  '/',
  '/projets',
  ...PROJECTS.map((p) => `/projets/${p.slug}`),
  '/services',
  '/a-propos',
  '/contact',
  '/mentions-legales',
];

const today = new Date().toISOString().slice(0, 10);
const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes.map((r) => `  <url><loc>${SITE_URL}${r}</loc><lastmod>${today}</lastmod></url>`).join('\n')}
</urlset>
`;

await writeFile(path.join(root, 'public/sitemap.xml'), xml);
console.log(`sitemap.xml : ${routes.length} URL`);
