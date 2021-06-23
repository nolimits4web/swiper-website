const fs = require('fs-extra');
const path = require('path');
const globby = require('globby');
const elapsed = require('elapsed-time-logger');
const buildCore = require('./core');
const buildAngular = require('./angular');
const buildReact = require('./react');
const buildVue = require('./vue');
const buildSvelte = require('./svelte');
const slugify = require('@sindresorhus/slugify');

const argv = process.argv.slice(2);
const globbyOptions = {
  cwd: path.join(__dirname, '/..'),
  stats: true,
};
const publicDemosDir = path.join(__dirname, `../../public/demos`);

function demoIsNewer(existsDemo, mtime) {
  return (
    existsDemo &&
    mtime <= existsDemo.mtime &&
    !argv.includes('--force') &&
    !argv.includes('-f')
  );
}

async function getDemosStats() {
  const folders = await globby(['../public/demos/*'], {
    ...globbyOptions,
    onlyFiles: false,
  });
  const obj = {};
  folders.forEach(({ name, stats }) => {
    obj[name] = stats;
  });
  return obj;
}

(async () => {
  elapsed.start('Demos generation');
  const demosData = [];
  const demosStats = await getDemosStats();
  const tree = {};
  const dynamicDemos = await globby(['src/dynamic/*'], globbyOptions);
  await Promise.all(
    dynamicDemos.map(async ({ path: item, stats }) => {
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
        const distDir = path.join(publicDemosDir, folderName);

        if (demoIsNewer(demosStats[folderName], stats.mtime)) {
          return;
        }
        console.log(`> ${folderName}`);
        await fs.remove(distDir);
        await fs.ensureDir(distDir);
        await Promise.all(
          [buildCore, buildAngular, buildReact, buildVue, buildSvelte].map(
            (build) => build(distDir, demoConfig)
          )
        ).catch(console.error);
      } catch (err) {
        console.error(item + '\n', err);
      }
    })
  );

  const staticDemos = await globby(['src/static/**/*'], globbyOptions);
  await Promise.all(
    staticDemos.map(async ({ path: item, stats }) => {
      const [demoName, level2, level3, ...restLevels] = item
        .split('/')
        .slice(2);
      const fileName = level3 || level2;
      const techDir = level3 ? level2 : level2.split('.')[0];
      tree[demoName] = tree[demoName] || {};
      tree[demoName][techDir] = tree[demoName][techDir] || {};

      if (demoIsNewer(demosStats[demoName], stats.mtime)) {
        tree[demoName].skip = true;
        return;
      }
      const content = await fs.readFile(
        path.join(__dirname, '../', item),
        'utf-8'
      );
      const restLevelsString = restLevels.join('/');
      const fullPath = restLevelsString
        ? path.join(level3, restLevelsString).replace(/\\/g, '/')
        : fileName;
      // console.log(fullPath);
      tree[demoName][techDir][fullPath] = { content };
    })
  );
  await Promise.all(
    Object.keys(tree).map(async (folderName) => {
      const demo = tree[folderName];
      const distDir = path.join(publicDemosDir, folderName);
      const techArr = Object.keys(demo);
      const title = folderName.split('-').slice(1).join(' ');
      const titleCapitalized = title.charAt(0).toUpperCase() + title.slice(1);
      demosData.push({
        title: titleCapitalized,
        slug: slugify(title),
        folder: folderName,
        skip: ['core', 'react', 'angular', 'vue', 'svelte'].filter(
          (v) => !techArr.includes(v)
        ),
      });

      if (demo.skip) {
        return;
      }

      console.log(`> ${folderName}`);
      await fs.remove(distDir);
      await fs.ensureDir(distDir);

      await Promise.all(
        techArr.map(async (tech) => {
          const item = demo[tech];
          if (tech === 'core') {
            if (!item['core.html']) {
              console.log(item);
              console.log(`${folderName} no core.html`);
              return;
            }
            await fs.writeFile(
              `${distDir}/core.html`,
              item['core.html'].content
            );
            return;
          }

          await fs.writeFile(
            `${distDir}/${tech}.json`,
            JSON.stringify(item, null, 2)
          );
        })
      );
    })
  );

  const demosJSON_path = path.join(__dirname, `../../src/demos.json`);
  demosData.sort((a, b) => (a.folder > b.folder ? 1 : -1));
  await fs.writeFile(demosJSON_path, JSON.stringify(demosData, null, 2));
  elapsed.end('Demos generation');
})();
