import { trackOutbound } from 'src/shared/track-outbound';
import sponsors from '../shared/sponsors-list';

export default function FooterSponsors() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 my-8 gap-3">
      {sponsors
        .filter(({ plan }) => plan !== 'Sponsor')
        .map(({ link, title, image, image_h, alt }) => {
          return (
            <a
              className="flex justify-center border p-1 items-center text-center hover:bg-gray-50 h-20"
              href={link}
              key={title}
              title={title}
              rel="noopener"
              target="_blank"
              onClick={() => trackOutbound(link)}
            >
              <img
                className="max-w-full w-auto max-h-full"
                src={`/images/sponsors/${image_h || image}`}
                alt={title}
              />
            </a>
          );
        })}
    </div>
  );
}
