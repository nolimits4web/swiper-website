import React from 'react';
import  PatreonLogo from '@/img/patreon-logo.svg';
import OpenCollectiveLogo from '@/img/opencollective-logo.svg';
import HomeSponsors from '@/components/HomeSponsors';

export default function SponsorsPage() {
  return (
    <>
      <div className="mx-auto max-w-[90rem] px-4 py-20 text-lg">
        <h1 className="mb-12 text-center text-4xl font-extrabold text-gray-900 dark:text-gray-200 sm:text-5xl">
          Swiper Sponsors
        </h1>

        <div className="mb-16 text-center">
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
          <div className="my-4 flex flex-col items-center space-y-6">
            <a
              href="https://opencollective.com/swiper"
              rel="noopener"
              target="_blank"
              className="inline-flex max-w-full items-center rounded-full bg-white px-6 py-4 text-sm font-medium text-black shadow-lg duration-200 hover:bg-black hover:bg-opacity-5 hover:no-underline dark:hover:bg-white dark:hover:bg-opacity-75 sm:text-lg"
              onClick={() => trackOutbound('https://opencollective.com/swiper')}
            >
              <OpenCollectiveLogo className="mr-4 h-6 w-6" />
              <span>Become a sponsor on OpenCollective</span>
            </a>
            <a
              href="https://patreon.com/swiperjs"
              rel="noopener"
              target="_blank"
              className="inline-flex max-w-full items-center rounded-full bg-white px-6 py-4 text-sm font-medium text-black shadow-lg duration-200 hover:bg-black hover:bg-opacity-5 hover:no-underline dark:hover:bg-white dark:hover:bg-opacity-75 sm:text-lg"
              onClick={() => trackOutbound('https://patreon.com/swiperjs')}
            >
              <PatreonLogo className="mr-4 h-6 w-6 text-[#FF424D]" />
              <span>Support Swiper on Patreon</span>
            </a>
          </div>
        </div>

        <HomeSponsors showPlaceholders showTitles />
      </div>
    </>
  );
}

const meta = {
  title: 'Swiper Sponsors',
};

SponsorsPage.layoutProps = {
  meta,
};
