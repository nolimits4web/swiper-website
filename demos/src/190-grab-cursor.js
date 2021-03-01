const default_settings = require('./default_settings');

module.exports = (mode = 'static') => ({
  ...default_settings,
  title: 'Grab cursor',
  config: [
    {
      slidesPerView: 4,
      centeredSlides: true,
      spaceBetween: 30,
      grabCursor: true,
      pagination: {
        clickable: true,
      },
    },
  ],
});
