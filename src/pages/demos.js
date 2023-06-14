import React from 'react';
import Heading from '@/components/Heading';
import { WithSidebarLayout } from '@/layouts/WithSidebarLayout';
import { useLazyDemos } from '@/shared/use-lazy-demos';
import demos from '@/demos.json';
import uiinitiativeDemos from '@/uiinitiative-demos.json';
import Carbon from '@/components/Carbon';
import { trackOutbound } from '@/shared/track-outbound';
import { openCodeSandbox } from '@/shared/codesandbox';

let tableOfContents;

const skipComponentsDemos = ['420', '430', '440'];

const DemoButton = (props) => {
  const { children, onClick, tonal, ...rest } = props;
  const Tag = rest.href ? 'a' : 'button';
  return (
    <Tag
      className={`relative flex cursor-pointer items-center justify-center rounded-md px-3 text-sm !font-medium text-primary !no-underline hover:bg-primary hover:text-on-primary ${
        tonal ? 'bg-secondary-container' : ''
      } h-7`}
      onClick={onClick}
      {...rest}
    >
      {children}
    </Tag>
  );
};

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
      <Carbon sidebar />
      <h1>Swiper Demos</h1>

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
                className="block w-full rounded-lg bg-surface-1"
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
      {demos.map(({ title, slug, folder }) => (
        <React.Fragment key={title}>
          <Heading level={2} id={slug}>
            {title}
          </Heading>
          <div className="my-4 flex flex-wrap space-x-4 text-sm">
            <DemoButton
              href={`/demos/${folder}/core.html`}
              target="_blank"
              rel="noopener"
              tonal
            >
              Preview
            </DemoButton>
            <div className="flex items-center space-x-1">
              <span className="font-mono text-xs">CodeSandbox:</span>
              {['Core', 'React', 'Vue', 'Element'].map((name) => {
                if (
                  name !== 'Core' &&
                  skipComponentsDemos.includes(folder.split('-')[0])
                )
                  return null;

                return (
                  <DemoButton
                    type="button"
                    key={name}
                    tonal
                    onClick={(e) =>
                      openCodeSandbox(e, title, folder, `${name.toLowerCase()}`)
                    }
                  >
                    {/* <img
                    src="/images/codesandbox-logo.svg"
                    className="!mb-0 !mt-0 inline h-[14px] w-[19px]"
                    width="19"
                    alt=""
                    height="14"
                  /> */}
                    {name}
                  </DemoButton>
                );
              })}
            </div>
          </div>
          <div className="demo my-4 overflow-hidden rounded-xl border border-outline-variant bg-surface-1 dark:border-transparent">
            <iframe
              title={title}
              data-src={`/demos/${folder}/core.html`}
              scrolling="no"
              frameBorder="0"
              className="block h-96 w-full overflow-hidden rounded-xl bg-surface-1"
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
