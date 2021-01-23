import clsx from 'clsx';

export default function Heading({
  level,
  id,
  children,
  number,
  badge,
  className = '',
  hidden = false,
  toc = false,
  style = {},
  ...props
}) {
  let Component = `h${level}`;

  return (
    <Component
      className={clsx('group flex whitespace-pre-wrap', className)}
      id={id}
      style={{ ...(hidden ? { marginBottom: 0 } : {}), ...style }}
      {...props}
    >
      {!hidden && (
        // eslint-disable-next-line
        <a
          href={`#${id}`}
          className="absolute after:hash opacity-0 group-hover:opacity-100"
          style={{
            marginLeft: '-1em',
            paddingRight: '0.5em',
            color: '#a1a1aa',
            textDecoration: 'none',
          }}
          aria-label="Anchor"
        />
      )}
      {number && (
        <span className="bg-cyan-100 w-8 h-8 inline-flex items-center justify-center rounded-full text-cyan-700 text-xl mr-3 flex-none">
          {number}
        </span>
      )}
      <span className={hidden ? 'sr-only' : undefined}>{children}</span>
      {badge && (
        <span className="ml-3 inline-flex items-center px-3 py-1 rounded-full text-sm font-medium leading-4 bg-green-150 text-green-900">
          {badge}
        </span>
      )}
    </Component>
  );
}
