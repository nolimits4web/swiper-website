import sponsors from '../shared/sponsors-list.json';

export default function SidebarSponsors() {
  return (
    <div className="mb-4">
      <div className="mb-2 flex items-center justify-between font-semibold">
        <span>Sponsors</span>
        <a
          href="https://opencollective.com/swiper"
          target="_blank"
          className="text-xs font-medium text-primary no-underline"
        >
          Become a sponsor
        </a>
      </div>
      <div className="flex flex-wrap gap-1">
        {sponsors
          .filter(({ plan, active }) => plan !== 'Sponsor' && active)
          .map(({ link, title, image }, index) => (
            <a
              className="flex items-center justify-center rounded hover:opacity-80 dark:bg-white"
              href={link}
              key={title}
              title={title + index}
              rel="noopener"
              target="_blank"
            >
              {image && (
                <img
                  className="h-7 w-7 rounded object-contain lg:h-8 lg:w-8"
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
