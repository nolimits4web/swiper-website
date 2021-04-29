const defaultSettings = require('../default_settings');

module.exports = (mode = 'core') => ({
  ...defaultSettings,
  title: 'Virtual slides',
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
  <Swiper #swiperRef></Swiper>

  <p className="append-buttons">
  ${
    mode === 'core'
      ? `
    <button class="prepend-2-slides">Prepend 2 Slides</button>
    <button class="slide-1">Slide 1</button>
    <button class="slide-250">Slide 250</button>
    <button class="slide-500">Slide 500</button>
    <button class="append-slide">Append Slide</button>`
      : ''
  }

  ${
    mode === 'angular'
      ? `
  <button (click)="prepend()" class="prepend-2-slides">Prepend 2 Slides</button>
  <button (click)="slideTo(1)" class="slide-1">Slide 1</button>
  <button (click)="slideTo(250)" class="slide-250">Slide 250</button>
  <button (click)="slideTo(500)" class="slide-500">Slide 500</button>
  <button (click)="append()" class="append-slide">Append Slide</button>`
      : ''
  }
  ${
    mode === 'react'
      ? `
  <button onClick="{() => prepend()}" className="prepend-2-slides">Prepend 2 Slides</button>
  <button onClick="{() => slideTo(1)}" className="prepend-slide">Slide 1</button>
  <button onClick="{() => slideTo(250)}" className="slide-250">Slide 250</button>
  <button onClick="{() => slideTo(500)}" className="slide-500">Slide 500</button>
  <button onClick="{() => append()}" className="append-slides">Append Slide</button>`
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
      virtual: {
        slides: `(function () {
          var slides = [];
          for (var i = 0; i < 600; i += 1) {
            slides.push('Slide ' + (i + 1));
          }
          return slides;
        })()`,
      },
    },
  ],
  script: {
    core: `
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
  @ViewChild('swiperRef', { static: false }) swiperRef?: SwiperComponent;

  appendNumber = 600;
  prependNumber = 1;

  prepend(){
    this.swiperRef.swiperRef.virtual.prependSlide([
      'Slide ' + (--this.prependNumber),
      'Slide ' + (--this.prependNumber)
    ]);
  }

  append(){
    this.swiperRef.swiperRef.virtual.appendSlide('Slide ' + (++this.appendNumber));
  }

  slideTo(index: number){
    this.swiperRef.swiperRef.slideTo(index - 1, 0);
  }
  `,
    react: `
const swiperRef = useRef(null);

let appendNumber = 600;
let prependNumber = 1;

const prepend = () => {
  swiperRef.current.swiper.virtual.prependSlide([
    'Slide ' + (--prependNumber),
    'Slide ' + (--prependNumber)
  ]);
}

const append = () => {
  swiperRef.current.swiper.virtual.appendSlide('Slide ' + (++appendNumber));
}

const slideTo = (index) => {
  swiperRef.current.slideTo(index - 1, 0);
}
`,
  },
});
