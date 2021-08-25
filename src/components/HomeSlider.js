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

Swiper.use([
  Navigation,
  Pagination,
  A11y,
  EffectCreative,
  EffectCards,
  EffectFlip,
  Controller,
]);

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/a11y';
import 'swiper/css/effect-creative';
import 'swiper/css/effect-cards';
import 'swiper/css/effect-flip';

function SlideCenter({ children, className = '', style = {} }) {
  return (
    <div
      className={`mx-auto max-w-[90rem] bg-white flex justify-center flex-col px-4 rounded-xl text-primary h-[500px] md:h-[400px] lg:h-[500px] ${className}`}
    >
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
        limitProgress: 2,
        shadowPerProgress: true,
        prev: {
          shadow: true,
          translate: ['-10%', 0, -200],
          rotate: [0, 0, -2],
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
      <div className="swiper-button-prev invisible md:visible !left-auto !right-full mr-4" />
      <div className="swiper-button-next invisible md:visible !right-auto !left-full ml-4" />
      <div className="swiper header-swiper-main">
        <div className="swiper-pagination !-bottom-6" />

        <div className="swiper-wrapper">
          <div className="swiper-slide rounded-xl">
            <SlideCenter>
              <span className="text-4xl text-center font-bold mb-8">
                Top Notch Features
              </span>
              <ul className="flex flex-wrap text-sm sm:text-base md:mx-auto md:max-w-screen-sm font-medium text-gray-700">
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
                      className="text-gray-700 mr-2 flex-shrink-0"
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
            <div className="swiper-slide-shadow" />
          </div>
          <div className="swiper-slide swiper-slide-gallery rounded-xl">
            <SlideCenter className="pt-10">
              <span className="text-4xl text-center font-bold mb-8">
                Build Complex Touch Galleries
              </span>
              <div className="flex h-full justify-around min-h-0 pb-4">
                <div className="swiper header-swiper-cards rounded-lg w-60 h-80 mx-auto max-h-full">
                  {Array.from({ length: 5 }).map((el, index) => (
                    <div key={index} className="swiper-slide rounded-xl">
                      <img
                        src={`demos/images/nature-${index + 1}.jpg`}
                        className="object-cover w-full h-full"
                      />
                    </div>
                  ))}
                </div>
                <div className="swiper header-swiper-flip rounded-lg w-60 h-80 mx-auto max-h-full hidden sm:block lg:hidden xl:block">
                  {Array.from({ length: 5 }).map((el, index) => (
                    <div key={index} className="swiper-slide rounded-xl">
                      <img
                        src={`demos/images/nature-${index + 1}.jpg`}
                        className="object-cover w-full h-full"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </SlideCenter>
            <div className="swiper-slide-shadow" />
          </div>
          <div className="swiper-slide rounded-xl">
            <SlideCenter className="items-center">
              <div className="text-4xl font-bold w-full text-center">
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
            <div className="swiper-slide-shadow" />
          </div>
        </div>
      </div>
    </>
  );
}
