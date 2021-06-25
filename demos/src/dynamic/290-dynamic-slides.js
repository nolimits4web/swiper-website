const defaultSettings = require('../default_settings');

module.exports = (mode = 'core') => ({
  ...defaultSettings,
  title: 'Dynamic slides',
  styles: `
  ${defaultSettings.styles}

  .swiper-container{
    width: 100%;
    height: 300px;
    margin: 20px auto;
  }
  .append-buttons {
    text-align: center;
    margin-top: 20px;
  }

  .append-buttons button {
    display: inline-block;
    cursor: pointer;
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
  <Swiper #swiperRef>
    <SwiperSlide>Slide 1</SwiperSlide>
    <SwiperSlide>Slide 2</SwiperSlide>
    <SwiperSlide>Slide 3</SwiperSlide>
    <SwiperSlide>Slide 4</SwiperSlide>
  </Swiper>

  <p className="append-buttons">
  ${
    mode === 'core'
      ? `
    <button class="prepend-2-slides">Prepend 2 Slides</button>
    <button class="prepend-slide">Prepend Slide</button>
    <button class="append-slide">Append Slide</button>
    <button class="append-2-slides">Append 2 Slides</button>`
      : ''
  }

  ${
    mode === 'angular'
      ? `
  <button (click)="prepend2()" class="prepend-2-slides">Prepend 2 Slides</button>
  <button (click)="prepend()" class="prepend-slide">Prepend Slide</button>
  <button (click)="append()" class="append-slide">Append Slide</button>
  <button (click)="append2()" class="append-2-slides">Append 2 Slides</button>`
      : ''
  }
  ${
    mode === 'react'
      ? `
  <button onClick="{() => prepend2()}" className="prepend-2-slides">Prepend 2 Slides</button>
  <button onClick="{() => prepend()}" className="prepend-slide">Prepend Slide</button>
  <button onClick="{() => append()}" className="append-slide">Append Slide</button>
  <button onClick="{() => append2()}" className="append-2-slides">Append 2 Slides</button>`
      : ''
  }
  </p>
  `,
  config: [
    {
      slidesPerView: 3,
      centeredSlides: true,
      spaceBetween: 30,
      pagination: {
        type: 'fraction',
      },
      navigation: true,
    },
  ],
  script: {
    core: `
    var appendNumber = 4;
    var prependNumber = 1;
    document.querySelector('.prepend-2-slides').addEventListener('click', function (e) {
      e.preventDefault();
      swiper.prependSlide([
        '<div class="swiper-slide">Slide ' + (--prependNumber) + '</div>',
        '<div class="swiper-slide">Slide ' + (--prependNumber) + '</div>'
      ]);
    });
    document.querySelector('.prepend-slide').addEventListener('click', function (e) {
      e.preventDefault();
      swiper.prependSlide('<div class="swiper-slide">Slide ' + (--prependNumber) + '</div>');
    });
    document.querySelector('.append-slide').addEventListener('click', function (e) {
      e.preventDefault();
      swiper.appendSlide('<div class="swiper-slide">Slide ' + (++appendNumber) + '</div>');
    });
    document.querySelector('.append-2-slides').addEventListener('click', function (e) {
      e.preventDefault();
      swiper.appendSlide([
        '<div class="swiper-slide">Slide ' + (++appendNumber) + '</div>',
        '<div class="swiper-slide">Slide ' + (++appendNumber) + '</div>'
      ]);
    });
  `,
    angular: `
  @ViewChild('swiperRef', { static: false }) sliderRef?: SwiperComponent;

  appendNumber = 4;
  prependNumber = 1;

  prepend(){
    this.sliderRef.swiperRef.prependSlide('<div class="swiper-slide">Slide ' + (--this.prependNumber) + '</div>');
  }

  prepend2(){
    this.sliderRef.swiperRef.prependSlide([
      '<div class="swiper-slide">Slide ' + (--this.prependNumber) + '</div>',
      '<div class="swiper-slide">Slide ' + (--this.prependNumber) + '</div>'
    ]);
  }

  append(){
    this.sliderRef.swiperRef.appendSlide('<div class="swiper-slide">Slide ' + (++appendNumber) + '</div>');
  }

  append2(){
    this.sliderRef.swiperRef.appendSlide([
      '<div class="swiper-slide">Slide ' + (++this.appendNumber) + '</div>',
      '<div class="swiper-slide">Slide ' + (++this.appendNumber) + '</div>'
    ]);
  }
  `,
    react: `
  const [swiperRef, setSwiperRef] = useState(null);

  let appendNumber = 4;
  let prependNumber = 1;

  const prepend2 = () => {
    swiperRef.prependSlide([
      '<div class="swiper-slide">Slide ' + (--prependNumber) + '</div>',
      '<div class="swiper-slide">Slide ' + (--prependNumber) + '</div>'
    ]);
  }

  const prepend = () => {
    swiperRef.prependSlide('<div class="swiper-slide">Slide ' + (--prependNumber) + '</div>');
  }

  const append = () => {
    swiperRef.appendSlide('<div class="swiper-slide">Slide ' + (++appendNumber) + '</div>');
  }

  const append2 = () => {
    swiperRef.appendSlide([
      '<div class="swiper-slide">Slide ' + (++appendNumber) + '</div>',
      '<div class="swiper-slide">Slide ' + (++appendNumber) + '</div>'
    ]);
  }
  `,
  },
});
