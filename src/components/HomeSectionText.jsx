import clsx from 'clsx';

export const HomeSectionText = ({ className, children }) => {
  return (
    <div
      className={clsx(
        'text-lg sm:text-2xl leading-[1.5] text-center text-on-surface-dark -mt-6 mb-12 text-balance max-w-5xl mx-auto',
        className
      )}
    >
      {children}
    </div>
  );
};
