const { inlineStyles } = require('../templateUtils');
const defaultSettings = require('../default_settings');

module.exports = (mode = 'core') => ({
  ...defaultSettings,
  title: 'Thumbs gallery loop',
  styles: `
  ${defaultSettings.styles}

  body {
    background: #000;
    color: #000;
  }

  .swiper-container{
    width: 100%;
    height: 300px;
    margin-left: auto;
    margin-right: auto;
  }

  .swiper-slide {
    background-size: cover;
    background-position: center;
  }

  .mySwiper2 {
    height: 80%;
    width: 100%;
  }

  .mySwiper {
    height: 20%;
    box-sizing: border-box;
    padding: 10px 0;
  }

  .mySwiper .swiper-slide {
    width: 25%;
    height: 100%;
    opacity: 0.4;
  }

  .mySwiper .swiper-slide-thumb-active {
    opacity: 1;
  }

  .swiper-slide img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover
  }
  `,
  content: `
  <Swiper ${inlineStyles(mode, {
    '--swiper-navigation-color': '#fff',
    '--swiper-pagination-color': '#fff',
  })}>
  ${Array.from({ length: 10 })
    .map(
      (el, index) =>
        `<SwiperSlide><img src="https://swiperjs.com/demos/images/nature-${
          index + 1
        }.jpg" /></SwiperSlide>`
    )
    .join('')}
  </Swiper>
  <Swiper thumbsSlider>
  ${Array.from({ length: 10 })
    .map(
      (el, index) =>
        `<SwiperSlide><img src="https://swiperjs.com/demos/images/nature-${
          index + 1
        }.jpg" /></SwiperSlide>`
    )
    .join('')}
  </Swiper>`,
  config: [
    {
      loop: true,
      spaceBetween: 10,
      slidesPerView: 4,
      freeMode: true,
      watchSlidesVisibility: true,
      watchSlidesProgress: true,
    },
    {
      loop: true,
      spaceBetween: 10,
      navigation: true,
      thumbs: {
        swiper: 'swiperVar_',
      },
    },
  ],
  configReverseOrder: true,
});
