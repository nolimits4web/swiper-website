const fs = require('fs-extra');
const { promise: exec } = require('exec-sh');
const dir = './public/types';

(async () => {
  fs.removeSync(dir);
  fs.ensureDirSync(dir);
  fs.writeFileSync(
    './tsconfig.json',
    fs.readFileSync('./tsconfig.json.typedoc', 'utf-8')
  );
  await exec('npx typedoc');
  fs.unlinkSync('./tsconfig.json');
})();
