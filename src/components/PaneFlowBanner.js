export default function PaneFlowBanner() {
  return (
    <a
      className="group flex min-h-[64px] items-center justify-center bg-[#121212] text-[#C27FFF] hover:no-underline "
      href="https://paneflow.com"
      target="_blank"
    >
      <div className="mx-auto flex max-w-[90rem] items-center justify-center px-4 py-2 text-center text-sm font-semibold group-hover:opacity-70 sm:px-6 lg:px-8 xl:px-10">
        <img
          src="/images/projects/paneflow.svg"
          alt="PaneFlow"
          className="mr-2 inline-block h-10 w-10"
        />
        <div>
          Meet PaneFlow:{' '}
          <span className="underline">
            Build Stunning Slideshows Visually. No Code Required
          </span>{' '}
        </div>
      </div>
    </a>
  );
}
