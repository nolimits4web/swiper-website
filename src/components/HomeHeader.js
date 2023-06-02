import React from 'react';
import Link from 'next/link';

import menuList from '@/shared/menu-list';
import GithubStats from '@/components/GithubStats';
import Logo from '@/img/logo.svg';
import LogoS from '@/img/logo-s-shape.svg';
import HomeSlider from './HomeSlider';

export default function HomeHeader() {
  return (
    <div className="relative overflow-hidden">
      <LogoS className="absolute left-1/2 top-1/2 -ml-[30%] h-[120%] w-auto -translate-x-1/2 -translate-y-1/2 opacity-10 md:-ml-[10%]" />

      <div className="mx-auto max-w-[90rem] px-4 pb-16 pt-8 sm:px-6 lg:flex lg:px-8 lg:pt-16 xl:px-10">
        {/* Left */}
        <div className="relative z-10 flex w-full flex-shrink-0 flex-col items-center text-center lg:block lg:max-w-[500px] lg:text-left xl:mr-16">
          <Logo
            className="swiper-logo h-32 w-32 flex-shrink-0 rounded-full lg:h-40 lg:w-40"
            alt="Swiper"
          />

          <div className="mt-8 text-5xl font-semibold text-primary md:text-6xl">
            Swiper
          </div>
          <div className="my-2 mt-4 max-w-2xl text-2xl font-medium tracking-tight text-primary sm:text-4xl md:text-4xl md:leading-tight">
            The Most Modern Mobile Touch Slider
          </div>
          <nav className="mt-4 flex flex-wrap justify-center font-medium lg:mt-8 lg:justify-start">
            {menuList.map(({ name, link }) => (
              <Link key={link} href={link} className="mr-4 text-sm text-black hover:!text-primary hover:no-underline dark:text-white">
                {name}
              </Link>
            ))}
          </nav>
          <div className="my-2 text-sm text-black dark:text-white lg:my-4">
            <span className="opacity-50">
              MIT Licensed, v{process.env.swiperReleaseVersion} released on{' '}
              {process.env.swiperReleaseDate}{' '}
            </span>{' '}
            <span> </span>
            <Link href="/changelog" className="text-black hover:text-primary hover:no-underline dark:text-white dark:hover:text-primary">
              Changelog
            </Link>
          </div>
          <div className="flex justify-center lg:justify-start">
            <GithubStats />
          </div>
        </div>

        {/* Right */}
        <div
          className="home-slider-wrap mt-8 min-w-0 flex-shrink-[10] md:mx-12 lg:mt-0 xl:mx-0"
          style={{
            perspective: '1200px',
            '--swiper-theme-color': '#0080ff',
          }}
        >
          <HomeSlider />
        </div>
      </div>
    </div>
  );
}
