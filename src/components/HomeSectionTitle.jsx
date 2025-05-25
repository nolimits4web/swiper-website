import clsx from 'clsx';

export const HomeSectionTitle = ({ className, children }) => {
  return (
    <h2
      className={clsx(
        'text-3xl sm:text-5xl font-normal leading-normal text-center mb-12',
        className
      )}
    >
      {children}
    </h2>
  );
};
