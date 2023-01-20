import { commonFiles, packageName } from './common';

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
        vue: '^3.2.45',
        swiper: '^9.0.0-beta.33',
      },
      devDependencies: {
        vite: '^4.0.4',
        '@vue/compiler-sfc': '^3.2.45',
        '@vitejs/plugin-vue': '^4.0.0',
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
  ...commonFiles,
});
export default vueFiles;
