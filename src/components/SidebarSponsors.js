import { trackOutbound } from 'src/shared/track-outbound';
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
      <div className="grid grid-cols-5 gap-2">
        {sponsors
          .filter(({ plan, active }) => plan !== 'Sponsor' && active)
          .map(({ link, title, image_h, image, alt }) => (
            <a
              className="flex items-center justify-center hover:opacity-80"
              href={link}
              key={title}
              title={title}
              rel="noopener"
              target="_blank"
              onClick={() => trackOutbound(link)}
            >
              <img
                className="h-11 w-11 object-contain dark:rounded"
                alt={title}
                src={`/images/sponsors/${image}`}
              />
            </a>
          ))}
      </div>
    </div>
  );
}
