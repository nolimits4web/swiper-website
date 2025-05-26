import fs from 'fs';
import React from 'react';
import Link from 'next/link';
import HomeSponsors from '@/components/HomeSponsors';
import HomeProjects from '@/components/HomeProjects';
import { Button } from '@/components/Button';
import { homeFeatures } from '@/shared/home-features';
import { homeClients } from '@/shared/home-clients';
import { HomeContainer } from '@/components/HomeContainer';
import { HomeSectionTitle } from '@/components/HomeSectionTitle';
import { HomeSectionText } from '@/components/HomeSectionText';
import { HomeVideos } from '@/components/HomeVideos';

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

const extraLibs = [
  'angular.svg',
  'ember.svg',
  'nextjs.svg',
  'shopify.svg',
  'solidjs.svg',
  'svelte.svg',
  'typescript.svg',
  'wix.svg',
  'wordpress.svg',
];

export default function Home(props) {
  const { posts = [] } = props;
  const formatDate = (d) => {
    return Intl.DateTimeFormat('en-us', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    }).format(new Date(d));
  };
  return (
    <>
      <HomeContainer className="flex flex-col items-center justify-center gap-12 mt-16 mb-20">
        <div className="home-header-bg absolute w-screen h-[727px] bg-center bg-no-repeat left-1/2 top-0 -translate-x-1/2" />
        <div className="flex items-center justify-center gap-8 relative">
          <img
            src="/images/swiper-logo.svg"
            className="w-24 h-24 sm:h-32 sm:w-32"
            alt="Swiper"
          />
          <h1 className="text-6xl sm:text-8xl bg-gradient-to-r from-primary to-white bg-clip-text text-transparent">
            Swiper
          </h1>
        </div>
        <h2 className="text-3xl sm:text-5xl text-center text-primary-variant leading-tight text-pretty max-w-4xl relative">
          Powering Millions of Sliders - Smooth, Fast, Everywhere
        </h2>
        <div className="text-center text-lg text-on-surface-darker relative">
          v{process.env.swiperReleaseVersion} released on{' '}
          {process.env.swiperReleaseDate}
        </div>
        <div className="flex items-center gap-16 relative">
          <Button href="/get-started" className="w-48">
            Get started
          </Button>
        </div>
      </HomeContainer>

      <HomeContainer className="mb-32 sm:mb-64">
        <HomeVideos />
      </HomeContainer>

      <HomeContainer className="my-32 sm:my-64">
        <div className="border-2 border-outline p-8 sm:p-16 lg:px-24 flex gap-4 text-lg sm:text-2xl leading-[1.75]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="31"
            height="31"
            viewBox="0 0 31 31"
            className="shrink-0 hidden xs:block"
          >
            <path
              fill="#FFF"
              d="M30.5180534,0 L30.5180534,5.65149137 C29.010989,6.50549451 27.8681319,7.56043956 27.0894819,8.81632653 C26.310832,10.0722135 25.7205651,11.4034537 25.3186813,12.8100471 C24.9167975,14.2166405 24.7158556,15.7739403 24.7158556,17.4819466 L30.5180534,17.4819466 L30.5180534,29.8398744 L18.1601256,29.8398744 L18.1601256,22.1538462 C18.1601256,17.5321821 18.599686,14.0156986 19.4788069,11.6043956 C20.3579278,9.19309262 21.7017268,6.97017268 23.5102041,4.93563579 C25.3186813,2.9010989 27.6546311,1.25588697 30.5180534,0 Z M12.3579278,0 L12.3579278,5.65149137 C10.8508634,6.50549451 9.69544741,7.56043956 8.89167975,8.81632653 C8.08791209,10.0722135 7.48508634,11.4034537 7.08320251,12.8100471 C6.68131868,14.2166405 6.48037677,15.7739403 6.48037677,17.4819466 L12.3579278,17.4819466 L12.3579278,29.8398744 L0,29.8398744 L0,22.1538462 C0,17.5321821 0.43956044,14.0156986 1.31868132,11.6043956 C2.1978022,9.19309262 3.54160126,6.97017268 5.35007849,4.93563579 C7.15855573,2.9010989 9.49450549,1.25588697 12.3579278,0 Z"
              transform="translate(0 .345)"
            />
          </svg>
          <div className="">
            <p>
              Swiper is the most popular mobile-friendly slider library on the
              web. Built with a focus on performance, flexibility, and
              native-like touch interactions, it powers millions of sliders
              across websites, apps, and digital products.
            </p>
            <p>
              <br />
            </p>
            <p>
              Lightweight and modular, Swiper integrates seamlessly with modern
              frameworks like React, Vue, Svelte, and plain JavaScript - making
              it a go-to solution for developers who need full control and a
              smooth user experience.
            </p>
          </div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="31"
            height="31"
            viewBox="0 0 31 31"
            className="shrink-0 hidden xs:block self-end rotate-180"
          >
            <path
              fill="#FFF"
              d="M30.5180534,0 L30.5180534,5.65149137 C29.010989,6.50549451 27.8681319,7.56043956 27.0894819,8.81632653 C26.310832,10.0722135 25.7205651,11.4034537 25.3186813,12.8100471 C24.9167975,14.2166405 24.7158556,15.7739403 24.7158556,17.4819466 L30.5180534,17.4819466 L30.5180534,29.8398744 L18.1601256,29.8398744 L18.1601256,22.1538462 C18.1601256,17.5321821 18.599686,14.0156986 19.4788069,11.6043956 C20.3579278,9.19309262 21.7017268,6.97017268 23.5102041,4.93563579 C25.3186813,2.9010989 27.6546311,1.25588697 30.5180534,0 Z M12.3579278,0 L12.3579278,5.65149137 C10.8508634,6.50549451 9.69544741,7.56043956 8.89167975,8.81632653 C8.08791209,10.0722135 7.48508634,11.4034537 7.08320251,12.8100471 C6.68131868,14.2166405 6.48037677,15.7739403 6.48037677,17.4819466 L12.3579278,17.4819466 L12.3579278,29.8398744 L0,29.8398744 L0,22.1538462 C0,17.5321821 0.43956044,14.0156986 1.31868132,11.6043956 C2.1978022,9.19309262 3.54160126,6.97017268 5.35007849,4.93563579 C7.15855573,2.9010989 9.49450549,1.25588697 12.3579278,0 Z"
              transform="translate(0 .345)"
            />
          </svg>
        </div>
      </HomeContainer>

      <HomeContainer className="my-32 sm:my-64 relative z-10">
        <HomeSectionTitle>Works Anywhere You Build</HomeSectionTitle>
        <HomeSectionText>
          Swiper is available for JavaScript, React, Vue, Web Components - and
          easily integrates with frameworks like Svelte, Angular, Next.js,
          Ember, and more.
        </HomeSectionText>
        <div className="grid grid-cols-2 xs:flex flex-wrap items-center justify-center gap-4 md:gap-8 my-12">
          {libs.map(({ title, image, link }) => (
            <Link
              key={title}
              href="/swiper-api"
              className="xs:w-48 w-full h-48 bg-surface-2 !text-on-surface !no-underline rounded-3xl relative group"
            >
              <div className="absolute inset-0 bg-white/10 rounded-3xl opacity-0 group-hover:opacity-100 duration-200 group-active:opacity-50 pointer-events-none" />
              <div className="flex flex-col gap-4 md:gap-8 p-4 md:p-8 items-center justify-center group-active:scale-90 group-active:opacity-75 duration-200 h-full">
                <img
                  src={`/images/libs/${image}`}
                  width="140"
                  height="140"
                  alt={`${title} logo`}
                  title={title}
                  loading="lazy"
                  className="h-16 w-16 object-contain"
                />
                {title}
              </div>
            </Link>
          ))}
        </div>
        <div className="flex items-center justify-center gap-8 my-12 flex-wrap">
          {extraLibs.map((image) => (
            <img
              src={`/images/libs/${image}`}
              width="140"
              height="140"
              alt={`${image.split('.')[0]} logo`}
              title={image.split('.')[0]}
              loading="lazy"
              className="h-16 w-16 object-contain shrink-0"
            />
          ))}
        </div>
      </HomeContainer>

      <HomeContainer className="my-32 sm:my-64 relative">
        <div className="home-features-bg absolute w-screen h-[1403px] bg-center bg-no-repeat left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" />
        <HomeSectionTitle className="relative">
          Powered With Top Notch Features
        </HomeSectionTitle>
        <div className="grid grid-cols-3 sm:flex gap-4 lg:gap-8 flex-wrap justify-center relative">
          {homeFeatures.map(({ title, descr, svg }) => (
            <div
              key={title}
              className="flex rounded-3xl border border-outline bg-surface-1 flex-col px-4 py-4 lg:py-8 items-center justify-start gap-4 md:w-36 md:h-40 lg:w-48 lg:h-48 text-center backdrop-blur backdrop-saturate-200 text-sm lg:text-base"
            >
              <div className="w-12 h-12 lg:w-16 lg:h-16 bg-white/10 rounded-xl">
                {svg}
              </div>
              <div>{title}</div>
            </div>
          ))}
        </div>
      </HomeContainer>

      <HomeContainer className="my-32 sm:my-64 relative z-10">
        <HomeSectionTitle>Proven. Trusted. Everywhere</HomeSectionTitle>
        <HomeSectionText>
          Millions of developers and the world's top companies rely on Swiper
          every day.
        </HomeSectionText>
        <div className="flex flex-wrap gap-4 sm:gap-8 justify-center">
          {homeClients.map(({ image, title }) => (
            <img
              key={title}
              className="w-12 h-12 sm:w-16 sm:h-16 object-contain"
              src={`/images/clients/${image}`}
              width="120"
              height="120"
              alt={`${title} logo`}
              title={title}
              loading="lazy"
            />
          ))}
        </div>
      </HomeContainer>

      <HomeContainer className="my-32 sm:my-64 relative home-premium">
        <div className="home-premium-bg absolute w-screen h-[1448px] bg-center bg-no-repeat left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" />
        <HomeSectionTitle className="relative">
          Build More with Swiper Studio & UI Initiative
        </HomeSectionTitle>
        <HomeSectionText className="relative">
          Beyond the core library, Swiper is part of a growing ecosystem.{' '}
          <Link href="https://studio.swiperjs.com" target="_blank">
            Swiper Studio
          </Link>{' '}
          offers a visual, no-code builder for crafting sliders quickly, while{' '}
          <Link href="https://uiinitiative.com" target="_blank">
            UI Initiative
          </Link>{' '}
          delivers premium Swiper-based UI templates and effects.
        </HomeSectionText>
        <div className="grid grid-cols-1 xs:grid-cols-2 gap-4 sm:gap-8 relative">
          <Link
            href="https://uiinitiative.com"
            target="_blank"
            className="flex flex-col gap-4 sm:gap-8 p-4 xs:p-8 bg-black/50 border border-outline rounded-3xl items-center justify-center text-center !text-on-surface !no-underline backdrop-blur-lg text-pretty relative group home-premium-link"
          >
            <div className="absolute inset-0 bg-white/5 rounded-3xl opacity-0 group-hover:opacity-100 duration-200 group-active:opacity-50 pointer-events-none" />
            <div className="flex items-center justify-center gap-4 xs:contents xs:text-center text-left mb-4">
              <img
                className="w-16 md:w-32 h-16 md:h-32"
                src="/images/projects/uiinitiative.svg"
                alt="UI Initiative"
              />
              <div className="text-lg md:text-2xl leading-[1.75]">
                Premium Templates & Plugins for Swiper and Framework7
              </div>
            </div>
            <img
              src="/images/uiinitiative-banner.jpg"
              alt="UI Initiative"
              className="rounded-xl border-2 border-outline"
            />
          </Link>
          <Link
            href="https://studio.swiperjs.com"
            target="_blank"
            className="flex flex-col gap-4 sm:gap-8 p-4 xs:p-8 bg-black/50 border border-outline rounded-3xl items-center justify-center text-center !text-on-surface !no-underline backdrop-blur-lg text-pretty relative group home-premium-link"
          >
            <div className="absolute inset-0 bg-white/5 rounded-3xl opacity-0 group-hover:opacity-100 duration-200 group-active:opacity-50 pointer-events-none" />
            <div className="flex items-center justify-center gap-4 xs:contents xs:text-center text-left mb-4">
              <img
                className="w-16 md:w-32 h-16 md:h-32"
                src="/images/projects/swiper-studio-logo.svg"
                alt="Swiper Studio"
              />
              <div className="text-lg md:text-2xl leading-[1.75]">
                Create Beautiful And Responsive Sliders Without Writing Any Code
              </div>
            </div>
            <img
              src="/images/swiper-studio-banner.jpg"
              alt="Swiper Studio"
              className="rounded-xl border-2 border-outline"
            />
          </Link>
        </div>
      </HomeContainer>

      <HomeContainer className="my-32 sm:my-64 relative z-10">
        <HomeSectionTitle>
          The Tools Powering Modern Front-End Development
        </HomeSectionTitle>
        <HomeSectionText>
          Discover our full suite of UI tools, frameworks, and no-code solutions
          built to elevate your development workflow.
        </HomeSectionText>
        <HomeProjects />
      </HomeContainer>

      <HomeContainer className="my-32 sm:my-64 relative z-10">
        <HomeSectionTitle>Sponsors</HomeSectionTitle>
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
        <HomeSponsors spacing={false} />
      </HomeContainer>
    </>
  );
}

export async function getStaticProps() {
  const posts = fs
    .readdirSync('./src/pages/blog')
    .filter((f) => f.includes('.mdx'))
    .map((f) => {
      const content = fs.readFileSync(`./src/pages/blog/${f}`, 'utf-8');
      const data = {
        path: `/blog/${f.split('.mdx')[0]}`,
        published: true,
      };
      content
        .split('export const meta = {')[1]
        .split('}')[0]
        .trim()
        .split('/n')
        .forEach((line) => {
          if (line.includes('title:')) {
            data.title = line.split(`title: '`)[1].split(`'`)[0];
          }
          if (line.includes('image:')) {
            data.image = line.split(`image: '`)[1].split(`'`)[0];
          }
          if (line.includes('date:')) {
            data.date = line.split(`date: '`)[1].split(`'`)[0];
          }
          if (line.includes('published:')) {
            data.published = !line.includes('published: false');
          }
          if (line.includes('featured: true')) {
            data.featured = true;
          }
        });
      return data;
    })
    .filter((d) => d.published);

  posts.sort((a, b) => {
    return new Date(b.date) - new Date(a.date);
  });

  return {
    props: {
      posts: posts.slice(0, 3),
    },
  };
}
