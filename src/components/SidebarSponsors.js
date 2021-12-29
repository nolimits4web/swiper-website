import { trackOutbound } from 'src/shared/track-outbound';
import sponsors from '../shared/sponsors-list';

export default function SidebarSponsors() {
  return (
    <div className="mb-4">
      <div className="font-semibold mb-2 flex justify-between items-center">
        <span>Sponsors</span>
        <a
          href="https://opencollective.com/swiper"
          target="_blank"
          className="text-primary font-medium text-xs no-underline"
        >
          Become a sponsor
        </a>
      </div>
      <div className="bg-white dark:bg-gray-900 grid grid-cols-5 gap-2">
        {sponsors
          .filter(({ plan }) => plan !== 'Sponsor')
          .map(({ link, title, image_h, image, alt }) => (
            <a
              className="hover:opacity-80 flex items-center justify-center bg-white dark:rounded-sm overflow-hidden"
              href={link}
              key={title}
              title={title}
              rel="noopener"
              target="_blank"
              onClick={() => trackOutbound(link)}
            >
              <img
                className="max-h-16 w-auto"
                alt={title}
                src={`/images/sponsors/${image}`}
              />
            </a>
          ))}
      </div>
    </div>
  );
}
