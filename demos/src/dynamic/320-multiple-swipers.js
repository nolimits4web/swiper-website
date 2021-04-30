const defaultSettings = require('../default_settings');

module.exports = (mode = 'core') => ({
  ...defaultSettings,
  title: 'Multiple swipers',
  styles: `
  ${defaultSettings.styles}

  body {
    background: #eee;
  }

  .swiper-container {
    width: 100%;
    height: 300px;
    margin: 20px 0;
  }
  `,
  content: `<Swiper>
  ${Array.from({ length: 9 })
    .map((el, index) => `<SwiperSlide>Slide ${index + 1}</SwiperSlide>`)
    .join('')}
  </Swiper>`.repeat(3),
  config: [
    {
      spaceBetween: 30,
      pagination: {
        clickable: true,
      },
    },
    {
      spaceBetween: 30,
      pagination: {
        clickable: true,
      },
    },
    {
      spaceBetween: 30,
      pagination: {
        clickable: true,
      },
    },
  ],
});
