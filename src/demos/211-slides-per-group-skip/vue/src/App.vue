<template>
  <swiper
    :slidesPerView="1"
    :centeredSlides="false"
    :slidesPerGroupSkip="1"
    :grabCursor="true"
    :keyboard="{
      enabled: true,
    }"
    :breakpoints="{
      '769': {
        slidesPerView: 2,
        slidesPerGroup: 2,
      },
    }"
    :scrollbar="true"
    :navigation="true"
    :pagination="{
      clickable: true,
    }"
    :modules="modules"
    class="mySwiper"
  >
    <swiper-slide
      ><img src="https://cdn.magloft.com/github/swiper/images/page-001.jpg"
    /></swiper-slide>
    <swiper-slide
      ><img src="https://cdn.magloft.com/github/swiper/images/page-002.jpg"
    /></swiper-slide>
    <swiper-slide
      ><img src="https://cdn.magloft.com/github/swiper/images/page-003.jpg"
    /></swiper-slide>
    <swiper-slide
      ><img src="https://cdn.magloft.com/github/swiper/images/page-004.jpg"
    /></swiper-slide>
    <swiper-slide
      ><img src="https://cdn.magloft.com/github/swiper/images/page-005.jpg"
    /></swiper-slide>
    <swiper-slide
      ><img src="https://cdn.magloft.com/github/swiper/images/page-006.jpg"
    /></swiper-slide>
    <swiper-slide
      ><img src="https://cdn.magloft.com/github/swiper/images/page-007.jpg"
    /></swiper-slide>
    <swiper-slide
      ><img src="https://cdn.magloft.com/github/swiper/images/page-008.jpg"
    /></swiper-slide>
    <swiper-slide
      ><img src="https://cdn.magloft.com/github/swiper/images/page-009.jpg"
    /></swiper-slide>
  </swiper>
</template>
<script>
  // Import Swiper Vue.js components
  import { Swiper, SwiperSlide } from 'swiper/vue';

  // Import Swiper styles
  import 'swiper/css';

  import 'swiper/css/scrollbar';
  import 'swiper/css/navigation';
  import 'swiper/css/pagination';

  import './style.css';

  // import required modules
  import { Keyboard, Scrollbar, Navigation, Pagination } from 'swiper/modules';

  export default {
    components: {
      Swiper,
      SwiperSlide,
    },
    setup() {
      return {
        modules: [Keyboard, Scrollbar, Navigation, Pagination],
      };
    },
  };
</script>
