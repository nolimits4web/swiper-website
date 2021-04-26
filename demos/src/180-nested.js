const defaultSettings = require('./default_settings');

module.exports = (mode = 'static') => ({
  ...defaultSettings,
  title: 'Nested',
  styles: `
  ${defaultSettings.styles}

  .swiper-container-horizontal-v {
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
      __el: '.swiper-container-horizontal-h',
      spaceBetween: 50,
      pagination: {
        el: mode === 'static' ? '.swiper-pagination-h' : undefined,
        clickable: true,
      },
    },
    {
      __el: '.swiper-container-horizontal-v',
      direction: 'vertical',
      spaceBetween: 50,
      pagination: {
        el: mode === 'static' ? '.swiper-pagination-v' : undefined,
        clickable: true,
      },
    },
  ],
});
