const defaultSettings = require('../default_settings');

module.exports = (mode = 'core') => ({
  ...defaultSettings,
  title: 'Scrollbar',
  config: [
    {
      scrollbar: {
        hide: true,
      },
    },
  ],
});
