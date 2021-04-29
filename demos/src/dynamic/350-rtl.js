const defaultSettings = require('../default_settings');

module.exports = (mode = 'core') => ({
  ...defaultSettings,
  title: 'RTL',
  content: `<Swiper dir="rtl">
  ${Array.from({ length: 9 })
    .map((el, index) => `<SwiperSlide>Slide ${index + 1}</SwiperSlide>`)
    .join('')}
  </Swiper>`,
  config: [
    {
      navigation: true,
      pagination: {
        clickable: true,
      },
    },
  ],
});
