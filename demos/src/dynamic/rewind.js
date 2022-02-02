const defaultSettings = require('../default_settings');

module.exports = (mode = 'core') => ({
  ...defaultSettings,
  title: 'Rewind',
  config: [
    {
      rewind: true,
      navigation: true,
    },
  ],
});
