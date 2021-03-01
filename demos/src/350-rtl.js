const default_settings = require('./default_settings');

module.exports = (mode = 'static') => ({
  ...default_settings,
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
