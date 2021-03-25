const defaultSettings = require('./default_settings');

module.exports = (mode = 'static') => ({
  ...defaultSettings,
  title: 'Pagination',
  config: [
    {
      pagination: true,
    },
  ],
});
