const defaultSettings = require('./default_settings');

module.exports = (mode = 'static') => ({
  ...defaultSettings,
  title: 'pagination dynamic',
  config: [
    {
      pagination: {
        dynamicBullets: true,
      },
    },
  ],
});
