// t0ggles - Next-Gen Project Management
export default function TogglesBanner() {
  return (
    <a
      className="group flex h-10 items-center justify-center bg-surface-1 !text-on-surface-dark  !no-underline rounded-full border border-outline text-xs font-medium px-2 gap-2 leading-none whitespace-nowrap backdrop-blur-lg backdrop-saturate-200 shrink min-w-0 w-fit"
      href="https://t0ggles.com"
      target="_blank"
    >
      <span className="absolute inset-0 bg-white/10 rounded-full opacity-0 group-hover:opacity-100 duration-200 group-active:opacity-50"></span>
      <img
        src="/images/projects/t0ggles.svg"
        alt="t0ggles"
        className="h-6 w-6 relative"
      />
      <div className="shrink min-w-0 relative text-ellipsis overflow-hidden">
        <span className="hidden sm:inline">t0ggles: </span>Next-Gen Project
        Management
      </div>
    </a>
  );
}
