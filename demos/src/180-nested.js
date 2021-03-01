const default_settings = require('./default_settings');

module.exports = (mode = 'static') => ({
  ...default_settings,
  title: 'Slides per column',
  styles: `
  ${default_settings.styles}

  .swiper-container-v {
    background: #eee;
  }
  `,
  content: `
  <Swiper class="swiper-container-h">
      <SwiperSlide>Horizontal Slide 1</SwiperSlide>
      <SwiperSlide>
        <Swiper class="swiper-container-v">
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
      __el: '.swiper-container-h',
      spaceBetween: 50,
      pagination: {
        el: mode === 'static' ? '.swiper-pagination-h' : undefined,
        clickable: true,
      },
    },
    {
      __el: '.swiper-container-v',
      direction: 'vertical',
      spaceBetween: 50,
      pagination: {
        el: mode === 'static' ? '.swiper-pagination-v' : undefined,
        clickable: true,
      },
    },
  ],
});
