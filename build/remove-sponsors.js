const fs = require('fs');
// eslint-disable-next-line
const sponsors = require('../src/shared/sponsors-list.json');
const toRemove = [];
const newSponsors = sponsors.filter((s) => {
  const shouldBeRemoved = toRemove.includes(s.ref);
  return !shouldBeRemoved;
});
fs.writeFileSync(
  './src/shared/sponsors-list.json',
  JSON.stringify(newSponsors, '', 2)
);
