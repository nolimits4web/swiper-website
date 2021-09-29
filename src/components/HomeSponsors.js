import { trackOutbound } from 'src/shared/track-outbound';
import sponsors from '../shared/sponsors-list';

const PlanSection = (props) => {
  const { showPlaceholder, showTitle } = props;
  const items = sponsors.filter(({ plan }) => props.plan === plan);
  const sizes = {
    'Platinum Sponsor': 'm-2 w-40 h-40',
    'Gold Sponsor': 'm-2 w-36 h-36',
    'Silver Sponsor': 'm-2 sm:m-3 w-24 h-24 sm:w-32 sm:h-32',
    Sponsor: 'm-2 w-16 h-16 sm:w-24 sm:h-24',
  }[props.plan];

  if (!items.length && !showPlaceholder) return null;

  return (
    <div className="mb-20">
      {showTitle && (
        <h2 className="text-2xl sm:text-3xl text-gray-900 text-center font-extrabold mb-4">
          {props.plan}s
        </h2>
      )}
      <div className="flex flex-wrap justify-center">
        {items.map(({ link, title, image }) => {
          return (
            <a
              className={`flex justify-center items-center text-center duration-300 ${sizes}`}
              href={link}
              key={title}
              title={title}
              rel="noopener"
              target="_blank"
              onClick={() => trackOutbound(link)}
            >
              <img
                className="w-auto h-auto max-h-full max-w-full"
                src={`/images/sponsors/${image}`}
                alt={title}
              />
            </a>
          );
        })}
        {showPlaceholder && (
          <a
            className={`flex justify-center items-center p-3 m-4 text-center duration-300 bg-gray-100 hover:bg-gray-200 text-sm font-semibold hover:no-underline ${sizes}`}
            href={'https://opencollective.com/swiper'}
            onClick={() => trackOutbound('https://opencollective.com/swiper')}
            rel="noopener"
            target="_blank"
          >
            Become {props.plan}
          </a>
        )}
      </div>
    </div>
  );
};

export default function HomeSponsors({ showPlaceholders, showTitles }) {
  return (
    <>
      <PlanSection
        showPlaceholder={showPlaceholders}
        showTitle={showTitles}
        plan="Platinum Sponsor"
      />
      <PlanSection
        showPlaceholder={showPlaceholders}
        showTitle={showTitles}
        plan="Gold Sponsor"
      />
      <PlanSection
        showPlaceholder={showPlaceholders}
        showTitle={showTitles}
        plan="Silver Sponsor"
      />
      <PlanSection
        showPlaceholder={showPlaceholders}
        showTitle={showTitles}
        plan="Sponsor"
      />
    </>
  );
}
