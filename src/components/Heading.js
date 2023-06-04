import clsx from 'clsx';

export default function Heading({
  level,
  id,
  children,
  number,
  className = '',
  style = {},
  ...props
}) {
  const Component = `h${level}`;

  return (
    <Component
      className={clsx('group flex whitespace-pre-wrap', className)}
      id={id}
      style={{ ...style }}
      {...props}
    >
      {/* eslint-disable-next-line */}
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
      {number && (
        <span className="mr-3 inline-flex h-8 w-8 flex-none items-center justify-center rounded-full bg-cyan-100 text-xl text-cyan-700">
          {number}
        </span>
      )}
      <span>{children}</span>
    </Component>
  );
}
