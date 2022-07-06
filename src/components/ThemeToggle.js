import { useIsomorphicLayoutEffect } from '@/hooks/useIsomorphicLayoutEffect';
import { Listbox } from '@headlessui/react';
import clsx from 'clsx';
import { Fragment, useEffect, useRef, useState } from 'react';
import {
  SunMaxFill,
  MoonStarsFill,
  Desktopcomputer,
} from 'framework7-icons/react';

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
    icon: SunMaxFill,
  },
  {
    value: 'dark',
    label: 'Dark',
    icon: MoonStarsFill,
  },
  {
    value: 'system',
    label: 'System',
    icon: Desktopcomputer,
  },
];

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
      <Listbox.Button
        type="button"
        className="text-black outline-none hover:!text-primary dark:text-white"
      >
        <span className="dark:hidden">
          <SunMaxFill className="h-6 w-6" selected={setting !== 'system'} />
        </span>
        <span className="hidden dark:inline">
          <MoonStarsFill className="h-6 w-6" selected={setting !== 'system'} />
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
