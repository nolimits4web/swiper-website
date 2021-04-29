const { inlineStyles } = require('../templateUtils');
const defaultSettings = require('../default_settings');

module.exports = (mode = 'core') => ({
  ...defaultSettings,
  title: 'Lazy load images',
  styles: `

  .swiper-container{
    width: 100%;
    height: 100%;
  }

  .swiper-slide {
    text-align: center;
    font-size: 18px;
    background: #000;

  }

  .swiper-slide img {
    width: auto;
    height: auto;
    max-width: 100%;
    max-height: 100%;
    -ms-transform: translate(-50%, -50%);
    -webkit-transform: translate(-50%, -50%);
    -moz-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    position: absolute;
    left: 50%;
    top: 50%;
  }
  `,
  content: `
  <Swiper ${inlineStyles(mode, {
    '--swiper-navigation-color': '#fff',
    '--swiper-pagination-color': '#fff',
  })}>
  ${Array.from({ length: 9 })
    .map(
      (el, index) =>
        `<SwiperSlide>
          <!-- Required swiper-lazy class and image source specified in data-src attribute -->
          <img data-src="https://swiperjs.com/demos/images/nature-${
            index + 1
          }.jpg" className="swiper-lazy">
          <!-- Preloader image -->
          <div className="swiper-lazy-preloader swiper-lazy-preloader-white"></div>
        </SwiperSlide>`
    )
    .join('')}
  </Swiper>`,
  config: [
    {
      lazy: true,
      pagination: {
        clickable: true,
      },
      navigation: true,
    },
  ],
});
