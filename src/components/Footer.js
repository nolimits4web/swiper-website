import clsx from 'clsx';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Footer() {
  const router = useRouter();
  const withSidebar =
    [
      '/get-started',
      '/react',
      '/vue',
      '/element',
      '/swiper-api',
      '/changelog',
      '/demos',
      '/plugins',
    ].includes(router.pathname) || router.pathname.match(/blog\/[a-z0-9]/);

  return (
    <>
      <footer
        className={clsx(
          'mx-auto max-w-7xl px-4 sm:px-6 md:px-8 relative z-[1] pb-4',
          withSidebar &&
            '2xl:w-[calc(100%-256px*2-40px*2-48px)] 2xl:max-w-[940px] 2xl:!px-0 mt-8'
        )}
      >
        <div className="bg-surface-1 backdrop-blur-xl backdrop-saturate-200 border-outline border rounded-3xl p-8 ">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 gap-y-8 sm:gap-y-0">
            <div className="flex flex-col gap-4 min-w-40">
              <Link
                href="/"
                className="hover:opacity-75 active:opacity-50 duration-200 inline-flex self-start"
              >
                <img
                  src="/images/swiper-logo.svg"
                  className="w-8 h-8"
                  alt="Swiper"
                />
              </Link>
              <div className="text-lg">Swiper</div>
            </div>
            <div className="flex flex-col gap-4 text-sm">
              <div>Docs</div>
              <div className="flex flex-col gap-2">
                <Link href="/get-started">Getting Started</Link>
                <Link href="/swiper-api">Swiper Core / API</Link>
                <Link href="/element">Swiper Element</Link>
                <Link href="/react">Swiper React</Link>
                <Link href="/vue">Swiper Vue</Link>
                <Link href="/changelog">Changelog</Link>
              </div>
            </div>
            <div className="flex flex-col gap-4 text-sm">
              <div>Resources</div>
              <div className="flex flex-col gap-2">
                <Link href="/demos">Demos</Link>
                <Link href="/plugins">Plugins</Link>
                <Link href="/blog">Blog</Link>
                <Link href="/sponsors">Sponsors</Link>
              </div>
            </div>
            <div className="flex flex-col gap-4 text-sm">
              <div>Premium</div>
              <div className="flex flex-col gap-2">
                <Link target="_blank" href="https://paneflow.com">
                  PaneFlow
                </Link>
                <Link target="_blank" href="https://studio.swiperjs.com">
                  Swiper Studio
                </Link>
                <Link target="_blank" href="https://uiinitiative.com">
                  UI Initiative
                </Link>
              </div>
            </div>
          </div>
          <div className="text-on-surface-dark text-sm mt-8">
            <div>
              All product names, logos and brands are property of their
              respective owners.
            </div>
            <div className="mt-1">
              Copyright © {new Date().getFullYear()} Swiper by{' '}
              <a href="https://nolimits4web.com" target="_blank">
                <img
                  src="/images/n4w-logo.svg"
                  alt="nolimits4web"
                  className="inline-block h-6 w-6"
                />
              </a>
            </div>
          </div>
        </div>
      </footer>
      <div
        key="page-bottom-bg"
        className="page-bottom-bg absolute w-screen h-[218px] bg-center bg-no-repeat left-1/2 bottom-0 -translate-x-1/2 pointer-events-none"
      />
    </>
  );
}
