import { commonFiles, packageName } from './common';

const reactFiles = (title) => ({
  'package.json': {
    content: {
      name: packageName('React', title),
      license: 'MIT',
      tags: ['swiper'],
      dependencies: {
        react: '18.2.0',
        'react-dom': '18.2.0',
        swiper: '^9.0.0-beta.33',
      },
      devDependencies: {
        vite: '^4.0.4',
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
