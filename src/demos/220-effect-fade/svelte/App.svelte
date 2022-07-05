<script>
  import { Swiper, SwiperSlide } from "swiper/svelte";

  // Import Swiper styles
  import "swiper/css";

  import "swiper/css/effect-fade";
  import "swiper/css/navigation";
  import "swiper/css/pagination";

  import "./style.css";

  // import required modules
  import { EffectFade, Navigation, Pagination } from "swiper";
</script>

<Swiper
  spaceBetween={30}
  effect={"fade"}
  navigation={true}
  pagination={{
    clickable: true,
  }}
  modules={[EffectFade, Navigation, Pagination]}
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
  >
</Swiper>
