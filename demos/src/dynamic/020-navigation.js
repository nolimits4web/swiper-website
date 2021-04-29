const defaultSettings = require('../default_settings');

module.exports = (mode = 'core') => ({
  ...defaultSettings,
  title: 'Navigation',
  config: [
    {
      navigation: true,
    },
  ],
});
