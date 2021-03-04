const defaultSettings = require('./default_settings');

module.exports = (mode = 'static') => ({
  ...defaultSettings,
  title: 'pagination',
  config: [
    {
      pagination: true,
    },
  ],
});
