import React, { useEffect, useRef } from 'react';
import Link from 'next/link';

import menuList from 'src/shared/menu-list';
import GithubStats from '@/components/GithubStats';
import { ReactComponent as Logo } from '@/img/logo.svg';
import HomeSlider from './HomeSlider';

export default function HomeHeader() {
  return (
    <div className="relative overflow-hidden">
      <div className="max-w-6xl px-4 pt-8 pb-16 mx-auto lg:pt-16 lg:flex">
        {/* Left */}
        <div className="flex-shrink-0 relative z-10 flex flex-col items-center w-full text-center xl:mr-16 lg:text-left lg:max-w-[500px] lg:block">
          <Logo
            className="flex-shrink-0 w-32 h-32 rounded-full swiper_logo lg:w-40 lg:h-40"
            alt="Swiper"
          />

          <div className="mt-8 text-5xl font-bold md:text-6xl text-primary">
            Swiper
          </div>
          <div className="max-w-2xl my-2 mt-4 text-2xl font-bold tracking-tight text-black sm:text-4xl md:text-4xl md:leading-tight">
            The Most Modern Mobile Touch Slider
          </div>
          <nav className="flex flex-wrap justify-center mt-4 font-medium lg:mt-8 lg:justify-start">
            {menuList.map(({ name, link }) => (
              <Link key={link} href={link}>
                <a className="mr-4">{name}</a>
              </Link>
            ))}
          </nav>
          <div className="my-2 text-sm text-gray-700 lg:my-4">
            MIT Licensed, v{process.env.swiperReleaseVersion} released on{' '}
            {process.env.swiperReleaseDate} |<span> </span>
            <Link href="/changelog">
              <a>Changelog</a>
            </Link>
          </div>
          <div className="flex justify-center lg:justify-start">
            <GithubStats />
          </div>
        </div>

        {/* Right */}
        <div
          className="flex-shrink-[10] min-w-0 md:mx-12 xl:mx-0 mt-8 lg:mt-0 home-slider-wrap"
          style={{
            '--swiper-theme-color': '#6332f6',
            perspective: '1200px',
          }}
        >
          <HomeSlider />
        </div>
      </div>
    </div>
  );
}
