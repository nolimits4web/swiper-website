import clsx from 'clsx';
import {
  NumberScrubber,
  Switch,
  Select,
  Popover,
  PopoverRoot,
  PopoverTrigger,
  Button,
  Chip,
  List,
  ListButton,
  ListSeparator,
  ListTitle,
  DropdownIcon,
  Toolbar,
  Segmented,
  SegmentedButton,
  Tooltip,
  PopoverClose,
} from '@cladd-ui/react';
import { TextIcon, ImageIcon } from './PlaygroundSidebar';

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
        'flex items-center justify-between gap-2 py-1',
        indent && 'pl-3'
      )}
    >
      {apiAnchor ? (
        <a
          href={`/swiper-api#param-${apiAnchor}`}
          target="_blank"
          rel="noopener noreferrer"
          className="min-w-0  truncate text-xs text-cladd-fg-soft! no-underline! transition-colors hover:text-cladd-fg! hover:underline!"
        >
          {label}
        </a>
      ) : (
        <span className="min-w-0 flex-1 truncate text-xs text-cladd-fg-soft">
          {label}
        </span>
      )}
      <div className="shrink-0">{children}</div>
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
      <Switch size="sm" checked={value} onChange={onChange} />
    </ParamRow>
  );
}

function NumberInputControl({ param, value, onChange }) {
  const step = param.step ?? 1;
  const min = param.min ?? 0;
  const max = param.max ?? 1_000_000;
  const isFractional = step < 1;
  const unit = param.unit ?? '';
  const formatNumber = isFractional
    ? (v) => (Number.isInteger(v) ? String(v) : v.toFixed(2))
    : (v) => String(v);
  const displayValue = (v) => `${formatNumber(v)}${unit}`;

  return (
    <ParamRow
      label={param.label}
      apiAnchor={getApiAnchor(param.name)}
      indent={param.indent}
    >
      <NumberScrubber
        size="md"
        rounded
        value={value}
        onChange={onChange}
        min={min}
        max={max}
        step={step}
        displayValue={displayValue}
        className="min-w-20"
        onPointerDown={() =>
          window.dispatchEvent(new Event('playground:scrub-start'))
        }
      />
    </ParamRow>
  );
}

function renderSegmentIcon(iconKey) {
  if (iconKey === 'text-image') {
    return (
      <span className="flex items-center gap-0.5">
        <TextIcon className="-mr-1!" />
        <ImageIcon />
      </span>
    );
  }
  if (iconKey === 'text') return <TextIcon />;
  if (iconKey === 'image') return <ImageIcon />;
  return null;
}

function SegmentedInputControl({ param, value, onChange }) {
  const hasIcons = param.options.every((o) => o.iconKey);
  return (
    <ParamRow
      label={param.label}
      apiAnchor={getApiAnchor(param.name)}
      indent={param.indent}
    >
      <Toolbar size="sm">
        <Segmented>
          {param.options.map((o) => {
            const button = (
              <SegmentedButton
                key={hasIcons ? undefined : o.value}
                active={o.value === value}
                onClick={() => onChange(o.value)}
                aria-label={o.label}
              >
                {hasIcons ? renderSegmentIcon(o.iconKey) : o.label}
              </SegmentedButton>
            );
            if (hasIcons) {
              return (
                <Tooltip key={o.value} tooltip={o.label}>
                  {button}
                </Tooltip>
              );
            }
            return button;
          })}
        </Segmented>
      </Toolbar>
    </ParamRow>
  );
}

function SelectInputControl({ param, value, onChange }) {
  const options = param.options.map((o) => o.value);
  const labelByValue = Object.fromEntries(
    param.options.map((o) => [o.value, o.label])
  );

  return (
    <ParamRow
      label={param.label}
      apiAnchor={getApiAnchor(param.name)}
      indent={param.indent}
    >
      <Select
        size="md"
        rounded
        keyboardHints={false}
        title={param.label}
        options={options}
        value={value}
        onChange={onChange}
        renderOption={({ value: v }) => labelByValue[v]}
        className="w-24"
        popoverClassName="min-w-[140px]"
      >
        {labelByValue[value] ?? value}
      </Select>
    </ParamRow>
  );
}

function EffectSelectControl({ param, value, onChange }) {
  const freeOptions = param.options.filter((o) => !o.pro);
  const proOptions = param.options.filter((o) => o.pro);
  const labelByValue = Object.fromEntries(
    param.options.map((o) => [o.value, o.label])
  );

  return (
    <ParamRow
      label={param.label}
      apiAnchor={getApiAnchor(param.name)}
      indent={param.indent}
    >
      <PopoverRoot>
        <PopoverTrigger>
          <Button
            size="md"
            rounded
            className="w-24"
            contentClassName="gap-1 pr-1.5"
          >
            <span className="flex-1 truncate text-left">
              {labelByValue[value] ?? value}
            </span>
            <DropdownIcon className="shrink-0 text-cladd-fg-softer" />
          </Button>
        </PopoverTrigger>
        <Popover className="w-56" offset={4} position="bottom-end">
          <List>
            {freeOptions.map((o) => (
              <PopoverClose key={o.value}>
                <ListButton
                  size="md"
                  selected={o.value === value}
                  color={o.value === value ? 'brand' : undefined}
                  onClick={() => onChange(o.value)}
                >
                  {o.label}
                </ListButton>
              </PopoverClose>
            ))}
            <ListSeparator />
            <ListTitle>Swiper Studio</ListTitle>
            {proOptions.map((o) => (
              <PopoverClose key={o.value}>
                <ListButton
                  as="a"
                  href="https://studio.swiperjs.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  size="md"
                  className="text-cladd-fg! no-underline!"
                  icon={
                    <img
                      src="/images/projects/swiper-studio-logo.svg"
                      className="size-4 rounded border border-white/10"
                      alt=""
                    />
                  }
                  after={
                    <Chip size="md" color="brand">
                      PRO
                    </Chip>
                  }
                >
                  {o.label}
                </ListButton>
              </PopoverClose>
            ))}
          </List>
        </Popover>
      </PopoverRoot>
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
          <EffectSelectControl
            param={param}
            value={value}
            onChange={onChange}
          />
        );
      }
      if (param.segmented) {
        return (
          <SegmentedInputControl
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
