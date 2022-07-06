<script>
  import { Swiper, SwiperSlide } from "swiper/svelte";

  // Import Swiper styles
  import "swiper/css";

  import "swiper/css/pagination";
  import "swiper/css/navigation";

  import "./style.css";

  // import required modules
  import { Pagination, Navigation } from "swiper";
</script>

<Swiper
  spaceBetween={30}
  hashNavigation={{
    watchState: true,
  }}
  pagination={{
    clickable: true,
  }}
  navigation={true}
  modules={[Pagination, Navigation]}
  class="mySwiper"
>
  <SwiperSlide data-hash="slide1">Slide 1</SwiperSlide><SwiperSlide
    data-hash="slide2">Slide 2</SwiperSlide
  ><SwiperSlide data-hash="slide3">Slide 3</SwiperSlide><SwiperSlide
    data-hash="slide4">Slide 4</SwiperSlide
  ><SwiperSlide data-hash="slide5">Slide 5</SwiperSlide><SwiperSlide
    data-hash="slide6">Slide 6</SwiperSlide
  ><SwiperSlide data-hash="slide7">Slide 7</SwiperSlide><SwiperSlide
    data-hash="slide8">Slide 8</SwiperSlide
  ><SwiperSlide data-hash="slide9">Slide 9</SwiperSlide>
</Swiper>
