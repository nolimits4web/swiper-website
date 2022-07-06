const fs = require('fs-extra');
const path = require('path');

fs.readdirSync(path.resolve(__dirname, '../public/demos'))
  .filter((d) => d !== 'images' && d[0] !== '.')
  .forEach((dirName) => {
    const newDir = path.resolve(__dirname, '../src/demos', dirName);
    const currentDirPath = path.resolve(__dirname, '../public/demos', dirName);
    if (!fs.existsSync(newDir)) {
      fs.mkdirSync(newDir);
    }
    fs.readdirSync(currentDirPath)
      .filter((file) => file[0] !== '.')
      .forEach((file) => {
        let fileContent = fs.readFileSync(
          path.resolve(currentDirPath, file),
          'utf-8'
        );
        if (file.includes('.json')) {
          fileContent = JSON.parse(fileContent);
        }
        const folder = file.split('.')[0];

        if (!fs.existsSync(path.resolve(newDir, folder))) {
          fs.mkdirSync(path.resolve(newDir, folder));
        }
        if (file.includes('.json')) {
          Object.keys(fileContent).forEach((newFilePath) => {
            fs.outputFileSync(
              path.resolve(newDir, folder, newFilePath),
              fileContent[newFilePath].content
            );
          });
        } else {
          fs.outputFileSync(
            path.resolve(newDir, folder, 'index.html'),
            fileContent
          );
        }
      });
  });
