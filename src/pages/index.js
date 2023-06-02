import React from 'react';
import Link from 'next/link';
// import Image from 'next/image';

import menuList from '@/shared/menu-list';
import clientsList from '@/shared/clients-list';
import Carbon from '@/components/Carbon';
import HomeHeader from '@/components/HomeHeader';
import HomeSponsors from '@/components/HomeSponsors';
import HomeProjects from '@/components/HomeProjects';
import UIInitiativeBanner from '@/components/UIInitiativeBanner';
import SwiperStudioBanner from '@/components/SwiperStudioBanner';
import { trackOutbound } from '@/shared/track-outbound';
import PatreonLogo from '@/img/patreon-logo.svg';
import OpenCollectiveLogo from '@/img/opencollective-logo.svg';
import { HomeElementUsage } from '@/components/HomeElementUsage';

function SponsorButton(props) {
  const { href, className, onClick, children, ...restProps } = props;
  return (
    <a
      href={href}
      rel="noopener"
      target="_blank"
      {...restProps}
      className={`dark:bg-primary/80 inline-flex max-w-full items-center rounded-full bg-white px-6 py-4 text-sm font-medium text-black shadow-lg duration-200 hover:bg-black hover:bg-opacity-5 hover:no-underline dark:text-white dark:hover:bg-primary sm:text-lg ${className}`}
      onClick={(e) => {
        onClick(e);
        trackOutbound(href);
      }}
    >
      {children}
    </a>
  );
}

const libs = [
  {
    title: 'JavaScript',
    image: 'js.svg',
    link: '/swiper-api',
  },
  {
    title: 'React',
    image: 'react.svg',
    link: '/react',
  },
  {
    title: 'Vue.js',
    image: 'vue.svg',
    link: '/vue',
  },
  {
    title: 'WebComponents',
    image: 'webcomponents.svg',
    link: '/element',
  },
];

const feats = [
  {
    title: 'Library Agnostic',
    descr: `Swiper doesn't require any JavaScript libraries like jQuery, which makes Swiper much smaller and faster. It can be safely used with libraries such as jQuery, Zepto, jQuery Mobile, etc.`,
  },
  {
    title: '1:1 Touch movement',
    descr: `By default, Swiper provides 1:1 touch movement interaction, but this ratio can be configured through Swiper settings`,
  },
  {
    title: 'Mutation Observer',
    descr: `Swiper has an option to enable Mutation Observer, with this feature Swiper will be automatically reinitialized and recalculate all required parameters if you make dynamic changes to the DOM, or in Swiper styles itself`,
  },
  {
    title: 'Rich API',
    descr: `Swiper comes with a very rich API. It allows creating your own pagination, navigation buttons, parallax effects and many more`,
  },
  {
    title: 'Full True RTL Support',
    descr: `Swiper is the only slider that provides 100% RTL support with correct layout`,
  },
  {
    title: 'Multi Row Slides Layout',
    descr: `Swiper allows a multiple row slides layout, with a few slides per column`,
  },
  {
    title: 'Transition Effects',
    descr: `There are 3 new transition effects in addition to the usual Slide: Fade, 3D Cube and 3D Coverflow`,
  },
  {
    title: 'Two-way Control',
    descr: `Now Swiper may be used as controller for any number of other Swipers, and even be controlled at the same time`,
  },
  {
    title: 'Full Navigation Control',
    descr: `Swiper comes with all required built-in navigation elements, such as Pagination, Navigation arrows and Scrollbar`,
  },
  {
    title: 'Flexbox Layout',
    descr: `Swiper uses modern flexbox layout for slides layout, which solves a lot of problems and time with size calculations. Such layout also allows configuring the Slides grid using pure CSS`,
  },
  {
    title: 'Most Flexible Slides Layout Grid',
    descr: `Swiper has a lot of parameters on initialization to make it as flexible as possible. You can control slides per view, per column, per group, space between slides, and many more`,
  },
  {
    title: 'Parallax Transitions',
    descr: `Swiper supports modern parallax transition effects that can be used on any element inside of Swiper: images, text blocks, headings, backgrounds, etc.`,
  },
  {
    title: 'Images Lazy Loading',
    descr: `Swiper Lazy Loading delays loading of images in inactive/invisible slides until the user swipes to them. Such feature could make the page load faster and improve Swiper performance`,
  },
  {
    title: 'Virtual Slides',
    descr: `Swiper comes with Virtual Slides feature that is great when you have a lot of slides or content-heavy/image-heavy slides so it will keep just the required amount of slides in DOM`,
  },
  {
    title: 'And many more ...',
    descr: `All Swiper well-known features are also here: Responsive, Scroll prevention, Resistant bounds, Autoplay, Loop mode, Nested Swipers`,
  },
];

