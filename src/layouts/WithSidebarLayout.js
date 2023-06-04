import { useState, useRef } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Head from 'next/head';
import PageHeader from '@/components/PageHeader';
import TableOfContents from '@/components/TableOfContents';
import SidebarSponsors from '@/components/SidebarSponsors';
import Carbon from '@/components/Carbon';
import { useIsomorphicLayoutEffect } from '@/hooks/useIsomorphicLayoutEffect';

export function WithSidebarLayout({ children, meta = {} }) {
  const router = useRouter();
  const contentRef = useRef(null);
  const [toc, setToc] = useState([]);

  useIsomorphicLayoutEffect(() => {
    const t = [];
    contentRef.current.querySelectorAll('h2, h3, h4').forEach((el) => {
      const slug = el.getAttribute('id');
      const title = el.textContent.trim();
      t.push({
        slug,
        title,
        children: [],
      });
    });
    setToc(t);
    return () => {};
  }, []);

  return (
    <div
      id={meta.containerId}
      className="mx-auto flex w-full max-w-[90rem] px-4 sm:px-6 lg:px-8 xl:px-10"
    >
      {meta && (
        <Head>
          <title key="title">{meta.title}</title>
          <meta property="og:title" content={meta.title} />
          <meta name="twitter:title" content={meta.title} />
        </Head>
      )}
      <div className="mr-4 hidden w-64 flex-none text-sm sm:mr-6 lg:mr-8 lg:block xl:mr-10">
        <div className="sticky top-20 max-h-[calc(100vh-80px)] overflow-y-auto overscroll-contain py-10">
          <SidebarSponsors />
          {toc.length > 0 && <TableOfContents tableOfContents={toc} />}
        </div>
      </div>
      <div
        className="prose min-w-0 max-w-none flex-auto pb-24 pt-10 dark:prose-dark lg:pb-16"
        ref={contentRef}
      >
        {meta.carbon && <Carbon />}
        {meta.title && (
          <PageHeader title={meta.title} description={meta.description} />
        )}
        {children}
        <div className="mt-4 text-right">
          <Link
            href={`https://github.com/nolimits4web/swiper-website/edit/master/src/pages${router.pathname}.mdx`}
          >
            Edit this page on GitHub
          </Link>
        </div>
      </div>
    </div>
  );
}
