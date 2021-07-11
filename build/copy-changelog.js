const fs = require('fs-extra');
const path = require('path');
const chalk = require('chalk');
const banner =
  `---
title: Swiper Changelog
description: Swiper changelog.
---` + '\n';

async function writeFile(content) {
  await fs.writeFile(
    './src/pages/changelog.mdx',
    banner + content.replace(/\# \[/g, '## [')
  );
}

(async () => {
  const localPath = '../swiper/CHANGELOG.md';
  const exists = fs.existsSync(localPath);
  if (exists) {
    const content = await fs.readFile(localPath, 'utf-8');
    await writeFile(content);
  }
})();
