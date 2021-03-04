const defaultSettings = require('./default_settings');

module.exports = (mode = 'static') => ({
  ...defaultSettings,
  title: 'scrollbar',
  config: [
    {
      scrollbar: {
        hide: true,
      },
    },
  ],
});
