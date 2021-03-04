const defaultSettings = require('./default_settings');

module.exports = (mode = 'static') => ({
  ...defaultSettings,
  title: 'navigation',
  config: [
    {
      navigation: true,
    },
  ],
});
