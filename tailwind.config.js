const colors = require('tailwindcss/colors');

module.exports = {
  content: ['./src/**/*.js', './src/**/*.mdx', './src/**/*.md'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
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
          css: {},
        },
        dark: {
          css: {
            color: theme('colors.gray.400'),
            'h2, h3, h4': {
              color: theme('colors.gray.200'),
            },
            'h2 small, h3 small, h4 small': {
              color: theme('colors.gray.400'),
            },
            code: {
              color: theme('colors.gray.300'),
              backgroundColor: theme('colors.gray.800'),
            },
            hr: {
              borderColor: theme('colors.gray.200'),
              opacity: '0.05',
            },
            pre: {
              boxShadow: 'inset 0 0 0 1px rgb(255 255 255 / 0.1)',
            },
            a: {
              color: theme('colors.primaryLight'),
              borderBottomColor: theme('colors.primaryLight'),
            },
            strong: {
              color: theme('colors.gray.200'),
            },
          },
        },
      }),
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
