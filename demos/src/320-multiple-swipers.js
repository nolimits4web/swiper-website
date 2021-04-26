const defaultSettings = require('./default_settings');

module.exports = (mode = 'core') => ({
  ...defaultSettings,
  title: 'Multiple swipers',
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
