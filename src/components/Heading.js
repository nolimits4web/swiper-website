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
          className="after:hash absolute opacity-0 group-hover:opacity-100"
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
        <span className="mr-3 inline-flex h-8 w-8 flex-none items-center justify-center rounded-full bg-cyan-100 text-xl text-cyan-700">
          {number}
        </span>
      )}
      <span className={hidden ? 'sr-only' : undefined}>{children}</span>
      {badge && (
        <span className="bg-green-150 ml-3 inline-flex items-center rounded-full px-3 py-1 text-sm font-medium leading-4 text-green-900">
          {badge}
        </span>
      )}
    </Component>
  );
}
