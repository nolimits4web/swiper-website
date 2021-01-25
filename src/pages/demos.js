import React from 'react';
import sdk from '@stackblitz/sdk';
import { ReactComponent as StackblitzLogo } from '@/img/stackblitz.svg';
import Heading from '@/components/Heading';
import { WithSidebarLayout } from '@/layouts/withSidebar';
import { useLazyDemos } from 'src/shared/use-lazy-demos';
import demos from 'src/demos.json';

let tableOfContents;

export default function DemosPage() {
  tableOfContents = demos.map(({ title, slug }) => {
    return {
      title,
      slug: slug,
      children: [],
    };
  });

  useLazyDemos();

  const createStackBlitz = (e, title, fileName) => {
    e.preventDefault();
    fetch(`demos/${fileName}`)
      .then((res) => res.text())
      .then((html) => {
        html = html
          .replace(/..\/package\//g, 'https://unpkg.com/swiper/')
          .replace(/.\/images\//g, 'https://swiperjs.com/demos/images/');

        const project = {
          files: {
            'index.html': html,
            'index.js': '',
          },
          title: `Swiper - ${title}`,
          description: `Swiper - ${title}`,
          template: 'javascript',
          tags: ['swiper'],
        };
        sdk.openProject(project, { openFile: 'index.html' });
      });
  };

  return (
    <WithSidebarLayout tableOfContents={tableOfContents}>
      <h1>Swiper Demos</h1>
      <p>
        You can download all these demos and hook into the code from GitHub{' '}
        <a
          href="https://github.com/nolimits4web/Swiper/tree/master/demos/"
          target="_blank"
          rel="noopener"
        >
          here
        </a>
      </p>
      {demos.map(({ title, slug, fileName }, demoIndex) => (
        <React.Fragment key={title}>
          <Heading level={2} id={slug} toc={true}>
            {title}
          </Heading>
          <div className="flex flex-wrap text-sm my-4">
            <a
              className="no-underline mr-4 mb-2"
              href={`/demos/${fileName}`}
              target="_blank"
              rel="noopener"
            >
              Open in new window
            </a>
            <a
              className="no-underline"
              href={`https://github.com/nolimits4web/Swiper/blob/master/demos/${fileName}`}
              target="_blank"
              rel="noopener"
            >
              Source code
            </a>
            <a
              className="no-underline ml-2"
              href="#"
              onClick={(e) => createStackBlitz(e, title, fileName)}
            >
              <StackblitzLogo className="inline" width="19" height="14" />
              <span>Edit in StackBlitz</span>
            </a>
          </div>
          <div className="my-4 bg-gray-100 shadow demo">
            <iframe
              data-src={`/demos/${fileName}`}
              scrolling="no"
              frameBorder="0"
              className="h-96 block w-full"
            ></iframe>
          </div>
        </React.Fragment>
      ))}
    </WithSidebarLayout>
  );
}

const meta = {
  title: 'Swiper Demos',
};

DemosPage.layoutProps = {
  WithSidebarLayout,
  meta,
  tableOfContents,
};
