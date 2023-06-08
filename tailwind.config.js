const colors = require('tailwindcss/colors');

module.exports = {
  content: ['./src/**/*.js', './src/**/*.mdx', './src/**/*.md'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // primary: '#0080ff',
        // primaryLight: '#0080ff',
        'primary-shade': 'var(--color-primary-shade)',
        'primary-tint': 'var(--color-primary-tint)',
        primary: 'var(--color-primary)',
        'on-primary': 'var(--color-on-primary)',
        'primary-container': 'var(--color-primary-container)',
        'on-primary-container': 'var(--color-on-primary-container)',
        secondary: 'var(--color-secondary)',
        'on-secondary': 'var(--color-on-secondary)',
        'secondary-container': 'var(--color-secondary-container)',
        'on-secondary-container': 'var(--color-on-secondary-container)',
        surface: 'var(--color-surface)',
        'on-surface': 'var(--color-on-surface)',
        'surface-variant': 'var(--color-surface-variant)',
        'on-surface-variant': 'var(--color-on-surface-variant)',
        outline: 'var(--color-outline)',
        'outline-variant': 'var(--color-outline-variant)',
        'inverse-surface': 'var(--color-inverse-surface)',
        'inverse-on-surface': 'var(--color-inverse-on-surface)',
        'inverse-primary': 'var(--color-inverse-primary)',
        'surface-1': 'var(--color-surface-1)',
        'surface-2': 'var(--color-surface-2)',
        'surface-3': 'var(--color-surface-3)',
        'surface-4': 'var(--color-surface-4)',
        'surface-5': 'var(--color-surface-5)',
        green: colors.emerald,
        yellow: colors.amber,
        purple: colors.violet,
        'dark-0': '#111827',
        'dark-1': '#1c273f',
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            h1: {
              'font-size': '40px',
            },
            h2: {
              'font-size': '32px',
              color: 'inherit',
            },
            h3: {
              'font-size': '26px',
              color: 'inherit',
            },
            h4: {
              color: 'inherit',
            },
          },
        },
      }),
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
