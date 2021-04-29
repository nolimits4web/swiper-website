const defaultSettings = require('../default_settings');

module.exports = (mode = 'core') => ({
  ...defaultSettings,
  title: 'Slides per view auto',
  styles: `
  ${defaultSettings.styles}

  .swiper-slide {
    width: 80%;
  }

  .swiper-slide:nth-child(2n) {
    width: 60%;
  }

  .swiper-slide:nth-child(3n) {
    width: 40%;
  }
  `,
  config: [
    {
      slidesPerView: 'auto',
      spaceBetween: 30,
      pagination: {
        clickable: true,
      },
    },
  ],
});
