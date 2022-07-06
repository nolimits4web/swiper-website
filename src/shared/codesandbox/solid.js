import { commonFiles, packageName } from './common';

const solidFiles = (title) => ({
  'package.json': {
    content: {
      name: packageName('Solid', title),
      license: 'MIT',
      tags: ['swiper'],
      dependencies: {
        'solid-js': '1.4.4',
        swiper: '^8.0.0',
      },
      devDependencies: {
        vite: '^2.7.0',
        'vite-plugin-solid': '^2.2.6',
      },
      scripts: {
        dev: 'vite',
        start: 'vite',
        build: 'vite build',
      },
    },
  },
  'src/App.jsx': {
    content: '',
  },
  'styles.css': {
    content: '',
  },
  'src/main.jsx': {
    content: `
import { render } from "solid-js/web";

// eslint-disable-next-line
import "swiper/css/bundle";
import "./styles.css";

import App from "./App.jsx";

render(App, document.getElementById('app'));
    `.trim(),
  },
  'index.html': {
    content: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Swiper Solid</title>
  </head>
  <body>
    <div id="app"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
    `.trim(),
  },
  'vite.config.js': {
    content: `
import { defineConfig } from "vite";
import solidPlugin from 'vite-plugin-solid';

export default defineConfig({
  plugins: [solidPlugin()]
})
  `.trim(),
  },
  ...commonFiles,
});

export default solidFiles;
