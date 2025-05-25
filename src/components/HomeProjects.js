import Link from 'next/link';

export default function HomeProjects() {
  return (
    <div className="mx-auto grid grid-cols-2 items-stretch gap-4 sm:grid-cols-3 md:gap-8 text-center lg:grid-cols-4">
      {[
        {
          url: 'https://paneflow.com',
          title: 'Paneflow',
          description: 'Build Stunning Slideshows Visually. No Code Required',
          logo: 'paneflow.svg',
        },
        {
          url: 'https://t0ggles.com',
          title: 't0ggles',
          description: 'Your ultimate multiple projects management tool',
          logo: 't0ggles.svg',
        },
        {
          url: 'https://studio.swiperjs.com',
          title: 'Swiper Studio',
          description:
            'Create Beautiful And Responsive Swipers Without Writing Any Code',
          logo: 'swiper-studio-logo.svg',
        },
        {
          url: 'https://uiinitiative.com',
          title: 'UI Initiative',
          description: 'Premium templates & plugins for Swiper and Framework7',
          logo: 'uiinitiative.svg',
        },
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
        <Link
          className=" bg-surface-2 rounded-3xl !text-on-surface !no-underline relative group"
          href={item.url}
          target="_blank"
          key={item.title}
        >
          <div className="absolute inset-0 bg-white/10 rounded-3xl opacity-0 group-hover:opacity-100 duration-200 group-active:opacity-50 pointer-events-none" />
          <div className="flex flex-col gap-4 md:gap-8 p-4 md:p-8 items-center justify-center group-active:scale-90 group-active:opacity-75 duration-200">
            <img
              className="w-16 h-16 lg:w-24 lg:h-24"
              src={`/images/projects/${item.logo}`}
              alt={item.title}
            />
            <div className="flex flex-col gap-2 md:gap-4">
              <div className="">{item.title}</div>
              <div className="text-on-surface-darker">{item.description}</div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
