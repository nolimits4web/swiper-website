import clsx from 'clsx';

export const HomeSectionTitle = ({ className, children }) => {
  return (
    <h2
      className={clsx(
        'text-4xl sm:text-5xl font-medium leading-[1.1] tracking-tight text-center mb-12 text-balance max-w-screen-lg mx-auto',
        className
      )}
    >
      {children}
    </h2>
  );
};
