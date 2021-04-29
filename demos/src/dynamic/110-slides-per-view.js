const defaultSettings = require('../default_settings');

module.exports = (mode = 'core') => ({
  ...defaultSettings,
  title: 'Slides per view',
  config: [
    {
      slidesPerView: 3,
      spaceBetween: 30,
      pagination: {
        clickable: true,
      },
    },
  ],
});
