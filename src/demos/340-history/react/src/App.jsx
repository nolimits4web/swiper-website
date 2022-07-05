import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import "./styles.css";

// import required modules
import { Navigation, Pagination, History } from "swiper";

export default function App() {
  return (
    <>
      <Swiper
        spaceBetween={50}
        slidesPerView={1}
        navigation={true}
        pagination={true}
        history={{
          key: "slide",
        }}
        modules={[Navigation, Pagination, History]}
        className="mySwiper"
      >
        <SwiperSlide data-history="1">Slide 1</SwiperSlide>
        <SwiperSlide data-history="Slide 2">Slide 2</SwiperSlide>
        <SwiperSlide data-history="3">Slide 3</SwiperSlide>
        <SwiperSlide data-history="Slide 4">Slide 4</SwiperSlide>
        <SwiperSlide data-history="5">Slide 5</SwiperSlide>
        <SwiperSlide data-history="Slide 6">Slide 6</SwiperSlide>
        <SwiperSlide data-history="7">Slide 7</SwiperSlide>
        <SwiperSlide data-history="Slide 8">Slide 8</SwiperSlide>
        <SwiperSlide data-history="9">Slide 9</SwiperSlide>
      </Swiper>
    </>
  );
}
