import sponsors from '../shared/sponsors-list.json';

export default function SidebarSponsors() {
  return (
    <div className="mb-4">
      <div className="mb-2 flex items-center justify-between">
        <span>Sponsors</span>
        <a
          href="https://opencollective.com/swiper"
          target="_blank"
          className="text-xs text-primary no-underline"
        >
          Become a sponsor
        </a>
      </div>
      <div className="flex flex-wrap gap-1">
        {sponsors
          .filter(({ plan, active }) => plan !== 'Sponsor' && active)
          .map(({ link, title, image }, index) => (
            <a
              className="flex items-center justify-center hover:opacity-80 bg-white"
              href={link}
              key={title}
              title={title + index}
              rel="sponsored"
              target="_blank"
            >
              {image && (
                <img
                  className="h-7 w-7 object-contain lg:h-8 lg:w-8"
                  alt={title}
                  loading="lazy"
                  src={`/images/sponsors/${image}`}
                />
              )}
            </a>
          ))}
      </div>
    </div>
  );
}
