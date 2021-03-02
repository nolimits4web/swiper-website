import React from 'react';
import { ReactComponent as CodeSandBoxLogo } from '@/img/codesandbox.svg';
import Heading from '@/components/Heading';
import { WithSidebarLayout } from '@/layouts/withSidebar';
import { useLazyDemos } from 'src/shared/use-lazy-demos';
import demos from 'src/demos.json';
import { compressToBase64 } from 'src/shared/lz-string';

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

  const compressParameters = (parameters) => {
    return compressToBase64(JSON.stringify(parameters))
      .replace(/\+/g, `-`) // Convert '+' to '-'
      .replace(/\//g, `_`) // Convert '/' to '_'
      .replace(/=+$/, ``); // Remove ending '='
  };

  const openCodeSandbox = async (e, title, fileName) => {
    e.preventDefault();
    const res = await fetch(`/demos/${fileName}`);
    let html = await res.text();
    html = html
      .replace(/..\/package\//g, 'https://unpkg.com/swiper/')
      .replace(/.\/images\//g, 'https://swiperjs.com/demos/images/');

    // https://github.com/codesandbox/codesandbox-importers/blob/master/packages/import-utils/src/create-sandbox/templates.ts#L63
    // We cant set name & tags in static environment, as codesandbox parses it from package.json
    // Thats why we're including parcel as dependency
    const parameters = compressParameters({
      files: {
        'index.html': {
          content: html,
        },
        'package.json': {
          content: {
            name: `Swiper - ${title}`,
            tags: ['swiper'],
            dependencies: {
              swiper: 'latest',
              'parcel-bundler': '^1.6.1',
            },
          },
        },
      },
    });

    console.log(parameters);

    // const codeSandBoxParams = getParameters(parameters);
    window.open(
      `https://codesandbox.io/api/v1/sandboxes/define?parameters=${parameters}`,
      '_blank'
    );
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
              onClick={(e) => openCodeSandbox(e, title, fileName)}
            >
              <CodeSandBoxLogo
                className="inline fill-current"
                width="19"
                height="14"
              />
              <span>Edit in CodeSandbox</span>
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
