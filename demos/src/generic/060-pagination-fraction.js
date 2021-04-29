const defaultSettings = require('../default_settings');

module.exports = (mode = 'core') => ({
  ...defaultSettings,
  title: 'Pagination fraction',
  config: [
    {
      pagination: {
        type: 'fraction',
      },
      navigation: true,
    },
  ],
});
