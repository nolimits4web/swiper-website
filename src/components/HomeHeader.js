import React from 'react';
import Link from 'next/link';

import menuList from 'src/shared/menu-list';
import GithubStats from '@/components/GithubStats';
import { ReactComponent as Logo } from '@/img/logo-white.svg';
import HomeSlider from './HomeSlider';
import { ThemeToggle } from './ThemeToggle';

export default function HomeHeader() {
  return (
    <div className="relative overflow-hidden bg-primary">
      <div className="max-w-[90rem] px-4 sm:px-6 lg:px-8 xl:px-10 pt-8 pb-16 mx-auto lg:pt-16 lg:flex">
        {/* Left */}
        <div className="flex-shrink-0 relative z-10 flex flex-col items-center w-full text-center xl:mr-16 lg:text-left lg:max-w-[500px] lg:block">
          <Logo
            className="flex-shrink-0 w-32 h-32 rounded-full lg:w-40 lg:h-40"
            alt="Swiper"
          />

          <div className="mt-8 text-5xl font-bold md:text-6xl text-white">
            Swiper
          </div>
          <div className="max-w-2xl my-2 mt-4 text-2xl font-bold tracking-tight text-white sm:text-4xl md:text-4xl md:leading-tight">
            The Most Modern Mobile Touch Slider
          </div>
          <nav className="flex flex-wrap justify-center mt-4 font-medium lg:mt-8 lg:justify-start">
            {menuList.map(({ name, link }) => (
              <Link key={link} href={link}>
                <a className="mr-4 text-white">{name}</a>
              </Link>
            ))}
          </nav>
          <div className="my-2 text-sm text-white lg:my-4">
            <span className="opacity-70">
              MIT Licensed, v{process.env.swiperReleaseVersion} released on{' '}
              {process.env.swiperReleaseDate}{' '}
            </span>{' '}
            <span> </span>
            <Link href="/changelog">
              <a className="text-white">Changelog</a>
            </Link>
          </div>
          <div className="flex justify-center lg:justify-start">
            <GithubStats white />

            <div className="relative ml-2">
              <ThemeToggle />
            </div>
          </div>
        </div>

        {/* Right */}
        <div
          className="flex-shrink-[10] min-w-0 md:mx-12 xl:mx-0 mt-8 lg:mt-0 home-slider-wrap"
          style={{
            perspective: '1200px',
            '--swiper-theme-color': '#fff',
          }}
        >
          <HomeSlider />
        </div>
      </div>
    </div>
  );
}
