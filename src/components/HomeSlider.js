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
} from 'swiper';
import menuList from 'src/shared/menu-list';
import GithubStats from '@/components/GithubStats';
import { ReactComponent as Logo } from '@/img/logo.svg';

Swiper.use([
  Navigation,
  Pagination,
  A11y,
  Keyboard,
  EffectCoverflow,
  Controller,
  Lazy,
]);

import 'swiper/swiper.min.css';
import 'swiper/components/navigation/navigation.min.css';
import 'swiper/components/pagination/pagination.min.css';
import 'swiper/components/a11y/a11y.min.css';
import 'swiper/components/effect-coverflow/effect-coverflow.min.css';
import 'swiper/components/lazy/lazy.min.css';

function SlideCenter({ children, className = '', bgColor = 'bg-white' }) {
  return (
    <div className={bgColor}>
      <div
        className={`mx-auto max-w-6xl flex justify-center flex-col px-4 ${className}`}
        style={{ height: 500 }}
      >
        {children}
      </div>
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
      coverflowEffect: {
        slideShadows: true,
      },
      pagination: {
        el: '.header-swiper-front .swiper-pagination',
        clickable: true,
      },
      navigation: {
        nextEl: '.header-swiper-front .swiper-button-next',
        prevEl: '.header-swiper-front .swiper-button-prev',
      },
      keyboard: true,
      a11y: true,
      on: {
        slideChange: function (s) {
          if (s.activeIndex === 2) {
            s.el.querySelector('.swiper-pagination').style.display = 'none';
          } else {
            s.el.querySelector('.swiper-pagination').style.display = '';
          }
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
  };

  const destroySwipers = () => {
    if (swiperFront.current) swiperFront.current.destroy();
    if (galleryTopSwiper.current) galleryTopSwiper.current.destroy();
    if (galleryThumbsSwiper.current) galleryThumbsSwiper.current.destroy();
  };

  useEffect(() => {
    createSwipers();
    return () => destroySwipers();
  });
  return (
    <div
      className="swiper-container header-swiper-front"
      style={{ '--swiper-theme-color': '#6332f6' }}
    >
      <div className="swiper-pagination" />
      <div className="swiper-button-prev invisible md:visible" />
      <div className="swiper-button-next invisible md:visible" />
      <div className="swiper-wrapper">
        <div className="swiper-slide">
          <SlideCenter>
            <div className="md:inline-flex md:mx-auto text-center md:text-left">
              <Logo
                className="swiper_logo rounded-full flex-shrink-0 w-32 h-32 lg:w-40 lg:h-40 inline md:block"
                alt="Swiper"
              />

              <div className="md:ml-10 mt-4 md:mt-0">
                <div className="text-5xl md:text-6xl font-extrabold text-primary">
                  Swiper
                </div>
                <div className="text-2xl sm:text-4xl md:text-5xl my-2 font-bold text-black leading-tight md:leading-tight max-w-2xl">
                  The Most Modern Mobile Touch Slider
                </div>
                <nav className="mt-4 md:mt-12 font-medium flex flex-wrap justify-center md:justify-start">
                  {menuList.map(({ name, link }) => (
                    <Link key={link} href={link}>
                      <a className="mr-4">{name}</a>
                    </Link>
                  ))}
                </nav>
                <div className="text-gray-700 text-sm my-5">
                  MIT Licensed, v{process.env.swiperReleaseVersion} released on{' '}
                  {process.env.swiperReleaseDate} |<span> </span>
                  <a
                    href="https://github.com/nolimits4web/swiper/blob/master/CHANGELOG.md"
                    rel="noopener"
                    target="_blank"
                  >
                    Changelog
                  </a>
                </div>
                <div className="flex justify-center md:justify-start">
                  <GithubStats />
                </div>
              </div>
            </div>
          </SlideCenter>
        </div>
        <div className="swiper-slide">
          <SlideCenter>
            <span className="text-4xl sm:text-5xl text-center font-bold mb-8 text-gray-900">
              Top Notch Features
            </span>
            <ul className="flex flex-wrap text-sm sm:text-lg md:mx-auto md:max-w-screen-sm text-gray-900 font-medium">
              {[
                'Library Agnostic',
                'Mutation Observer',
                'Flexbox Layout',
                'Full True RTL Support',
                'Multi Row Slides Layout',
                '3D Effects',
                'Two-wayControl',
                'Full Navigation Control',
                'Rich API',
                'Most Flexible Slides Layout Grid',
                'Parallax Transitions',
                'Images Lazy Loading',
                'Virtual Slides',
                'And many more ...',
              ].map((text, index) => (
                <li key={index} className="w-1/2 flex items-center my-1">
                  <svg
                    className="text-primary mr-2 flex-shrink-0"
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
        <div className="swiper-slide swiper-slide-gallery bg-black">
          <SlideCenter
            bgColor="bg-primary bg-opacity-20"
            className="text-white pt-10"
          >
            <span className="text-4xl sm:text-5xl text-center font-bold mb-8">
              Build Complex Touch Galleries
            </span>
            <div
              className="swiper-container swiper-gallery-top rounded-lg shadow-md"
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
                    className="swiper-slide rounded-md shadow bg-cover bg-center"
                  />
                ))}
              </div>
            </div>
          </SlideCenter>
        </div>
        <div className="swiper-slide">
          <SlideCenter className="items-center">
            <div className="text-4xl sm:text-5xl font-bold text-gray-900 w-full text-center">
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
  );
}
