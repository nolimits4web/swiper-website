import menuList from '../shared/menu-list';
import GithubStats from './GithubStats';
import Link from 'next/link';
import { ReactComponent as Logo } from '@/img/logo.svg';
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
    <header className="sticky top-0 z-50 h-20 border-b border-b-black border-opacity-10 bg-white bg-opacity-80 py-6 backdrop-blur-lg dark:border-b-white dark:border-opacity-5 dark:bg-dark-1 dark:bg-opacity-80">
      <div className="mx-auto flex h-full max-w-[90rem] items-center px-4 sm:px-6 lg:px-8 xl:px-10">
        <Link href="/">
          <a className="relative flex flex-shrink-0 items-center">
            <Logo className="h-16 w-16 rounded-full" alt="Swiper" />
          </a>
        </Link>

        <div className="ml-4 hidden md:block">
          <nav className="flex">
            {menuList.map(({ name, link }) => (
              <Link key={link} href={link}>
                <a className="mr-4 text-sm font-medium text-black hover:!text-primary hover:no-underline dark:text-white">
                  {name}
                </a>
              </Link>
            ))}
          </nav>
          <div className="mt-2 flex items-center">
            <span className="mr-4 text-xs">
              v{process.env.swiperReleaseVersion}
            </span>
            <a
              href="https://www.patreon.com/swiperjs"
              target="_blank"
              className="inline-flex items-center text-xs font-medium text-black opacity-60 hover:!text-primary hover:no-underline hover:opacity-100 dark:text-white"
              onClick={() => trackOutbound('https://www.patreon.com/swiperjs')}
            >
              <PatreonLogo className="mr-1 h-3 w-3" />
              <span>Support Swiper</span>
            </a>
          </div>
        </div>
        <div className="group relative ml-auto mr-4">
          <button
            className="flex items-center text-black outline-none hover:!text-primary dark:text-white md:hidden"
            ref={buttonElRef}
            onClick={showMenu}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="pointer-events-none h-6 w-6"
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
          <nav className="absolute right-0 top-full z-10 hidden w-60 divide-y overflow-hidden rounded-xl bg-white shadow-lg group-focus-within:block">
            {menuList.map(({ name, link }) => (
              <Link key={link} href={link}>
                <a
                  className="mr-4 block w-full py-2 px-4 text-base font-medium text-gray-500 duration-100 hover:bg-primary hover:bg-opacity-10 hover:text-primary hover:no-underline"
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
              className="mr-4 block flex w-full items-center py-2 px-4 text-base font-medium text-gray-500 duration-100 hover:bg-primary hover:bg-opacity-10 hover:text-primary hover:no-underline"
              onClick={() => {
                trackOutbound('https://www.patreon.com/swiperjs');
                hideMenu();
              }}
              onPointerDown={(e) => e.preventDefault()}
            >
              <PatreonLogo className="mr-1 h-4 w-4 text-[#FF424D]" />
              <span>Support Swiper</span>
            </a>
          </nav>
        </div>
        <GithubStats white responsive className="md:ml-auto" />
        <div className="relative ml-4 flex">
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
