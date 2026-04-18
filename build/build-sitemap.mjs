import fs from 'fs-extra';
import path from 'path';
import { globby } from 'globby';

const SITE_URL = 'https://swiperjs.com';
const PAGES_DIR = 'src/pages';
const OUTPUT = 'public/sitemap.xml';

const SKIP_FILES = new Set(['_app', '_document', '404', '500']);

function fileToRoute(file) {
  const rel = path.relative(PAGES_DIR, file).replace(/\\/g, '/');
  const ext = path.extname(rel);
  const noExt = rel.slice(0, -ext.length);
  const base = path.basename(noExt);
  if (SKIP_FILES.has(base)) return null;
  if (base.startsWith('_')) return null;
  const route = noExt.endsWith('/index')
    ? noExt.slice(0, -'/index'.length)
    : noExt === 'index'
      ? ''
      : noExt;
  return '/' + route;
}

(async () => {
  const files = await globby([
    `${PAGES_DIR}/**/*.{js,jsx,ts,tsx,md,mdx}`,
  ]);

  const routes = Array.from(
    new Set(
      files
        .map(fileToRoute)
        .filter((r) => r !== null)
    )
  ).sort();

  const today = new Date().toISOString().split('T')[0];

  const urls = routes
    .map((route) => {
      const loc = `${SITE_URL}${route === '/' ? '/' : route}`;
      const priority = route === '/' ? '1.0' : '0.7';
      return [
        '  <url>',
        `    <loc>${loc}</loc>`,
        `    <lastmod>${today}</lastmod>`,
        `    <changefreq>weekly</changefreq>`,
        `    <priority>${priority}</priority>`,
        '  </url>',
      ].join('\n');
    })
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;

  await fs.outputFile(OUTPUT, xml);
  console.log(`sitemap written: ${routes.length} routes -> ${OUTPUT}`);
})();
