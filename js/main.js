;(function(){
    function lazyLoadImages() {
        var st = $(window).scrollTop();
        $('img.lazy').each(function(){
            var img = $(this);
            if (img.attr('src')) return;
            if (img.offset().top < $(window).height() + st) {
                img.attr('src', img.data('src'));
            }
        });
    }
    if ($('img.lazy').length > 0) {
        $(window).scroll(function(){
            lazyLoadImages();
        });
    }
    if (window.hljs) {
        hljs.configure({tabReplace: '    '});
        hljs.initHighlightingOnLoad();
    }

    if ($('.header-swiper-front').length) {
      // Header swipers
      var swiperBack2 = new Swiper('.header-swiper-back-2', {
          slidesPerView: 'auto',
          centeredSlides: true,
          spaceBetween: 100,
          onlyExternal: true,
          effect: 'coverflow',
          direction: 'vertical',
          speed: 600,
          coverflowEffect: {
              slideShadows: false
          }
      });
      var swiperBack1 = new Swiper('.header-swiper-back-1', {
          slidesPerView: 'auto',
          centeredSlides: true,
          spaceBetween: 300,
          effect: 'coverflow',
          speed: 600,
          coverflowEffect: {
              slideShadows: false
          }
      });
      
      var swiperFront = new Swiper('.header-swiper-front', {
          slidesPerView: 'auto',
          centeredSlides: true,
          spaceBetween: 100,
          effect: 'coverflow',
          speed: 600,
          coverflowEffect: {
              slideShadows: false
          },
          pagination: {
              el: '.header-swiper-front .swiper-pagination',
              clickable: true,
          },
          navigation: {
              nextEl: '.header-swiper-front .swiper-button-next',
              prevEl: '.header-swiper-front .swiper-button-prev',
          },
          controller: {
              control: [swiperBack1, swiperBack2],
              by: 'container',
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

    // FB
    $('body').prepend('<div id="fb-root"></div>');
    (function(d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s); js.id = id;
      js.src = "//connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.5&appId=129338113911206";
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
    // TW
    (function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'http':'https';if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=p+'://platform.twitter.com/widgets.js';fjs.parentNode.insertBefore(js,fjs);}})(document, 'script', 'twitter-wjs');
    // G+
    (function() {
        var po = document.createElement('script'); po.type = 'text/javascript'; po.async = true;
        po.src = 'https://apis.google.com/js/platform.js';
        var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(po, s);
    })();

    // Demos
    var iframeTimeout;
    function lazyLoadDemos() {
        $('.demo').each(function () {
            var frameHolder = $(this).find('.demo-iframe');
            if (frameHolder.hasClass('loaded')) return;
            var frame = frameHolder.find('iframe');
            var src = frame.attr('data-src');
            if (frameHolder.offset().top + frameHolder.height() < $(window).scrollTop()) {
              return;
            }
            if (frameHolder.offset().top < ($(window).scrollTop() + $(window).height() + 50)) {
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
})();
