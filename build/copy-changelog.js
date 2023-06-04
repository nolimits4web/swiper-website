const fs = require('fs-extra');
const fetch = require('node-fetch');
const prepend =
  `
import { MDXProvider } from '@mdx-js/react';
import Heading from '@/components/Heading.js';
import { WithSidebarLayout } from '@/layouts/WithSidebarLayout.js';

export const meta = {
  title: 'Swiper Changelog',
  description: 'Swiper changelog',
}
` + '\n';
const append = `

export default function Page({ children }) {
  const components = {
    h1: Heading.h1,
    h2: Heading.h2,
    h3: Heading.h3,
    h4: Heading.h4,
  };
  return (
    <MDXProvider components={components}>
      <WithSidebarLayout meta={meta}>{children}</WithSidebarLayout>
    </MDXProvider>
  );
}
`;
async function writeFile(content) {
  await fs.writeFile(
    './src/pages/changelog.mdx',
    append +
      content
        .replace(/\# \[/g, '## [')
        .replace('# Changelog', '')
        .replace(/\#\#\# \[/g, '## [') +
      prepend
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
