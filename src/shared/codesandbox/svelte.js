import { commonFiles, packageName } from './common';

const svelteFiles = (title) => ({
  'package.json': {
    content: {
      name: packageName('Svelte', title),
      tags: ['swiper', 'svelte'],
      license: 'MIT',
      scripts: {
        dev: 'vite',
        start: 'vite',
        build: 'vite build',
      },
      dependencies: {
        svelte: '^3.38.2',
        swiper: 'next',
      },
      devDependencies: {
        vite: '^2.5.0',
        '@sveltejs/vite-plugin-svelte': '^1.0.0-next.19',
      },
    },
  },
  'App.svelte': {
    content: '',
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
        <script type="module">
          import App from "./App.svelte";

          const app = new App({
            target: document.getElementById("app")
          });

          export default app;
        </script>
      </body>
    </html>
    `,
  },
  'vite.config.js': {
    content: `
import { defineConfig } from "vite";
import { svelte } from '@sveltejs/vite-plugin-svelte'

export default defineConfig({
  plugins: [svelte()]
})
  `,
  },
  ...commonFiles,
});

export default svelteFiles;
