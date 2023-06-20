import React, { useRef } from 'react';
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
import { useIsomorphicLayoutEffect } from '@/hooks/useIsomorphicLayoutEffect';

Swiper.use([
  Navigation,
  Pagination,
  A11y,
  EffectCreative,
  EffectCards,
  EffectFlip,
  Controller,
]);

const slidesBgs = ['#ce1111', '#008cff', '#0ab86f', '#d37a07', '#76a30c'];

const MainSlide = ({ className, children }) => {
  return (
    <div
      className={`swiper-slide !flex !h-auto origin-top flex-col items-center justify-center rounded-3xl bg-surface-1 p-8 md:!h-full md:bg-surface-2 ${
        className || ''
      }`}
    >
      <div className="header-swiper-shadow pointer-events-none absolute left-0 top-0 z-30 h-full w-full bg-black bg-opacity-20 opacity-0 dark:bg-opacity-30" />
      {children}
    </div>
  );
};
const DemoSlide = ({ index }) => {
  return (
    <div
      className="swiper-slide !flex items-center justify-center rounded-2xl font-bold text-white"
      style={{
        background: slidesBgs[index],
      }}
    >
      Slide {index + 1}
    </div>
  );
};

export default function HomeSlider() {
  const isMobile = useRef(false);
  const swiperMain = useRef(null);
  const swiperCards = useRef(null);
  const swiperFlip = useRef(null);
  const swiperCreative1 = useRef(null);
  const swiperCreative2 = useRef(null);

  const getCreativeTranslates = () => {
    const w = window.innerWidth;
    isMobile.current = w < 768;
    return {
      prev: {
        translate: w < 768 ? ['-120%', 0, 0] : [0, -12, -1],
        scale: w < 768 ? 1 : 0.92,
      },
      next: {
        translate: w < 768 ? [0, -12, -1] : ['120%', 0, 0],
        scale: w < 768 ? 0.92 : 1,
      },
    };
  };

  const createSwipers = () => {
    const { prev, next } = getCreativeTranslates();
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
          translate: prev.translate,
          rotate: [0, 0, 0],
          scale: prev.scale,
        },
        next: {
          shadow: false,
          translate: next.translate,
          scale: next.scale,
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
            const isM = isMobile.current;
            const setShadowOpacity = isM ? progress < 0 : progress > 0;

            if (setShadowOpacity) {
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
    swiperCreative1.current = new Swiper('.header-swiper-creative-1', {
      nested: true,
      effect: 'creative',
      creativeEffect: {
        prev: {
          shadow: true,
          translate: [0, 0, -800],
          rotate: [180, 0, 0],
        },
        next: {
          shadow: true,
          translate: [0, 0, -800],
          rotate: [-180, 0, 0],
        },
      },
      createElements: true,
      pagination: true,
      resistanceRatio: 0,
    });
    swiperCreative2.current = new Swiper('.header-swiper-creative-2', {
      nested: true,
      effect: 'creative',
      creativeEffect: {
        prev: {
          shadow: true,
          origin: 'left center',
          translate: ['-5%', 0, -200],
          rotate: [0, 100, 0],
        },
        next: {
          origin: 'right center',
          translate: ['5%', 0, -200],
          rotate: [0, -100, 0],
        },
      },
      createElements: true,
      pagination: true,
      resistanceRatio: 0,
    });
    document.querySelector('.header-swiper-main').style.overflow = 'visible';
  };

  const onResize = () => {
    if (swiperMain.current && swiperMain.current.params) {
      const { prev, next } = getCreativeTranslates();
      Object.assign(swiperMain.current.params.creativeEffect.prev, prev);
      Object.assign(swiperMain.current.params.creativeEffect.next, next);
    }
  };

  const destroySwipers = () => {
    if (swiperCards.current) swiperCards.current.destroy();
    if (swiperFlip.current) swiperFlip.current.destroy();
    if (swiperCreative1.current) swiperCreative1.current.destroy();
    if (swiperCreative2.current) swiperCreative2.current.destroy();
    if (swiperMain.current) swiperMain.current.destroy();
  };

  useIsomorphicLayoutEffect(() => {
    createSwipers();
    window.addEventListener('resize', onResize);
    return () => {
      destroySwipers();
      window.removeEventListener('resize', onResize);
    };
  });
  return (
    <div
      className="swiper header-swiper-main !z-20 mt-8 max-w-[740px] md:!absolute md:bottom-12 md:right-6 md:top-4 md:mt-0 md:w-1/2 lg:right-8 lg:top-12 xl:right-10"
      style={{ '--swiper-theme-color': 'var(--color-primary)' }}
    >
      <div className="swiper-button-prev invisible !left-auto !right-full z-20 -mr-5 md:visible" />
      <div className="swiper-button-next invisible !left-full !right-auto z-20 -ml-5 md:visible" />
      <div
        className="swiper-pagination !-bottom-6"
        style={{
          '--swiper-pagination-bullet-inactive-color':
            'var(--color-on-surface)',
        }}
      />

      <div className="swiper-wrapper">
        <MainSlide>
          <div className="w-full text-center text-4xl font-bold lg:text-5xl">
            Endless Creativity
          </div>
          <div className="mt-8 w-full lg:grid lg:grid-cols-2 lg:gap-4 xl:gap-8">
            <div className="mx-auto max-w-[390px] space-y-2 lg:contents lg:space-y-0">
              <div className="relative mx-auto w-full rounded-2xl border border-outline-variant pb-[48%]">
                <video
                  className="absolute left-0 top-0 z-0 hidden h-full  w-full rounded-2xl object-cover dark:block"
                  src="/images/videos/carousel-dark.mp4"
                  poster="/images/videos/carousel-dark.jpg"
                  muted
                  autoPlay
                  loop
                />
                <video
                  className="absolute left-0 top-0 z-0 h-full w-full rounded-2xl object-cover dark:hidden"
                  src="/images/videos/carousel-light.mp4"
                  poster="/images/videos/carousel-light.jpg"
                  muted
                  autoPlay
                  loop
                />
              </div>
              <div className="relative mx-auto hidden w-full rounded-2xl border border-outline-variant pb-[48%] lg:block">
                <video
                  className="absolute left-0 top-0 z-0 hidden h-full w-full rounded-2xl object-cover dark:block"
                  src="/images/videos/panorama-dark.mp4"
                  poster="/images/videos/panorama-dark.jpg"
                  muted
                  autoPlay
                  loop
                />
                <video
                  className="absolute left-0 top-0 z-0 h-full w-full rounded-2xl object-cover dark:hidden"
                  src="/images/videos/panorama-light.mp4"
                  poster="/images/videos/panorama-light.jpg"
                  muted
                  autoPlay
                  loop
                />
              </div>
              <div className="relative mx-auto w-full rounded-2xl border border-outline-variant pb-[48%]">
                <video
                  className="absolute left-0 top-0 z-0 h-full w-full rounded-2xl object-cover"
                  src="/images/videos/fashion.mp4"
                  poster="/images/videos/fashion.jpg"
                  muted
                  autoPlay
                  loop
                />
              </div>
              <div className="relative mx-auto hidden w-full rounded-2xl border border-outline-variant pb-[48%] lg:block">
                <video
                  className="absolute left-0 top-0 z-0 hidden h-full w-full rounded-2xl object-cover dark:block"
                  src="/images/videos/triple-dark.mp4"
                  poster="/images/videos/triple-dark.jpg"
                  muted
                  autoPlay
                  loop
                />
                <video
                  className="absolute left-0 top-0 z-0 h-full w-full rounded-2xl object-cover dark:hidden"
                  src="/images/videos/triple-light.mp4"
                  poster="/images/videos/triple-light.jpg"
                  muted
                  autoPlay
                  loop
                />
              </div>
            </div>
          </div>
        </MainSlide>
        <MainSlide>
          <span className="text-center text-4xl font-bold lg:text-5xl">
            Build Complex Touch Galleries
          </span>
          <div className="mt-8 grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 lg:gap-8">
            <div
              className="swiper header-swiper-cards h-40 w-4/5 max-w-full rounded-lg lg:w-60"
              style={{ '--swiper-theme-color': '#fff' }}
            >
              {Array.from({ length: 5 }).map((el, index) => (
                <DemoSlide index={index} key={index} />
              ))}
            </div>
            <div
              className="swiper header-swiper-flip h-40 w-4/5 max-w-full rounded-lg lg:w-60"
              style={{ '--swiper-theme-color': '#fff' }}
            >
              {Array.from({ length: 5 }).map((el, index) => (
                <DemoSlide index={index} key={index} />
              ))}
            </div>
            <div
              className="swiper header-swiper-creative-1 !hidden h-40 w-60 max-w-full rounded-lg lg:!block"
              style={{ '--swiper-theme-color': '#fff' }}
            >
              {Array.from({ length: 5 }).map((el, index) => (
                <DemoSlide index={index} key={index} />
              ))}
            </div>
            <div
              className="swiper header-swiper-creative-2 !hidden h-40 w-60 max-w-full rounded-lg lg:!block"
              style={{ '--swiper-theme-color': '#fff' }}
            >
              {Array.from({ length: 5 }).map((el, index) => (
                <DemoSlide index={index} key={index} />
              ))}
            </div>
          </div>
        </MainSlide>

        <MainSlide>
          <div className="w-full text-center text-4xl font-bold lg:text-5xl">
            Start Using It Now
          </div>
          <div className="mt-8">
            <Link
              href="/get-started"
              className="inline-flex h-14 items-center justify-center rounded-[28px] bg-primary px-6 font-bold text-on-primary duration-200 hover:bg-primary-shade hover:no-underline active:rounded-xl"
            >
              Get Started
            </Link>
          </div>
        </MainSlide>
      </div>
    </div>
  );
}
