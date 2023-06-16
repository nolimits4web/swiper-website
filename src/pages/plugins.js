import React from 'react';
import Heading from '@/components/Heading';
import { WithSidebarLayout } from '@/layouts/WithSidebarLayout';
import { useLazyDemos } from '@/shared/use-lazy-demos';
import uiinitiativeDemos from '@/uiinitiative-demos.json';
import Carbon from '@/components/Carbon';

let tableOfContents;

const DemoButton = (props) => {
  const { children, onClick, tonal, ...rest } = props;
  const Tag = rest.href ? 'a' : 'button';
  return (
    <Tag
      className={`relative flex cursor-pointer items-center justify-center rounded-md px-3 text-sm !font-medium text-primary !no-underline hover:bg-primary hover:text-on-primary sm:ml-1 ${
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
  tableOfContents = uiinitiativeDemos.map(({ title, slug }) => {
    return {
      title,
      slug,
      children: [],
    };
  });

  useLazyDemos();

  return (
    <WithSidebarLayout tableOfContents={tableOfContents}>
      <Carbon sidebar />
      <h1>Premium Swiper Plugins</h1>
      <p>
        Premium Swiper templates & plugins from{' '}
        <a href="https://uiinitiative.com" target="_blank">
          UI Initiative
        </a>
      </p>

      {uiinitiativeDemos.map(
        ({ title, slug, preview, url, subtitle, icon }) => (
          <div
            className="my-12 scroll-mt-20 rounded-3xl bg-surface-1 p-4 sm:p-8"
            id={slug}
            key={slug}
          >
            <div className="flex items-start">
              <img src={icon} className="my-0 mr-4 h-16 w-16" />
              <div>
                <Heading level={2} className="mt-0" id={slug} link={false}>
                  {title}{' '}
                </Heading>
                <div className=" -mt-2 block opacity-60">{subtitle}</div>
                <div className="my-4 flex space-x-4 text-sm">
                  <DemoButton
                    href={preview}
                    target="_blank"
                    rel="noopener"
                    tonal
                  >
                    Preview
                  </DemoButton>
                  <DemoButton href={url} target="_blank" rel="noopener" tonal>
                    Store Page
                  </DemoButton>
                </div>
              </div>
            </div>

            <div className="demo my-4 overflow-hidden rounded-xl border border-outline-variant bg-surface-1 dark:border-transparent">
              <iframe
                title={title}
                data-src={preview}
                scrolling="no"
                frameBorder="0"
                className="block h-[420px] w-full overflow-hidden rounded-xl border border-outline-variant bg-surface-1"
              />
            </div>
          </div>
        )
      )}
    </WithSidebarLayout>
  );
}

const meta = {
  title: 'Premium Swiper Plugins',
};

DemosPage.layoutProps = {
  WithSidebarLayout,
  meta,
  tableOfContents,
};
