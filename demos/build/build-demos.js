const fs = require('fs-extra');
const path = require('path');
const globby = require('globby');
const elapsed = require('elapsed-time-logger');
const buildCore = require('./core');
const buildAngular = require('./angular');
const buildReact = require('./react');
const buildVue = require('./vue');
const slugify = require('@sindresorhus/slugify');

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
      const _meta = demoConfig('core');
      if (!_meta.skip) {
        demosData.push({
          title: _meta.title,
          slug: slugify(_meta.slug || _meta.title),
          folder: folderName,
        });
      } else {
        console.log(`Skipping: ${_meta.title}`);
      }
      const dir = path.join(__dirname, `../../public/demos/${folderName}`);

      await fs.remove(dir);
      await fs.ensureDir(dir);
      await Promise.all([
        buildCore(dir, demoConfig),
        buildAngular(dir, demoConfig),
        buildReact(dir, demoConfig),
        buildVue(dir, demoConfig),
      ]).catch(console.error);
    } catch (err) {
      console.error(item + '\n', err);
    }
  });

  const demosJSON_path = path.join(__dirname, `../../src/demos.json`);
  await fs.writeFile(demosJSON_path, JSON.stringify(demosData, null, 2));
  elapsed.end('Demos generation');
})();