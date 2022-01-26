import { useIsomorphicLayoutEffect } from '@/hooks/useIsomorphicLayoutEffect';
import { Listbox } from '@headlessui/react';
import clsx from 'clsx';
import { Fragment, useEffect, useRef, useState } from 'react';

function update() {
  if (
    localStorage.theme === 'dark' ||
    (!('theme' in localStorage) &&
      window.matchMedia('(prefers-color-scheme: dark)').matches)
  ) {
    document.documentElement.classList.add('dark', 'changing-theme');
  } else {
    document.documentElement.classList.remove('dark', 'changing-theme');
  }
  window.setTimeout(() => {
    document.documentElement.classList.remove('changing-theme');
  });
}

let settings = [
  {
    value: 'light',
    label: 'Light',
    icon: SunIcon,
  },
  {
    value: 'dark',
    label: 'Dark',
    icon: MoonIcon,
  },
  {
    value: 'system',
    label: 'System',
    icon: PcIcon,
  },
];

function SunIcon({ selected, dropdown, ...props }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path
        d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
        className={
          dropdown
            ? `${
                selected
                  ? 'fill-primary/20 stroke-primary'
                  : 'stroke-gray-400 dark:stroke-gray-500'
              }`
            : `${
                selected
                  ? 'fill-transperent stroke-white'
                  : 'stroke-gray-400 dark:stroke-gray-500'
              }`
        }
      />
      <path
        d="M12 4v1M17.66 6.344l-.828.828M20.005 12.004h-1M17.66 17.664l-.828-.828M12 20.01V19M6.34 17.664l.835-.836M3.995 12.004h1.01M6 6l.835.836"
        className={
          dropdown
            ? `${
                selected
                  ? 'stroke-primary'
                  : 'stroke-gray-400 dark:stroke-gray-500'
              }`
            : `${
                selected
                  ? 'stroke-white'
                  : 'stroke-gray-400 dark:stroke-gray-500'
              }`
        }
      />
    </svg>
  );
}

function MoonIcon({ selected, dropdown, ...props }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M17.715 15.15A6.5 6.5 0 0 1 9 6.035C6.106 6.922 4 9.645 4 12.867c0 3.94 3.153 7.136 7.042 7.136 3.101 0 5.734-2.032 6.673-4.853Z"
        className={
          dropdown
            ? `${selected ? 'fill-primary/20' : 'fill-transparent'}`
            : 'fill-transparent'
        }
      />
      <path
        d="m17.715 15.15.95.316a1 1 0 0 0-1.445-1.185l.495.869ZM9 6.035l.846.534a1 1 0 0 0-1.14-1.49L9 6.035Zm8.221 8.246a5.47 5.47 0 0 1-2.72.718v2a7.47 7.47 0 0 0 3.71-.98l-.99-1.738Zm-2.72.718A5.5 5.5 0 0 1 9 9.5H7a7.5 7.5 0 0 0 7.5 7.5v-2ZM9 9.5c0-1.079.31-2.082.845-2.93L8.153 5.5A7.47 7.47 0 0 0 7 9.5h2Zm-4 3.368C5 10.089 6.815 7.75 9.292 6.99L8.706 5.08C5.397 6.094 3 9.201 3 12.867h2Zm6.042 6.136C7.718 19.003 5 16.268 5 12.867H3c0 4.48 3.588 8.136 8.042 8.136v-2Zm5.725-4.17c-.81 2.433-3.074 4.17-5.725 4.17v2c3.552 0 6.553-2.327 7.622-5.537l-1.897-.632Z"
        className={
          dropdown
            ? `${
                selected ? 'fill-primary' : 'fill-gray-400 dark:fill-gray-500'
              }`
            : `${selected ? 'fill-white' : 'fill-gray-200 dark:fill-gray-300'}`
        }
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M17 3a1 1 0 0 1 1 1 2 2 0 0 0 2 2 1 1 0 1 1 0 2 2 2 0 0 0-2 2 1 1 0 1 1-2 0 2 2 0 0 0-2-2 1 1 0 1 1 0-2 2 2 0 0 0 2-2 1 1 0 0 1 1-1Z"
        className={
          dropdown
            ? `${
                selected ? 'fill-primary' : 'fill-gray-400 dark:fill-gray-500'
              }`
            : `${selected ? 'fill-white' : 'fill-gray-200 dark:fill-gray-300'}`
        }
      />
    </svg>
  );
}

function PcIcon({ selected, dropdown, ...props }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <path
        d="M4 6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6Z"
        strokeWidth="2"
        strokeLinejoin="round"
        className={
          selected
            ? 'fill-primary/20 stroke-primary'
            : 'stroke-gray-400 dark:stroke-gray-500'
        }
      />
      <path
        d="M14 15c0 3 2 5 2 5H8s2-2 2-5"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={
          selected ? 'stroke-primary' : 'stroke-gray-400 dark:stroke-gray-500'
        }
      />
    </svg>
  );
}

