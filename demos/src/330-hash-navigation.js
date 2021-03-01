const default_settings = require('./default_settings');

module.exports = (mode = 'static') => ({
  ...default_settings,
  title: 'Hash navigation',
  content: `<Swiper>
  ${Array.from({ length: 9 })
    .map(
      (el, index) =>
        `<SwiperSlide data-hash="slide${index + 1}">Slide ${
          index + 1
        }</SwiperSlide>`
    )
    .join('')}
  </Swiper>`,
  config: [
    {
      spaceBetween: 30,
      hashNavigation: {
        watchState: true,
      },
      pagination: {
        clickable: true,
      },
      navigation: true,
    },
  ],
});
