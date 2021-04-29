const defaultSettings = require('../default_settings');

module.exports = (mode = 'core') => ({
  ...defaultSettings,
  title: 'Mousewheel control',
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
