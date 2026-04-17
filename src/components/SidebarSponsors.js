import sponsors from '../shared/sponsors-list.json';
import n4Sponsors from '../shared/n4-sponsors.json';

const allSponsors = [...n4Sponsors, ...sponsors];

const getImageSrc = (image) =>
  image.startsWith('http') ? image : `/images/sponsors/${image}`;

export default function SidebarSponsors() {
  if (typeof window !== 'undefined' && window.__NO_SPONSORS__) return null;
  return (
    <div className="mb-4" data-sponsors="">
      <div className="mb-2 flex items-center justify-between">
        <span>Sponsors</span>
        <a
          href="https://sponsors.nolimits4web.com"
          target="_blank"
          className="text-xs text-primary no-underline"
        >
          Become a sponsor
        </a>
      </div>
      <div className="flex flex-wrap gap-1">
        {allSponsors
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
                  src={getImageSrc(image)}
                />
              )}
            </a>
          ))}
      </div>
    </div>
  );
}
