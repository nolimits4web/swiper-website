const fs = require('fs');
const path = require('path');

const demosFolder = path.resolve(__dirname, '../public/demos');

const demosFiles = fs
  .readdirSync(demosFolder)
  .filter((f) => f.includes('.html'));

const demos = demosFiles.map((fileName) => {
  const slug = fileName.slice(4).replace('.html', '');
  const title = slug
    .replace(/-/g, ' ')
    .split(' ')
    .map((word) => `${word[0].toUpperCase()}${word.slice(1)}`)
    .join(' ');
  return {
    slug,
    title,
    fileName,
  };
});

fs.writeFileSync(
  path.resolve(__dirname, '../src/demos.json'),
  JSON.stringify(demos, '', 2)
);
