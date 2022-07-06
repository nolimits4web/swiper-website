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
  on:swiper={setSwiperRef}
  slidesPerView={3}
  centeredSlides={true}
  spaceBetween={30}
  pagination={{
    type: "fraction",
  }}
  navigation={true}
  modules={[Pagination, Navigation]}
  class="mySwiper"
>
  <SwiperSlide>Slide 1</SwiperSlide>
  <SwiperSlide>Slide 2</SwiperSlide>
  <SwiperSlide>Slide 3</SwiperSlide>
  <SwiperSlide>Slide 4</SwiperSlide>
</Swiper>

<p class="append-buttons" />
