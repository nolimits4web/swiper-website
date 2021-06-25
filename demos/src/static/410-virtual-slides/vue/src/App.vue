<template>
  <div>
    <swiper
      @swiper="setSwiperRef"
      :slidesPerView="3"
      :centeredSlides="true"
      :spaceBetween="30"
      :pagination="{
        type: 'fraction',
      }"
      :navigation="true"
      :virtual="true"
      class="mySwiper"
    >
      <swiper-slide
        v-for="(slideContent, index) in slides"
        :key="index"
        :virtualIndex="index"
        >{{ slideContent }}</swiper-slide
      >
    </swiper>
    <p class="append-buttons">
      <button v-on:click="prepend()" class="prepend-2-slides">
        Prepend 2 Slides
      </button>
      <button v-on:click="slideTo(1)" class="prepend-slide">Slide 1</button>
      <button v-on:click="slideTo(250)" class="slide-250">Slide 250</button>
      <button v-on:click="slideTo(500)" class="slide-500">Slide 500</button>
      <button v-on:click="append()" class="append-slides">Append Slide</button>
    </p>
  </div>
</template>
<script>
  // Import Swiper Vue.js components
  import { Swiper, SwiperSlide } from 'swiper/vue';

  // Import Swiper styles
  import 'swiper/swiper.scss';

  import 'swiper/components/pagination/pagination.min.css';
  import 'swiper/components/navigation/navigation.min.css';

  import './style.css';

  // import Swiper core and required modules
  import SwiperCore, { Pagination, Navigation, Virtual } from 'swiper/core';

  // install Swiper modules
  SwiperCore.use([Pagination, Navigation, Virtual]);

  export default {
    components: {
      Swiper,
      SwiperSlide,
    },
    data() {
      // Create array with 1000 slides
      const slides = Array.from({ length: 600 }).map(
        (_, index) => `Slide ${index + 1}`
      );
      return {
        slides,
        swiperRef: null,
        appendNumber: 600,
        prependNumber: 1,
      };
    },
    methods: {
      setSwiperRef(swiper) {
        this.swiperRef = swiper;
      },
      slideTo(index) {
        this.swiperRef.slideTo(index - 1, 0);
      },
      append() {
        this.swiperRef.virtual.appendSlide('Slide ' + ++this.appendNumber);
      },
      prepend() {
        this.swiperRef.virtual.prependSlide([
          'Slide ' + --this.prependNumber,
          'Slide ' + --this.prependNumber,
        ]);
      },
    },
  };
</script>
