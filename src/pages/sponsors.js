import React from 'react';
import { ReactComponent as PatreonLogo } from '@/img/patreon-logo.svg';
import { ReactComponent as OpenCollectiveLogo } from '@/img/opencollective-logo.svg';
import HomeSponsors from '@/components/HomeSponsors';

export default function SponsorsPage() {
  return (
    <>
      <div className="mx-auto max-w-[90rem] text-lg px-4 py-20">
        <h1 className="text-4xl text-center sm:text-5xl text-gray-900 dark:text-gray-200 font-extrabold mb-12">
          Swiper Sponsors
        </h1>

        <div className="text-center mb-16">
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
          <div className="my-4 items-center space-y-6 flex flex-col">
            <a
              href="https://opencollective.com/swiper"
              rel="noopener"
              target="_blank"
              className="inline-flex text-black text-sm sm:text-lg items-center px-6 py-4 bg-white font-medium rounded-full shadow-lg hover:no-underline hover:bg-black hover:bg-opacity-5 duration-200 max-w-full dark:hover:bg-white dark:hover:bg-opacity-75"
              onClick={() => trackOutbound('https://opencollective.com/swiper')}
            >
              <OpenCollectiveLogo className="w-6 h-6 mr-4" />
              <span>Become a sponsor on OpenCollective</span>
            </a>
            <a
              href="https://patreon.com/swiperjs"
              rel="noopener"
              target="_blank"
              className="inline-flex text-black text-sm sm:text-lg items-center px-6 py-4 bg-white font-medium rounded-full shadow-lg hover:no-underline hover:bg-black hover:bg-opacity-5 duration-200 max-w-full dark:hover:bg-white dark:hover:bg-opacity-75"
              onClick={() => trackOutbound('https://patreon.com/swiperjs')}
            >
              <PatreonLogo className="text-[#FF424D] w-6 h-6 mr-4" />
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
