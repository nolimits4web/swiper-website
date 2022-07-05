const fs = require('fs-extra');
const path = require('path');
const globby = require('globby');

const buildDemos = async () => {
  const data = [];
  fs.readdirSync(path.resolve(__dirname, '../src/demos'))
    .filter((f) => f[0] !== '.')
    .forEach((folder) => {
      const slug = folder.replace(/[0-9]/g, '').substring(1);
      const title = slug
        .split('-')
        .map((word, wordIndex) => {
          if (wordIndex > 0) return word;
          return `${word[0].toUpperCase()}${word.substring(1)}`;
        })
        .join(' ');
      const skip = ['angular', 'core', 'react', 'svelte', 'vue', 'solid'];
      data.push({ slug, title, skip, folder });
      fs.readdirSync(path.resolve(__dirname, '../src/demos', folder))
        .filter((f) => f[0] !== '.')
        .forEach((frameworkFolder) => {
          skip.splice(skip.indexOf(frameworkFolder), 1);
          const paths = globby.sync('**/*.*', {
            cwd: path.resolve(
              __dirname,
              '../src/demos',
              folder,
              frameworkFolder
            ),
          });
          const obj = {};
          paths.forEach((filePath) => {
            const content = fs.readFileSync(
              path.resolve(
                __dirname,
                '../src/demos',
                folder,
                frameworkFolder,
                filePath
              ),
              'utf-8'
            );
            obj[filePath] = { content };
          });
          fs.outputFileSync(
            path.resolve(
              __dirname,
              '../public/demos/',
              folder,
              `${frameworkFolder}.json`
            ),
            JSON.stringify(obj)
          );
        });
    });
  fs.outputFileSync(
    path.resolve(__dirname, '../src/demos.json'),
    JSON.stringify(data, '', 2)
  );
};

buildDemos();
