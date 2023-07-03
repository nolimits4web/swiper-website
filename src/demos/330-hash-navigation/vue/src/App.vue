<template>
  <swiper
    :spaceBetween="30"
    :hashNavigation="{
      watchState: true,
    }"
    :pagination="{
      clickable: true,
    }"
    :navigation="true"
    :modules="modules"
    class="mySwiper"
  >
    <swiper-slide data-hash="slide1">Slide 1</swiper-slide
    ><swiper-slide data-hash="slide2">Slide 2</swiper-slide
    ><swiper-slide data-hash="slide3">Slide 3</swiper-slide
    ><swiper-slide data-hash="slide4">Slide 4</swiper-slide
    ><swiper-slide data-hash="slide5">Slide 5</swiper-slide
    ><swiper-slide data-hash="slide6">Slide 6</swiper-slide
    ><swiper-slide data-hash="slide7">Slide 7</swiper-slide
    ><swiper-slide data-hash="slide8">Slide 8</swiper-slide
    ><swiper-slide data-hash="slide9">Slide 9</swiper-slide>
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
