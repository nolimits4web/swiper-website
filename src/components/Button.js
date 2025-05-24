import clsx from 'clsx';
import Link from 'next/link';

export const Button = ({
  children,
  transparent = false,
  className,
  href,
  ...rest
}) => {
  const Component = href ? Link : 'button';
  return (
    <Component
      href={href}
      className={clsx(
        'h-16 rounded-full text-lg flex items-center justify-center gap-4 !no-underline !text-on-surface px-8 cursor-pointer relative group/button',
        !transparent && 'bg-brand',
        transparent && 'border border-outline',
        className
      )}
      {...rest}
    >
      <div
        className={clsx(
          'absolute inset-0 rounded-full opacity-0 group-hover/button:opacity-100 duration-200  ',
          transparent && 'bg-white/10 group-active/button:opacity-75',
          !transparent &&
            'bg-white/20 group-active/button:bg-black/10 group-active/button:opacity-100'
        )}
      />
      <div
        className={clsx(
          'flex items-center justify-center gap-4 group-active/button:scale-90 duration-200'
        )}
      >
        {children}
      </div>
    </Component>
  );
};
