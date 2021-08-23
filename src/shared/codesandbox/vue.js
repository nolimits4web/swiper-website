import { common, packageName } from './common';

const vueFiles = (title) => ({
  'package.json': {
    content: {
      name: packageName('Vue', title),
      license: 'MIT',
      tags: ['swiper'],
      scripts: {
        dev: 'vite',
        start: 'vite',
        build: 'vite build',
      },
      dependencies: {
        vue: '^3.0.0',
        swiper: 'next',
      },
      devDependencies: {
        vite: '^2.5.0',
        '@vue/compiler-sfc': '^3.2.4',
        '@vitejs/plugin-vue': '^1.4.0',
      },
    },
  },
  'src/App.vue': {
    content: '',
  },
  'index.html': {
    content: `
    <div id="app"></div>
    <script type="module">
      import { createApp } from 'vue'
      import App from './src/App.vue'

      createApp(App).mount('#app')
    </script>
    `,
  },
  'vite.config.js': {
    content: `
import vue from '@vitejs/plugin-vue'

/**
 * https://vitejs.dev/config/
 * @type {import('vite').UserConfig}
 */
export default {
  plugins: [vue()]
}
  `,
  },
  ...common,
});
export default vueFiles;
