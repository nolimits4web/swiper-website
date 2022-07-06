<script>
  import { Swiper, SwiperSlide } from "swiper/svelte";

  // Import Swiper styles
  import "swiper/css";

  import "swiper/css/pagination";

  import "./style.css";

  // import required modules
  import { Pagination } from "swiper";
</script>

<Swiper
  spaceBetween={30}
  pagination={{
    clickable: true,
  }}
  modules={[Pagination]}
  class="mySwiper"
>
  <SwiperSlide>Slide 1</SwiperSlide><SwiperSlide>Slide 2</SwiperSlide
  ><SwiperSlide>Slide 3</SwiperSlide><SwiperSlide>Slide 4</SwiperSlide
  ><SwiperSlide>Slide 5</SwiperSlide><SwiperSlide>Slide 6</SwiperSlide
  ><SwiperSlide>Slide 7</SwiperSlide><SwiperSlide>Slide 8</SwiperSlide
  ><SwiperSlide>Slide 9</SwiperSlide>
</Swiper><Swiper
  spaceBetween={30}
  pagination={{
    clickable: true,
  }}
  modules={[Pagination]}
  class="mySwiper2"
>
  <SwiperSlide>Slide 1</SwiperSlide><SwiperSlide>Slide 2</SwiperSlide
  ><SwiperSlide>Slide 3</SwiperSlide><SwiperSlide>Slide 4</SwiperSlide
  ><SwiperSlide>Slide 5</SwiperSlide><SwiperSlide>Slide 6</SwiperSlide
  ><SwiperSlide>Slide 7</SwiperSlide><SwiperSlide>Slide 8</SwiperSlide
  ><SwiperSlide>Slide 9</SwiperSlide>
</Swiper><Swiper
  spaceBetween={30}
  pagination={{
    clickable: true,
  }}
  modules={[Pagination]}
  class="mySwiper3"
>
  <SwiperSlide>Slide 1</SwiperSlide><SwiperSlide>Slide 2</SwiperSlide
  ><SwiperSlide>Slide 3</SwiperSlide><SwiperSlide>Slide 4</SwiperSlide
  ><SwiperSlide>Slide 5</SwiperSlide><SwiperSlide>Slide 6</SwiperSlide
  ><SwiperSlide>Slide 7</SwiperSlide><SwiperSlide>Slide 8</SwiperSlide
  ><SwiperSlide>Slide 9</SwiperSlide>
</Swiper>
