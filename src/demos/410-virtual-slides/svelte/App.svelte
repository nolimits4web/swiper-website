<script>
  import { Swiper, SwiperSlide } from 'swiper/svelte';

  // Import Swiper styles
  import 'swiper/css';

  import 'swiper/css/pagination';
  import 'swiper/css/navigation';

  import './style.css';

  // import Swiper core and required modules
  import SwiperCore, { Pagination, Navigation, Virtual } from 'swiper';

  // install Swiper modules
  SwiperCore.use([Pagination, Navigation, Virtual]);

  // Create array with 1000 slides
  let virtualSlides = Array.from({ length: 600 }).map(
    (_, index) => `Slide ${index + 1}`
  );
  let appendNumber = 600;
  let prependNumber = 1;

  // store swiper instance
  let swiperRef = null;

  const setSwiperRef = ({ detail }) => {
    const [swiper] = detail;
    // set swiper instance
    setTimeout(() => {
      swiperRef = swiper;
    });
  };

  const prepend = () => {
    virtualSlides = [
      `Slide ${prependNumber - 2}`,
      `Slide ${prependNumber - 1}`,
      ...slides,
    ];
    prependNumber -= 2;
  };

  const append = () => {
    appendNumber += 1;
    virtualSlides = [...slides, `Slide ${appendNumber}`];
  };

  const slideTo = (index) => {
    swiperRef.slideTo(index - 1, 0);
  };
</script>

<Swiper
  on:swiper={setSwiperRef}
  slidesPerView={3}
  centeredSlides={true}
  spaceBetween={30}
  virtual={{ slides: virtualSlides }}
  let:virtualData={{ slides, offset, from }}
  pagination={{
    type: 'fraction',
  }}
  navigation={true}
  class="mySwiper"
>
  {#each slides as slide, index (from + index)}
    <SwiperSlide virtualIndex={from + index} style={`left: ${offset}px`}
      >{slide}</SwiperSlide
    >
  {/each}
</Swiper>
<p class="append-buttons">
  <button on:click={() => prepend()} class="prepend-2-slides">
    Prepend 2 Slides
  </button>
  <button on:click={() => slideTo(1)} class="prepend-slide">Slide 1</button>
  <button on:click={() => slideTo(250)} class="slide-250">Slide 250</button>
  <button on:click={() => slideTo(500)} class="slide-500">Slide 500</button>
  <button on:click={() => append()} class="append-slides">Append Slide</button>
</p>
