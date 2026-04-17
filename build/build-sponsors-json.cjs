const fs = require('fs');
const path = require('path');

const sponsorsPath = path.resolve(__dirname, '../src/shared/sponsors-list.json');
const n4SponsorsPath = path.resolve(__dirname, '../src/shared/n4-sponsors.json');
const outputPath = path.resolve(__dirname, '../public/sponsors-list.json');

const sponsors = JSON.parse(fs.readFileSync(sponsorsPath, 'utf-8'));
const n4Sponsors = fs.existsSync(n4SponsorsPath)
  ? JSON.parse(fs.readFileSync(n4SponsorsPath, 'utf-8'))
  : [];

const merged = [...n4Sponsors, ...sponsors];

fs.writeFileSync(outputPath, JSON.stringify(merged, null, 2));
