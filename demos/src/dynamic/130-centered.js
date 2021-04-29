const defaultSettings = require('../default_settings');

module.exports = (mode = 'core') => ({
  ...defaultSettings,
  title: 'Centered',
  config: [
    {
      slidesPerView: 4,
      spaceBetween: 30,
      centeredSlides: true,
      pagination: {
        clickable: true,
      },
    },
  ],
});
