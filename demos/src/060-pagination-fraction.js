const defaultSettings = require('./default_settings');

module.exports = (mode = 'static') => ({
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
