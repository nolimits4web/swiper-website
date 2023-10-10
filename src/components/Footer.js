export default function Footer() {
  return (
    <footer className="border-t border-outline-variant px-4 py-8 text-center sm:px-6 lg:px-8 xl:px-10">
      <div className="mx-auto max-w-5xl">
        <div className="text-on-surface-variant">
          {new Date().getFullYear()} © Swiper by{' '}
          <a href="https://nolimits4web.com" target="_blank">
            <img
              src="/images/n4w-logo.svg"
              alt="nolimits4web"
              className="inline-block h-12 w-12"
            />
          </a>
        </div>
      </div>
    </footer>
  );
}
