export default function CladdBanner({ className }) {
  return (
    <a
      className={`group flex min-h-14 py-2 items-center justify-center bg-surface-1 !text-on-surface !no-underline rounded-full border border-outline text-sm font-normal px-2 pr-4 sm:px-4 gap-2 backdrop-blur-lg leading-snug backdrop-saturate-200 shrink min-w-0 w-fit ${className || ''}`}
      href="https://cladd.io"
      target="_blank"
    >
      <span className="absolute inset-0 bg-white/10 rounded-full opacity-0 group-hover:opacity-100 duration-200 group-active:opacity-50"></span>
      <img
        src="/images/projects/cladd.svg"
        alt="Cladd"
        className="h-6 w-6 relative"
      />
      <div className="shrink min-w-0">
        <span className="opacity-75">From Swiper authors: </span>
        Cladd — A React UI kit for building actual apps
      </div>
    </a>
  );
}
