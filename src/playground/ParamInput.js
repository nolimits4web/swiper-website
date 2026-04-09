import { useState, useRef, useEffect } from 'react';
import clsx from 'clsx';

const SUBPARAM_PREFIXES = [
  'navigation',
  'pagination',
  'scrollbar',
  'autoplay',
  'keyboard',
  'mousewheel',
  'freeMode',
  'grid',
  'fadeEffect',
  'cubeEffect',
  'coverflowEffect',
  'flipEffect',
  'cardsEffect',
];

function getApiAnchor(name) {
  if (name === 'totalSlides') return null;
  if (name === 'loopMode') return 'loop';

  for (const prefix of SUBPARAM_PREFIXES) {
    if (name.startsWith(prefix) && name.length > prefix.length) {
      const rest = name.slice(prefix.length);
      return `${prefix}-${rest[0].toLowerCase()}${rest.slice(1)}`;
    }
  }
  return name;
}

function ParamRow({ label, apiAnchor, children, indent }) {
  return (
    <div
      className={clsx(
        'flex items-center justify-between py-1',
        indent && 'pl-4'
      )}
    >
      {apiAnchor ? (
        <a
          href={`/swiper-api#param-${apiAnchor}`}
          target="_blank"
          rel="noopener noreferrer"
          className="mr-2 text-xs text-white/60! no-underline! transition-colors hover:underline!"
        >
          {label}
        </a>
      ) : (
        <span className="mr-2 text-xs text-white/60">{label}</span>
      )}
      {children}
    </div>
  );
}

function BooleanInput({ param, value, onChange }) {
  return (
    <ParamRow
      label={param.label}
      apiAnchor={getApiAnchor(param.name)}
      indent={param.indent}
    >
      <button
        type="button"
        onClick={() => onChange(!value)}
        className={clsx(
          'relative h-[22px] w-[40px] shrink-0 rounded-full transition-colors duration-200',
          value ? 'bg-primary' : 'bg-white/15'
        )}
      >
        <span
          className={clsx(
            'absolute top-[3px] h-4 w-4 rounded-full bg-white shadow transition-all duration-200',
            value ? 'left-[20px]' : 'left-[3px]'
          )}
        />
      </button>
    </ParamRow>
  );
}

function NumberInputControl({ param, value, onChange }) {
  const step = param.step ?? 1;
  const min = param.min ?? -Infinity;
  const max = param.max ?? Infinity;
  const round = (v) => Math.round(v * 10000) / 10000;
  const clamp = (v) => round(Math.min(max, Math.max(min, v)));
  const snap = (v) => {
    if (step >= 1) return clamp(Math.round(v / step) * step);
    return clamp(round(Math.round(v / step) * step));
  };
  const display = Number.isInteger(value)
    ? value
    : parseFloat(value.toFixed(4));

  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    if (editing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [editing]);

  const commit = () => {
    setEditing(false);
    const n = Number(draft);
    if (!Number.isNaN(n)) onChange(snap(n));
  };

  return (
    <ParamRow
      label={param.label}
      apiAnchor={getApiAnchor(param.name)}
      indent={param.indent}
    >
      <div className="flex items-center overflow-hidden rounded-full h-7 w-20 border border-outline bg-pg-surface-2">
        <button
          type="button"
          onClick={() => onChange(clamp(value - step))}
          className="flex h-full w-6 items-center justify-center text-sm leading-[1]! text-white/40 hover:text-white/80 hover:bg-pg-surface-3 active:bg-pg-surface-3/50 shrink-0"
        >
          -
        </button>
        {editing ? (
          <input
            ref={inputRef}
            type="text"
            inputMode="decimal"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onBlur={commit}
            onKeyDown={(e) => {
              if (e.key === 'Enter') commit();
              if (e.key === 'Escape') setEditing(false);
            }}
            className="w-full shrink bg-transparent text-center text-xs tabular-nums text-white/80 outline-none min-w-0"
          />
        ) : (
          <span
            className="w-full min-w-0 shrink cursor-text text-center text-xs tabular-nums text-white/80 hover:bg-pg-surface-3 active:bg-pg-surface-3 h-full flex items-center justify-center"
            onClick={() => {
              setDraft(String(display));
              setEditing(true);
            }}
          >
            {display}
          </span>
        )}
        <button
          type="button"
          onClick={() => onChange(clamp(value + step))}
          className="flex h-full w-6 items-center justify-center text-sm leading-[1]! text-white/40 hover:text-white/80 hover:bg-pg-surface-3 active:bg-pg-surface-3/50 shrink-0"
        >
          +
        </button>
      </div>
    </ParamRow>
  );
}

