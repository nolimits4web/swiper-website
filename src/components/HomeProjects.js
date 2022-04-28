import { trackOutbound } from 'src/shared/track-outbound';
import { Atropos } from 'atropos/react';

export default function HomeProjects() {
  return (
    <div className="gr mx-auto max-w-3xl items-stretch space-y-4 sm:flex sm:space-y-0 sm:space-x-8 sm:text-center">
      {[
        {
          url: 'https://framework7.io',
          title: 'Framework7',
          description:
            'Full featured framework for building iOS, Android & desktop apps',
          logo: 'framework7.svg',
        },
        {
          url: 'https://atroposjs.com',
          title: 'Atropos',
          description: 'Stunning touch-friendly 3D parallax hover effects',
          logo: 'atropos.svg',
        },
        {
          url: 'https://konstaui.com',
          title: 'Konsta UI',
          description:
            'Pixel perfect mobile UI components built with Tailwind CSS',
          logo: 'konsta.svg',
        },
      ].map((item) => (
        <a
          className="flex w-full items-center rounded-xl border border-black border-opacity-10 px-4 py-6 text-black duration-200 hover:border-opacity-0 hover:no-underline hover:shadow-lg dark:text-white dark:hover:bg-white dark:hover:bg-opacity-10 sm:flex-col sm:hover:shadow-2xl"
          href={item.url}
          target="_blank"
          key={item.title}
        >
          <img
            className="mr-4 w-12 sm:mr-0 sm:h-32 sm:w-32"
            src={`/images/projects/${item.logo}`}
            alt={item.title}
          />
          <div>
            <div className="font-semibold text-black dark:text-white sm:mt-4 sm:mb-2">
              {item.title}
            </div>
            <div className="text-sm opacity-75">{item.description}</div>
          </div>
        </a>
      ))}
    </div>
  );
}
