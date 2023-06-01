const fs = require('fs');
const path = require('path');

fs.copyFileSync(
  path.resolve(__dirname, '../src/shared/sponsors-list.json'),
  path.resolve(__dirname, '../public/sponsors-list.json')
);
