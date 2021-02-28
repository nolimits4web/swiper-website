const fs = require('fs-extra');
const path = require('path');
const globby = require('globby');
const buildStatic = require('./static');
const buildAngular = require('./angular');

(async () => {
  const demos = await globby('src/*', {
    cwd: path.join(__dirname, '/..'),
  });
  demos.forEach(async (item) => {
    const dir = path.join(
      __dirname,
      `../dist/${path.basename(item.replace(/\.[^/.]+$/, ''))}`
    );
    const filePath = path.join(__dirname, '../', item);

    await fs.ensureDir(dir);
    buildStatic(dir, filePath);
    buildAngular(dir, filePath);
  });
})();
