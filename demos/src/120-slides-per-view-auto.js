const default_settings = require('./default_settings');

module.exports = (mode = 'static') => ({
  ...default_settings,
  title: 'Slides per view auto',
  styles: `


  .swiper-slide {
    text-align: center;
    font-size: 18px;
    background: #fff;
    width: 80%;

    /* Center slide text vertically */
    display: -webkit-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    -webkit-justify-content: center;
    justify-content: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    -webkit-align-items: center;
    align-items: center;
  }

  .swiper-slide:nth-child(2n) {
    width: 60%;
  }

  .swiper-slide:nth-child(3n) {
    width: 40%;
  }
  `,
  config: [
    {
      slidesPerView: 'auto',
      spaceBetween: 30,
      pagination: {
        clickable: true,
      },
    },
  ],
});
