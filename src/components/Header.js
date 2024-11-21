import { DocSearch } from '@docsearch/react';
import Link from 'next/link';
import { useRef, useState, useEffect } from 'react';
import GithubStats from './GithubStats';
import { useIsomorphicLayoutEffect } from '@/hooks/useIsomorphicLayoutEffect';
import TogglesRibbon from './TogglesRibbon';
import BlackFridayRibbon from './BlackFridayRibbon';

function updateColorTheme() {
  if (
    localStorage.theme === 'dark' ||
    (!('theme' in localStorage) &&
      window.matchMedia('(prefers-color-scheme: dark)').matches)
  ) {
    document.documentElement.classList.add('dark', 'changing-theme');
  } else {
    document.documentElement.classList.remove('dark', 'changing-theme');
  }
  window.setTimeout(() => {
    document.documentElement.classList.remove('changing-theme');
  });
}

export default function Header() {
  const [setting, setSetting] = useState('system');
  const [navOpened, setNavOpened] = useState(false);
  const initial = useRef(true);

  useIsomorphicLayoutEffect(() => {
    const theme = localStorage.theme;
    if (theme === 'light' || theme === 'dark') {
      setSetting(theme);
    }
  }, []);

  useIsomorphicLayoutEffect(() => {
    if (setting === 'system') {
      localStorage.removeItem('theme');
    } else if (setting === 'light' || setting === 'dark') {
      localStorage.theme = setting;
    }
    if (initial.current) {
      initial.current = false;
    } else {
      updateColorTheme();
    }
  }, [setting]);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    mediaQuery.addEventListener('change', updateColorTheme);

    function onStorage() {
      updateColorTheme();
      const theme = localStorage.theme;
      if (theme === 'light' || theme === 'dark') {
        setSetting(theme);
      } else {
        setSetting('system');
      }
    }
    window.addEventListener('storage', onStorage);

    return () => {
      mediaQuery.removeEventListener('change', updateColorTheme);
      window.removeEventListener('storage', onStorage);
    };
  }, []);

  const onNavClick = (e) => {
    if (e.target && e.target.closest('a')) {
      setNavOpened(false);
    }
  };

  return (
    <>
      <BlackFridayRibbon />
      <header className="sticky top-0 z-50 h-16 bg-surface-2 py-6">
        <div className="mx-auto flex h-full items-center justify-between px-4 sm:px-6">
          {/* Left */}
          <Link
            href="/"
            className="relative flex flex-shrink-0 items-center text-inherit hover:no-underline dark:text-white"
          >
            <img
              src="/images/swiper-logo.svg"
              className="h-12 w-12"
              alt="Swiper"
            />

            <span className="header-swiper-name ml-2 text-2xl font-bold text-primary">
              Swiper
            </span>
            <span className="header-swiper-version relative top-px ml-2 font-mono text-[10px] text-on-surface opacity-75">
              v{process.env.swiperReleaseVersion}
            </span>
          </Link>

          {/* Nav */}
          <nav className="flex items-center sm:space-x-2">
            <div
              className={`fixed right-0 top-0 z-40 h-full w-full bg-black bg-opacity-10 md:!hidden ${
                navOpened ? 'block' : 'hidden'
              }`}
              onClick={() => setNavOpened(false)}
            />
            <DocSearch
              appId="K52IIJWQL1"
              indexName="swiperjs"
              apiKey="997edea3f9d162f3ffb7442f399aa8c3"
            />
            <ul
              className={`fixed right-0 top-0 z-50 h-screen w-56 items-center overflow-auto  bg-surface-3 md:relative md:top-0 md:z-auto md:h-auto md:w-auto md:space-x-1 md:overflow-visible md:rounded-none md:bg-transparent lg:space-x-2 ${
                navOpened ? 'block' : 'hidden'
              } md:!flex`}
              onClick={onNavClick}
            >
              <li className="group relative border-b border-outline px-3 py-4 md:border-none md:p-0">
                <div className="flex h-7 cursor-pointer items-center rounded-md px-3 text-sm font-medium text-primary hover:bg-primary hover:text-on-primary">
                  Docs
                </div>
                <ul className="right-0 top-full space-y-1 whitespace-nowrap rounded-xl bg-surface-3 px-3 pb-0 pt-4 text-sm group-hover:block md:absolute md:hidden md:py-4">
                  <li>
                    <Link
                      href="/get-started"
                      className="block rounded-md px-3 py-1 font-medium leading-6 hover:bg-primary hover:text-on-primary hover:no-underline"
                    >
                      Getting Started
                    </Link>
                  </li>
                  <li className="!my-3 hidden h-px bg-outline-variant md:block" />
                  <li>
                    <Link
                      href="/swiper-api"
                      className="block rounded-md px-3 py-1 font-medium leading-6 hover:bg-primary hover:text-on-primary hover:no-underline"
                    >
                      Swiper Core / API
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/element"
                      className="block rounded-md px-3 py-1 font-medium leading-6 hover:bg-primary hover:text-on-primary hover:no-underline"
                    >
                      Swiper Element
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/react"
                      className="block rounded-md px-3 py-1 font-medium leading-6 hover:bg-primary hover:text-on-primary hover:no-underline"
                    >
                      Swiper React
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/vue"
                      className="block rounded-md px-3 py-1 font-medium leading-6 hover:bg-primary hover:text-on-primary hover:no-underline"
                    >
                      Swiper Vue
                    </Link>
                  </li>
                  <li className="!my-3 hidden h-px bg-outline-variant md:block" />
                  <li>
                    <Link
                      href="/changelog"
                      className="block rounded-md px-3 py-1 font-medium leading-6 hover:bg-primary hover:text-on-primary hover:no-underline"
                    >
                      Changelog
                    </Link>
                  </li>
                </ul>
              </li>
              <li className="group relative border-b border-outline px-3 py-4 md:border-none md:p-0">
                <div className="flex h-7 cursor-pointer items-center rounded-md px-3 text-sm font-medium text-primary hover:bg-primary hover:text-on-primary">
                  Resources
                </div>
                <ul className="right-0 top-full space-y-1 whitespace-nowrap rounded-xl bg-surface-3 px-3 pb-0 pt-4 text-sm group-hover:block md:absolute md:hidden md:py-4">
                  <li>
                    <Link
                      href="/demos"
                      className="block rounded-md px-3 py-1 font-medium leading-6 hover:bg-primary hover:text-on-primary hover:no-underline"
                    >
                      Demos
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/plugins"
                      className="block rounded-md px-3 py-1 font-medium leading-6 hover:bg-primary hover:text-on-primary hover:no-underline"
                    >
                      Plugins
                    </Link>
                  </li>
                  <li className="!my-3 hidden h-px bg-outline-variant md:block" />
                  <li>
                    <Link
                      href="/blog"
                      className="block rounded-md px-3 py-1 font-medium leading-6 hover:bg-primary hover:text-on-primary hover:no-underline"
                    >
                      Blog
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/sponsors"
                      className="block rounded-md px-3 py-1 font-medium leading-6 hover:bg-primary hover:text-on-primary hover:no-underline"
                    >
                      Sponsors
                    </Link>
                  </li>
                </ul>
              </li>
              <li className="group relative border-b border-outline px-3 py-4 md:border-none md:p-0">
                <div className="flex h-7 cursor-pointer items-center rounded-md px-3 text-sm font-medium text-primary hover:bg-primary hover:text-on-primary">
                  Premium
                </div>
                <ul className="right-0 top-full space-y-1 whitespace-nowrap rounded-xl bg-surface-3 px-3 pb-0 pt-4 text-sm group-hover:block md:absolute md:hidden md:py-4">
                  <li>
                    <Link
                      href="https://uiinitiative.com"
                      target="_blank"
                      className="group/link flex items-center rounded-md px-3 py-1 font-medium leading-6 hover:bg-primary hover:text-on-primary hover:no-underline"
                    >
                      <img
                        src="/images/uiinitiative-logo.svg"
                        className="mr-2 hidden h-6 w-6 group-hover/link:block dark:block dark:group-hover/link:hidden"
                      />
                      <img
                        src="/images/uiinitiative-logo-black.svg"
                        className="mr-2 h-6 w-6 group-hover/link:hidden dark:hidden dark:group-hover/link:block"
                      />
                      <span className="mr-6">UI Initiative</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="https://studio.swiperjs.com"
                      target="_blank"
                      className="flex items-center rounded-md px-3 py-1 font-medium leading-6 hover:bg-primary hover:text-on-primary hover:no-underline"
                    >
                      <img
                        src="/images/swiper-studio-logo.svg"
                        className="mr-2 h-6 w-6"
                      />
                      <span className="mr-6">Swiper Studio</span>
                    </Link>
                  </li>
                </ul>
              </li>
              {/* <li className="group relative border-b border-outline px-3 py-4 md:border-none md:p-0">
              <Link
                href="/blog"
                className="flex h-7 cursor-pointer items-center rounded-md px-3 text-sm font-medium text-primary hover:bg-primary hover:text-on-primary hover:no-underline"
              >
                Blog
              </Link>
            </li> */}
              <li className="group relative px-3 py-4 md:p-0">
                <Link
                  href="https://github.com/nolimits4web/swiper"
                  className="flex h-7 cursor-pointer items-center rounded-md px-3 text-sm font-medium text-primary hover:bg-primary hover:text-on-primary hover:no-underline"
                  rel="noopener"
                  target="_blank"
                >
                  <GithubStats />
                </Link>
              </li>
            </ul>
            <button
              type="button"
              className="flex h-7 cursor-pointer items-center rounded-md px-3 text-sm font-medium text-primary hover:bg-primary hover:text-on-primary md:hidden"
              onClick={() => {
                setNavOpened(true);
              }}
            >
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                height="24"
                viewBox="0 -960 960 960"
                width="24"
                fill="currentColor"
              >
                <path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z" />
              </svg>
            </button>
            <div className="group relative">
              <div className="flex h-7 cursor-pointer items-center rounded-md px-3 text-sm font-medium text-primary hover:bg-primary hover:text-on-primary">
                <svg
                  className="h-6 w-6 dark:hidden"
                  xmlns="http://www.w3.org/2000/svg"
                  height="24"
                  viewBox="0 -960 960 960"
                  width="24"
                  fill="currentColor"
                >
                  <path d="M480-280q-83 0-141.5-58.5T280-480q0-83 58.5-141.5T480-680q83 0 141.5 58.5T680-480q0 83-58.5 141.5T480-280ZM80-440q-17 0-28.5-11.5T40-480q0-17 11.5-28.5T80-520h80q17 0 28.5 11.5T200-480q0 17-11.5 28.5T160-440H80Zm720 0q-17 0-28.5-11.5T760-480q0-17 11.5-28.5T800-520h80q17 0 28.5 11.5T920-480q0 17-11.5 28.5T880-440h-80ZM480-760q-17 0-28.5-11.5T440-800v-80q0-17 11.5-28.5T480-920q17 0 28.5 11.5T520-880v80q0 17-11.5 28.5T480-760Zm0 720q-17 0-28.5-11.5T440-80v-80q0-17 11.5-28.5T480-200q17 0 28.5 11.5T520-160v80q0 17-11.5 28.5T480-40ZM226-678l-43-42q-12-11-11.5-28t11.5-29q12-12 29-12t28 12l42 43q11 12 11 28t-11 28q-11 12-27.5 11.5T226-678Zm494 495-42-43q-11-12-11-28.5t11-27.5q11-12 27.5-11.5T734-282l43 42q12 11 11.5 28T777-183q-12 12-29 12t-28-12Zm-42-495q-12-11-11.5-27.5T678-734l42-43q11-12 28-11.5t29 11.5q12 12 12 29t-12 28l-43 42q-12 11-28 11t-28-11ZM183-183q-12-12-12-29t12-28l43-42q12-11 28.5-11t27.5 11q12 11 11.5 27.5T282-226l-42 43q-11 12-28 11.5T183-183Z" />
                </svg>
                <svg
                  className="hidden h-6 w-6 dark:block"
                  xmlns="http://www.w3.org/2000/svg"
                  height="24"
                  viewBox="0 -960 960 960"
                  width="24"
                  fill="currentColor"
                >
                  <path d="M480-120q-150 0-255-105T120-480q0-150 105-255t255-105q14 0 27.5 1t26.5 3q-41 29-65.5 75.5T444-660q0 90 63 153t153 63q55 0 101-24.5t75-65.5q2 13 3 26.5t1 27.5q0 150-105 255T480-120Z" />
                </svg>
              </div>
              <ul className="absolute right-0 top-full hidden space-y-1 whitespace-nowrap rounded-xl bg-surface-3 px-3 py-4 text-sm group-hover:block">
                <li>
                  <button
                    type="button"
                    onClick={() => setSetting('light')}
                    className="flex w-full items-center space-x-3 rounded-md px-3 py-1 font-medium leading-6 text-primary hover:bg-primary hover:text-on-primary hover:no-underline"
                  >
                    <svg
                      className="h-6 w-6"
                      xmlns="http://www.w3.org/2000/svg"
                      height="24"
                      viewBox="0 -960 960 960"
                      width="24"
                      fill="currentColor"
                    >
                      <path d="M480-280q-83 0-141.5-58.5T280-480q0-83 58.5-141.5T480-680q83 0 141.5 58.5T680-480q0 83-58.5 141.5T480-280ZM80-440q-17 0-28.5-11.5T40-480q0-17 11.5-28.5T80-520h80q17 0 28.5 11.5T200-480q0 17-11.5 28.5T160-440H80Zm720 0q-17 0-28.5-11.5T760-480q0-17 11.5-28.5T800-520h80q17 0 28.5 11.5T920-480q0 17-11.5 28.5T880-440h-80ZM480-760q-17 0-28.5-11.5T440-800v-80q0-17 11.5-28.5T480-920q17 0 28.5 11.5T520-880v80q0 17-11.5 28.5T480-760Zm0 720q-17 0-28.5-11.5T440-80v-80q0-17 11.5-28.5T480-200q17 0 28.5 11.5T520-160v80q0 17-11.5 28.5T480-40ZM226-678l-43-42q-12-11-11.5-28t11.5-29q12-12 29-12t28 12l42 43q11 12 11 28t-11 28q-11 12-27.5 11.5T226-678Zm494 495-42-43q-11-12-11-28.5t11-27.5q11-12 27.5-11.5T734-282l43 42q12 11 11.5 28T777-183q-12 12-29 12t-28-12Zm-42-495q-12-11-11.5-27.5T678-734l42-43q11-12 28-11.5t29 11.5q12 12 12 29t-12 28l-43 42q-12 11-28 11t-28-11ZM183-183q-12-12-12-29t12-28l43-42q12-11 28.5-11t27.5 11q12 11 11.5 27.5T282-226l-42 43q-11 12-28 11.5T183-183Z" />
                    </svg>
                    <span>Light</span>
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => setSetting('dark')}
                    className="flex w-full items-center space-x-3 rounded-md px-3 py-1 font-medium leading-6 text-primary hover:bg-primary hover:text-on-primary hover:no-underline"
                  >
                    <svg
                      className="h-6 w-6"
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                      height="24"
                      viewBox="0 -960 960 960"
                      width="24"
                    >
                      <path d="M480-120q-150 0-255-105T120-480q0-150 105-255t255-105q14 0 27.5 1t26.5 3q-41 29-65.5 75.5T444-660q0 90 63 153t153 63q55 0 101-24.5t75-65.5q2 13 3 26.5t1 27.5q0 150-105 255T480-120Z" />
                    </svg>
                    <span>Dark</span>
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => setSetting('system')}
                    className="flex w-full items-center space-x-3 rounded-md px-3 py-1 font-medium leading-6 text-primary hover:bg-primary hover:text-on-primary hover:no-underline"
                  >
                    <svg
                      className="h-6 w-6"
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                      height="24"
                      viewBox="0 -960 960 960"
                      width="24"
                    >
                      <path d="M80-160v-120h80v-440q0-33 23.5-56.5T240-800h600v80H240v440h240v120H80Zm520 0q-17 0-28.5-11.5T560-200v-400q0-17 11.5-28.5T600-640h240q17 0 28.5 11.5T880-600v400q0 17-11.5 28.5T840-160H600Zm40-120h160v-280H640v280Z" />
                    </svg>
                    <span>System</span>
                  </button>
                </li>
              </ul>
            </div>
          </nav>
        </div>
      </header>
    </>
  );
}
