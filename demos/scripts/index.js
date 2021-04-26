const fs = require('fs-extra');
const path = require('path');
const globby = require('globby');
const elapsed = require('elapsed-time-logger');
const buildStatic = require('./static');
const buildAngular = require('./angular');
const buildReact = require('./react');

(async () => {
  elapsed.start('Demos generation');
  const demos = await globby(['src/*', '!src/default_settings.js'], {
    cwd: path.join(__dirname, '/..'),
  });
  const demosData = [];
  await demos.map(async (item) => {
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

      await fs.remove(dir);
      await fs.ensureDir(dir);
      await Promise.all([
        buildStatic(dir, demoConfig),
        buildAngular(dir, demoConfig),
        buildReact(dir, demoConfig),
      ]).catch(console.error);
    } catch (err) {
      console.error(item + '\n', err);
    }
  });

  const demosJSON_path = path.join(__dirname, `../../src/demos.json`);
  await fs.writeFile(demosJSON_path, JSON.stringify(demosData, null, 2));
  elapsed.end('Demos generation');
})();
