const { inlineStyles } = require('../templateUtils');
const defaultSettings = require('../default_settings');

module.exports = (mode = 'core') => ({
  ...defaultSettings,
  title: 'Parallax',
  styles: `

  .swiper-container{
    width: 100%;
    height: 100%;
    background: #000;
  }

  .swiper-slide {
    font-size: 18px;
    color: #fff;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    padding: 40px 60px;
  }

  .parallax-bg {
    position: absolute;
    left: 0;
    top: 0;
    width: 130%;
    height: 100%;
    -webkit-background-size: cover;
    background-size: cover;
    background-position: center;
  }

  .swiper-slide .title {
    font-size: 41px;
    font-weight: 300;
  }

  .swiper-slide .subtitle {
    font-size: 21px;
  }

  .swiper-slide .text {
    font-size: 14px;
    max-width: 400px;
    line-height: 1.3;
  }
  `,
  content: `
  <Swiper ${inlineStyles(mode, {
    '--swiper-navigation-color': '#fff',
    '--swiper-pagination-color': '#fff',
  })}>
  <div slot="container-start" className="parallax-bg" ${inlineStyles(mode, {
    'background-image': 'url(https://swiperjs.com/demos/images/nature-1.jpg)',
  })} data-swiper-parallax="-23%"></div>
  ${Array.from({ length: 3 })
    .map(
      (el, index) =>
        `<SwiperSlide>
          <div className="title" data-swiper-parallax="-300">Slide ${
            index + 1
          }</div>
          <div className="subtitle" data-swiper-parallax="-200">Subtitle</div>
          <div className="text" data-swiper-parallax="-100">
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam dictum mattis velit, sit amet faucibus
              felis iaculis nec. Nulla laoreet justo vitae porttitor porttitor. Suspendisse in sem justo. Integer laoreet
              magna nec elit suscipit, ac laoreet nibh euismod. Aliquam hendrerit lorem at elit facilisis rutrum. Ut at
              ullamcorper velit. Nulla ligula nisi, imperdiet ut lacinia nec, tincidunt ut libero. Aenean feugiat non eros
              quis feugiat.</p>
          </div>
        </SwiperSlide>`
    )
    .join('')}
  </Swiper>`,
  config: [
    {
      speed: 600,
      parallax: true,
      pagination: {
        clickable: true,
      },
      navigation: true,
    },
  ],
});
