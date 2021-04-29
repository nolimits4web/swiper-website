const defaultSettings = require('../default_settings');

module.exports = (mode = 'core') => ({
  ...defaultSettings,
  title: 'Nested',
  styles: `
  ${defaultSettings.styles}

  .swiper-container-v {
    background: #eee;
  }
  `,
  content: `
  <Swiper className="swiper-container-h">
      <SwiperSlide>Horizontal Slide 1</SwiperSlide>
      <SwiperSlide>
        <Swiper className="swiper-container-v">
          <SwiperSlide>Vertical Slide 1</SwiperSlide>
          <SwiperSlide>Vertical Slide 2</SwiperSlide>
          <SwiperSlide>Vertical Slide 3</SwiperSlide>
          <SwiperSlide>Vertical Slide 4</SwiperSlide>
          <SwiperSlide>Vertical Slide 5</SwiperSlide>
        </Swiper>
      </SwiperSlide>
      <SwiperSlide>Horizontal Slide 3</SwiperSlide>
      <SwiperSlide>Horizontal Slide 4</SwiperSlide>
  </Swiper>`,
  config: [
    {
      spaceBetween: 50,
      pagination: {
        clickable: true,
      },
    },
    {
      direction: 'vertical',
      spaceBetween: 50,
      pagination: {
        clickable: true,
      },
    },
  ],
});
