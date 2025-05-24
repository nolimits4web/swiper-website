import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
      <div className="bg-surface-glass border-outline border rounded-3xl p-8 mb-4">
        <div className="flex flex-wrap grid-cols-4 gap-4 sm:grid">
          <div className="flex flex-col gap-4 min-w-40">
            <Link href="/">
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
        <div className="text-on-surface-darker text-sm mt-8">
          <div>
            All product names, logos and brands are property of their respective
            owners.
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
  );
}
