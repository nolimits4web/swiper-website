const defaultSettings = require('../default_settings');

module.exports = (mode = 'core') => ({
  ...defaultSettings,
  title: 'Infinite loop',
  styles: `
  ${defaultSettings.styles}

  .swiper-container{
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
