import clsx from 'clsx';

export default function Heading({
  level,
  id,
  link = true,
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
      {link && (
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

      <span>{children}</span>
    </Component>
  );
}

Heading.h1 = (props) => <Heading level={1} {...props} />;
Heading.h2 = (props) => <Heading level={2} {...props} />;
Heading.h3 = (props) => <Heading level={3} {...props} />;
Heading.h4 = (props) => <Heading level={4} {...props} />;
