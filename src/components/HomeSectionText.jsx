import clsx from 'clsx';

export const HomeSectionText = ({ className, children }) => {
  return (
    <div
      className={clsx(
        'text-lg sm:text-2xl leading-[1.75] text-center text-on-surface-dark my-12 text-pretty max-w-5xl mx-auto',
        className
      )}
    >
      {children}
    </div>
  );
};
