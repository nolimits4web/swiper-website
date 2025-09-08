import { DocSearch } from '@docsearch/react';
import Link from 'next/link';
import { useRef, useState, useEffect, useLayoutEffect } from 'react';
import GithubStats from './GithubStats';
import PaneFlowBanner from './PaneFlowBanner';
import { useRouter } from 'next/router';
import TogglesBanner from './TogglesBanner';
import clsx from 'clsx';

const Dropdown = ({ children, opened }) => {
  return (
    <ul
      className={clsx(
        'left-1/2 -translate-x-1/2 top-full whitespace-nowrap rounded-3xl bg-surface-1 border-outline border text-sm  absolute backdrop-blur-xl backdrop-saturate-200 py-4 min-w-40',
        !opened && 'hidden',
        opened && 'block'
      )}
    >
      {children}
    </ul>
  );
};
const DropdownDivider = () => {
  return <li className="h-px w-full bg-outline my-1"></li>;
};
const DropdownLink = ({ href, children, target, onClick }) => {
  return (
    <li>
      <Link
        href={href}
        target={target}
        className="px-4 h-8 items-center flex !text-on-surface hover:!text-primary !no-underline"
        onClick={onClick}
      >
        {children}
      </Link>
    </li>
  );
};

export const Nav = () => {
  const router = useRouter();
  const [docsNavOpened, setDocsNavOpened] = useState(false);
  const [resourcesNavOpened, setResourcesNavOpened] = useState(false);
  const [premiumNavOpened, setPremiumNavOpened] = useState(false);
  const pageTopBg = router.pathname !== '/';
  const docsNavDropdownRef = useRef(null);
  const resourcesNavDropdownRef = useRef(null);
  const premiumNavDropdownRef = useRef(null);
  const [banner, setBanner] = useState('paneflow');
  const [bannerSet, setBannerSet] = useState(false);
  const onClick = (e) => {
    if (!docsNavDropdownRef.current.contains(e.target)) {
      setDocsNavOpened(false);
    }
    if (!resourcesNavDropdownRef.current.contains(e.target)) {
      setResourcesNavOpened(false);
    }
    if (!premiumNavDropdownRef.current.contains(e.target)) {
      setPremiumNavOpened(false);
    }
  };
  useLayoutEffect(() => {
    setBanner(Math.random() > 0.5 ? 'paneflow' : 'toggles');
    setBannerSet(true);
  }, []);
  useEffect(() => {
    document.addEventListener('click', onClick);
    return () => {
      document.removeEventListener('click', onClick);
    };
  }, []);
  return (
    <>
      {pageTopBg && (
        <div
          key="page-top-bg"
          className="page-top-bg absolute w-screen h-[188px] bg-center bg-no-repeat left-1/2 top-0 -translate-x-1/2 pointer-events-none"
        />
      )}
      <div className="flex items-center justify-center relative z-[1] pt-2 gap-1 -mb-2 max-w-full px-4 lg:justify-start lg:pl-80 2xl:!pl-4 2xl:!justify-center">
        <PaneFlowBanner
        // className={clsx(
        //   // banner === 'paneflow' ? 'block' : 'hidden',
        //   // !bannerSet && 'opacity-0'
        // )}
        />
        {/* <TogglesBanner
          className={clsx(
            banner === 'toggles' ? 'block' : 'hidden',
            !bannerSet && 'opacity-0'
          )}
        /> */}
      </div>

      <div className="sticky top-0 z-50 flex py-4 justify-center items-center pointer-events-none lg:justify-start lg:pl-80 2xl:!pl-4 2xl:!justify-center">
        <nav
          className="mx-auto flex gap-4 h-16 rounded-full max-w-screen-sm items-center justify-between px-4 relative pointer-events-auto lg:mx-0 2xl:!mx-auto"
          onPointerLeave={(e) => {
            if (e.pointerType === 'mouse') {
              setDocsNavOpened(false);
              setResourcesNavOpened(false);
              setPremiumNavOpened(false);
            }
          }}
        >
          <div className="absolute left-0 top-0 w-full h-full bg-surface-1 border-outline border rounded-full backdrop-blur-xl backdrop-saturate-200"></div>
          {/* Left */}
          <Link
            href="/"
            className="relative flex shrink-0 items-center text-inherit hover:no-underline dark:text-white w-8 h-8 xs:w-10 xs:h-10 group"
            draggable={false}
          >
            <img
              src="/images/swiper-logo.svg"
              className="h-full w-full shrink-0 group-hover:opacity-70 duration-200 group-active:opacity-50"
              alt="Swiper"
              draggable={false}
            />

            <span className="absolute font-mono text-[10px] text-on-surface-darker left-full ml-4 -top-2 xs:-top-1 leading-none pointer-events-none">
              v{process.env.swiperReleaseVersion}
            </span>
          </Link>

          <ul className={`items-center relative flex gap-4`}>
            <li className="group relative" ref={docsNavDropdownRef}>
              <div
                className="cursor-pointer text-sm hover:text-primary active:opacity-50 duration-200"
                onPointerEnter={() => {
                  setDocsNavOpened(true);
                  setResourcesNavOpened(false);
                  setPremiumNavOpened(false);
                }}
              >
                Docs
              </div>
              <Dropdown opened={docsNavOpened}>
                <DropdownLink
                  onClick={() => setDocsNavOpened(false)}
                  href="/get-started"
                >
                  Getting Started
                </DropdownLink>
                <DropdownDivider />

                <DropdownLink
                  onClick={() => setDocsNavOpened(false)}
                  href="/swiper-api"
                >
                  Swiper Core / API
                </DropdownLink>
                <DropdownLink
                  onClick={() => setDocsNavOpened(false)}
                  href="/element"
                >
                  Swiper Element
                </DropdownLink>

                <DropdownLink
                  onClick={() => setDocsNavOpened(false)}
                  href="/react"
                >
                  Swiper React
                </DropdownLink>
                <DropdownLink
                  onClick={() => setDocsNavOpened(false)}
                  href="/vue"
                >
                  Swiper Vue
                </DropdownLink>

                <DropdownDivider />

                <DropdownLink
                  onClick={() => setDocsNavOpened(false)}
                  href="/changelog"
                >
                  Changelog
                </DropdownLink>
              </Dropdown>
            </li>
            <li className="group relative" ref={resourcesNavDropdownRef}>
              <div
                className="cursor-pointer text-sm hover:text-primary active:opacity-50 duration-200"
                onPointerEnter={() => {
                  setResourcesNavOpened(true);
                  setDocsNavOpened(false);
                  setPremiumNavOpened(false);
                }}
              >
                Resources
              </div>
              <Dropdown opened={resourcesNavOpened}>
                <DropdownLink
                  onClick={() => setResourcesNavOpened(false)}
                  href="/demos"
                >
                  Demos
                </DropdownLink>
                <DropdownLink
                  onClick={() => setResourcesNavOpened(false)}
                  href="/plugins"
                >
                  Plugins
                </DropdownLink>
                <DropdownDivider />
                <DropdownLink
                  onClick={() => setResourcesNavOpened(false)}
                  href="/blog"
                >
                  Blog
                </DropdownLink>
                <DropdownLink
                  onClick={() => setResourcesNavOpened(false)}
                  href="/sponsors"
                >
                  Sponsors
                </DropdownLink>
              </Dropdown>
            </li>
            <li className="group relative" ref={premiumNavDropdownRef}>
              <div
                className="cursor-pointer text-sm hover:text-primary active:opacity-50 duration-200"
                onPointerEnter={() => {
                  setPremiumNavOpened(true);
                  setDocsNavOpened(false);
                  setResourcesNavOpened(false);
                }}
              >
                Premium
              </div>
              <Dropdown opened={premiumNavOpened}>
                <DropdownLink
                  onClick={() => setPremiumNavOpened(false)}
                  href="https://paneflow.com"
                  target="_blank"
                >
                  <img
                    src="/images/projects/paneflow.svg"
                    className="mr-2 h-4 w-4"
                  />
                  <span>PaneFlow</span>
                </DropdownLink>
                <DropdownLink
                  onClick={() => setPremiumNavOpened(false)}
                  href="https://uiinitiative.com"
                  target="_blank"
                >
                  <img
                    src="/images/uiinitiative-logo.svg"
                    className="mr-2 h-4 w-4"
                  />

                  <span>UI Initiative</span>
                </DropdownLink>
                <DropdownLink
                  onClick={() => setPremiumNavOpened(false)}
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
          <div className="w-8 h-8 md:w-22 shrink-0">
            <DocSearch
              appId="K52IIJWQL1"
              indexName="swiperjs"
              apiKey="997edea3f9d162f3ffb7442f399aa8c3"
            />
          </div>
        </nav>
      </div>
    </>
  );
};
