const default_settings = require('./default_settings');

module.exports = (mode = 'static') => ({
  ...default_settings,
  title: 'CSS mode',
  config: [
    {
      cssMode: true,
      navigation: true,
      pagination: true,
      mousewheel: true,
      keyboard: true,
    },
  ],
});
