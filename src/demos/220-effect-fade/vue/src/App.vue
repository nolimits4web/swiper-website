<template>
  <swiper
    :spaceBetween="30"
    :effect="'fade'"
    :navigation="true"
    :pagination="{
      clickable: true,
    }"
    :modules="modules"
    class="mySwiper"
  >
    <swiper-slide
      ><img
        src="https://swiperjs.com/demos/images/nature-1.jpg" /></swiper-slide
    ><swiper-slide
      ><img
        src="https://swiperjs.com/demos/images/nature-2.jpg" /></swiper-slide
    ><swiper-slide
      ><img
        src="https://swiperjs.com/demos/images/nature-3.jpg" /></swiper-slide
    ><swiper-slide
      ><img src="https://swiperjs.com/demos/images/nature-4.jpg"
    /></swiper-slide>
  </swiper>
</template>
<script>
  // Import Swiper Vue.js components
  import { Swiper, SwiperSlide } from 'swiper/vue';

  // Import Swiper styles
  import 'swiper/css';

  import 'swiper/css/effect-fade';
  import 'swiper/css/navigation';
  import 'swiper/css/pagination';

  import './style.css';

  // import required modules
  import { EffectFade, Navigation, Pagination } from 'swiper/modules';

  export default {
    components: {
      Swiper,
      SwiperSlide,
    },
    setup() {
      return {
        modules: [EffectFade, Navigation, Pagination],
      };
    },
  };
</script>
