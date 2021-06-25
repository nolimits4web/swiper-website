import React, { useEffect, useRef } from 'react';
import Link from 'next/link';

import menuList from 'src/shared/menu-list';
import GithubStats from '@/components/GithubStats';
import { ReactComponent as Logo } from '@/img/logo.svg';
import HomeSlider from './HomeSlider';

export default function HomeHeader() {
  return (
    <div className="relative overflow-hidden">
      <div className="mx-auto max-w-6xl px-4 pt-8 lg:pt-16 pb-16 lg:flex">
        {/* Left */}
        <div className="flex-shrink-0 relative z-10 flex flex-col items-center w-full text-center xl:mr-16 lg:text-left lg:max-w-[500px] lg:block">
          <Logo
            className="swiper_logo rounded-full flex-shrink-0 w-32 h-32 lg:w-40 lg:h-40"
            alt="Swiper"
          />

          <div className="text-5xl md:text-6xl font-extrabold text-primary mt-8">
            Swiper
          </div>
          <div className="text-2xl sm:text-4xl md:text-4xl my-2 font-black text-black md:leading-tight max-w-2xl tracking-tight">
            The Most Modern Mobile Touch Slider
          </div>
          <nav className="mt-4 lg:mt-8 font-medium flex flex-wrap justify-center lg:justify-start">
            {menuList.map(({ name, link }) => (
              <Link key={link} href={link}>
                <a className="mr-4">{name}</a>
              </Link>
            ))}
          </nav>
          <div className="text-gray-700 text-sm my-2 lg:my-4">
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
          <div className="flex justify-center lg:justify-start">
            <GithubStats />
          </div>
        </div>

        {/* Right */}
        <div
          className="flex-shrink-[10] min-w-0 md:mx-12 xl:mx-0 mt-8 lg:mt-0"
          style={{ perspective: '1200px' }}
        >
          <HomeSlider />
        </div>
      </div>
    </div>
  );
}
