const defaultSettings = require('./default_settings');

module.exports = (mode = 'static') => ({
  ...defaultSettings,
  title: 'Freemode',
  config: [
    {
      slidesPerView: 3,
      spaceBetween: 30,
      freeMode: true,
      pagination: {
        clickable: true,
      },
    },
  ],
});
