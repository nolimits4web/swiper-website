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
      '/swiper-mcp',
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
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 gap-y-8 sm:gap-y-0">
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
                <Link href="/swiper-mcp">Swiper MCP</Link>
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
                <Link href="/premium-guide">Premium Guide</Link>
                <Link target="_blank" href="https://studio.swiperjs.com">
                  Swiper Studio
                </Link>
                <Link target="_blank" href="https://uiinitiative.com">
                  UI Initiative
                </Link>
                <Link
                  target="_blank"
                  href="https://uiinitiative.com/catalog/carousel-slider"
                >
                  Carousel Slider
                </Link>
                <Link
                  target="_blank"
                  href="https://uiinitiative.com/catalog/super-flow"
                >
                  Super Flow
                </Link>
                <Link
                  target="_blank"
                  href="https://uiinitiative.com/catalog/shaders-slider"
                >
                  Shaders Slider
                </Link>
                <Link
                  target="_blank"
                  href="https://uiinitiative.com/catalog/material-you-slider"
                >
                  Material You Slider
                </Link>
              </div>
            </div>
            <div className="flex flex-col gap-4 text-sm">
              <div>Support</div>
              <div className="flex flex-col gap-2">
                <Link target="_blank" href="https://opencollective.com/swiper">
                  Open Collective
                </Link>
                <Link target="_blank" href="https://patreon.com/swiperjs">
                  Patreon
                </Link>
                <Link href="/sponsors">Sponsors</Link>
              </div>
            </div>
          </div>
          <div className="text-on-surface-dark text-sm mt-8 flex flex-col gap-2">
            <div>
              All product names, logos and brands are property of their
              respective owners.
            </div>
            <div className="flex flex-col gap-2 sm:flex-row sm:justify-between sm:items-center">
              <div>
                Copyright © {new Date().getFullYear()} Swiper by{' '}
                <a href="https://nolimits4web.com" target="_blank">
                  <img
                    loading="lazy"
                    src="/images/n4w-logo.svg"
                    alt="nolimits4web"
                    className="inline-block size-6"
                  />
                </a>
              </div>
              <div className="flex items-center gap-2">
                <a
                  title="PaneFlow - Create Stunning Slideshows Visually. No Code Required"
                  href="https://paneflow.com"
                  target="_blank"
                >
                  <img
                    loading="lazy"
                    src="/images/projects/paneflow.svg"
                    alt="PaneFlow - Create Stunning Slideshows Visually. No Code Required"
                    className="inline-block size-6"
                  />
                </a>
                <a
                  title="t0ggles - Your ultimate multiple projects management tool"
                  href="https://t0ggles.com"
                  target="_blank"
                >
                  <img
                    loading="lazy"
                    src="/images/projects/t0ggles.svg"
                    alt="t0ggles - Your ultimate multiple projects management tool"
                    className="inline-block size-6"
                  />
                </a>
                <a
                  title="Swiper Studio - Create Beautiful And Responsive Sliders Without Writing Any Code"
                  href="https://studio.swiperjs.com"
                  target="_blank"
                >
                  <img
                    loading="lazy"
                    src="/images/projects/swiper-studio-logo.svg"
                    alt="Swiper Studio - Create Beautiful And Responsive Sliders Without Writing Any Code"
                    className="inline-block size-6"
                  />
                </a>
                <a
                  title="UI Initiative - Premium templates & plugins for Swiper and Framework7"
                  href="https://uiinitiative.com"
                  target="_blank"
                >
                  <img
                    loading="lazy"
                    src="/images/projects/uiinitiative.svg"
                    alt="UI Initiative - Premium templates & plugins for Swiper and Framework7"
                    className="inline-block size-6"
                  />
                </a>
                <a
                  title="Start Page HQ"
                  href="https://startpagehq.com"
                  target="_blank"
                >
                  <img
                    loading="lazy"
                    src="/images/projects/startpagehq.svg"
                    alt="Start Page HQ"
                    className="inline-block size-6"
                  />
                </a>
                <a
                  title="Fisper - Local AI Voice Dictation for macOS"
                  href="https://startpagehq.com"
                  target="_blank"
                >
                  <img
                    loading="lazy"
                    src="/images/projects/fisper.png"
                    alt="Fisper - Local AI Voice Dictation for macOS"
                    className="inline-block size-6"
                  />
                </a>
              </div>
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
