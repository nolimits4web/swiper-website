export default function SwiperStudioBanner({ className }) {
  return (
    <a
      className={`group flex h-14 items-center justify-center bg-surface-1 !text-on-surface !no-underline rounded-full border border-outline text-sm font-normal px-2 pr-4 sm:px-4 gap-2 leading-none whitespace-nowrap backdrop-blur-lg backdrop-saturate-200 shrink min-w-0 w-fit ${className || ''}`}
      href="https://studio.swiperjs.com"
      target="_blank"
    >
      <span className="absolute inset-0 bg-white/10 rounded-full opacity-0 group-hover:opacity-100 duration-200 group-active:opacity-50"></span>
      <img
        src="/images/projects/swiper-studio-logo.svg"
        alt="PaneFlow"
        className="h-6 w-6 relative"
      />
      <div className="shrink min-w-0 relative text-ellipsis overflow-hidden flex items-center">
        All-new Swiper Studio V2 is here with a 50%-off launch offer
      </div>
    </a>
  );
}
