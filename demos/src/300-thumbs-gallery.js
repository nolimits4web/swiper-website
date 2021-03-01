const default_settings = require('./default_settings');

module.exports = (mode = 'static') => ({
  ...default_settings,
  title: 'Thumbs gallery',
  skip: true,
  config: [
    {
      direction: 'vertical',
      slidesPerView: 1,
      spaceBetween: 30,
      mousewheel: true,
      pagination: {
        clickable: true,
      },
    },
  ],
});
