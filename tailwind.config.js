const colors = require('tailwindcss/colors');

module.exports = {
  content: ['./src/**/*.js', './src/**/*.mdx', './src/**/*.md'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#0080ff',
        primaryLight: '#0080ff',
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
