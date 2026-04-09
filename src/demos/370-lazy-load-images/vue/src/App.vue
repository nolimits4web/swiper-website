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
        src="https://swiperjs.com/demos/images/abstract-1.jpg"
        loading="lazy"
      />
      <div
        class="swiper-lazy-preloader swiper-lazy-preloader-white"
      ></div> </swiper-slide
    ><swiper-slide>
      <img
        src="https://swiperjs.com/demos/images/abstract-2.jpg"
        loading="lazy"
      />
      <div
        class="swiper-lazy-preloader swiper-lazy-preloader-white"
      ></div> </swiper-slide
    ><swiper-slide>
      <img
        src="https://swiperjs.com/demos/images/abstract-3.jpg"
        loading="lazy"
      />
      <div
        class="swiper-lazy-preloader swiper-lazy-preloader-white"
      ></div> </swiper-slide
    ><swiper-slide>
      <img
        src="https://swiperjs.com/demos/images/abstract-4.jpg"
        loading="lazy"
      />
      <div
        class="swiper-lazy-preloader swiper-lazy-preloader-white"
      ></div> </swiper-slide
    ><swiper-slide>
      <img
        src="https://swiperjs.com/demos/images/abstract-5.jpg"
        loading="lazy"
      />
      <div
        class="swiper-lazy-preloader swiper-lazy-preloader-white"
      ></div> </swiper-slide
    ><swiper-slide>
      <img
        src="https://swiperjs.com/demos/images/abstract-6.jpg"
        loading="lazy"
      />
      <div
        class="swiper-lazy-preloader swiper-lazy-preloader-white"
      ></div> </swiper-slide
    ><swiper-slide>
      <img
        src="https://swiperjs.com/demos/images/abstract-7.jpg"
        loading="lazy"
      />
      <div
        class="swiper-lazy-preloader swiper-lazy-preloader-white"
      ></div> </swiper-slide
    ><swiper-slide>
      <img
        src="https://swiperjs.com/demos/images/abstract-8.jpg"
        loading="lazy"
      />
      <div
        class="swiper-lazy-preloader swiper-lazy-preloader-white"
      ></div> </swiper-slide
    ><swiper-slide>
      <img
        src="https://swiperjs.com/demos/images/abstract-9.jpg"
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

  import 'swiper/css/pagination';
  import 'swiper/css/navigation';

  import './style.css';

  // import required modules
  import { Pagination, Navigation } from 'swiper/modules';

  export default {
    components: {
      Swiper,
      SwiperSlide,
    },
    setup() {
      return {
        modules: [Pagination, Navigation],
      };
    },
  };
</script>
