import fs from 'fs';
import React from 'react';
import Link from 'next/link';
import clientsList from '@/shared/clients-list';
import Carbon from '@/components/Carbon';
import HomeHeader from '@/components/HomeHeader';
import HomeSponsors from '@/components/HomeSponsors';
import HomeProjects from '@/components/HomeProjects';
import { HomeElementUsage } from '@/components/HomeElementUsage';
import { SponsorButton } from '@/components/SponsorButton';
import { homeFeatures } from '@/shared/home-features';

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

export function HomeHeading({ children }) {
  return (
    <h2 className="mb-12 text-center text-5xl font-bold leading-tight sm:text-6xl">
      {children}
    </h2>
  );
}
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
      <HomeHeader />
      <div className="mb-20 flex items-center justify-center py-5">
        <Carbon />
      </div>
      <div className="mx-auto max-w-[90rem] px-4 text-lg sm:px-6 lg:px-8 xl:px-10">
        <div className="mx-auto flex max-w-5xl flex-col space-y-5">
          <h1 className="mb-6 text-center text-5xl font-bold  sm:text-6xl">
            Swiper
          </h1>
          <div className="space-y-5 text-center text-xl font-medium leading-[1.75] sm:p-12">
            <p>
              Swiper is the most modern{' '}
              <b className="underline">free and open source</b> mobile touch
              slider with hardware accelerated transitions and{' '}
              <b className="underline">amazing native behavior</b>. Use it on
              websites, web apps, and mobile native/hybrid apps.
            </p>
            <p className="mb-2">
              Swiper, along with other great components, is a part of{' '}
              <a
                href="https://framework7.io"
                target="_blank"
                className="font-bold"
              >
                Framework7
              </a>{' '}
              and{' '}
              <a
                href="https://ionicframework.com/"
                target="_blank"
                className="font-bold"
              >
                Ionic Framework
              </a>{' '}
              - a fully-featured frameworks for building iOS &amp; Android apps.
            </p>
          </div>
        </div>
        <div className="mt-24">
          <HomeHeading>Available For</HomeHeading>
          <div className="mx-auto grid max-w-6xl grid-cols-2 gap-4 md:grid-cols-4 md:gap-8">
            {libs.map(({ title, image, link }) => (
              <Link
                key={title}
                title={title}
                href={link}
                className="relative overflow-hidden rounded-3xl border border-outline-variant p-6 text-on-surface duration-100 hover:bg-primary-container hover:no-underline active:rounded-xl"
              >
                <div className="flex items-center justify-center">
                  <img
                    src={`/images/libs/${image}`}
                    width="140"
                    height="140"
                    alt={`${title} logo`}
                    title={title}
                    loading="lazy"
                    className="h-16 w-16 max-w-full object-contain sm:h-36 sm:w-36"
                  />
                </div>
                <div className="mt-4 hidden text-center sm:block">
                  <div className="font-bold">{title}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-24">
          <HomeHeading>Easy As</HomeHeading>
          <HomeElementUsage />
        </div>

        <div className="mx-auto mt-24 max-w-6xl">
          <HomeHeading>Powered With Top Notch Features</HomeHeading>
          <ul className="grid gap-x-4 gap-y-4 sm:grid-cols-2 lg:grid-cols-3 xl:gap-4">
            {homeFeatures.map(({ title, descr, svg }) => (
              <li key={title} className="flex rounded-3xl bg-surface-1 p-4">
                <div className="mr-4 h-16 w-16 shrink-0 rounded-xl bg-surface-2">
                  {svg}
                </div>
                <div className="min-w-0 shrink">
                  <h3 className="mb-1 font-bold">{title}</h3>
                  <div className="text-base leading-normal text-on-surface-variant">
                    {descr}
                  </div>
                </div>
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
                  className="rounded-3xl"
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

        <div className="mb-20 mt-24">
          <HomeHeading>Premium Services</HomeHeading>
          <div className="grid-cols-2 gap-8 md:grid">
            <Link
              className="swiper-studio-card block rounded-3xl border border-outline-variant text-center text-on-surface duration-100 hover:bg-primary-container hover:no-underline active:rounded-xl"
              href="https://studio.swiperjs.com"
              target="_blank"
            >
              <div className="px-4 pt-4">
                <img
                  src="/images/swiper-studio-banner-2.jpg"
                  alt="UI Initiative"
                  className="rounded-3xl"
                />
              </div>
              <div className="p-8">
                <h2 className="mb-4 text-center text-4xl font-bold">
                  Swiper Studio
                </h2>
                <p className="text-on-surface-variant">
                  Premium no-code Swiper builder and editor
                </p>
              </div>
            </Link>

            <Link
              href="https://uiinitiative.com"
              target="_blank"
              className="uiinitiative-card mt-8 block rounded-3xl border border-outline-variant text-center text-on-surface duration-100 hover:bg-primary-container hover:no-underline  active:rounded-xl md:mt-0"
            >
              <div className="mx-auto px-4 pt-4">
                <img
                  src="/images/uiinitiative-banner-2.jpg"
                  alt="UI Initiative"
                  className="rounded-3xl"
                />
              </div>
              <div className="p-8">
                <h2 className="mb-4 text-center text-4xl font-bold">
                  UI Initiative
                </h2>
                <p className="text-on-surface-variant">
                  Premium Swiper templates & plugins
                </p>
              </div>
            </Link>
          </div>
        </div>

        <div className="mb-20 mt-24">
          <HomeHeading>Latest From The Blog</HomeHeading>
          <div className="grid-cols-3 gap-8 space-y-8 md:grid md:space-y-0">
            {posts.map((post) => (
              <Link
                key={post.title}
                className="group relative block rounded-3xl border border-outline-variant p-4 duration-200 hover:bg-primary-container hover:text-on-primary-container hover:no-underline active:rounded-xl"
                href={post.path}
              >
                <div className="relative overflow-hidden rounded-xl pb-[50%]">
                  {post.image && (
                    <img
                      className="absolute left-0 top-0 h-full w-full object-cover object-center duration-200"
                      src={`${post.image}`}
                      alt={post.title}
                      loading="lazy"
                    />
                  )}
                </div>
                <div className="mt-4 w-fit text-xl font-bold text-on-surface group-hover:text-on-primary-container">
                  {post.title}
                </div>
                <div className="mt-1 text-sm text-on-surface opacity-75">
                  {formatDate(post.date)}
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className="mx-auto mb-20 mt-24 max-w-6xl text-center">
          <HomeHeading>More Of Our Projects</HomeHeading>
          <HomeProjects />
        </div>

        <div className="mb-20 mt-24 text-center">
          <HomeHeading>Sponsors</HomeHeading>
          <div className="my-4 font-medium leading-[1.75]">
            Support Swiper on{' '}
            <a
              href="https://opencollective.com/swiper"
              target="_blank"
              rel="noopener"
            >
              Open Collective
            </a>{' '}
            or{' '}
            <a
              href="https://patreon.com/swiperjs"
              target="_blank"
              rel="noopener"
            >
              Patreon
            </a>{' '}
            and help us to make it even better!
            <br />
            Your support means a lot for us!
          </div>
          <div className="mb-8 mt-4 flex flex-col items-center space-y-6">
            <SponsorButton href="https://opencollective.com/swiper">
              <span>Become a sponsor on OpenCollective</span>
            </SponsorButton>
            <SponsorButton href="https://patreon.com/swiperjs">
              <span>Support Swiper on Patreon</span>
            </SponsorButton>
          </div>
          <div className="space-y-8">
            <HomeSponsors spacing={false} />
          </div>
        </div>
      </div>
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
