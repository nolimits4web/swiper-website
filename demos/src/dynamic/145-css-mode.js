const defaultSettings = require('../default_settings');

module.exports = (mode = 'core') => ({
  ...defaultSettings,
  title: 'CSS mode',
  config: [
    {
      cssMode: true,
      navigation: true,
      pagination: true,
      mousewheel: true,
      keyboard: true,
    },
  ],
});
