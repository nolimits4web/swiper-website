const defaultSettings = require('../default_settings');

module.exports = (mode = 'core') => ({
  ...defaultSettings,
  title: 'Slides per group skip',
  styles: `
  .swiper-container{
    width: 100%;
    height: 100%;
  }

  .swiper-slide {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: relative;
  }

  .swiper-slide img {
    display: block;
    width: 100%;
  }

  @media only screen and (min-width: 769px) {
    .swiper-slide:first-child {
      transition: transform 100ms;
    }

    .swiper-slide:first-child img {
      transition: box-shadow 500ms;
    }

    .swiper-slide.swiper-slide-active:first-child {
      transform: translateX(50%);
      z-index: 2;
    }

    .swiper-slide.swiper-slide-active:first-child img {
      box-shadow: 0px 32px 80px rgba(0, 0, 0, 0.35);
    }

    .swiper-slide:nth-child(2) {
      transition: transform 100ms;
    }

    .swiper-slide.swiper-slide-next:nth-child(2) {
      transform: translateX(55%);
      z-index: 1;
    }

    .swiper-container[dir=rtl] .swiper-slide.swiper-slide-active:first-child {
      transform: translateX(-50%);
    }

    .swiper-container[dir=rtl] .swiper-slide.swiper-slide-next:nth-child(2) {
      transform: translateX(-55%);
    }
  }
  `,
  content: `<Swiper>
  <SwiperSlide><img src="https://cdn.magloft.com/github/swiper/images/page-001.jpg" /></SwiperSlide>
  <SwiperSlide><img src="https://cdn.magloft.com/github/swiper/images/page-002.jpg" /></SwiperSlide>
  <SwiperSlide><img src="https://cdn.magloft.com/github/swiper/images/page-003.jpg" /></SwiperSlide>
  <SwiperSlide><img src="https://cdn.magloft.com/github/swiper/images/page-004.jpg" /></SwiperSlide>
  <SwiperSlide><img src="https://cdn.magloft.com/github/swiper/images/page-005.jpg" /></SwiperSlide>
  <SwiperSlide><img src="https://cdn.magloft.com/github/swiper/images/page-006.jpg" /></SwiperSlide>
  <SwiperSlide><img src="https://cdn.magloft.com/github/swiper/images/page-007.jpg" /></SwiperSlide>
  <SwiperSlide><img src="https://cdn.magloft.com/github/swiper/images/page-008.jpg" /></SwiperSlide>
  <SwiperSlide><img src="https://cdn.magloft.com/github/swiper/images/page-009.jpg" /></SwiperSlide>
  </Swiper>`,
  config: [
    {
      slidesPerView: 1,
      centeredSlides: false,
      slidesPerGroupSkip: 1,
      grabCursor: true,
      keyboard: { enabled: true },
      breakpoints: { 769: { slidesPerView: 2, slidesPerGroup: 2 } },
      scrollbar: true,
      navigation: true,
      pagination: { clickable: true },
    },
  ],
});
