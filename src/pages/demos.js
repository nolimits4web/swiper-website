import React from 'react';
import Heading from '@/components/Heading';
import { WithSidebarLayout } from '@/layouts/withSidebar';
import { useLazyDemos } from '@/shared/use-lazy-demos';
import demos from '@/demos.json';
import uiinitiativeDemos from '@/uiinitiative-demos.json';
import Carbon from '@/components/Carbon';
import { trackOutbound } from '@/shared/track-outbound';
import { openCodeSandbox } from '@/shared/codesandbox';

let tableOfContents;

const skipComponentsDemos = ['420', '430', '440'];

export default function DemosPage() {
  tableOfContents = demos.map(({ title, slug }) => {
    return {
      title,
      slug,
      children: [],
    };
  });

  useLazyDemos();

  const uiinitiativeDemosGrouped = [];
  uiinitiativeDemos.forEach((demo, index) => {
    const groupIndex = Math.floor(index / 2);
    if (!uiinitiativeDemosGrouped[groupIndex])
      uiinitiativeDemosGrouped[groupIndex] = [];
    uiinitiativeDemosGrouped[groupIndex].push(demo);
  });

  return (
    <WithSidebarLayout tableOfContents={tableOfContents}>
      <Carbon />
      <h1 className="dark:text-gray-200">Swiper Demos</h1>

      <h2>UI Initiative</h2>
      <p>
        Premium Swiper templates & plugins from{' '}
        <a href="https://uiinitiative.com" target="_blank">
          UI Initiative
        </a>
      </p>
      <div className="my-4 flex space-x-4 overflow-auto pb-6">
        {uiinitiativeDemosGrouped.map((demos, demoIndex) => (
          <div
            className="w-10/12 flex-shrink-0 space-y-4 md:w-6/12 "
            key={demoIndex}
          >
            {demos.map(({ cover, url, title }) => (
              <a
                key={url}
                className="block w-full rounded-lg bg-black bg-opacity-10 dark:border dark:border-white dark:border-opacity-10"
                href={url}
                target="_blank"
                title={title}
                onClick={() => trackOutbound(url)}
              >
                <img
                  width="1200"
                  height="600"
                  className="!m-0 block rounded-lg"
                  src={cover}
                  alt={title}
                />
              </a>
            ))}
          </div>
        ))}
      </div>
      {demos.map(({ title, slug, folder }, demoIndex) => (
        <React.Fragment key={title}>
          <Heading level={2} id={slug} toc>
            {title}
          </Heading>
          <div className="my-4 flex flex-wrap text-sm">
            <a
              className="mr-4 no-underline"
              href={`/demos/${folder}/core.html`}
              target="_blank"
              rel="noopener"
            >
              Open in new window
            </a>
            {['Core', 'React', 'Vue', 'Element'].map((name) => {
              if (
                name !== 'Core' &&
                skipComponentsDemos.includes(folder.split('-')[0])
              )
                return null;

              return (
                <a
                  key={name}
                  className="relative ml-2 no-underline"
                  href="#"
                  onClick={(e) =>
                    openCodeSandbox(e, title, folder, `${name.toLowerCase()}`)
                  }
                >
                  <img
                    src="/images/codesandbox-logo.svg"
                    className="!mb-0 !mt-0 inline h-[14px] w-[19px]"
                    width="19"
                    height="14"
                  />
                  {name}
                </a>
              );
            })}
          </div>
          <div className="demo my-4 bg-gray-100 shadow">
            <iframe
              data-src={`/demos/${folder}/core.html`}
              scrolling="no"
              frameBorder="0"
              className="block h-96 w-full"
            />
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
