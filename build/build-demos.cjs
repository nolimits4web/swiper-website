const fs = require('fs-extra');
const path = require('path');

const buildDemos = async () => {
  const { globbySync } = await import('globby');
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
      data.push({ slug, title, folder });
      fs.readdirSync(path.resolve(__dirname, '../src/demos', folder))
        .filter((f) => f[0] !== '.')
        .forEach((frameworkFolder) => {
          const paths = globbySync('**/*.*', {
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

          if (frameworkFolder === 'core' || frameworkFolder === 'element') {
            fs.outputFileSync(
              path.resolve(
                __dirname,
                '../public/demos/',
                folder,
                `${frameworkFolder}.html`
              ),
              obj['index.html'].content
            );
          }

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
