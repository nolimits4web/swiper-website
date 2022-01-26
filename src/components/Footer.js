import menuList from '../shared/menu-list';
import Link from 'next/link';
import FooterSponsors from './FooterSponsors';
import { trackOutbound } from 'src/shared/track-outbound';
// import Image from 'next/image';

const menu = [
  { name: 'Swiper', link: '/' },
  ...menuList,
  { name: 'Sponsors', link: '/sponsors' },
].map(({ name, link }) => {
  return (
    <Link key={link} href={link}>
      {name}
    </Link>
  );
});

export default function Footer() {
  return (
    <footer className="border-t-8 border-primary py-10 px-4 text-center sm:px-6 lg:px-8 xl:px-10">
      <div className="mx-auto max-w-5xl font-medium">
        <FooterSponsors />
        <div className="my-8 text-center">
          <a
            href="https://www.netlify.com"
            target="_blank"
            rel="noopener"
            onClick={() => trackOutbound('https://www.netlify.com')}
          >
            <img
              width={114}
              height={51}
              alt="Desploys on Netlify"
              className="inline"
              src="/images/netlify-color-bg.svg"
            />
          </a>
        </div>
        <nav className="my-8 flex flex-wrap justify-center space-x-4">
          {menu}
        </nav>
        <div className="text-gray-700 dark:text-gray-400">
          {new Date().getFullYear()} © Swiper by{' '}
          <a href="https://nolimits4web.com" target="_blank">
            <img
              src="/images/n4w-logo.svg"
              alt="nolimits4web"
              className="inline-block h-12 w-12"
            />
          </a>
        </div>
      </div>
    </footer>
  );
}
