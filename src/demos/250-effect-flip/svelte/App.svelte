<script>
  import { Swiper, SwiperSlide } from "swiper/svelte";

  // Import Swiper styles
  import "swiper/css";

  import "swiper/css/effect-flip";
  import "swiper/css/pagination";
  import "swiper/css/navigation";

  import "./style.css";

  // import required modules
  import { EffectFlip, Pagination, Navigation } from "swiper";
</script>

<Swiper
  effect={"flip"}
  grabCursor={true}
  pagination={true}
  navigation={true}
  modules={[EffectFlip, Pagination, Navigation]}
  class="mySwiper"
>
  <SwiperSlide
    ><img src="https://swiperjs.com/demos/images/nature-1.jpg" /></SwiperSlide
  ><SwiperSlide
    ><img src="https://swiperjs.com/demos/images/nature-2.jpg" /></SwiperSlide
  ><SwiperSlide
    ><img src="https://swiperjs.com/demos/images/nature-3.jpg" /></SwiperSlide
  ><SwiperSlide
    ><img src="https://swiperjs.com/demos/images/nature-4.jpg" /></SwiperSlide
  ><SwiperSlide
    ><img src="https://swiperjs.com/demos/images/nature-5.jpg" /></SwiperSlide
  ><SwiperSlide
    ><img src="https://swiperjs.com/demos/images/nature-6.jpg" /></SwiperSlide
  >
</Swiper>
