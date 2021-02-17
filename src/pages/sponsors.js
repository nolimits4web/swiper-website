import React from 'react';
import Link from 'next/link';

import HomeSponsors from '@/components/HomeSponsors';

export default function SponsorsPage() {
  return (
    <>
      <div className="mx-auto max-w-6xl text-lg px-4 py-20">
        <h1 className="text-4xl text-center sm:text-5xl text-gray-900 font-extrabold mb-12">
          Swiper Sponsors
        </h1>

        <HomeSponsors showPlaceholders showTitles />

        <div className="text-center">
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
          <div className="my-4">
            <a
              href="http://opencollective.com/swiper"
              target="_blank"
              rel="noopener"
              className="bg-primary font-bold rounded-full text-white shadow-lg hover:no-underline hover:bg-opacity-95 duration-200 inline-block w-96 px-4 py-6 my-2 max-w-full text-xl"
            >
              Become a sponsor
            </a>
          </div>
          {/* <HomeSponsors /> */}
        </div>
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
