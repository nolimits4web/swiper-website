export function SponsorButton(props) {
  const { href, className, onClick, children, ...restProps } = props;
  return (
    <a
      href={href}
      rel="noopener"
      target="_blank"
      {...restProps}
      className={`inline-flex h-14 max-w-full items-center justify-center rounded-[28px] bg-primary px-6 text-base font-bold text-on-primary duration-200 hover:bg-primary-shade hover:no-underline active:rounded-xl ${className}`}
    >
      {children}
    </a>
  );
}
