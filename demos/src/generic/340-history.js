const defaultSettings = require('../default_settings');

module.exports = (mode = 'core') => ({
  ...defaultSettings,
  title: 'History',
  content: `<Swiper>
  ${Array.from({ length: 9 })
    .map(
      (el, index) =>
        `<SwiperSlide data-history="${index % 2 !== 0 ? `Slide ` : ''}${
          index + 1
        }">Slide ${index + 1}</SwiperSlide>`
    )
    .join('')}
  </Swiper>`,
  config: [
    {
      spaceBetween: 50,
      slidesPerView: 1,
      navigation: true,
      pagination: true,
      history: {
        key: 'slide',
      },
    },
  ],
});
