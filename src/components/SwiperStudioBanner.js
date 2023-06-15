import Atropos from 'atropos/react';

const SwiperStudioBanner = () => {
  return (
    <div className="px-4 pt-4">
      <Atropos
        highlight
        className="mx-auto"
        rotateTouch="scroll-y"
        rotateXMax={5}
        rotateYMax={5}
        innerClassName="rounded-3xl"
        eventsEl=".swiper-studio-card"
      >
        <img
          src="/images/swiper-studio-banner.jpg"
          alt="UI Initiative"
          className="rounded-3xl"
        />
      </Atropos>
    </div>
  );
};

export default SwiperStudioBanner;
