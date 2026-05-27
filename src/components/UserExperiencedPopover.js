import { useEffect, useState } from 'react';

const STORAGE_KEY = 'uxd_popover_dismissed';
const SHOW_DELAY_MS = 4000;
const MIN_WIDTH = 1024;

export default function UserExperiencedPopover() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.innerWidth < MIN_WIDTH) return;
    try {
      if (localStorage.getItem(STORAGE_KEY) === '1') return;
    } catch (e) {
      // ignore storage errors
    }
    const timer = setTimeout(() => {
      if (window.innerWidth >= MIN_WIDTH) {
        setVisible(true);
        if (typeof window !== 'undefined' && window.gtag) {
          window.gtag('event', 'uxd_popover_show', {
            event_category: 'newsletter',
            event_label: 'auto_popover',
          });
        }
      }
    }, SHOW_DELAY_MS);
    return () => clearTimeout(timer);
  }, []);

  const dismiss = () => {
    setVisible(false);
    try {
      localStorage.setItem(STORAGE_KEY, '1');
    } catch (e) {
      // ignore storage errors
    }
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'uxd_popover_dismiss', {
        event_category: 'newsletter',
        event_label: 'auto_popover',
      });
    }
  };

  if (!visible) return null;

  return (
    <div
      className="hidden lg:block fixed bottom-4 right-4 z-[90] w-90 rounded-2xl overflow-hidden bg-white shadow-2xl animate-[fadeInUp_280ms_cubic-bezier(0.2,0.8,0.2,1)] text-black"
      role="dialog"
      aria-label="User Experienced newsletter"
    >
      <div className="flex items-center justify-end px-3 py-2 border-b border-outline">
        <button
          type="button"
          onClick={dismiss}
          aria-label="Close"
          className="inline-flex items-center justify-center size-7 rounded-full bg-black/5 hover:bg-black/15 text-black duration-200 active:opacity-50 cursor-pointer "
        >
          <svg
            width="10"
            height="10"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M3 3L13 13M13 3L3 13"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </div>
      <div className="px-7 pt-0 flex flex-col gap-0 items-start  ">
        <a
          href="https://uxed.substack.com"
          target="_blank"
          rel="noopener"
          className="mb-4"
        >
          <img
            src="/images/projects/uxd-logo-red.png"
            alt=""
            className="size-12 rounded shrink-0"
          />
        </a>
        <div className="text-lg font-medium leading-tight mb-2">
          Subscribe to the <br />
          User Experienced
        </div>

        <div className="text-sm">
          Subscribe for weekly web, app, and logo design inspiration.
        </div>
      </div>
      <div className="px-4 ">
        <iframe
          src="https://uxed.substack.com/embed"
          frameBorder="0"
          scrolling="no"
          className="bg-white w-full h-37 block"
          title="Subscribe to User Experienced"
        ></iframe>
      </div>
      <div className="flex items-center gap-1 text-black/75 shrink-0 justify-end text-xs py-3 px-7 border-t border-black/10">
        <span>co-curated by</span>
        <img src="/images/swiper-logo.svg" alt="Swiper" className="size-4" />
        <span className="text-black">Swiper authors</span>
      </div>
    </div>
  );
}
