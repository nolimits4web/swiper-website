const colors = require('tailwindcss/colors');

module.exports = {
  content: ['./src/**/*.js', './src/**/*.mdx', './src/**/*.md'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#6332f6',
        green: colors.emerald,
        yellow: colors.amber,
        purple: colors.violet,
      },
      typography: (theme) => ({
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
              color: theme('colors.white'),
              borderBottomColor: theme('colors.primary'),
            },
            strong: {
              color: theme('colors.gray.200'),
            },
            // thead: {
            //   color: theme('colors.gray.300'),
            //   borderBottomColor: 'rgb(148 163 184 / 0.2)',
            // },
            // 'tbody tr': {
            //   borderBottomColor: 'rgb(148 163 184 / 0.1)',
            // },
          },
        },
      }),
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
