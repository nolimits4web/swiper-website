import clsx from 'clsx';

export const HomeContainer = ({ children, className }) => {
  return (
    <div className={clsx('mx-auto max-w-7xl px-4 sm:px-6 md:px-8', className)}>
      {children}
    </div>
  );
};
