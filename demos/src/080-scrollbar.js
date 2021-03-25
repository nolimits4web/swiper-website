const defaultSettings = require('./default_settings');

module.exports = (mode = 'static') => ({
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
