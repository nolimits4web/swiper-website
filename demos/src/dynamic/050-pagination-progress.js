const defaultSettings = require('../default_settings');

module.exports = (mode = 'core') => ({
  ...defaultSettings,
  title: 'Pagination progress',
  config: [
    {
      pagination: {
        type: 'progressbar',
      },
      navigation: true,
    },
  ],
});
