const defaultSettings = require('./default_settings');

module.exports = (mode = 'static') => ({
  ...defaultSettings,
  title: 'Vertical',
  config: [
    {
      direction: 'vertical',
      pagination: {
        clickable: true,
      },
    },
  ],
});
