const linkClassName = '!underline hover:!no-underline !text-[inherit]';

export default function BlackFridayRibbon() {
  return (
    <div className="flex min-h-[54px] items-center justify-center bg-surface-1 px-4 py-2 text-sm font-medium sm:px-6 lg:px-8 xl:px-10 border border-outline backdrop-blur-lg backdrop-saturate-200 rounded-full">
      <div className="text-center">
        🔥 Black Friday: 50% OFF until November 30 on{' '}
        <a className={linkClassName} href="https://uiinitiative.com" target="_blank">
          UI Initiative
        </a>
        ,{' '}
        <a className={linkClassName} href="https://studio.swiperjs.com" target="_blank">
          Swiper Studio
        </a>
        ,{' '}
        <a className={linkClassName} href="https://paneflow.com" target="_blank">
          PaneFlow
        </a>
        ,{' '}
        <a className={linkClassName} href="https://t0ggles.com" target="_blank">
          t0ggles
        </a>{' '}
        and{' '}
        <a className={linkClassName} href="https://startpagehq.com" target="_blank">
          Start Page HQ
        </a>{' '}
        🔥
      </div>
    </div>
  );
}
