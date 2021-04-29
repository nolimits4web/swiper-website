const defaultSettings = require('../default_settings');

module.exports = (mode = 'core') => ({
  ...defaultSettings,
  title: 'Effect fade',
  styles: `
  .swiper-container{
    width: 100%;
    height: 100%;
  }

  .swiper-slide {
    background-position: center;
    background-size: cover;
  }

  .swiper-slide img {
    display: block;
    width: 100%;
  }
  `,
  content: `<Swiper>
  ${Array.from({ length: 4 })
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
      spaceBetween: 30,
      effect: 'fade',
      navigation: true,
      pagination: { clickable: true },
    },
  ],
});
