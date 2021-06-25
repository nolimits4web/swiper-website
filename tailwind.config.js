module.exports = {
  mode: 'jit',
  purge: ['./src/**/*.js', './src/**/*.mdx', './src/**/*.md'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: '#6332f6',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require('@tailwindcss/typography')],
};
