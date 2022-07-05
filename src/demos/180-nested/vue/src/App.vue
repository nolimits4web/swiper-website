<template>
  <swiper
    class="mySwiper swiper-h"
    :spaceBetween="50"
    :pagination="{
      clickable: true,
    }"
    :modules="modules"
  >
    <swiper-slide>Horizontal Slide 1</swiper-slide>
    <swiper-slide>
      <swiper
        class="mySwiper2 swiper-v"
        :direction="'vertical'"
        :spaceBetween="50"
        :pagination="{
          clickable: true,
        }"
        :modules="modules"
      >
        <swiper-slide>Vertical Slide 1</swiper-slide>
        <swiper-slide>Vertical Slide 2</swiper-slide>
        <swiper-slide>Vertical Slide 3</swiper-slide>
        <swiper-slide>Vertical Slide 4</swiper-slide>
        <swiper-slide>Vertical Slide 5</swiper-slide>
      </swiper>
    </swiper-slide>
    <swiper-slide>Horizontal Slide 3</swiper-slide>
    <swiper-slide>Horizontal Slide 4</swiper-slide>
  </swiper>
</template>
<script>
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from "swiper/vue";

// Import Swiper styles
import "swiper/css";

import "swiper/css/pagination";

import "./style.css";

// import required modules
import { Pagination } from "swiper";

export default {
  components: {
    Swiper,
    SwiperSlide,
  },
  setup() {
    return {
      modules: [Pagination],
    };
  },
};
</script>
