import { trackOutbound } from 'src/shared/track-outbound';
import sponsors from '../shared/sponsors-list.json';

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
        <h2 className="mb-4 text-center text-2xl font-extrabold text-gray-900 dark:text-gray-200 sm:text-3xl">
          {props.plan}s
        </h2>
      )}
      <div className="flex flex-wrap justify-center">
        {items.map(({ link, title, image }) => {
          return (
            <a
              className={`flex items-center justify-center text-center duration-300 dark:bg-white dark:p-0.5 ${sizes}`}
              href={link}
              key={title}
              title={title}
              rel="noopener"
              target="_blank"
              onClick={() => trackOutbound(link)}
            >
              <img
                className="h-auto max-h-full w-auto max-w-full"
                src={`/images/sponsors/${image}`}
                alt={title}
              />
            </a>
          );
        })}
        {showPlaceholder && (
          <a
            className={`m-4 flex items-center justify-center bg-gray-100 p-3 text-center text-sm font-semibold duration-300 hover:bg-gray-200 hover:no-underline ${sizes}`}
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
