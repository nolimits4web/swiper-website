import React from 'react';
import Link from 'next/link';

import menuList from 'src/shared/menu-list';
import { ReactComponent as Logo } from '@/img/logo-white.svg';

export default function HomeHeader() {
  return (
    <div className="relative overflow-hidden bg-primary">
      <div className="mx-auto max-w-[90rem] px-4 pt-8 pb-16 sm:px-6 lg:flex lg:px-8 lg:pt-16 xl:px-10">
        {/* Left */}
        <div className="relative z-10 flex w-full flex-shrink-0 flex-col items-center text-center lg:block lg:text-center xl:mr-16">
          <Logo
            className="h-32 w-32 flex-shrink-0 rounded-full lg:h-40 lg:w-40 mx-auto"
            alt="Swiper"
          />

          <div className="mt-8 text-5xl font-bold text-white md:text-6xl">
            Swiper 7
          </div>
          <div className="my-2 mt-4 text-2xl font-bold tracking-tight text-white sm:text-4xl md:text-4xl md:leading-tight">
            Documentation
          </div>
          <nav className="mt-4 flex flex-wrap justify-center font-medium lg:mt-8">
            {menuList.map(({ name, link }) => (
              <Link key={link} href={link}>
                <a className="mr-4 text-white">{name}</a>
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
}
