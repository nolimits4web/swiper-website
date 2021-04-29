const defaultSettings = require('../default_settings');

module.exports = (mode = 'core') => ({
  ...defaultSettings,
  title: 'Effect cube',
  styles: `
  .swiper-container{
    width: 300px;
    height: 300px;
    position: absolute;
    left: 50%;
    top: 50%;
    margin-left: -150px;
    margin-top: -150px;
  }

  .swiper-slide {
    background-position: center;
    background-size: cover;
  }

  .swiper-slide img {
    display: block;
    width: 100%;
  }
  `,
  content: `<Swiper>
  ${Array.from({ length: 4 })
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
      effect: 'cube',
      grabCursor: true,
      cubeEffect: {
        shadow: true,
        slideShadows: true,
        shadowOffset: 20,
        shadowScale: 0.94,
      },
      pagination: true,
    },
  ],
});
