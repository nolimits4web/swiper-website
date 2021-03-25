const fs = require('fs-extra');
const path = require('path');
const globby = require('globby');
const buildStatic = require('./static');
const buildAngular = require('./angular');

(async () => {
  const demos = await globby(['src/*', '!src/default_settings.js'], {
    cwd: path.join(__dirname, '/..'),
  });
  const demosData = [];
  demos.forEach(async (item) => {
    try {
      const folderName = path.basename(item.replace(/\.[^/.]+$/, ''));
      const demoConfig = require(path.join(__dirname, '../', item));
      const _meta = demoConfig('static');
      demosData.push({
        title: _meta.title,
        slug: _meta.slug || _meta.title,
        folder: folderName,
      });
      const dir = path.join(__dirname, `../../public/demos/${folderName}`);

      await fs.ensureDir(dir);
      await Promise.all([
        buildStatic(dir, demoConfig),
        buildAngular(dir, demoConfig),
      ]).catch(console.error);
    } catch (err) {
      console.error(item + '\n', err);
    }
  });

  const demosJSON_path = path.join(__dirname, `../../src/demos.json`);
  await fs.writeFile(demosJSON_path, JSON.stringify(demosData, null, 2));
})();
