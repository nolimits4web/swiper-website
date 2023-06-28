<template>
  <swiper
    :style="{
      '--swiper-navigation-color': '#fff',
      '--swiper-pagination-color': '#fff',
    }"
    :zoom="true"
    :navigation="true"
    :pagination="{
      clickable: true,
    }"
    :modules="modules"
    class="mySwiper"
  >
    <swiper-slide>
      <div class="swiper-zoom-container">
        <img src="https://swiperjs.com/demos/images/nature-1.jpg" />
      </div> </swiper-slide
    ><swiper-slide>
      <div class="swiper-zoom-container">
        <img src="https://swiperjs.com/demos/images/nature-2.jpg" />
      </div> </swiper-slide
    ><swiper-slide>
      <div class="swiper-zoom-container">
        <img src="https://swiperjs.com/demos/images/nature-3.jpg" />
      </div> </swiper-slide
    ><swiper-slide>
      <div class="swiper-zoom-container">
        <img src="https://swiperjs.com/demos/images/nature-4.jpg" />
      </div> </swiper-slide
    ><swiper-slide>
      <div class="swiper-zoom-container">
        <img src="https://swiperjs.com/demos/images/nature-5.jpg" />
      </div> </swiper-slide
    ><swiper-slide>
      <div class="swiper-zoom-container">
        <img src="https://swiperjs.com/demos/images/nature-6.jpg" />
      </div> </swiper-slide
    ><swiper-slide>
      <div class="swiper-zoom-container">
        <img src="https://swiperjs.com/demos/images/nature-7.jpg" />
      </div> </swiper-slide
    ><swiper-slide>
      <div class="swiper-zoom-container">
        <img src="https://swiperjs.com/demos/images/nature-8.jpg" />
      </div> </swiper-slide
    ><swiper-slide>
      <div class="swiper-zoom-container">
        <img src="https://swiperjs.com/demos/images/nature-9.jpg" />
      </div>
    </swiper-slide>
  </swiper>
</template>
<script>
  // Import Swiper Vue.js components
  import { Swiper, SwiperSlide } from 'swiper/vue';

  // Import Swiper styles
  import 'swiper/css';

  import 'swiper/css/zoom';
  import 'swiper/css/navigation';
  import 'swiper/css/pagination';

  import './style.css';

  // import required modules
  import { Zoom, Navigation, Pagination } from 'swiper/modules';

  export default {
    components: {
      Swiper,
      SwiperSlide,
    },
    setup() {
      return {
        modules: [Zoom, Navigation, Pagination],
      };
    },
  };
</script>
