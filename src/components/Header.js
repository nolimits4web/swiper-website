import menuList from '../shared/menu-list';
import GithubStats from './GithubStats';
import Link from 'next/link';
import { ReactComponent as Logo } from '@/img/logo.svg';
import Carbon from './Carbon';

export default function Header() {
  return (
    <header className="bg-white border-b-8 py-6 px-4 sm:px-6 border-primary">
      <div className="max-w-6xl mx-auto md:flex flex-wrap lg:flex-nowrap">
        <Link href="/">
          <a className="flex-shrink-0">
            <Logo
              className="swiper_logo rounded-full w-24 h-24 md:w-32 md:h-32 lg:w-40 lg:h-40"
              alt="Swiper"
            />
          </a>
        </Link>
        <div className="md:ml-5 min-w-0">
          <div className="text-5xl font-extrabold text-primary mt-4 lg:mt-0">
            Swiper
            <span className="text-xs text-black ml-2 font-medium align-super">
              v{process.env.swiperReleaseVersion}
            </span>
          </div>
          <div className="text-2xl md:text-3xl my-2 font-bold text-gray-900">
            Most Modern Mobile Touch Slider
          </div>
          <nav className="mb-2 mt-4 flex flex-wrap">
            {menuList.map(({ name, link }) => (
              <Link key={link} href={link}>
                <a className="font-medium mr-4">{name}</a>
              </Link>
            ))}
          </nav>
          <GithubStats />
        </div>
        <div className="lg:ml-auto self-center mt-4 lg:mt-0 md:ml-36">
          <Carbon />
        </div>
      </div>
    </header>
  );
}
