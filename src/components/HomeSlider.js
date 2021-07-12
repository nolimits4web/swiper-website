import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import Swiper, {
  Navigation,
  Pagination,
  A11y,
  Keyboard,
  EffectCoverflow,
  Controller,
  Lazy,
  Parallax,
} from 'swiper';

Swiper.use([
  Navigation,
  Pagination,
  A11y,
  Keyboard,
  EffectCoverflow,
  Controller,
  Lazy,
  Parallax,
]);

import 'swiper/swiper.min.css';
import 'swiper/components/navigation/navigation.min.css';
import 'swiper/components/pagination/pagination.min.css';
import 'swiper/components/a11y/a11y.min.css';
import 'swiper/components/effect-coverflow/effect-coverflow.min.css';
import 'swiper/components/lazy/lazy.min.css';

function SlideCenter({ children, className = '', style = {} }) {
  return (
    <div
      className={`mx-auto max-w-6xl flex justify-center flex-col px-4 rounded-xl text-[#3f209a] h-[500px] md:h-[400px] lg:h-[500px] ${className}`}
      style={{
        backgroundImage: 'linear-gradient(45deg, #6433f6, #a587ff)',
      }}
    >
      {children}
    </div>
  );
}

export default function HomeSlider() {
  const swiperFront = useRef(null);
  const galleryTopSwiper = useRef(null);
  const galleryThumbsSwiper = useRef(null);

  const createSwipers = () => {
    swiperFront.current = new Swiper('.header-swiper-front', {
      slidesPerView: 'auto',
      centeredSlides: true,
      spaceBetween: 100,
      effect: 'coverflow',
      speed: 600,
      observer: true,
      observeParents: true,
      parallax: true,
      coverflowEffect: {
        slideShadows: false,
        rotate: -45,
        depth: 300,
        stretch: 100,
      },
      pagination: {
        el: '.header-swiper-front .swiper-pagination',
        clickable: true,
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      keyboard: true,
      a11y: true,
      on: {
        progress(s) {
          s.slides.forEach((slideEl) => {
            const opacity = Math.min(
              Math.max(1 - Math.abs(slideEl.progress), 0),
              1
            );
            slideEl.style.opacity = opacity;
            slideEl.style.transitionProperty = 'opacity, transform';
          });
        },
      },
    });
    galleryTopSwiper.current = new Swiper('.swiper-gallery-top', {
      slidesPerView: 1,
      spaceBetween: 10,
      nested: true,
      resistanceRatio: 0,
      preloadImages: false,
      lazy: true,
    });
    galleryThumbsSwiper.current = new Swiper('.swiper-gallery-thumbs', {
      slidesPerView: 5,
      spaceBetween: 10,
      centeredSlides: true,
      touchRatio: 0.2,
      slideToClickedSlide: true,
      nested: true,
      resistanceRatio: 0,
    });
    galleryTopSwiper.current.controller.control = galleryThumbsSwiper.current;
    galleryThumbsSwiper.current.controller.control = galleryTopSwiper.current;
    document.querySelector('.header-swiper-front').style.overflow = 'visible';
  };

  const destroySwipers = () => {
    // if (galleryTopSwiper.current) galleryTopSwiper.current.destroy();
    // if (galleryThumbsSwiper.current) galleryThumbsSwiper.current.destroy();
    if (swiperFront.current) swiperFront.current.destroy();
  };

  useEffect(() => {
    createSwipers();
    return () => destroySwipers();
  });
  return (
    <>
      <div className="swiper-button-prev invisible md:visible !left-auto !right-full mr-4" />
      <div className="swiper-button-next invisible md:visible !right-auto !left-full ml-4" />
      <div className="swiper-container header-swiper-front">
        <div className="swiper-pagination !-bottom-6" />

        <div className="swiper-wrapper">
          <div className="swiper-slide">
            <SlideCenter>
              <span
                className="text-4xl text-center font-bold mb-8"
                style={{ textShadow: '0px 1px 0px #9d7dfb' }}
              >
                Top Notch Features
              </span>
              <ul className="flex flex-wrap text-sm sm:text-base md:mx-auto md:max-w-screen-sm font-medium text-white">
                {[
                  'Library Agnostic',
                  'Mutation Observer',
                  'Flexbox Layout',
                  'Full True RTL Support',
                  'Multi Row Slides Layout',
                  '3D Effects',
                  'Two-way Control',
                  'Full Navigation Control',
                  'Rich API',
                  'Most Flexible Slides Layout Grid',
                  'Parallax Transitions',
                  'Images Lazy Loading',
                  'Virtual Slides',
                  'And many more',
                ].map((text, index) => (
                  <li key={index} className="w-1/2 flex items-center my-1">
                    <svg
                      className="text-white mr-2 flex-shrink-0"
                      width="20"
                      height="20"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {text}
                  </li>
                ))}
                <li></li>
              </ul>
            </SlideCenter>
          </div>
          <div className="swiper-slide swiper-slide-gallery">
            <SlideCenter className="pt-10">
              <span
                className="text-4xl text-center font-bold mb-8"
                style={{ textShadow: '0px 1px 0px #9d7dfb' }}
              >
                Build Complex Touch Galleries
              </span>
              <div
                className="swiper-container swiper-gallery-top rounded-lg"
                style={{ height: '64%', width: '100%' }}
              >
                <div className="swiper-wrapper">
                  {Array.from({ length: 5 }).map((el, index) => (
                    <div
                      key={index}
                      data-background={`demos/images/nature-${index + 1}.jpg`}
                      className="swiper-slide swiper-lazy bg-cover bg-center"
                    >
                      <div className="swiper-lazy-preloader"></div>
                    </div>
                  ))}
                </div>
              </div>
              <div
                className="swiper-container swiper-gallery-thumbs my-2"
                style={{ height: '20%', width: '100%' }}
              >
                <div className="swiper-wrapper">
                  {Array.from({ length: 5 }).map((el, index) => (
                    <div
                      key={index}
                      style={{
                        backgroundImage: `url(demos/images/nature-${
                          index + 1
                        }.jpg)`,
                      }}
                      className="swiper-slide rounded-md bg-cover bg-center"
                    />
                  ))}
                </div>
              </div>
            </SlideCenter>
          </div>
          <div className="swiper-slide">
            <SlideCenter className="items-center">
              <div
                className="text-4xl font-bold w-full text-center"
                style={{ textShadow: '0px 1px 0px #9d7dfb' }}
              >
                Start Using It Now
              </div>
              <div className="mt-4">
                <Link href="/get-started">
                  <a className="bg-primary rounded-3xl text-white shadow-lg hover:no-underline hover:bg-opacity-95 duration-200 inline-block w-48 px-4 py-2 my-2 text-center font-bold text-lg">
                    Get Started
                  </a>
                </Link>
              </div>
            </SlideCenter>
          </div>
        </div>
      </div>
    </>
  );
}
