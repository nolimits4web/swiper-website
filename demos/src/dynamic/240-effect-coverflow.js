const defaultSettings = require('../default_settings');

module.exports = (mode = 'core') => ({
  ...defaultSettings,
  title: 'Effect coverflow',
  styles: `
  .swiper-container{
    width: 100%;
    padding-top: 50px;
    padding-bottom: 50px;
  }

  .swiper-slide {
    background-position: center;
    background-size: cover;
    width: 300px;
    height: 300px;

  }

  .swiper-slide img {
    display: block;
    width: 100%;
  }
  `,
  content: `<Swiper>
  ${Array.from({ length: 9 })
    .map(
      (el, index) =>
        `<SwiperSlide><img src="https://swiperjs.com/demos/images/nature-${
          index + 1
        }.jpg" /></SwiperSlide>`
    )
    .join('')}
  </Swiper>`,
  config: [
    {
      effect: 'coverflow',
      grabCursor: true,
      centeredSlides: true,
      slidesPerView: 'auto',
      coverflowEffect: {
        rotate: 50,
        stretch: 0,
        depth: 100,
        modifier: 1,
        slideShadows: true,
      },
      pagination: true,
    },
  ],
});
