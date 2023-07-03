import { MDXProvider } from '@mdx-js/react';
import Heading from '@/components/Heading.js';
import { WithSidebarLayout } from '@/layouts/WithSidebarLayout.js';
import Head from 'next/head';

export function PostLayout({ meta, children }) {
  const formatDate = (d) => {
    return Intl.DateTimeFormat('en-us', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    }).format(new Date(d));
  };
  const components = {
    h1: Heading.h1,
    h2: Heading.h2,
    h3: Heading.h3,
    h4: Heading.h4,
  };
  return (
    <>
      <Head>
        <meta
          property="og:image"
          content={`https://swiperjs.com${meta.image}`}
        />
        <meta
          name="twitter:image"
          content={`https://swiperjs.com${meta.image}`}
        />
      </Head>
      <MDXProvider components={components}>
        <WithSidebarLayout
          meta={{
            ...meta,
            title: `${meta.title} | Swiper Blog`,
          }}
          pageTitle={meta.title}
          afterPageTitle={
            <>
              <div className="-mt-5 mb-[28px] text-sm text-secondary">
                {formatDate(meta.date)}
              </div>
              <div className="relative mb-12 overflow-hidden rounded-3xl pb-[50%]">
                <img
                  src={meta.image}
                  className="absolute left-0 top-0 !m-0 !h-full !w-full object-cover object-center"
                />
              </div>
            </>
          }
        >
          <div className="blog-post-content">{children}</div>
        </WithSidebarLayout>
      </MDXProvider>
    </>
  );
}
