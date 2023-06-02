import Link from 'next/link';
import { useRef } from 'react';
import { trackOutbound } from '../shared/track-outbound';
import menuList from '../shared/menu-list';
import GithubStats from './GithubStats';
import Logo from '../img/logo.svg';
import PatreonLogo from '../img/patreon-logo.svg';
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
    <header className="sticky top-0 z-50 h-20 border-b border-b-black border-opacity-10 bg-white bg-opacity-80 py-6 backdrop-blur-lg dark:border-b-transparent dark:bg-dark-1 dark:bg-opacity-80">
      <div className="mx-auto flex h-full max-w-[90rem] items-center px-4 sm:px-6 lg:px-8 xl:px-10">
        <Link href="/" className="relative flex flex-shrink-0 items-center">
          <Logo className="swiper-logo h-16 w-16 rounded-full" alt="Swiper" />
        </Link>

        <div className="ml-4 hidden md:block">
          <nav className="flex">
            {menuList.map(({ name, link }) => (
              <Link key={link} href={link} className="mr-4 text-sm font-medium text-black hover:!text-primary hover:no-underline dark:text-white">
                {name}
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
          <nav className="absolute right-0 top-full z-10 hidden w-60 divide-y divide-black !divide-opacity-5 overflow-hidden rounded-xl bg-white shadow-lg ring-1 ring-gray-900/10 group-focus-within:block dark:divide-white dark:bg-dark-0 dark:ring-white/10">
            {menuList.map(({ name, link }) => (
              <Link key={link} href={link} className="mr-4 block w-full px-4 py-2 text-sm font-medium text-gray-500 duration-100 hover:bg-primary hover:bg-opacity-10 hover:no-underline dark:text-white"
              onClick={hideMenu}
              onPointerDown={(e) => e.preventDefault()}>
                {name}
              </Link>
            ))}
            <a
              href="https://www.patreon.com/swiperjs"
              target="_blank"
              className="mr-4 flex w-full items-center px-4 py-2 text-sm font-medium text-gray-500 duration-100 hover:bg-primary hover:bg-opacity-10 hover:no-underline dark:text-white"
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
