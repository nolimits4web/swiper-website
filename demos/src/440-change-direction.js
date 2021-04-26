const defaultSettings = require('./default_settings');

module.exports = (mode = 'core') => ({
  ...defaultSettings,
  title: 'Change direction',
  // skip: mode !== 'core',
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
