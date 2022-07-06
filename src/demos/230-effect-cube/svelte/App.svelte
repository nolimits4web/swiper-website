<script>
  import { Swiper, SwiperSlide } from "swiper/svelte";

  // Import Swiper styles
  import "swiper/css";

  import "swiper/css/effect-cube";
  import "swiper/css/pagination";

  import "./style.css";

  // import required modules
  import { EffectCube, Pagination } from "swiper";
</script>

<Swiper
  effect={"cube"}
  grabCursor={true}
  cubeEffect={{
    shadow: true,
    slideShadows: true,
    shadowOffset: 20,
    shadowScale: 0.94,
  }}
  pagination={true}
  modules={[EffectCube, Pagination]}
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
