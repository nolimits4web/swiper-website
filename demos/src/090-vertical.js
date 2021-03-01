const default_settings = require('./default_settings');

module.exports = (mode = 'static') => ({
  ...default_settings,
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
