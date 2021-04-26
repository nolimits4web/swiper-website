const defaultSettings = require('./default_settings');

module.exports = (mode = 'static') => ({
  ...defaultSettings,
  title: 'Autoheight',
  styles: `
  .swiper-container-horizontal {
    width: 100%;
    height: auto;
  }

  .swiper-slide {
    text-align: center;
    font-size: 18px;
    background: #fff;

  }

  .swiper-container-horizontal .swiper-slide {
    height: 300px;
    line-height: 300px;
  }

  .swiper-container-horizontal .swiper-slide:nth-child(2n) {
    height: 500px;
    line-height: 500px;
  }
  `,
  config: [
    {
      autoHeight: true, //enable auto height
      spaceBetween: 20,
      navigation: true,
      pagination: {
        clickable: true,
      },
    },
  ],
});