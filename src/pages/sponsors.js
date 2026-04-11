import React from 'react';
import HomeSponsors from '@/components/HomeSponsors';
import { SponsorButton } from '@/components/SponsorButton';
import { HomeContainer } from '@/components/HomeContainer';
import { HomeSectionTitle } from '@/components/HomeSectionTitle';
import { HomeSectionText } from '@/components/HomeSectionText';
import { Button } from '@/components/Button';
import { Nav } from '@/components/Nav';
import Footer from '@/components/Footer';

export default function SponsorsPage() {
  return (
    <>
      <Nav />
      <HomeContainer className="my-16 relative">
        <HomeSectionTitle>Swiper Sponsors</HomeSectionTitle>
        <HomeSectionText>
          <div>
            <a href="https://sponsors.nolimits4web.com" target="_blank">
              Sponsor Swiper
            </a>{' '}
            and get your logo and link featured on the website,
            or support the developer on{' '}
            <a
              href="https://github.com/sponsors/nolimits4web"
              target="_blank"
            >
              GitHub Sponsors
            </a>
            . Your support helps keep Swiper growing!
          </div>
          <div className="mt-6 flex justify-center">
            <Button href="https://sponsors.nolimits4web.com" target="_blank">
              Become a Sponsor
            </Button>
          </div>
        </HomeSectionText>
      </HomeContainer>
      <HomeSponsors showPlaceholders showTitles />
      <Footer />
    </>
  );
}

const meta = {
  title: 'Swiper Sponsors',
};

SponsorsPage.layoutProps = {
  meta,
};
