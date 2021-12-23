import menuList from '../shared/menu-list';
import GithubStats from './GithubStats';
import Link from 'next/link';
import { ReactComponent as Logo } from '@/img/logo-white.svg';
import { ReactComponent as PatreonLogo } from '@/img/patreon-logo.svg';
import { useRef } from 'react';
import { trackOutbound } from 'src/shared/track-outbound';
import { ThemeToggle } from './ThemeToggle';

export default function Header() {
  const buttonElRef = useRef(null);
  const hideMenu = () => {
    if (document && document.activeElement) document.activeElement.blur();
  };
  const showMenu = () => {
    buttonElRef.current.focus();
  };
  return (
    <header className="bg-primary py-6 h-20 text-white">
      <div className="max-w-[90rem] mx-auto flex items-center h-full px-4 sm:px-6 lg:px-8 xl:px-10">
        <Link href="/">
          <a className="flex-shrink-0 relative flex items-center">
            <Logo className="rounded-full w-16 h-16" alt="Swiper" />
            <span className="min-w-0 text-xs font-medium opacity-70 absolute left-full top-0 text-white pointer-events-none -mt-1">
              v{process.env.swiperReleaseVersion}
            </span>
          </a>
        </Link>
        <Link href="/">
          <a className="md:hidden ml-2 text-4xl font-medium text-white hover:no-underline">
            Swiper
          </a>
        </Link>
        <div className="ml-4 hidden md:block">
          <nav className="flex">
            {menuList.map(({ name, link }) => (
              <Link key={link} href={link}>
                <a className="font-medium mr-4 text-white text-sm lg:text-base">
                  {name}
                </a>
              </Link>
            ))}
          </nav>
          <div className="-mb-3">
            <a
              href="https://www.patreon.com/swiperjs"
              target="_blank"
              className="text-white inline-flex items-center text-xs font-medium opacity-60 hover:opacity-100 hover:no-underline"
              onClick={() => trackOutbound('https://www.patreon.com/swiperjs')}
            >
              <PatreonLogo className="w-3 h-3 mr-1" />
              <span>Support Swiper</span>
            </a>
          </div>
        </div>
        <div className="group ml-auto mr-4 relative">
          <button
            className="md:hidden flex items-center outline-none"
            ref={buttonElRef}
            onClick={showMenu}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 pointer-events-none"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
          <nav className="hidden group-focus-within:block absolute overflow-hidden z-10 rounded-xl bg-white shadow-lg right-0 top-full w-60 divide-y">
            {menuList.map(({ name, link }) => (
              <Link key={link} href={link}>
                <a
                  className="font-medium mr-4 text-gray-500 hover:text-primary hover:bg-primary hover:bg-opacity-10 duration-100 block text-base py-2 px-4 w-full hover:no-underline"
                  onClick={hideMenu}
                  onPointerDown={(e) => e.preventDefault()}
                >
                  {name}
                </a>
              </Link>
            ))}
            <a
              href="https://www.patreon.com/swiperjs"
              target="_blank"
              className="font-medium mr-4 text-gray-500 hover:text-primary hover:bg-primary hover:bg-opacity-10 duration-100 block text-base py-2 px-4 w-full hover:no-underline flex items-center"
              onClick={() => {
                trackOutbound('https://www.patreon.com/swiperjs');
                hideMenu();
              }}
              onPointerDown={(e) => e.preventDefault()}
            >
              <PatreonLogo className="w-4 h-4 mr-1 text-[#FF424D]" />
              <span>Support Swiper</span>
            </a>
          </nav>
        </div>
        <GithubStats white responsive className="md:ml-auto" />
        <div className="relative">
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
