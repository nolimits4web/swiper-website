const defaultSettings = require('../default_settings');

module.exports = (mode = 'core') => ({
  ...defaultSettings,
  title: 'Effect flip',
  styles: `
  .swiper-container{
    width: 300px;
    height: 300px;
    padding: 50px;
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
  ${Array.from({ length: 6 })
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
      effect: 'flip',
      grabCursor: true,
      pagination: true,
      navigation: true,
    },
  ],
});
