const defaultSettings = require('./default_settings');

module.exports = (mode = 'static') => ({
  ...defaultSettings,
  title: 'Navigation',
  config: [
    {
      navigation: true,
    },
  ],
});
