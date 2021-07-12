const fs = require('fs-extra');
const fetch = require('node-fetch');
const banner =
  `---
title: Swiper Changelog
description: Swiper changelog.
---` + '\n';

async function writeFile(content) {
  await fs.writeFile(
    './src/pages/changelog.mdx',
    banner +
      content
        .replace(/\# \[/g, '## [')
        .replace('# Changelog', '')
        .replace(/\#\#\# \[/g, '## [')
  );
  console.log('copy changelog done');
}

(async () => {
  const localPath = '../swiper/CHANGELOG.md';
  const exists = fs.existsSync(localPath);
  if (exists) {
    const content = await fs.readFile(localPath, 'utf-8');
    await writeFile(content);
    return;
  }
  console.log(`local didnt find: ${localPath}. Fetching from web`);
  const response = await fetch(
    'https://raw.githubusercontent.com/nolimits4web/swiper/master/CHANGELOG.md'
  );
  const content = await response.text();
  await writeFile(content);
})();