export function HomeHeading({ children }) {
  return (
    <h2 className="mb-12 text-center text-4xl font-extrabold text-gray-900 dark:text-gray-200 sm:text-5xl">
      {children}
    </h2>
  );
}
export default function Home() {
  return (
    <>
      <HomeHeader />
      <div className="mb-20 flex items-center justify-center bg-primary py-5">
        <Carbon />
      </div>
      <div className="mx-auto max-w-[90rem] px-4 text-lg sm:px-6 lg:px-8 xl:px-10">
        <div className="mx-auto flex max-w-5xl flex-col space-y-5">
          <h1 className="mb-6 text-center text-4xl font-extrabold text-gray-900 dark:text-gray-200 sm:text-5xl">
            Swiper
          </h1>
          <p>
            Swiper is the most modern free mobile touch slider with hardware
            accelerated transitions and amazing native behavior. It is intended
            to be used in mobile websites, mobile web apps, and mobile
            native/hybrid apps.
          </p>
          <p>
            It is a modern touch slider which is focused only on modern
            apps/platforms to bring the best experience and simplicity.
          </p>
          <p className="mb-2">
            Swiper, along with other great components, is a part of{' '}
            <a href="//framework7.io">Framework7</a> - a fully-featured
            framework for building iOS &amp; Android apps. Swiper is also a
            default slider component in the{' '}
            <a href="http://ionicframework.com/" target="blank" rel="noopener">
              Ionic Framework
            </a>
            .
          </p>
        </div>
        <div className="mt-24">
          <HomeHeading>Available For</HomeHeading>
          <div className="mx-auto grid max-w-6xl grid-cols-4">
            {libs.map(({ title, image, link }) => (
              <a
                key={title}
                title={title}
                href={link}
                className="flex items-center justify-center"
              >
                <img
                  src={`/images/libs/${image}`}
                  width="140"
                  height="140"
                  alt={`${title} logo`}
                  title={title}
                  loading="lazy"
                />
              </a>
            ))}
          </div>
        </div>

        <div className="mt-24">
          <HomeHeading>Easy As</HomeHeading>
          <HomeElementUsage />
        </div>

        <div className="mx-auto mt-24 max-w-6xl">
          <HomeHeading>Powered With Top Notch Features</HomeHeading>
          <ul className="grid gap-x-4 gap-y-4 text-base sm:grid-cols-2 lg:grid-cols-4 xl:gap-4">
            {feats.map(({ title, descr }) => (
              <li
                key={title}
                className="rounded-xl border border-black border-opacity-10 p-4 dark:border-0 dark:bg-white dark:bg-opacity-5"
              >
                <h3 className="mb-4 font-bold text-gray-900 dark:text-gray-200">
                  {title}
                </h3>
                <div className="text-sm leading-normal">{descr}</div>
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-24">
          <HomeHeading>Used By Millions</HomeHeading>
          <div className="mx-auto grid max-w-6xl grid-cols-4 gap-4 sm:grid-cols-8">
            {clientsList.map(({ image, title }) => (
              <div key={title} className="flex items-center justify-center">
                <img
                  className="rounded"
                  src={`/images/clients/${image}`}
                  width="120"
                  height="120"
                  alt={`${title} logo`}
                  title={title}
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
        <div className="mx-auto mb-20 mt-24 max-w-6xl text-center">
          <HomeHeading>And It Is Free</HomeHeading>
          <div className="my-4">
            Swiper is completely free and open-source (MIT Licensed)
          </div>

          <nav className="space-x-2 text-lg">
            {menuList.map(({ name, link }) => (
              <Link key={link} href={link} className="my-2 inline-block w-40 rounded-full bg-primary bg-opacity-10 px-4 py-2 font-semibold text-primary duration-200 hover:bg-opacity-95 hover:text-white hover:no-underline">
                {name}
              </Link>
            ))}
          </nav>
        </div>

        <div className="mb-20 mt-24 grid-cols-2 gap-8 md:grid">
          <div className="text-center">
            <h2 className="mb-12 text-center text-4xl font-extrabold text-gray-900 dark:text-gray-200 sm:text-5xl md:mb-4">
              Swiper Studio
            </h2>
            <p>Premium no-code Swiper builder and editor for Swiper patrons</p>
            <SwiperStudioBanner />
          </div>

          <div className="mt-24 text-center md:mt-0">
            <h2 className="mb-12 text-center text-4xl font-extrabold text-gray-900 dark:text-gray-200 sm:text-5xl md:mb-4">
              UI Initiative
            </h2>
            <p>Premium Swiper templates & plugins for Swiper patrons</p>
            <UIInitiativeBanner />
          </div>
        </div>

        <div className="mx-auto mb-20 mt-24 max-w-6xl text-center">
          <HomeHeading>More Of Our Projects</HomeHeading>
          <HomeProjects />
        </div>

        <div className="mb-20 mt-24 text-center">
          <HomeHeading>Sponsors</HomeHeading>
          <HomeSponsors />
          <div className="my-4">
            Support Swiper on{' '}
            <a
              href="https://opencollective.com/swiper"
              target="_blank"
              rel="noopener"
              onClick={() => trackOutbound('https://opencollective.com/swiper')}
            >
              Open Collective
            </a>{' '}
            or{' '}
            <a
              href="https://patreon.com/swiperjs"
              target="_blank"
              rel="noopener"
              onClick={() => trackOutbound('https://patreon.com/swiperjs')}
            >
              Patreon
            </a>{' '}
            and help us to make it even better!
            <br />
            Your support means a lot for us!
          </div>
          <div className="my-4 flex flex-col items-center space-y-6">
            <SponsorButton href="https://opencollective.com/swiper">
              <OpenCollectiveLogo className="mr-4 h-6 w-6" />
              <span>Become a sponsor on OpenCollective</span>
            </SponsorButton>
            <SponsorButton href="https://patreon.com/swiperjs">
              <PatreonLogo className="mr-4 h-6 w-6 text-[#FF424D]" />
              <span>Support Swiper on Patreon</span>
            </SponsorButton>
          </div>
        </div>
      </div>
    </>
  );
}
