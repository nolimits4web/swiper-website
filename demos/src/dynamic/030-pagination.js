const defaultSettings = require('../default_settings');

module.exports = (mode = 'core') => ({
  ...defaultSettings,
  title: 'Pagination',
  config: [
    {
      pagination: true,
    },
  ],
});
