import fs from 'fs-extra';
import fetch from 'node-fetch';

const prepend =
  `
import { MDXProvider } from '@mdx-js/react';
import Heading from '@/components/Heading.js';
import { WithSidebarLayout } from '@/layouts/WithSidebarLayout.js';

export const meta = {
  title: 'Swiper Changelog',
  description: 'Swiper changelog',
}
` + '\n'; // eslint-disable-line
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
      <WithSidebarLayout meta={meta}>
        <div className="break-words">{children}</div>
      </WithSidebarLayout>
    </MDXProvider>
  );
}
`;
/* eslint-disable */
async function writeFile(content) {
  await fs.writeFile(
    './src/pages/changelog.mdx',
    prepend +
      content
        .replace(/\# \[/g, '## [')
        .replace('# Changelog', '')
        .replace(/\#\#\# \[/g, '## [') +
      append
  );
  console.log('copy changelog done');
}
/* eslint-enable */

(async () => {
  const localPath = '../swiper/CHANGELOG.md';
  const exists = fs.existsSync(localPath);
  if (exists) {
    const content = await fs.readFile(localPath, 'utf-8');
    await writeFile(content);
    return;
  }
  console.log(`local didn't find: ${localPath}. Fetching from web`);
  const response = await fetch(
    'https://raw.githubusercontent.com/nolimits4web/swiper/master/CHANGELOG.md'
  );
  const content = await response.text();
  await writeFile(content);
})();
