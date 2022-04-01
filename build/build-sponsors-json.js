const fs = require('fs');
const path = require('path');

const content = fs
  .readFileSync(
    path.resolve(__dirname, '../src/shared/sponsors-list.js'),
    'utf-8'
  )
  .replace('export default', 'module.exports =');

fs.writeFileSync(
  path.resolve(__dirname, '../src/shared/sponsors-list-cjs.js'),
  content
);

const sponsors = require('../src/shared/sponsors-list-cjs.js');

const json = JSON.stringify(sponsors, '', 2);

fs.writeFileSync(path.resolve(__dirname, '../public/sponsors-list.json'), json);
