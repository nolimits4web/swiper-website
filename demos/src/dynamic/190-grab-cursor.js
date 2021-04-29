const defaultSettings = require('../default_settings');

module.exports = (mode = 'core') => ({
  ...defaultSettings,
  title: 'Grab cursor',
  config: [
    {
      slidesPerView: 4,
      centeredSlides: true,
      spaceBetween: 30,
      grabCursor: true,
      pagination: {
        clickable: true,
      },
    },
  ],
});
