const default_settings = require('./default_settings');

module.exports = (mode = 'static') => ({
  ...default_settings,
  title: 'Inifinite loop',
  styles: `
  ${default_settings.styles}

  .swiper-container {
    margin-left: auto;
    margin-right: auto;
  }
  `,
  config: [
    {
      slidesPerView: 1,
      spaceBetween: 30,
      loop: true,
      pagination: {
        clickable: true,
      },
      navigation: true,
    },
  ],
});
