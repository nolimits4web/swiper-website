<template>
  <swiper
    :spaceBetween="50"
    :slidesPerView="1"
    :navigation="true"
    :pagination="true"
    :history="{
      key: 'slide',
    }"
    :modules="modules"
    class="mySwiper"
  >
    <swiper-slide data-history="1">Slide 1</swiper-slide
    ><swiper-slide data-history="Slide 2">Slide 2</swiper-slide
    ><swiper-slide data-history="3">Slide 3</swiper-slide
    ><swiper-slide data-history="Slide 4">Slide 4</swiper-slide
    ><swiper-slide data-history="5">Slide 5</swiper-slide
    ><swiper-slide data-history="Slide 6">Slide 6</swiper-slide
    ><swiper-slide data-history="7">Slide 7</swiper-slide
    ><swiper-slide data-history="Slide 8">Slide 8</swiper-slide
    ><swiper-slide data-history="9">Slide 9</swiper-slide>
  </swiper>
</template>
<script>
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from "swiper/vue";

// Import Swiper styles
import "swiper/css";

import "swiper/css/navigation";
import "swiper/css/pagination";

import "./style.css";

// import required modules
import { Navigation, Pagination, History } from "swiper";

export default {
  components: {
    Swiper,
    SwiperSlide,
  },
  setup() {
    return {
      modules: [Navigation, Pagination, History],
    };
  },
};
</script>
