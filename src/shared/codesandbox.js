function packageName(title, lib) {
  return `swiper-${lib.toLowerCase()}-${title
    .toLowerCase()
    .replace(/ /g, '-')}`;
}
const commonFiles = {
  'sandbox.config.json': {
    infiniteLoopProtection: true,
    hardReloadOnChange: false,
    view: 'browser',
    template: 'node',
    container: {
      node: '14',
    },
  },
};

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

const codeSandboxFiles = {
  react: reactFiles,
  vue: vueFiles,
};

function generateCodeSandboxWorkspace(mode, contentJSON, title = '') {
  if (mode === 'core' || mode === 'element') {
    return {
      files: {
        ...contentJSON,
        'package.json': {
          content: {
            name: `swiper-${title.toLowerCase().replace(/ /g, '-')}`,
            tags: ['swiper'],
            main: 'index.html',
            scripts: {
              start: 'serve',
              build:
                'echo This is a static template, there is no bundler or bundling involved!',
            },
            devDependencies: {
              serve: '^11.2.0',
            },
          },
        },
        'sandbox.config.json': {
          content: {
            template: 'static',
          },
        },
      },
    };
  }
  const currentFile = codeSandboxFiles[mode]
    ? codeSandboxFiles[mode](title)
    : {};

  if (mode === 'react') {
    Object.keys(contentJSON).map((file) => {
      const cur = contentJSON[file];
      if (!!cur.content && typeof cur.content === 'string') {
        cur.content = cur.content.replace(/&quot;/g, '"');
      }
    });
  }
  return {
    files: {
      ...currentFile,
      ...contentJSON,
    },
  };
}

async function getDemoContent(folder, mode) {
  const _mainContent = await fetch(`demos/${folder}/${mode}.json`);
  return _mainContent.json();
}

export async function openCodeSandbox(e, title, folder, mode = 'core') {
  e.preventDefault();
  const content = await getDemoContent(folder, mode);
  const codeSandBoxParams = generateCodeSandboxWorkspace(mode, content, title);
  const link = e.target.closest('a');
  link.style.pointerEvents = 'none';
  link.style.color = 'rgba(0,0,0,0)';
  link.insertAdjacentHTML(
    'beforeend',
    '<div class="demo-loading-text text-[10px] text-center text-black dark:text-white flex w-full h-full absolute left-0 top-0 items-center justify-center">Loading</div>'
  );
  const query =
    {
      react: 'file=/src/App.jsx',
      vue: 'file=/src/App.vue',
      core: 'file=/index.html',
      element: 'file=/index.html',
    }[mode] || '';
  fetch(`https://codesandbox.io/api/v1/sandboxes/define?json=1`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(codeSandBoxParams),
  })
    .then((res) => res.json())
    .then(({ sandbox_id }) => {
      link.style.pointerEvents = '';
      link.style.color = '';
      link.querySelector('.demo-loading-text').remove();

      window.open(
        `https://codesandbox.io/p/sandbox/${sandbox_id}?${query}`,
        '_blank'
      );
    });
}
