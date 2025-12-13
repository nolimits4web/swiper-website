const fs = require('fs-extra');
const { promise: exec } = require('exec-sh');

const dir = './public/types';

(async () => {
  const originalTsconfig = fs.readFileSync('./tsconfig.json', 'utf-8');
  fs.removeSync(dir);
  fs.ensureDirSync(dir);
  fs.writeFileSync(
    './tsconfig.json',
    fs.readFileSync('./tsconfig.json.typedoc', 'utf-8')
  );
  try {
    await exec('npx typedoc');
  } catch (error) {
    console.error(error);
  }
  fs.writeFileSync('./tsconfig.json', originalTsconfig);
})();
