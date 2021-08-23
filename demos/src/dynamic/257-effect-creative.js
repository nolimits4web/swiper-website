const defaultSettings = require('../default_settings');

module.exports = (mode = 'core') => ({
  ...defaultSettings,
  title: 'Effect creative',
  styles: `
  body {
    font-family: Helvetica Neue, Helvetica, Arial, sans-serif;
    font-size: 14px;
    color: #000;
    margin: 0;
    padding: 0;
  }

  .swiper {
    margin: 100px auto;
    width: 320px;
    height: 240px;
  }

  .swiper-slide {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 22px;
    font-weight: bold;
    color: #fff;
  }

  .swiper-slide:nth-child(1n) {
    background-color: rgb(206, 17, 17);
  }

  .swiper-slide:nth-child(2n) {
    background-color: rgb(0, 140, 255);
  }

  .swiper-slide:nth-child(3n) {
    background-color: rgb(10, 184, 111);
  }

  .swiper-slide:nth-child(4n) {
    background-color: rgb(211, 122, 7);
  }

  .swiper-slide:nth-child(5n) {
    background-color: rgb(118, 163, 12);
  }

  .swiper-slide:nth-child(6n) {
    background-color: rgb(180, 10, 47);
  }

  .swiper-slide:nth-child(7n) {
    background-color: rgb(35, 99, 19);
  }

  .swiper-slide:nth-child(8n) {
    background-color: rgb(0, 68, 255);
  }

  .swiper-slide:nth-child(9n) {
    background-color: rgb(218, 12, 218);
  }

  .swiper-slide:nth-child(10n) {
    background-color: rgb(54, 94, 77);
  }
  `,
  content: `
  ${Array.from({ length: 6 })
    .map(
      (_, pIndex) => `
    <Swiper>
    ${Array.from({ length: 9 })
      .map((_, index) => `<SwiperSlide>Slide ${index + 1}</SwiperSlide>`)
      .join('')}
    </Swiper>`
    )
    .join('')}
    `,
  config: [
    {
      grabCursor: true,
      effect: 'creative',
      creativeEffect: {
        prev: {
          shadow: true,
          translate: [0, 0, -400],
        },
        next: {
          translate: ['100%', 0, 0],
        },
      },
    },
    {
      grabCursor: true,
      effect: 'creative',
      creativeEffect: {
        prev: {
          shadow: true,
          translate: ['-120%', 0, -500],
        },
        next: {
          shadow: true,
          translate: ['120%', 0, -500],
        },
      },
    },
    {
      grabCursor: true,
      effect: 'creative',
      creativeEffect: {
        prev: {
          shadow: true,
          translate: ['-20%', 0, -1],
        },
        next: {
          translate: ['100%', 0, 0],
        },
      },
    },
    {
      grabCursor: true,
      effect: 'creative',
      creativeEffect: {
        prev: {
          shadow: true,
          translate: [0, 0, -800],
          rotate: [180, 0, 0],
        },
        next: {
          shadow: true,
          translate: [0, 0, -800],
          rotate: [-180, 0, 0],
        },
      },
    },
    {
      grabCursor: true,
      effect: 'creative',
      creativeEffect: {
        prev: {
          shadow: true,
          translate: ['-125%', 0, -800],
          rotate: [0, 0, -90],
        },
        next: {
          shadow: true,
          translate: ['125%', 0, -800],
          rotate: [0, 0, 90],
        },
      },
    },
    {
      grabCursor: true,
      effect: 'creative',
      creativeEffect: {
        prev: {
          shadow: true,
          origin: 'left center',
          translate: ['-5%', 0, -200],
          rotate: [0, 100, 0],
        },
        next: {
          origin: 'right center',
          translate: ['5%', 0, -200],
          rotate: [0, -100, 0],
        },
      },
    },
  ],
});
