const defaultSettings = require('../default_settings');

module.exports = (mode = 'core') => ({
  ...defaultSettings,
  title: 'Pagination dynamic',
  config: [
    {
      pagination: {
        dynamicBullets: true,
      },
    },
  ],
});
