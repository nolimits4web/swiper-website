const defaultSettings = require('./default_settings');

module.exports = (mode = 'static') => ({
  ...defaultSettings,
  title: 'Custom plugin',
  // skip: mode !== 'static',
  skip: true,
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
