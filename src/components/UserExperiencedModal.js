import { useEffect } from 'react';

export default function UserExperiencedModal({ open, onClose }) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-label="User Experienced newsletter"
    >
      <div
        className="fixed inset-0 bg-black/85 backdrop-blur-md animate-[fadeIn_200ms_ease-out]"
        onClick={onClose}
      />

      <div
        className="relative min-h-full flex items-center justify-center p-3 sm:p-6 lg:p-8"
        onClick={onClose}
      >
        <div
          className="relative w-full max-w-2xl bg-black border border-outline rounded-3xl overflow-hidden flex flex-col animate-[fadeInUp_280ms_cubic-bezier(0.2,0.8,0.2,1)]"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="px-2 py-2 flex justify-end">
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="z-20 inline-flex items-center justify-center size-10 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md text-on-surface duration-200 active:opacity-50"
            >
              <svg
                width="14"
                height="14"
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

          <div className="">
            <iframe
              src="https://uxed.substack.com/embed"
              frameborder="0"
              scrolling="no"
              className="bg-white w-full h-90"
            ></iframe>
          </div>

          {/* Footer strip */}
          <div className=" p-4 flex items-center justify-between gap-4 text-xs sm:text-sm">
            <a
              href="https://uxed.substack.com"
              target="_blank"
              rel="noopener"
              className="group inline-flex items-center gap-2.5 !text-on-surface !no-underline hover:!text-primary duration-200 min-w-0"
            >
              <img
                src="/images/projects/uxd-logo-red.png"
                alt=""
                className="size-6 -my-2 rounded shrink-0"
              />
              <span className="font-medium">User Experienced</span>

              <span className="text-on-surface-darker group-hover:text-primary duration-200">
                ↗
              </span>
            </a>
            <div className="hidden sm:flex items-center gap-2 text-on-surface-darker shrink-0">
              <span>co-curated by</span>
              <img
                src="/images/swiper-logo.svg"
                alt="Swiper"
                className="size-5"
              />
              <span className="text-on-surface-dark">Swiper authors</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
