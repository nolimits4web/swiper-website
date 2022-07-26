import Atropos from 'atropos/react';
import { trackOutbound } from 'src/shared/track-outbound';

const SwiperStudioBanner = () => {
  return (
    <div className="my-8">
      <Atropos
        component="a"
        highlight
        href="https://studio.swiperjs.com"
        target="_blank"
        className="mx-auto block"
        rotateTouch="scroll-y"
        rotateXMax={5}
        rotateYMax={5}
        onClick={() => trackOutbound('https://studio.swiperjs.com')}
        innerClassName="rounded-2xl"
      >
        <img
          src="/images/swiper-studio-banner.jpg"
          alt="UI Initiative"
          className="rounded-2xl dark:border dark:border-white dark:border-opacity-5"
        />
      </Atropos>
    </div>
  );
};

export default SwiperStudioBanner;
