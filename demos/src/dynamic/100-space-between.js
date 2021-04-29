const defaultSettings = require('../default_settings');

module.exports = (mode = 'core') => ({
  ...defaultSettings,
  title: 'Space between',
  config: [
    {
      spaceBetween: 30,
      pagination: {
        clickable: true,
      },
    },
  ],
});
