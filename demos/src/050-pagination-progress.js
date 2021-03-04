const defaultSettings = require('./default_settings');

module.exports = (mode = 'static') => ({
  ...defaultSettings,
  title: 'pagination progress',
  config: [
    {
      pagination: {
        type: 'progressbar',
      },
      navigation: true,
    },
  ],
});
