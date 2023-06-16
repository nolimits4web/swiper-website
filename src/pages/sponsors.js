import React from 'react';
import HomeSponsors from '@/components/HomeSponsors';
import { SponsorButton } from '@/components/SponsorButton';

export default function SponsorsPage() {
  return (
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
        >
          Open Collective
        </a>{' '}
        or{' '}
        <a href="https://patreon.com/swiperjs" target="_blank" rel="noopener">
          Patreon
        </a>{' '}
        and help us to make it even better!
        <br />
        Your support means a lot for us!
        <div className="my-4 flex flex-col items-center space-y-6">
          <SponsorButton href="https://opencollective.com/swiper">
            <span>Become a sponsor on OpenCollective</span>
          </SponsorButton>
          <SponsorButton href="https://patreon.com/swiperjs">
            <span>Support Swiper on Patreon</span>
          </SponsorButton>
        </div>
      </div>

      <HomeSponsors showPlaceholders showTitles />
    </div>
  );
}

const meta = {
  title: 'Swiper Sponsors',
};

SponsorsPage.layoutProps = {
  meta,
};
