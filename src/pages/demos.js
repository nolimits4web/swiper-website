import React from 'react';
import Heading from '@/components/Heading';
import { WithSidebarLayout } from '@/layouts/WithSidebarLayout';
import { useLazyDemos } from '@/shared/use-lazy-demos';
import demos from '@/demos.json';
import uiinitiativeDemos from '@/uiinitiative-demos.json';
import { openCodeSandbox } from '@/shared/codesandbox';
import { Button } from '@/components/Button';

let tableOfContents;

const skipComponentsDemos = ['420', '430', '440'];

const DemoButton = (props) => {
  const { children, onClick, ...rest } = props;
  return (
    <Button
      transparent
      className={`relative flex cursor-pointer items-center justify-center !h-8 text-xs !px-4`}
      onClick={onClick}
      {...rest}
    >
      <div className="flex items-center gap-2">{children}</div>
    </Button>
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

  const icons = {
    Core: '/images/libs/js-white.svg',
    React: '/images/libs/react-white.svg',
    Vue: '/images/libs/vue-white.svg',
    Element: '/images/libs/webcomponents-white.svg',
  };

  return (
    <WithSidebarLayout tableOfContents={tableOfContents}>
      <h1>Swiper Demos</h1>
      <h2 className="flex items-center">
        <img
          src="/images/projects/paneflow.svg"
          className="my-0 mr-2 h-8 w-8"
          alt="PaneFlow - Build Stunning Slideshows Visually. No Code Required"
        />
        PaneFlow
      </h2>
      <a
        href="https://paneflow.com"
        target="_blank"
        className="-mt-4 block duration-300 hover:opacity-75"
      >
        <img
          src="/images/paneflow-banner.jpg"
          className="rounded-xl border border-white/10"
        />
      </a>
      <h2 className="flex items-center">
        <img
          src="/images/uiinitiative-logo.svg"
          className="my-0 mr-2 h-8 w-8 !rounded-none !border-0"
        />
        UI Initiative
      </h2>
      <p className="-mt-4">
        Premium Swiper templates & plugins from{' '}
        <a href="https://uiinitiative.com" target="_blank">
          UI Initiative
        </a>
      </p>
      <div className="relative">
        <div className="relative my-4 flex space-x-4 overflow-auto pb-6">
          {uiinitiativeDemosGrouped.map((demos, demoIndex) => (
            <div className="w-5/12 flex-shrink-0 space-y-4" key={demoIndex}>
              {demos.map(({ cover, url, title }) => (
                <a
                  key={url}
                  className="block w-full rounded-lg bg-surface-1 duration-300 hover:opacity-75"
                  href={url}
                  target="_blank"
                  title={title}
                >
                  <img
                    width="1200"
                    height="600"
                    className="!m-0 block rounded-xl border border-white/10"
                    src={cover}
                    alt={title}
                  />
                </a>
              ))}
            </div>
          ))}
          <div className="h-px w-1/12 shrink-0"></div>
        </div>
        <div className="absolute right-0 top-0 h-full w-1/12 bg-gradient-to-r from-transparent to-surface"></div>
      </div>
      {demos.map(({ title, slug, folder }) => (
        <React.Fragment key={title}>
          <Heading level={2} id={slug}>
            {title}
          </Heading>
          <div className="my-4 flex justify-between text-sm sm:justify-start sm:space-x-4">
            <DemoButton
              href={`/demos/${folder}/core.html`}
              target="_blank"
              rel="noopener"
            >
              Preview
            </DemoButton>
            <div className="flex min-w-0 shrink-[10] items-center gap-1">
              <span className="font-mono text-xs sm:mr-0 sm:mt-0 hidden sm:block">
                CodeSandbox:
              </span>
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
                    onClick={(e) =>
                      openCodeSandbox(e, title, folder, `${name.toLowerCase()}`)
                    }
                  >
                    <img
                      className="w-4 h-4 object-contain !rounded-none !border-0"
                      src={icons[name]}
                    />
                    <span className="hidden xs:block">{name}</span>
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
