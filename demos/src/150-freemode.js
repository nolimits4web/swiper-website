const default_settings = require('./default_settings');

module.exports = (mode = 'static') => ({
  ...default_settings,
  title: 'Freemode',
  config: [
    {
      slidesPerView: 3,
      spaceBetween: 30,
      freeMode: true,
      pagination: {
        clickable: true,
      },
    },
  ],
});
