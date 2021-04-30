const defaultSettings = require('../default_settings');

module.exports = (mode = 'core') => ({
  ...defaultSettings,
  title: 'Watch slides visiblity',
  styles: `
  .swiper-container{
    width: 800px;
  }
  .swiper-slide {
    height: 300px;
    background: #882525;
    line-height: 300px;
    text-align: center;
  }
  .swiper-slide:nth-child(2){
    background: #8acc7d;
  }
  .swiper-slide:nth-child(3){
    background: #b7cc7d;
  }
  .swiper-slide:nth-child(4){
    background: #9eb75c;
  }
  .swiper-slide:nth-child(5){
    background: #7da8cc;
  }
  .swiper-slide:nth-child(6){
    background: #96cc7d;
  }
  .swiper-slide:nth-child(7){
    background: #cc7dae;
  }
  `,
  content: `
  <h3>Slider5 is visible when you slide to 2,3, or 4, and slider5 has "swiper-slide-visible" className</h3> <br>
  ${defaultSettings.content}
  `,
  config: [
    {
      watchSlidesProgress: true,
      watchSlidesVisibility: true,
      slidesPerView: 3,
    },
  ],
});
