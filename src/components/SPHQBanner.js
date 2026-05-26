export default function SPHQBanner({ className }) {
  return (
    <a
      className={`group flex h-14 items-center justify-center bg-surface-1 !text-on-surface !no-underline rounded-full border border-outline text-sm font-normal px-2 pr-4 sm:px-4 gap-2 backdrop-blur-lg leading-snug backdrop-saturate-200 shrink min-w-0 w-fit ${className || ''}`}
      href="https://startpagehq.com"
      target="_blank"
    >
      <span className="absolute inset-0 bg-white/10 rounded-full opacity-0 group-hover:opacity-100 duration-200 group-active:opacity-50"></span>
      <img
        src="/images/projects/startpagehq.svg"
        alt="PaneFlow"
        className="h-6 w-6 relative"
      />
      <div className="shrink min-w-0">
        <span className="opacity-75">From Swiper authors: </span>
        Start Page HQ - turn your new tab into a personal dashboard
      </div>
    </a>
  );
}
