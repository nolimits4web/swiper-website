const defaultSettings = require('./default_settings');

module.exports = (mode = 'static') => ({
  ...defaultSettings,
  title: 'Slideable menu',
  skip: mode !== 'static',
  config: [
    {
      direction: 'vertical',
      slidesPerView: 1,
      spaceBetween: 30,
      mousewheel: true,
      pagination: {
        clickable: true,
      },
    },
  ],
});
