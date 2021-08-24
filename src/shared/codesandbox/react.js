import { commonFiles, packageName } from './common';

const reactFiles = (title) => ({
  'package.json': {
    content: {
      name: packageName('React', title),
      license: 'MIT',
      tags: ['swiper'],
      dependencies: {
        react: '17.0.1',
        'react-dom': '17.0.1',
        swiper: 'next',
      },
      devDependencies: {
        vite: '^2.5.0',
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
import React from "react";
import ReactDOM from "react-dom";

// eslint-disable-next-line
import "swiper/css/bundle";
import "./styles.css";

import App from "./App.jsx";

ReactDOM.render(<App />, document.getElementById("app"));
    `,
  },
  'index.html': {
    content: `<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Swiper React</title>
      </head>
      <body>
        <div id="app"></div>
        <script type="module" src="/src/main.jsx"></script>
      </body>
    </html>
    `,
  },
  ...commonFiles,
});

export default reactFiles;
