import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import Swiper, {
  Navigation,
  Pagination,
  A11y,
  EffectCreative,
  EffectCards,
  EffectFlip,
  Controller,
} from 'swiper';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/a11y';
import 'swiper/css/effect-creative';
import 'swiper/css/effect-cards';
import 'swiper/css/effect-flip';

Swiper.use([
  Navigation,
  Pagination,
  A11y,
  EffectCreative,
  EffectCards,
  EffectFlip,
  Controller,
]);

function SlideCenter({ children, className = '' }) {
  return (
    <div
      className={`mx-auto flex h-[500px] max-w-[90rem] flex-col justify-center rounded-2xl  px-4  md:h-[400px] lg:h-[500px] ${className} relative `}
    >
      {/* <div className="pointer-events-none absolute left-0 top-0 z-[-1] h-full w-full rounded-xl bg-black dark:bg-white" /> */}
      {children}
    </div>
  );
}

export default function HomeSlider() {
  const swiperMain = useRef(null);
  const swiperCards = useRef(null);
  const swiperFlip = useRef(null);

  const createSwipers = () => {
    swiperMain.current = new Swiper('.header-swiper-main', {
      slidesPerView: 1,
      effect: 'creative',
      grabCursor: true,
      watchSlidesProgress: true,
      creativeEffect: {
        perspective: true,
        limitProgress: 5,
        prev: {
          shadow: false,
          translate: [0, -12, -1],
          rotate: [0, 0, 0],
          scale: 0.92,
        },
        next: {
          shadow: false,
          translate: ['120%', 0, 0],
        },
      },
      speed: 300,
      observer: true,
      observeParents: true,
      pagination: {
        el: '.header-swiper-main .swiper-pagination',
        clickable: true,
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      a11y: true,
      on: {
        setTranslate(s) {
          const slides = s.slides;
          slides.forEach((slideEl) => {
            const progress = slideEl.progress;
            const shadowEl = slideEl.querySelector('.header-swiper-shadow');
            if (progress > -1 && progress <= 0) {
              const percentage = 1 + progress;
              slideEl.style.boxShadow = `-10px 10px 30px rgba(0,0,0,${
                0.2 * percentage
              })`;
            } else if (progress > 0) {
              const percentage = 1 - progress;
              slideEl.style.boxShadow = `-10px 10px 30px rgba(0,0,0,${
                0.2 * percentage
              })`;
            } else {
              slideEl.style.boxShadow = `-10px 10px 0px rgba(0,0,0,0)`;
            }
            if (progress > 0) {
              const perSlide = 1 / (slides.length - 1);
              shadowEl.style.opacity = perSlide * Math.abs(progress);
            } else {
              shadowEl.style.opacity = 0;
            }
          });
        },
        setTransition(s, duration) {
          const slides = s.slides;
          slides.forEach((slideEl) => {
            const shadowEl = slideEl.querySelector('.header-swiper-shadow');

            shadowEl.style.transitionDuration = `${duration}ms`;
          });
        },
      },
    });
    swiperCards.current = new Swiper('.header-swiper-cards', {
      nested: true,
      effect: 'cards',
      createElements: true,
      pagination: true,
      resistanceRatio: 0,
    });
    swiperFlip.current = new Swiper('.header-swiper-flip', {
      nested: true,
      effect: 'flip',
      createElements: true,
      pagination: true,
      resistanceRatio: 0,
    });
    document.querySelector('.header-swiper-main').style.overflow = 'visible';
  };

  const destroySwipers = () => {
    if (swiperCards.current) swiperCards.current.destroy();
    if (swiperFlip.current) swiperFlip.current.destroy();
    if (swiperMain.current) swiperMain.current.destroy();
  };

  useEffect(() => {
    createSwipers();
    return () => destroySwipers();
  });
  return (
    <>
      {/* <div className="swiper-button-prev invisible !left-auto !right-full mr-4 md:visible 2xl:mr-8" /> */}
      {/* <div className="swiper-button-next invisible !left-full !right-auto ml-4 md:visible 2xl:ml-8" /> */}
      <div className="swiper header-swiper-main !absolute -bottom-5 -top-5 right-0  z-20 w-1/2">
        <div className="swiper-pagination !-bottom-6" />

        <div className="swiper-wrapper">
          <div className="swiper-slide origin-top rounded-3xl bg-surface-2">
            <div className="header-swiper-shadow pointer-events-none absolute left-0 top-0 h-full w-full bg-black bg-opacity-20  " />
            <SlideCenter>
              <span className="mb-8 text-center text-4xl font-bold">
                Top Notch Features
              </span>
              <ul className="flex flex-wrap text-sm font-medium text-gray-700 dark:text-white sm:text-base md:mx-auto md:max-w-screen-sm">
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
                  <li key={index} className="my-1 flex w-1/2 items-center">
                    <svg
                      className="mr-2 flex-shrink-0 text-primary"
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
                <li />
              </ul>
            </SlideCenter>
          </div>
          <div className="swiper-slide swiper-slide-gallery origin-top rounded-3xl bg-surface-2">
            <div className="header-swiper-shadow pointer-events-none absolute left-0 top-0 h-full w-full bg-black bg-opacity-20  " />
            <SlideCenter className="pt-10">
              <span className="mb-8 text-center text-4xl font-bold">
                Build Complex Touch Galleries
              </span>
              <div className="flex h-full min-h-0 justify-around pb-4">
                <div className="swiper header-swiper-cards mx-auto h-80 max-h-full w-60 rounded-lg">
                  {Array.from({ length: 5 }).map((el, index) => (
                    <div key={index} className="swiper-slide rounded-xl">
                      <img
                        src={`demos/images/nature-${index + 1}.jpg`}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  ))}
                </div>
                <div className="swiper header-swiper-flip mx-auto hidden h-80 max-h-full w-60 rounded-lg sm:block lg:hidden xl:block">
                  {Array.from({ length: 5 }).map((el, index) => (
                    <div key={index} className="swiper-slide rounded-xl">
                      <img
                        src={`demos/images/nature-${index + 1}.jpg`}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </SlideCenter>
          </div>
          <div className="swiper-slide origin-top rounded-3xl bg-surface-2">
            <div className="header-swiper-shadow pointer-events-none absolute left-0 top-0 h-full w-full bg-black bg-opacity-10 " />
            <SlideCenter className="items-center">
              <div className="w-full text-center text-4xl font-bold">
                Start Using It Now
              </div>
              <div className="mt-4">
                <Link
                  href="/get-started"
                  className="my-2 inline-block w-48 rounded-3xl bg-primary px-4 py-2 text-center text-lg font-bold text-white shadow-lg duration-200 hover:bg-opacity-95 hover:no-underline"
                >
                  Get Started
                </Link>
              </div>
            </SlideCenter>
          </div>
        </div>
      </div>
    </>
  );
}
