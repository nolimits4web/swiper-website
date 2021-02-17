import { trackOutbound } from 'src/shared/track-outbound';
import sponsors from '../shared/sponsors';

export default function FooterSponsors() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 my-8 gap-x-3 gap-y-3">
      {sponsors
        .filter(({ plan }) => plan !== 'Sponsor')
        .map(
          ({
            link,
            title,
            image,
            image_h,
            width,
            width_h,
            height,
            height_h,
            alt,
          }) => {
            return (
              <a
                className="flex justify-center items-center p-4 border text-center hover:bg-gray-50 h-20 sm:h-28"
                href={link}
                key={title}
                title={title}
                rel="noopener"
                target="_blank"
                onClick={() => trackOutbound(link)}
              >
                <img
                  className="max-w-full w-auto max-h-full"
                  width={width_h || width}
                  height={height_h || height}
                  src={`/images/sponsors/${image_h || image}`}
                  alt={alt || title}
                />
              </a>
            );
          }
        )}
    </div>
  );
}
