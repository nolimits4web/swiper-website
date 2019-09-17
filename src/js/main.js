import $ from 'dom7';

if ($('.header-swiper-front').length) {
  var swiperFront = new Swiper('.header-swiper-front', {
    slidesPerView: 'auto',
    centeredSlides: true,
    spaceBetween: 100,
    effect: 'coverflow',
    speed: 600,
    coverflowEffect: {
      slideShadows: true
    },
    pagination: {
      el: '.header-swiper-front .swiper-pagination',
      clickable: true,
    },
    navigation: {
      nextEl: '.header-swiper-front .swiper-button-next',
      prevEl: '.header-swiper-front .swiper-button-prev',
    },
    keyboard: true,
    a11y: true,
    on: {
      slideChange: function () {
        var s = this;
        if (s.activeIndex === $('.swiper-slide-gallery').index()) {
          $(s.el).find('.swiper-pagination').hide();
        }
        else {
          $(s.el).find('.swiper-pagination').show();
        }
      }
    }
  });

  var galleryTopSwiper = new Swiper('.swiper-gallery-top', {
    slidesPerView: 1,
    spaceBetween: 10,
    nested:true,
    resistanceRatio: 0,
    preloadImages: false,
    lazy: true,
  });
  var galleryThumbsSwiper = new Swiper('.swiper-gallery-thumbs', {
    slidesPerView: 5,
    spaceBetween: 10,
    centeredSlides: true,
    touchRatio: 0.2,
    slideToClickedSlide: true,
    nested:true,
    resistanceRatio: 0,
  });
  galleryTopSwiper.controller.control = galleryThumbsSwiper;
  galleryThumbsSwiper.controller.control = galleryTopSwiper;
}

// Demos
var iframeTimeout;
function lazyLoadDemos() {
  $('.demo').each(function (index) {
    var frameHolder = $(this).find('.demo-iframe');
    if (frameHolder.hasClass('loaded')) return;
    var frame = frameHolder.find('iframe');
    var src = frame.attr('data-src');
    var offsetTop = frameHolder.offset().top;
    if (offsetTop + frameHolder.height() < 0) {
      return;
    }
    if (offsetTop < (window.innerHeight + 50)) {
      frameHolder.addClass('loaded');
      frame.attr('src', src);
    }
  });
}
if ($('.demo').length > 0) {
  $('.demo').each(function () {
    var t = $(this);
    var demoFile = t.find('iframe').attr('data-src');
    t.find('.demo-link-new-window').attr('href', demoFile);
    t.find('.demo-link-source').attr('href', 'https://github.com/nolimits4web/Swiper/blob/master/demos/' + demoFile);
  });
  $(window).on('scroll resize', function () {
    clearTimeout(iframeTimeout);
    iframeTimeout = setTimeout(function () {
      lazyLoadDemos();
    }, 500);
  });
  lazyLoadDemos();
}

// GH Stars/Forks
function fetchGitStats(local) {
  if (local) {
    if (localStorage.getItem('swiper-git-stats-stars')) {
      $('.gh-stars span').html(localStorage.getItem('swiper-git-stats-stars'));
    }
    if (localStorage.getItem('swiper-git-stats-forks')) {
      $('.gh-forks span').html(localStorage.getItem('swiper-git-stats-forks'));
    }
    return;
  }
  if (window.fetch) {
    window.fetch('https://api.github.com/repos/nolimits4web/swiper')
      .then(res => res.json())
      .then((data) => {
        if (!data) return;
        localStorage.setItem('swiper-git-stats-date', new Date().getTime());
        if (data.stargazers_count) {
          const stars = data.stargazers_count.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
          localStorage.setItem('swiper-git-stats-stars', stars);
          $('.gh-stars span').html(stars);
        }
        if (data.forks) {
          const forks = data.forks.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
          localStorage.setItem('swiper-git-stats-forks', forks);
          $('.gh-forks span').html(forks);
        }
      });
  }
}
const gitStatsDate = localStorage.getItem('swiper-git-stats-date');
if (gitStatsDate && (new Date().getTime() - gitStatsDate * 1) < 1000 * 60 * 60) {
  fetchGitStats(true);
} else {
  fetchGitStats();
}
