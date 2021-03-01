const default_settings = require('./default_settings');

module.exports = (mode = 'static') => ({
  ...default_settings,
  title: 'Inifinite loop with slides per group',
  config: [
    {
      slidesPerView: 3,
      spaceBetween: 30,
      slidesPerGroup: 3,
      loop: true,
      loopFillGroupWithBlank: true,
      pagination: {
        clickable: true,
      },
      navigation: true,
    },
  ],
});
