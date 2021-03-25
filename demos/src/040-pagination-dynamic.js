const defaultSettings = require('./default_settings');

module.exports = (mode = 'static') => ({
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
