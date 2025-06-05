import { useState, useRef } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Head from 'next/head';
import TableOfContents from '@/components/TableOfContents';
import SidebarSponsors from '@/components/SidebarSponsors';
import Carbon from '@/components/Carbon';
import { useIsomorphicLayoutEffect } from '@/hooks/useIsomorphicLayoutEffect';
import { Button } from '@/components/Button';

export function WithSidebarLayout({
  children,
  meta = {},
  pageTitle = '',
  beforePageTitle = '',
  afterPageTitle = '',
}) {
  const router = useRouter();
  const contentRef = useRef(null);
  const [toc, setToc] = useState([]);
  const [sidebarOpened, setSidebarOpened] = useState(false);

  useIsomorphicLayoutEffect(() => {
    const t = [];
    let parent;
    contentRef.current.querySelectorAll('h2, h3').forEach((el) => {
      const slug = el.getAttribute('id');
      const title = el.textContent.trim();
      if (el.nodeName.toLowerCase() === 'h3') {
        parent = true;
      } else {
        parent = false;
      }
      const obj = {
        slug,
        title,
        children: [],
      };
      if (!parent) {
        t.push(obj);
      } else {
        t[t.length - 1].children.push(obj);
      }
    });
    setToc(t);
    return () => {};
  }, []);

  const onListClick = (e) => {
    if (e.target && e.target.closest('a')) {
      setSidebarOpened(false);
    }
  };

  return (
    <div
      id={meta.containerId}
      className="mx-auto flex w-full justify-between px-4 sm:px-6 md:px-8 relative"
    >
      {meta && (
        <Head>
          <title key="title">{meta.title}</title>
          <meta property="og:title" content={meta.title} />
          <meta name="twitter:title" content={meta.title} />
        </Head>
      )}
      {/* Left */}
      <Button
        className="!fixed bottom-4 right-4 z-40 lg:hidden bg-surface-1 border border-outline backdrop-blur-lg w-16 h-16"
        onClick={() => setSidebarOpened(true)}
      >
        <svg
          className="h-6 w-6"
          xmlns="http://www.w3.org/2000/svg"
          height="24"
          viewBox="0 -960 960 960"
          width="24"
          fill="currentColor"
        >
          <path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z" />
        </svg>
      </Button>

      <div
        className={`fixed right-0 top-0 z-50 h-full w-full bg-black/40 lg:z-40 lg:!hidden ${
          sidebarOpened ? 'block' : 'hidden'
        }`}
        onClick={() => setSidebarOpened(false)}
      />
      <div
        className={`fixed left-2 top-2 bottom-2 z-50 mr-10 h-[calc(100vh-16px)] w-64 flex-none text-sm lg:relative lg:z-40 lg:left-0 lg:top-0 lg:!block lg:h-auto lg:rounded-none ${
          sidebarOpened ? 'block' : 'hidden'
        }`}
      >
        <div className="h-full overflow-y-auto overscroll-contain p-4 lg:sticky lg:top-4 lg:h-auto lg:max-h-[calc(100vh-32px)] bg-surface-1 border rounded-3xl border-outline  backdrop-blur-2xl flex flex-col">
          <SidebarSponsors />
          {toc.length > 0 && (
            <TableOfContents onClick={onListClick} tableOfContents={toc} />
          )}
          <div id="TA_AD_CONTAINER" className="-mx-4 -mb-4 mt-auto shrink-0" />
        </div>
      </div>
      {/* Center */}
      <div
        className="dark:prose-dark prose mx-auto min-w-0 max-w-none flex-auto pb-8 pt-10 2xl:max-w-[940px]"
        ref={contentRef}
      >
        {beforePageTitle}
        {(pageTitle || meta.title) && <h1>{pageTitle || meta.title}</h1>}
        {afterPageTitle}
        {children}
        <div className="mt-4 border-t border-outline pt-4 text-right text-sm">
          <Link
            href={`https://github.com/nolimits4web/swiper-website/edit/master/src/pages${router.pathname}.mdx`}
          >
            Edit this page on GitHub
          </Link>
        </div>
      </div>
      {/* Right */}
      <div className="hidden h-px w-[calc(256px+40px)] shrink-0 2xl:block" />
    </div>
  );
}
