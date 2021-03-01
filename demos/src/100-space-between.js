const default_settings = require('./default_settings');

module.exports = (mode = 'static') => ({
  ...default_settings,
  title: 'Space between',
  config: [
    {
      spaceBetween: 30,
      pagination: {
        clickable: true,
      },
    },
  ],
});
