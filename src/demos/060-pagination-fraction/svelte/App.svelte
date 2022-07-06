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
  pagination={{
    type: "fraction",
  }}
  navigation={true}
  modules={[Pagination, Navigation]}
  class="mySwiper"
>
  <SwiperSlide>Slide 1</SwiperSlide><SwiperSlide>Slide 2</SwiperSlide
  ><SwiperSlide>Slide 3</SwiperSlide><SwiperSlide>Slide 4</SwiperSlide
  ><SwiperSlide>Slide 5</SwiperSlide><SwiperSlide>Slide 6</SwiperSlide
  ><SwiperSlide>Slide 7</SwiperSlide><SwiperSlide>Slide 8</SwiperSlide
  ><SwiperSlide>Slide 9</SwiperSlide>
</Swiper>
