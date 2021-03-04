const defaultSettings = require('./default_settings');

module.exports = (mode = 'static') => ({
  ...defaultSettings,
  title: 'Watch slides visiblity',
  skip: mode !== 'static',
  styles: `
  .swiper-slide {
    height: 300px;
    background: #882525;
    line-height: 300px;
    text-align: center;
  }
  `,
  content: `
  <h3>Slider5 is visible when you slide to 2,3, or 4, and slider5 has "swiper-slide-visible" className</h3> <br>
  ${defaultSettings.content}
  `,
  config: [
    {
      watchSlidesProgress: true,
      watchSlidesVisibility: true,
      slidesPerView: 3,
    },
  ],
});
