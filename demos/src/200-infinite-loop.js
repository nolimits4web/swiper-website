const defaultSettings = require('./default_settings');

module.exports = (mode = 'static') => ({
  ...defaultSettings,
  title: 'Inifinite loop',
  styles: `
  ${defaultSettings.styles}

  .swiper-container-horizontal {
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
