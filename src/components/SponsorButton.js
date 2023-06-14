import { trackOutbound } from '@/shared/track-outbound';

export function SponsorButton(props) {
  const { href, className, onClick, children, ...restProps } = props;
  return (
    <a
      href={href}
      rel="noopener"
      target="_blank"
      {...restProps}
      className={`inline-flex h-14 max-w-full items-center justify-center rounded-full bg-primary px-6 text-base font-bold text-on-primary duration-200 hover:bg-primary-shade hover:no-underline ${className}`}
      onClick={(e) => {
        onClick(e);
        trackOutbound(href);
      }}
    >
      {children}
    </a>
  );
}
