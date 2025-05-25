import React from 'react';
import HomeSponsors from '@/components/HomeSponsors';
import { SponsorButton } from '@/components/SponsorButton';
import { HomeContainer } from '@/components/HomeContainer';
import { HomeSectionTitle } from '@/components/HomeSectionTitle';
import { HomeSectionText } from '@/components/HomeSectionText';
import { Button } from '@/components/Button';

export default function SponsorsPage() {
  return (
    <>
      <HomeContainer className="my-16 relative">
        <HomeSectionTitle>Swiper Sponsors</HomeSectionTitle>
        <HomeSectionText>
          <div>
            Support Swiper on{' '}
            <a href="https://opencollective.com/swiper" target="_blank">
              Open Collective
            </a>{' '}
            or{' '}
            <a href="https://patreon.com/swiperjs" target="_blank">
              Patreon
            </a>{' '}
            and help us to make it even better! Your support means a lot for us!
          </div>
          <div className="mt-6 flex justify-center">
            <Button href="https://opencollective.com/swiper" target="_blank">
              Become a Sponsor
            </Button>
          </div>
        </HomeSectionText>
      </HomeContainer>
      <HomeSponsors showPlaceholders showTitles />
    </>
  );
}

const meta = {
  title: 'Swiper Sponsors',
};

SponsorsPage.layoutProps = {
  meta,
};
