const fs = require('fs');
const path = require('path');

const sponsorsList = require(path.resolve(
  __dirname,
  '../src/shared/sponsors-list.json'
));
const keepImages = sponsorsList.map((s) => s.image);

fs.readdirSync('./public/images/sponsors').forEach((f) => {
  if (f[0] === '.') return;
  if (!keepImages.includes(f)) {
    fs.unlinkSync(path.resolve('./public/images/sponsors', f));
  }
});
