import { trackOutbound } from 'src/shared/track-outbound';
import sponsors from '../shared/sponsors';

export default function SidebarSponsors() {
  return (
    <div className="border-b-2 border-gray-200 mb-4">
      <div className="font-semibold mb-2">Sponsors:</div>
      {sponsors
        .filter(({ plan }) => plan !== 'Sponsor')
        .map(
          ({
            link,
            title,
            image_h,
            image,
            width,
            width_h,
            height,
            height_h,
            alt,
          }) => (
            <a
              className="block my-3"
              href={link}
              key={title}
              title={title}
              rel="noopener"
              target="_blank"
              onClick={() => trackOutbound(link)}
            >
              <img
                width={width_h || width}
                height={height_h || height}
                className="max-h-12 w-auto"
                alt={alt || title}
                src={`/images/sponsors/${image_h || image}`}
              />
            </a>
          )
        )}
    </div>
  );
}
