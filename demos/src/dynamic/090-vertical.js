const defaultSettings = require('../default_settings');

module.exports = (mode = 'core') => ({
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
