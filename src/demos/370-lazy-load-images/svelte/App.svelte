<script>
  import { Swiper, SwiperSlide } from "swiper/svelte";

  // Import Swiper styles
  import "swiper/css";

  import "swiper/css/lazy";
  import "swiper/css/pagination";
  import "swiper/css/navigation";

  import "./style.css";

  // import required modules
  import { Lazy, Pagination, Navigation } from "swiper";
</script>

<Swiper
  style="--swiper-navigation-color: #fff;--swiper-pagination-color: #fff"
  lazy={true}
  pagination={{
    clickable: true,
  }}
  navigation={true}
  modules={[Lazy, Pagination, Navigation]}
  class="mySwiper"
>
  <SwiperSlide>
    <img
      data-src="https://swiperjs.com/demos/images/nature-1.jpg"
      class="swiper-lazy"
    />
    <div class="swiper-lazy-preloader swiper-lazy-preloader-white" />
  </SwiperSlide><SwiperSlide>
    <img
      data-src="https://swiperjs.com/demos/images/nature-2.jpg"
      class="swiper-lazy"
    />
    <div class="swiper-lazy-preloader swiper-lazy-preloader-white" />
  </SwiperSlide><SwiperSlide>
    <img
      data-src="https://swiperjs.com/demos/images/nature-3.jpg"
      class="swiper-lazy"
    />
    <div class="swiper-lazy-preloader swiper-lazy-preloader-white" />
  </SwiperSlide><SwiperSlide>
    <img
      data-src="https://swiperjs.com/demos/images/nature-4.jpg"
      class="swiper-lazy"
    />
    <div class="swiper-lazy-preloader swiper-lazy-preloader-white" />
  </SwiperSlide><SwiperSlide>
    <img
      data-src="https://swiperjs.com/demos/images/nature-5.jpg"
      class="swiper-lazy"
    />
    <div class="swiper-lazy-preloader swiper-lazy-preloader-white" />
  </SwiperSlide><SwiperSlide>
    <img
      data-src="https://swiperjs.com/demos/images/nature-6.jpg"
      class="swiper-lazy"
    />
    <div class="swiper-lazy-preloader swiper-lazy-preloader-white" />
  </SwiperSlide><SwiperSlide>
    <img
      data-src="https://swiperjs.com/demos/images/nature-7.jpg"
      class="swiper-lazy"
    />
    <div class="swiper-lazy-preloader swiper-lazy-preloader-white" />
  </SwiperSlide><SwiperSlide>
    <img
      data-src="https://swiperjs.com/demos/images/nature-8.jpg"
      class="swiper-lazy"
    />
    <div class="swiper-lazy-preloader swiper-lazy-preloader-white" />
  </SwiperSlide><SwiperSlide>
    <img
      data-src="https://swiperjs.com/demos/images/nature-9.jpg"
      class="swiper-lazy"
    />
    <div class="swiper-lazy-preloader swiper-lazy-preloader-white" />
  </SwiperSlide>
</Swiper>
