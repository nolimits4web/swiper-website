const fs = require('fs');
// eslint-disable-next-line
const sponsors = require('../src/shared/sponsors-list.json');

const content = fs.readFileSync('./swiper-transactions.csv', 'utf8');
const data = {};

content
  .split('\n')
  .filter((_, i) => i > 0)
  .forEach((row) => {
    const cols = row.split(',');
    const date = (cols[0] || '').replace(/"/g, '');
    const slug = (cols[17] || '').replace(/"/g, '');
    if (slug === 'opensource' || !slug) return;
    if (!data[slug]) data[slug] = [];
    data[slug].push(date);
  });

const toRemove = [];
sponsors.forEach((sponsor) => {
  if (!sponsor.ref.includes('opencollective')) return;
  const slug = sponsor.ref.split('https://opencollective.com/')[1];
  if (!data[slug] || !data[slug][0]) {
    toRemove.push(slug);
    return;
  }
  if (sponsor.endDate) {
    const endDate = new Date(sponsor.endDate);
    if (endDate > new Date()) return;
  }
  const lastDate = new Date(data[slug][0]);
  if (new Date().getTime() - lastDate.getTime() > 31 * 24 * 60 * 60 * 1000) {
    toRemove.push(slug);
  }
});

console.log(toRemove.map((ref) => `https://opencollective.com/${ref}`));
