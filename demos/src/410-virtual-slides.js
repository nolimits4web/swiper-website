const default_settings = require('./default_settings');

module.exports = (mode = 'static') => ({
  ...default_settings,
  title: 'Autoplay',
  styles: `
  ${default_settings.styles}

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
  <Swiper></Swiper>

  <p class="append-buttons">
    <a href="#" class="prepend-2-slides">Prepend 2 Slides</a>
    <a href="#" class="slide-1">Slide 1</a>
    <a href="#" class="slide-250">Slide 250</a>
    <a href="#" class="slide-500">Slide 500</a>
    <a href="#" class="append-slide">Append Slide</a>
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
  jsStatic: `
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
});
