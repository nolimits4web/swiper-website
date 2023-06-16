export default function HomeProjects() {
  return (
    <div className="gr mx-auto max-w-3xl items-stretch space-y-4 text-left sm:flex sm:space-x-8 sm:space-y-0 sm:text-center">
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
          className="flex w-full items-center rounded-3xl border border-outline-variant px-4 py-6 text-on-surface duration-100 hover:bg-primary-container  hover:no-underline sm:flex-col"
          href={item.url}
          target="_blank"
          key={item.title}
        >
          <img
            className="mr-4 w-16 sm:mr-0 sm:h-32 sm:w-32"
            src={`/images/projects/${item.logo}`}
            alt={item.title}
          />
          <div>
            <div className="font-bold sm:mb-2 sm:mt-4">{item.title}</div>
            <div className="text-base text-on-surface-variant">
              {item.description}
            </div>
          </div>
        </a>
      ))}
    </div>
  );
}
