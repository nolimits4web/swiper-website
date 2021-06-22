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
          className="py-1 px-2 bg-primary text-white font-medium text-xs rounded-full no-underline hover:bg-opacity-90 duration-200 hover:no-underline"
        >
          Become a sponsor
        </a>
      </div>
      <div className="-mx-2 p-2 bg-white grid grid-cols-4 gap-2 rounded shadow">
        {sponsors
          .filter(({ plan }) => plan !== 'Sponsor')
          .map(({ link, title, image_h, image, alt }) => (
            <a
              className="hover:opacity-80 flex items-center justify-center"
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
