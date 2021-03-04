const defaultSettings = require('./default_settings');

module.exports = (mode = 'static') => ({
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
