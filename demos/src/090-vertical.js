const defaultSettings = require('./default_settings');

module.exports = (mode = 'static') => ({
  ...defaultSettings,
  title: 'vertical',
  config: [
    {
      direction: 'vertical',
      pagination: {
        clickable: true,
      },
    },
  ],
});
