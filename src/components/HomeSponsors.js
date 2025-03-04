import sponsors from '../shared/sponsors-list.json';

const PlanSection = (props) => {
  const { showPlaceholder, showTitle, spacing } = props;
  const items = sponsors.filter(
    ({ plan, active }) => props.plan === plan && active
  );
  const sizes = {
    'Platinum Sponsor': 'm-2 w-40 h-40',
    'Gold Sponsor': 'm-2 w-24 h-24',
    'Silver Sponsor': 'm-1 w-16 h-16',
    Sponsor: 'm-1 w-8 h-8',
  }[props.plan];

  if (!items.length && !showPlaceholder) return null;

  return (
    <div className={spacing ? 'mb-8' : ''}>
      {showTitle && (
        <h2 className="mb-4 text-center text-2xl font-extrabold sm:text-3xl">
          {props.plan}s
        </h2>
      )}
      <div className="mx-auto flex max-w-6xl flex-wrap justify-center">
        {items.map(({ link, title, image }, index) => {
          return (
            <a
              className={`flex items-center justify-center overflow-hidden rounded bg-white text-center duration-300 ${sizes}`}
              href={link}
              key={title + index}
              title={title}
              rel="sponsored"
              target="_blank"
            >
              {image && (
                <img
                  className="h-auto max-h-full w-auto max-w-full rounded"
                  src={`/images/sponsors/${image}`}
                  alt={title}
                  loading="lazy"
                />
              )}
            </a>
          );
        })}
        {showPlaceholder && (
          <a
            className={`flex items-center justify-center rounded-md bg-surface-1 p-1 text-center font-semibold duration-300 hover:bg-surface-2 hover:no-underline ${sizes} ${
              props.plan === 'Sponsor' ? 'text-[6px] leading-none' : 'text-xs'
            }`}
            href="https://opencollective.com/swiper"
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

export default function HomeSponsors({
  showPlaceholders,
  showTitles,
  spacing = true,
}) {
  return (
    <>
      <PlanSection
        showPlaceholder={showPlaceholders}
        showTitle={showTitles}
        spacing={spacing}
        plan="Platinum Sponsor"
      />
      <PlanSection
        showPlaceholder={showPlaceholders}
        showTitle={showTitles}
        spacing={spacing}
        plan="Gold Sponsor"
      />
      <PlanSection
        showPlaceholder={showPlaceholders}
        showTitle={showTitles}
        spacing={spacing}
        plan="Silver Sponsor"
      />
      <PlanSection
        showPlaceholder={showPlaceholders}
        showTitle={showTitles}
        spacing={spacing}
        plan="Sponsor"
      />
    </>
  );
}
