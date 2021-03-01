const default_settings = require('./default_settings');

module.exports = (mode = 'static') => ({
  ...default_settings,
  title: 'Slides per view',
  config: [
    {
      slidesPerView: 3,
      spaceBetween: 30,
      pagination: {
        clickable: true,
      },
    },
  ],
});
