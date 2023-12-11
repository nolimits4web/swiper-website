import React from 'react';
import Heading from '@/components/Heading';
import { WithSidebarLayout } from '@/layouts/WithSidebarLayout';
import { useLazyDemos } from '@/shared/use-lazy-demos';
import uiinitiativeDemos from '@/uiinitiative-demos.json';
import Carbon from '@/components/Carbon';

let tableOfContents;

const studioAvailable = [
  'tinder-slider',
  'carousel-slider',
  'panorama-slider',
  'shaders-slider',
  'shutters-slider',
  'slicer-slider',
  'material-you-slider',
];

const DemoButton = (props) => {
  const { children, onClick, tonal, className, ...rest } = props;
  const Tag = rest.href ? 'a' : 'button';
  return (
    <Tag
      className={`relative flex cursor-pointer items-center justify-center rounded-md px-3 text-sm !font-medium text-primary !no-underline hover:bg-primary hover:text-on-primary ${
        tonal ? 'bg-secondary-container' : ''
      } h-7 ${className || ''}`}
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
        </a>{' '}
        and{' '}
        <a href="https://studio.swiperjs.com" target="_blank">
          Swiper Studio
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
                <div className="-mt-4 block opacity-60">{subtitle}</div>
                <div className="mt-2 flex flex-wrap text-sm">
                  <DemoButton
                    href={preview}
                    target="_blank"
                    rel="noopener"
                    tonal
                    className="mb-2 mr-2"
                  >
                    Preview
                  </DemoButton>
                  <DemoButton
                    href={url}
                    className="mb-2 mr-2"
                    target="_blank"
                    rel="noopener"
                    tonal
                  >
                    Store Page
                  </DemoButton>
                  {studioAvailable.includes(slug) && (
                    <DemoButton
                      href="https://studio.swiperjs.com"
                      target="_blank"
                      rel="noopener"
                      tonal
                      title="This effect is available in Swiper Studio"
                    >
                      Available in Studio
                    </DemoButton>
                  )}
                </div>
              </div>
            </div>

            <div className="demo my-4 overflow-hidden rounded-xl border border-outline-variant bg-surface-1">
              <iframe
                title={title}
                data-src={preview}
                scrolling="no"
                frameBorder="0"
                className="block h-[420px] w-full overflow-hidden rounded-xl bg-surface-1"
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
