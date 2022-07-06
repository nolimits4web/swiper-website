<script>
  import { Swiper, SwiperSlide } from "swiper/svelte";

  // Import Swiper styles
  import "swiper/css";

  import "swiper/css/free-mode";
  import "swiper/css/navigation";
  import "swiper/css/thumbs";

  import "./style.css";

  // import required modules
  import { FreeMode, Navigation, Thumbs } from "swiper";

  let thumbsSwiper = null;

  const setThumbsSwiper = (e) => {
    const [swiper] = e.detail;
    // set Thumbs swiper instance
    setTimeout(() => {
      thumbsSwiper = swiper;
    });
  };
</script>

<Swiper
  style="--swiper-navigation-color: #fff;--swiper-pagination-color: #fff"
  loop={true}
  spaceBetween={10}
  navigation={true}
  thumbs={{ swiper: thumbsSwiper }}
  modules={[FreeMode, Navigation, Thumbs]}
  class="mySwiper2"
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
  ><SwiperSlide
    ><img src="https://swiperjs.com/demos/images/nature-7.jpg" /></SwiperSlide
  ><SwiperSlide
    ><img src="https://swiperjs.com/demos/images/nature-8.jpg" /></SwiperSlide
  ><SwiperSlide
    ><img src="https://swiperjs.com/demos/images/nature-9.jpg" /></SwiperSlide
  ><SwiperSlide
    ><img src="https://swiperjs.com/demos/images/nature-10.jpg" /></SwiperSlide
  >
</Swiper>
<Swiper
  on:swiper={setThumbsSwiper}
  loop={true}
  spaceBetween={10}
  slidesPerView={4}
  freeMode={true}
  watchSlidesProgress={true}
  modules={[FreeMode, Navigation, Thumbs]}
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
  ><SwiperSlide
    ><img src="https://swiperjs.com/demos/images/nature-7.jpg" /></SwiperSlide
  ><SwiperSlide
    ><img src="https://swiperjs.com/demos/images/nature-8.jpg" /></SwiperSlide
  ><SwiperSlide
    ><img src="https://swiperjs.com/demos/images/nature-9.jpg" /></SwiperSlide
  ><SwiperSlide
    ><img src="https://swiperjs.com/demos/images/nature-10.jpg" /></SwiperSlide
  >
</Swiper>