function SelectInputControl({ param, value, onChange }) {
  return (
    <ParamRow
      label={param.label}
      apiAnchor={getApiAnchor(param.name)}
      indent={param.indent}
    >
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="rounded-full border border-outline bg-pg-surface-2 px-2 py-1 h-7 text-xs text-white/80 outline-none min-w-20 hover:bg-pg-surface-3 active:bg-pg-surface-3"
      >
        {param.options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </ParamRow>
  );
}

function PopoverSelectControl({ param, value, onChange }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (!open) return;
    const onClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('pointerdown', onClickOutside);
    return () => document.removeEventListener('pointerdown', onClickOutside);
  }, [open]);

  const currentLabel =
    param.options.find((o) => o.value === value)?.label ?? value;

  return (
    <ParamRow
      label={param.label}
      apiAnchor={getApiAnchor(param.name)}
      indent={param.indent}
    >
      <div className="relative" ref={ref}>
        <button
          type="button"
          onClick={() => setOpen(!open)}
          className="flex items-center gap-1.5 rounded-full border border-outline bg-pg-surface-2 px-2 py-1 text-xs text-white/80 hover:bg-pg-surface-3 active:bg-pg-surface-3/50 h-7 w-20"
        >
          {currentLabel}
          <svg
            className={clsx(
              'h-3 w-3 text-white/40 transition-transform duration-200 ml-auto',
              open && 'rotate-180'
            )}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>

        {open && (
          <div className="absolute right-0 top-full z-50 mt-1 min-w-[180px] overflow-hidden rounded-xl border border-outline bg-pg-surface-2 py-1 shadow-xl">
            {param.options.map((opt) =>
              opt.pro ? (
                <a
                  key={opt.value}
                  href="https://studio.swiperjs.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex w-full items-center gap-4 px-3 py-1.5 text-left text-xs text-white/70! transition-colors hover:bg-white/5 hover:text-white! !no-underline whitespace-nowrap"
                >
                  <img
                    src="/images/projects/swiper-studio-logo.svg"
                    className="size-4.5 border border-white/10 rounded"
                  />
                  {opt.label}
                  <span className="rounded bg-primary/20 px-1.5 py-1 text-[10px] font-semibold leading-none text-primary ml-auto">
                    PRO
                  </span>
                </a>
              ) : (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => {
                    onChange(opt.value);
                    setOpen(false);
                  }}
                  className={clsx(
                    'flex w-full items-center px-3 py-1.5 text-left text-xs transition-colors',
                    opt.value === value
                      ? 'bg-primary/15 text-primary'
                      : 'text-white/70 hover:bg-white/5 hover:text-white'
                  )}
                >
                  {opt.label}
                </button>
              )
            )}
          </div>
        )}
      </div>
    </ParamRow>
  );
}

export default function ParamInput({ param, value, onChange }) {
  switch (param.type) {
    case 'boolean':
      return <BooleanInput param={param} value={value} onChange={onChange} />;
    case 'number':
      return (
        <NumberInputControl param={param} value={value} onChange={onChange} />
      );
    case 'select':
      if (param.popover) {
        return (
          <PopoverSelectControl
            param={param}
            value={value}
            onChange={onChange}
          />
        );
      }
      return (
        <SelectInputControl param={param} value={value} onChange={onChange} />
      );
    default:
      return null;
  }
}
