import React from 'react';
import Link from 'next/link';
// import Image from 'next/image';

import menuList from 'src/shared/menu-list';
import clientsList from 'src/shared/clients-list';
import Carbon from '@/components/Carbon';
import HomeHeader from '@/components/HomeHeader';
import HomeSponsors from '@/components/HomeSponsors';
import HomeProjects from '@/components/HomeProjects';

const libs = [
  {
    title: 'JavaScript',
    image: 'js.svg',
    link: '/swiper-api',
  },
  {
    title: 'Angular',
    image: 'angular.svg',
    link: '/angular',
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
    title: 'Svelte',
    image: 'svelte.svg',
    link: '/svelte',
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
    descr: `Swiper uses modern flexbox layout for slides layout, which solves a lot of problems and time with size caclulations. Such layout also allows configuring the Slides grid using pure CSS`,
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
    <h2 className="text-4xl sm:text-5xl text-gray-900 text-center font-extrabold mb-12">
      {children}
    </h2>
  );
}
export default function Home() {
  return (
    <>
      <HomeHeader />
      <div className="flex justify-center items-center bg-primary py-5 mb-20">
        <Carbon />
      </div>
      <div className="mx-auto max-w-6xl text-lg px-4">
        <div className="flex flex-col space-y-5">
          <h1 className="text-4xl sm:text-5xl text-gray-900 font-extrabold mb-6">
            Swiper
          </h1>
          <p>
            Swiper is the most modern free mobile touch slider with hardware
            accelerated transitions and amazing native behavior. It is intended
            to be used in mobile websites, mobile web apps, and mobile
            native/hybrid apps.
          </p>
          <p>
            Swiper is not compatible with all platforms,{' '}
            <b>
              it is a modern touch slider which is focused only on modern
              apps/platforms to bring the best experience and simplicity
            </b>
            .
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
          <div className="grid grid-cols-3 sm:grid-cols-5 gap-4">
            {libs.map(({ title, image, link }) => (
              <a
                key={title}
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
          <HomeHeading>Powered With Top Notch Features</HomeHeading>
          <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-8 text-md">
            {feats.map(({ title, descr }) => (
              <li key={title}>
                <h3 className="font-bold text-gray-900 text-2xl mb-4">
                  {title}
                </h3>
                {descr}
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-24">
          <HomeHeading>Used By Thousands</HomeHeading>
          <div className="grid grid-cols-4 sm:grid-cols-8 gap-6">
            {clientsList.map(({ image, title }) => (
              <div key={title} className="flex items-center justify-center">
                <img
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
        <div className="mt-24 text-center mb-20">
          <HomeHeading>And It Is Free</HomeHeading>
          <div className="my-4">
            Swiper is completely free and open-source (MIT Licensed)
          </div>

          <nav className="space-x-2 text-lg">
            {menuList.map(({ name, link }) => (
              <Link key={link} href={link}>
                <a className="bg-primary font-bold  rounded-3xl text-white shadow-lg hover:no-underline hover:bg-opacity-95 duration-200 inline-block w-40 sm:w-48 px-4 py-2 my-2">
                  {name}
                </a>
              </Link>
            ))}
          </nav>
        </div>

        <div className="mt-24 text-center mb-20">
          <HomeHeading>More Of Our Projects</HomeHeading>
          <HomeProjects />
        </div>

        <div className="mt-24 text-center mb-20">
          <HomeHeading>Sponsors</HomeHeading>
          <HomeSponsors />
          <div className="my-4">
            Support Swiper on{' '}
            <a
              href="http://opencollective.com/swiper"
              target="_blank"
              rel="noopener"
            >
              Open Collective
            </a>{' '}
            and help us to make it even better!
            <br />
            Your support means a lot for us!
          </div>
          <div className="my-4">
            <a
              href="http://opencollective.com/swiper"
              rel="noopener"
              target="_blank"
              className="bg-primary font-bold rounded-full text-white shadow-lg hover:no-underline hover:bg-opacity-95 duration-200 inline-block w-96 px-4 py-6 my-2 max-w-full text-xl"
            >
              Become a sponsor
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
