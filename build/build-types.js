const fs = require('fs-extra');
const { promise: exec } = require('exec-sh');
const dir = './public/types';
fs.removeSync(dir);
fs.ensureDirSync(dir);
exec(
  'npx typedoc --out ./public/types ./node_modules/swiper --includeDeclarations --excludeExternals'
);
