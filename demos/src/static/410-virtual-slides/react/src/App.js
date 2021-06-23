import React, { useRef, useState } from 'react';
import SwiperCore, { Virtual } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/swiper.min.css';
import 'swiper/components/pagination/pagination.min.css';
import 'swiper/components/navigation/navigation.min.css';

import './styles.css';

// install Virtual module
SwiperCore.use([Virtual]);

export default function App() {
  const [swiperRef, setSwiperRef] = useState(null);

  let appendNumber = 600;
  let prependNumber = 1;

  const prepend = () => {
    swiperRef.virtual.prependSlide([
      'Slide ' + --prependNumber,
      'Slide ' + --prependNumber,
    ]);
  };

  const append = () => {
    swiperRef.virtual.appendSlide('Slide ' + ++appendNumber);
  };

  const slideTo = (index) => {
    swiperRef.slideTo(index - 1, 0);
  };

  // Create array with 1000 slides
  const slides = Array.from({ length: 1000 }).map(
    (_, index) => `Slide ${index + 1}`
  );

  return (
    <>
      <Swiper
        onSwiper={setSwiperRef}
        slidesPerView={3}
        centeredSlides={true}
        spaceBetween={30}
        pagination={{
          type: 'fraction',
        }}
        navigation={true}
        virtual
      >
        {slides.map((slideContent, index) => (
          <SwiperSlide key={slideContent} virtualIndex={index}>
            {slideContent}
          </SwiperSlide>
        ))}
      </Swiper>

      <p className="append-buttons">
        <button onClick={() => prepend()} className="prepend-2-slides">
          Prepend 2 Slides
        </button>
        <button onClick={() => slideTo(1)} className="prepend-slide">
          Slide 1
        </button>
        <button onClick={() => slideTo(250)} className="slide-250">
          Slide 250
        </button>
        <button onClick={() => slideTo(500)} className="slide-500">
          Slide 500
        </button>
        <button onClick={() => append()} className="append-slides">
          Append Slide
        </button>
      </p>
    </>
  );
}
