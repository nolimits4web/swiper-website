import { useState, useRef } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Head from 'next/head';
import TableOfContents from '@/components/TableOfContents';
import SidebarSponsors from '@/components/SidebarSponsors';
import Carbon from '@/components/Carbon';
import { useIsomorphicLayoutEffect } from '@/hooks/useIsomorphicLayoutEffect';

export function WithSidebarLayout({ children, meta = {} }) {
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
  }

  return (
    <div
      id={meta.containerId}
      className="mx-auto flex w-full justify-between px-4 sm:px-6"
    >
      {meta && (
        <Head>
          <title key="title">{meta.title}</title>
          <meta property="og:title" content={meta.title} />
          <meta name="twitter:title" content={meta.title} />
        </Head>
      )}
      {/* Left */}
      <button
        type="button"
        className="fixed bottom-6 right-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary text-on-primary hover:opacity-75 lg:hidden z-40"
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
      </button>
      <div
        className={`fixed right-0 top-0 z-40 h-full w-full bg-black bg-opacity-10 lg:!hidden ${
          sidebarOpened ? 'block' : 'hidden'
        }`}
        onClick={() => setSidebarOpened(false)}
      />
      <div
        className={`fixed left-0 top-0 z-50 mr-10 h-screen w-56 flex-none bg-surface-3 text-sm lg:relative lg:!block lg:h-auto lg:bg-transparent ${
          sidebarOpened ? 'block' : 'hidden'
        }`}
      >
        <div className="h-full overflow-y-auto overscroll-contain px-4 py-10 lg:sticky lg:top-16 lg:h-auto lg:max-h-[calc(100vh-64px)] lg:px-0">
          <SidebarSponsors />
          {toc.length > 0 && <TableOfContents onClick={onListClick} tableOfContents={toc} />}
        </div>
      </div>
      {/* Center */}
      <div
        className="dark:prose-dark prose mx-auto min-w-0 max-w-none flex-auto pb-24 pt-10 lg:pb-16 2xl:max-w-[940px]"
        ref={contentRef}
      >
        {meta.carbon && <Carbon sidebar />}
        {meta.title && <h1>{meta.title}</h1>}
        {children}
        <div className="mt-4 text-right">
          <Link
            href={`https://github.com/nolimits4web/swiper-website/edit/master/src/pages${router.pathname}.mdx`}
          >
            Edit this page on GitHub
          </Link>
        </div>
      </div>
      {/* Right */}
      <div className="hidden h-px w-[calc(224px+40px)] shrink-0 2xl:block" />
    </div>
  );
}