function useTheme() {
  let [setting, setSetting] = useState('system');
  let initial = useRef(true);

  useIsomorphicLayoutEffect(() => {
    let theme = localStorage.theme;
    if (theme === 'light' || theme === 'dark') {
      setSetting(theme);
    }
  }, []);

  useIsomorphicLayoutEffect(() => {
    if (setting === 'system') {
      localStorage.removeItem('theme');
    } else if (setting === 'light' || setting === 'dark') {
      localStorage.theme = setting;
    }
    if (initial.current) {
      initial.current = false;
    } else {
      update();
    }
  }, [setting]);

  useEffect(() => {
    let mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    mediaQuery.addEventListener('change', update);

    function onStorage() {
      update();
      let theme = localStorage.theme;
      if (theme === 'light' || theme === 'dark') {
        setSetting(theme);
      } else {
        setSetting('system');
      }
    }
    window.addEventListener('storage', onStorage);

    return () => {
      mediaQuery.removeEventListener('change', update);
      window.removeEventListener('storage', onStorage);
    };
  }, []);

  return [setting, setSetting];
}

export function ThemeToggle({ panelClassName = 'mt-4' }) {
  let [setting, setSetting] = useTheme();

  return (
    <Listbox value={setting} onChange={setSetting}>
      <Listbox.Label className="sr-only">Theme</Listbox.Label>
      <Listbox.Button type="button" className="outline-none">
        <span className="dark:hidden">
          <SunIcon className="h-6 w-6" selected={setting !== 'system'} />
        </span>
        <span className="hidden dark:inline">
          <MoonIcon className="h-6 w-6" selected={setting !== 'system'} />
        </span>
      </Listbox.Button>
      <Listbox.Options
        className={clsx(
          'dark:highlight-white/5 absolute top-full right-0 z-50 w-36 overflow-hidden rounded-lg bg-white py-1 font-medium text-gray-500 shadow-lg outline-none ring-1 ring-gray-900/10 dark:ring-0',
          panelClassName
        )}
      >
        {settings.map(({ value, label, icon: Icon }) => (
          <Listbox.Option key={value} value={value} as={Fragment}>
            {({ active, selected }) => (
              <li
                className={clsx(
                  'flex cursor-pointer items-center py-2 px-4 text-gray-500 outline-none',
                  selected && 'text-primary',
                  active && 'bg-primary bg-opacity-10'
                )}
              >
                <Icon selected={selected} dropdown className="mr-2 h-6 w-6" />
                {label}
              </li>
            )}
          </Listbox.Option>
        ))}
      </Listbox.Options>
    </Listbox>
  );
}

export function ThemeSelect() {
  let [setting, setSetting] = useTheme();

  let { label } = settings.find((x) => x.value === setting);

  return (
    <div className="flex items-center justify-between">
      <label
        htmlFor="theme"
        className="font-normal text-gray-700 dark:text-gray-400"
      >
        Switch theme
      </label>
      <div className="dark:highlight-white/5 relative flex items-center rounded-lg p-2 font-semibold text-gray-700 shadow-sm ring-1 ring-gray-900/10 dark:bg-gray-600 dark:text-gray-200 dark:ring-0">
        <SunIcon className="mr-2 h-6 w-6 dark:hidden" />
        <svg
          viewBox="0 0 24 24"
          fill="none"
          className="mr-2 hidden h-6 w-6 dark:block"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M17.715 15.15A6.5 6.5 0 0 1 9 6.035C6.106 6.922 4 9.645 4 12.867c0 3.94 3.153 7.136 7.042 7.136 3.101 0 5.734-2.032 6.673-4.853Z"
            className="fill-transparent"
          />
          <path
            d="m17.715 15.15.95.316a1 1 0 0 0-1.445-1.185l.495.869ZM9 6.035l.846.534a1 1 0 0 0-1.14-1.49L9 6.035Zm8.221 8.246a5.47 5.47 0 0 1-2.72.718v2a7.47 7.47 0 0 0 3.71-.98l-.99-1.738Zm-2.72.718A5.5 5.5 0 0 1 9 9.5H7a7.5 7.5 0 0 0 7.5 7.5v-2ZM9 9.5c0-1.079.31-2.082.845-2.93L8.153 5.5A7.47 7.47 0 0 0 7 9.5h2Zm-4 3.368C5 10.089 6.815 7.75 9.292 6.99L8.706 5.08C5.397 6.094 3 9.201 3 12.867h2Zm6.042 6.136C7.718 19.003 5 16.268 5 12.867H3c0 4.48 3.588 8.136 8.042 8.136v-2Zm5.725-4.17c-.81 2.433-3.074 4.17-5.725 4.17v2c3.552 0 6.553-2.327 7.622-5.537l-1.897-.632Z"
            className="fill-gray-400"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M17 3a1 1 0 0 1 1 1 2 2 0 0 0 2 2 1 1 0 1 1 0 2 2 2 0 0 0-2 2 1 1 0 1 1-2 0 2 2 0 0 0-2-2 1 1 0 1 1 0-2 2 2 0 0 0 2-2 1 1 0 0 1 1-1Z"
            className="fill-gray-400"
          />
        </svg>
        {label}
        <svg className="ml-2 h-6 w-6 text-gray-400" fill="none">
          <path
            d="m15 11-3 3-3-3"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <select
          id="theme"
          value={setting}
          onChange={(e) => setSetting(e.target.value)}
          className="absolute inset-0 h-full w-full appearance-none opacity-0"
        >
          {settings.map(({ value, label }) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
