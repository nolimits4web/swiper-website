import { DocSearch } from '@docsearch/react';
import Link from 'next/link';
import { useRef, useState, useEffect } from 'react';
import GithubStats from './GithubStats';
import { useIsomorphicLayoutEffect } from '@/hooks/useIsomorphicLayoutEffect';
import PaneFlowBanner from './PaneFlowBanner';
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

const Dropdown = ({ children }) => {
  return (
    <ul className="left-1/2 -translate-x-1/2 top-full whitespace-nowrap rounded-3xl bg-surface-glass border-outline border text-sm hidden group-hover:block absolute backdrop-blur-xl backdrop-saturate-200 py-4 min-w-40">
      {children}
    </ul>
  );
};
const DropdownDivider = () => {
  return <li className="h-px w-full bg-outline my-1"></li>;
};
const DropdownLink = ({ href, children, target }) => {
  return (
    <li>
      <Link
        href={href}
        target={target}
        className="px-4 h-8 items-center flex !text-on-surface hover:!text-primary !no-underline"
      >
        {children}
      </Link>
    </li>
  );
};

export default function Nav() {
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
      {/* <PaneFlowBanner /> */}
      <div className="sticky top-0 z-50 flex py-4 justify-center items-center">
        <nav className="mx-auto flex gap-4 h-14 rounded-full max-w-screen-sm items-center justify-between px-4 relative">
          <div className="absolute left-0 top-0 w-full h-full bg-surface-glass border-outline border rounded-full backdrop-blur-xl backdrop-saturate-200"></div>
          {/* Left */}
          <Link
            href="/"
            className="relative flex flex-shrink-0 items-center text-inherit hover:no-underline dark:text-white w-8 h-8"
          >
            <img
              src="/images/swiper-logo.svg"
              className="h-8 w-8"
              alt="Swiper"
            />

            <span className="absolute font-mono text-[10px] text-on-surface-darker left-full -ml-1 -top-2 leading-none pointer-events-none">
              v{process.env.swiperReleaseVersion}
            </span>
          </Link>

          {/* Nav */}

          {/* <DocSearch
              appId="K52IIJWQL1"
              indexName="swiperjs"
              apiKey="997edea3f9d162f3ffb7442f399aa8c3"
            /> */}
          <ul
            className={`items-center relative flex gap-4`}
            onClick={onNavClick}
          >
            <li className="group relative ">
              <div className="cursor-pointer text-sm hover:text-primary">
                Docs
              </div>
              <Dropdown>
                <DropdownLink href="/get-started">Getting Started</DropdownLink>
                <DropdownDivider />

                <DropdownLink href="/swiper-api">
                  Swiper Core / API
                </DropdownLink>
                <DropdownLink href="/element">Swiper Element</DropdownLink>

                <DropdownLink href="/react">Swiper React</DropdownLink>
                <DropdownLink href="/vue">Swiper Vue</DropdownLink>

                <DropdownDivider />

                <DropdownLink href="/changelog">Changelog</DropdownLink>
              </Dropdown>
            </li>
            <li className="group relative ">
              <div className="cursor-pointer text-sm hover:text-primary">
                Resources
              </div>
              <Dropdown>
                <DropdownLink href="/demos">Demos</DropdownLink>
                <DropdownLink href="/plugins">Plugins</DropdownLink>
                <DropdownDivider />
                <DropdownLink href="/blog">Blog</DropdownLink>
                <DropdownLink href="/sponsors">Sponsors</DropdownLink>
              </Dropdown>
            </li>
            <li className="group relative ">
              <div className="cursor-pointer text-sm hover:text-primary">
                Premium
              </div>
              <Dropdown>
                <DropdownLink href="https://paneflow.com" target="_blank">
                  <img
                    src="/images/projects/paneflow.svg"
                    className="mr-2 h-4 w-4"
                  />
                  <span>PaneFlow</span>
                </DropdownLink>
                <DropdownLink href="https://uiinitiative.com" target="_blank">
                  <img
                    src="/images/uiinitiative-logo.svg"
                    className="mr-2 h-4 w-4"
                  />

                  <span>UI Initiative</span>
                </DropdownLink>
                <DropdownLink
                  href="https://studio.swiperjs.com"
                  target="_blank"
                >
                  <img
                    src="/images/swiper-studio-logo.svg"
                    className="mr-2 h-4 w-4"
                  />
                  <span>Swiper Studio</span>
                </DropdownLink>
              </Dropdown>
            </li>
            {/* <li className="group relative border-b border-outline px-3 py-4 md:border-none md:p-0">
              <Link
                href="/blog"
                className="flex h-7 cursor-pointer items-center rounded-md px-3 text-sm font-medium text-primary hover:bg-primary hover:text-on-primary hover:no-underline"
              >
                Blog
              </Link>
            </li> */}
            <li className="group relative ">
              <Link
                href="https://github.com/nolimits4web/swiper"
                className="!text-on-surface hover:!text-primary !no-underline"
                rel="noopener"
                target="_blank"
              >
                <GithubStats />
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
}
