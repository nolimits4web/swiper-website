<template>
  <div>
    <swiper
      :modules="modules"
      :slidesPerView="3"
      :centeredSlides="true"
      :spaceBetween="30"
      :pagination="{
        type: 'fraction',
      }"
      :navigation="true"
      :virtual="true"
      class="mySwiper"
      @swiper="setSwiperRef"
    >
      <swiper-slide
        v-for="(slideContent, index) in slides"
        :key="index"
        :virtualIndex="index"
        >{{ slideContent }}</swiper-slide
      >
    </swiper>
    <p class="append-buttons">
      <button @click="prepend()" class="prepend-2-slides">
        Prepend 2 Slides
      </button>
      <button @click="slideTo(1)" class="prepend-slide">Slide 1</button>
      <button @click="slideTo(250)" class="slide-250">Slide 250</button>
      <button @click="slideTo(500)" class="slide-500">Slide 500</button>
      <button @click="append()" class="append-slides">Append Slide</button>
    </p>
  </div>
</template>
<script>
  import { ref } from 'vue';
  // Import Swiper Vue.js components
  import { Swiper, SwiperSlide } from 'swiper/vue';

  // Import Swiper styles
  import 'swiper/css';

  import 'swiper/css/pagination';
  import 'swiper/css/navigation';
  import 'swiper/css/virtual';

  import './style.css';

  // import Swiper core and required modules
  import { Pagination, Navigation, Virtual } from 'swiper/modules';

  export default {
    components: {
      Swiper,
      SwiperSlide,
    },
    setup() {
      // Create array with 500 slides
      const slides = ref(
        Array.from({ length: 500 }).map((_, index) => `Slide ${index + 1}`)
      );
      let swiperRef = null;
      let appendNumber = 500;
      let prependNumber = 1;

      const setSwiperRef = (swiper) => {
        swiperRef = swiper;
      };
      const slideTo = (index) => {
        swiperRef.slideTo(index - 1, 0);
      };
      const append = () => {
        slides.value = [...slides.value, 'Slide ' + ++appendNumber];
      };
      const prepend = () => {
        slides.value = [
          `Slide ${prependNumber - 2}`,
          `Slide ${prependNumber - 1}`,
          ...slides.value,
        ];
        prependNumber -= 2;
        swiperRef.slideTo(swiperRef.activeIndex + 2, 0);
      };
      return {
        slides,
        swiperRef: null,
        appendNumber,
        prependNumber,
        setSwiperRef,
        slideTo,
        append,
        prepend,
        modules: [Pagination, Navigation, Virtual],
      };
    },
  };
</script>
