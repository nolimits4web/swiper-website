import menuList from '../shared/menu-list';
import Link from 'next/link';
import FooterSponsors from './FooterSponsors';
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
    <footer className="border-t-8 border-primary text-center py-10 px-4">
      <div className="max-w-5xl mx-auto font-medium">
        <div>
          Supported by:{' '}
          <a
            href="https://www.colognewebdesign.de"
            rel="noopener"
            target="_blank"
            title="COLOGNE WEBDESIGN"
          >
            COLOGNE WEBDESIGN
          </a>
        </div>
        <FooterSponsors />
        <div className="text-center my-8">
          <a href="https://www.netlify.com" target="_blank" rel="noopener">
            <img
              width={114}
              height={51}
              alt="Desploys on Netlify"
              className="inline"
              src="/images/netlify-color-bg.svg"
            />
          </a>
        </div>
        <nav className="my-8 space-x-4 flex flex-wrap justify-center">
          {menu}
        </nav>
        <div className="text-gray-700">
          {new Date().getFullYear()} © Swiper by{' '}
          <a href="https://github.com/nolimits4web">Vladimir Kharlampidi</a>
        </div>
      </div>
    </footer>
  );
}
