<template>
  <swiper
    :style="{
      '--swiper-navigation-color': '#fff',
      '--swiper-pagination-color': '#fff',
    }"
    :lazy="true"
    :pagination="{
      clickable: true,
    }"
    :navigation="true"
    :modules="modules"
    class="mySwiper"
  >
    <swiper-slide>
      <img
        src="https://swiperjs.com/demos/images/nature-1.jpg"
        loading="lazy"
      />
      <div
        class="swiper-lazy-preloader swiper-lazy-preloader-white"
      ></div> </swiper-slide
    ><swiper-slide>
      <img
        src="https://swiperjs.com/demos/images/nature-2.jpg"
        loading="lazy"
      />
      <div
        class="swiper-lazy-preloader swiper-lazy-preloader-white"
      ></div> </swiper-slide
    ><swiper-slide>
      <img
        src="https://swiperjs.com/demos/images/nature-3.jpg"
        loading="lazy"
      />
      <div
        class="swiper-lazy-preloader swiper-lazy-preloader-white"
      ></div> </swiper-slide
    ><swiper-slide>
      <img
        src="https://swiperjs.com/demos/images/nature-4.jpg"
        loading="lazy"
      />
      <div
        class="swiper-lazy-preloader swiper-lazy-preloader-white"
      ></div> </swiper-slide
    ><swiper-slide>
      <img
        src="https://swiperjs.com/demos/images/nature-5.jpg"
        loading="lazy"
      />
      <div
        class="swiper-lazy-preloader swiper-lazy-preloader-white"
      ></div> </swiper-slide
    ><swiper-slide>
      <img
        src="https://swiperjs.com/demos/images/nature-6.jpg"
        loading="lazy"
      />
      <div
        class="swiper-lazy-preloader swiper-lazy-preloader-white"
      ></div> </swiper-slide
    ><swiper-slide>
      <img
        src="https://swiperjs.com/demos/images/nature-7.jpg"
        loading="lazy"
      />
      <div
        class="swiper-lazy-preloader swiper-lazy-preloader-white"
      ></div> </swiper-slide
    ><swiper-slide>
      <img
        src="https://swiperjs.com/demos/images/nature-8.jpg"
        loading="lazy"
      />
      <div
        class="swiper-lazy-preloader swiper-lazy-preloader-white"
      ></div> </swiper-slide
    ><swiper-slide>
      <img
        src="https://swiperjs.com/demos/images/nature-9.jpg"
        loading="lazy"
      />
      <div class="swiper-lazy-preloader swiper-lazy-preloader-white"></div>
    </swiper-slide>
  </swiper>
</template>
<script>
  // Import Swiper Vue.js components
  import { Swiper, SwiperSlide } from 'swiper/vue';

  // Import Swiper styles
  import 'swiper/css';

  import 'swiper/css/lazy';
  import 'swiper/css/pagination';
  import 'swiper/css/navigation';

  import './style.css';

  // import required modules
  import { Lazy, Pagination, Navigation } from 'swiper';

  export default {
    components: {
      Swiper,
      SwiperSlide,
    },
    setup() {
      return {
        modules: [Lazy, Pagination, Navigation],
      };
    },
  };
</script>
