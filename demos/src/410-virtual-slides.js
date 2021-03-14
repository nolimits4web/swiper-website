const defaultSettings = require('./default_settings');

module.exports = (mode = 'static') => ({
  ...defaultSettings,
  title: 'Autoplay',
  styles: `
  ${defaultSettings.styles}

  .swiper-container {
    width: 100%;
    height: 300px;
    margin: 20px auto;
  }
  .append-buttons {
    text-align: center;
    margin-top: 20px;
  }

  .append-buttons a {
    display: inline-block;
    border: 1px solid #007aff;
    color: #007aff;
    text-decoration: none;
    padding: 4px 10px;
    border-radius: 4px;
    margin: 0 10px;
    font-size: 13px;
  }
  `,
  content: `
  <Swiper #swiperRef></Swiper>

  <p class="append-buttons">
  ${
    mode === 'static' &&
    `
    <a href="#" class="prepend-2-slides">Prepend 2 Slides</a>
    <a href="#" class="prepend-slide">Prepend Slide</a>
    <a href="#" class="append-slide">Append Slide</a>
    <a href="#" class="append-2-slides">Append 2 Slides</a>
    `
  }

  ${
    mode === 'angular' &&
    `
  <a href="#" (click)="prepend()" class="prepend-2-slides">Prepend 2 Slides</a>
  <a href="#" (click)="prepend()" class="prepend-slide">Prepend Slide</a>
  <a href="#" (click)="append()" class="append-slide">Append Slide</a>
  <a href="#" (click)="append()" class="append-2-slides">Append 2 Slides</a>`
  }
  </p>
  `,
  config: [
    {
      slidesPerView: 3,
      centeredSlides: true,
      spaceBetween: 30,
      pagination: {
        clickable: true,
      },
      navigation: true,
    },
  ],
  script: {
    static: `
  var appendNumber = 600;
  var prependNumber = 1;
  document.querySelector('.slide-1').addEventListener('click', function (e) {
    e.preventDefault();
    swiper.slideTo(0, 0);
  });
  document.querySelector('.slide-250').addEventListener('click', function (e) {
    e.preventDefault();
    swiper.slideTo(249, 0);
  });
  document.querySelector('.slide-500').addEventListener('click', function (e) {
    e.preventDefault();
    swiper.slideTo(499, 0);
  });
  document.querySelector('.prepend-2-slides').addEventListener('click', function (e) {
    e.preventDefault();
    swiper.virtual.prependSlide([
      'Slide ' + (--prependNumber),
      'Slide ' + (--prependNumber)
    ]);
  });
  document.querySelector('.append-slide').addEventListener('click', function (e) {
    e.preventDefault();
    swiper.virtual.appendSlide('Slide ' + (++appendNumber));
  });
  `,
    angular: `
  @ViewChild('sliderRef', { static: false }) sliderRef?: SwiperComponent;

  appendNumber = 600;
  prependNumber = 1;

  prepend(){
    this.sliderRef.swiperRef.virtual.prependSlide('Slide ' + (--this.prependNumber));
  }

  prepend2(){
    this.sliderRef.swiperRef.virtual.prependSlide([
      'Slide ' + (--this.prependNumber),
      'Slide ' + (--this.prependNumber)
    ]);
  }

  append(){
    this.sliderRef.swiperRef.virtual.appendSlide('Slide ' + (++this.appendNumber));
  }

  append2(){
    this.sliderRef.swiperRef.virtual.appendSlide([
      'Slide ' + (++this.prependNumber),
      'Slide ' + (++this.prependNumber)
    ]);
  }
  `,
  },
});
