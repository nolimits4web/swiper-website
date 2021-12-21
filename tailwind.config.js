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
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
