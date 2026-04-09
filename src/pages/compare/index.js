import fs from 'fs';
import Link from 'next/link';
import { Nav } from '@/components/Nav';
import Footer from '@/components/Footer';

const comparisons = [
  {
    slug: 'swiper-vs-slick',
    competitor: 'Slick',
    tagline: 'Modern alternative to the legacy jQuery slider',
  },
  {
    slug: 'swiper-vs-owl-carousel',
    competitor: 'Owl Carousel',
    tagline: 'Why it is time to switch from the abandoned jQuery plugin',
  },
  {
    slug: 'swiper-vs-flickity',
    competitor: 'Flickity',
    tagline: 'Free open source carousel vs GPL-licensed alternative',
  },
  {
    slug: 'swiper-vs-embla-carousel',
    competitor: 'Embla Carousel',
    tagline: 'Full-featured slider vs headless carousel library',
  },
  {
    slug: 'swiper-vs-splide',
    competitor: 'Splide',
    tagline: 'Which slider library has more to offer?',
  },
  {
    slug: 'swiper-vs-glidejs',
    competitor: 'Glide.js',
    tagline: 'Lightweight slider comparison',
  },
  {
    slug: 'swiper-vs-keen-slider',
    competitor: 'Keen Slider',
    tagline: 'Touch slider showdown',
  },
];

export default function Compare(props) {
  const { pages } = props;
  return (
    <>
      <Nav />
      <div className="px-4 sm:px-6 md:px-8 relative">
        <div className="mx-auto max-w-[940px] pb-24 pt-10 lg:pb-16">
          <h1 className="mt-0 mb-[0.5em] text-4xl leading-[1.2] font-medium tracking-tight text-balance text-white sm:text-5xl">
            Swiper vs Others
          </h1>
          <p className="text-on-surface/75 mb-8 text-lg">
            See how Swiper compares to other popular slider and carousel
            libraries across features, performance, and developer experience.
          </p>
          <div className="space-y-4 sm:grid sm:grid-cols-2 sm:gap-6 sm:space-y-0">
            {pages.map((page) => (
              <Link
                href={`/compare/${page.slug}`}
                key={page.slug}
                className="group relative block rounded-2xl border border-outline p-6 duration-200 bg-surface-1 hover:bg-white/15 active:bg-surface-1/80 hover:!no-underline"
              >
                <div className="text-xl font-medium text-on-surface ">
                  Swiper vs {page.competitor}
                </div>
                <div className="mt-2 text-sm text-on-surface/75">
                  {page.tagline}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export async function getStaticProps() {
  const existingFiles = fs
    .readdirSync('./src/pages/compare')
    .filter((f) => f.includes('.mdx'))
    .map((f) => f.replace('.mdx', ''));

  const pages = comparisons
    .map((c) => ({
      ...c,
      exists: existingFiles.includes(c.slug),
    }))
    .filter((c) => c.exists);

  return {
    props: {
      pages,
    },
  };
}

const meta = {
  title: 'Swiper vs Others - Slider Comparison',
};

Compare.layoutProps = {
  meta,
};
