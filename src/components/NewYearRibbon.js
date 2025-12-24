export default function BlackFridayRibbon() {
  return (
    <div className="flex min-h-[54px] items-center  justify-center bg-surface-1 px-4 py-2 text-sm font-medium sm:px-6 lg:px-8 xl:px-10 border border-outline backdrop-blur-lg backdrop-saturate-200 rounded-full">
      <div className="text-center">
        🎄 New Year Sale: 50% OFF on{' '}
        <a
          className="!underline hover:!no-underline !text-[inherit]"
          href="https://uiinitiative.com"
          target="_blank"
        >
          UI Initiative
        </a>
        ,{' '}
        <a
          className="!underline hover:!no-underline !text-[inherit]"
          href="https://studio.swiperjs.com"
          target="_blank"
        >
          Swiper Studio
        </a>
        ,{' '}
        <a
          className="!underline hover:!no-underline !text-[inherit]"
          href="https://paneflow.com"
          target="_blank"
        >
          PaneFlow
        </a>{' '}
        and{' '}
        <a
          className="!underline hover:!no-underline !text-[inherit]"
          href="https://t0ggles.com"
          target="_blank"
        >
          t0ggles
        </a>{' '}
        🎄
      </div>
    </div>
  );
}
