
<template>
<swiper :slidesPerView="3" :slidesPerColumn="2" :spaceBetween="30" :pagination='{
  "clickable": true
}' class="mySwiper">
  <swiper-slide>Slide 1</swiper-slide><swiper-slide>Slide 2</swiper-slide><swiper-slide>Slide 3</swiper-slide><swiper-slide>Slide 4</swiper-slide><swiper-slide>Slide 5</swiper-slide><swiper-slide>Slide 6</swiper-slide><swiper-slide>Slide 7</swiper-slide><swiper-slide>Slide 8</swiper-slide><swiper-slide>Slide 9</swiper-slide>
  </swiper>
</template>
<script>
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from 'swiper/vue';

// Import Swiper styles
import 'swiper/swiper.scss';

import "swiper/components/pagination/pagination.min.css"

import './style.css';


// import Swiper core and required modules
import SwiperCore, {
  Pagination
} from 'swiper/core';

// install Swiper modules
SwiperCore.use([Pagination]);


export default {
  components: {
    Swiper,
    SwiperSlide,
  },
  data() {
    return {
        
        
    };
  },
  methods: {
    
  }
  
}
</script>