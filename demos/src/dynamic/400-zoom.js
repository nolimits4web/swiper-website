const { inlineStyles } = require('../templateUtils');
const defaultSettings = require('../default_settings');

module.exports = (mode = 'core') => ({
  ...defaultSettings,
  title: 'Zoom',
  globalStyles: `
  ${defaultSettings.globalStyles}

  body{
    background: #000;
  }
  `,
  styles: `
  .swiper-container{
    width: 100%;
    height: 100%;
  }

  .swiper-slide {
    overflow: hidden;
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
          <div className="swiper-zoom-container">
            <img src="https://swiperjs.com/demos/images/nature-${
              index + 1
            }.jpg" />
          </div>
        </SwiperSlide>`
    )
    .join('')}
  </Swiper>`,
  config: [
    {
      zoom: true,
      navigation: true,
      pagination: {
        clickable: true,
      },
    },
  ],
});
