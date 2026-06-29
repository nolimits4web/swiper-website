import sdk from '@stackblitz/sdk';

function projectTitle(lib, title) {
  return `Swiper ${lib} - ${title}`;
}

function flattenContentJSON(contentJSON) {
  const files = {};
  Object.keys(contentJSON).forEach((path) => {
    const entry = contentJSON[path];
    let content = entry && typeof entry === 'object' ? entry.content : entry;
    if (typeof content !== 'string') content = JSON.stringify(content, null, 2);
    files[path] = content.replace(/&quot;/g, '"');
  });
  return files;
}

function reactProject(title, contentJSON) {
  const files = flattenContentJSON(contentJSON);
  files['package.json'] = JSON.stringify(
    {
      name: 'swiper-react-demo',
      private: true,
      type: 'module',
      scripts: {
        dev: 'vite',
        start: 'vite',
        build: 'vite build',
      },
      dependencies: {
        react: '^18.3.1',
        'react-dom': '^18.3.1',
        swiper: '^14.0.0',
      },
      devDependencies: {
        '@vitejs/plugin-react': '^4.3.4',
        vite: '^5.4.10',
      },
    },
    null,
    2
  );
  files['vite.config.js'] = `import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
});
`;
  files['src/main.jsx'] = `import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';

ReactDOM.createRoot(document.getElementById('app')).render(<App />);
`;
  files['index.html'] = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${projectTitle('React', title)}</title>
  </head>
  <body>
    <div id="app"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
`;
  return {
    title: projectTitle('React', title),
    template: 'node',
    files,
  };
}

function vueProject(title, contentJSON) {
  const files = flattenContentJSON(contentJSON);
  files['package.json'] = JSON.stringify(
    {
      name: 'swiper-vue-demo',
      private: true,
      type: 'module',
      scripts: {
        dev: 'vite',
        start: 'vite',
        build: 'vite build',
      },
      dependencies: {
        swiper: '^14.0.0',
        vue: '^3.5.13',
      },
      devDependencies: {
        '@vitejs/plugin-vue': '^5.2.1',
        vite: '^5.4.10',
      },
    },
    null,
    2
  );
  files['vite.config.js'] = `import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [vue()],
});
`;
  files['src/main.js'] = `import { createApp } from 'vue';
import App from './App.vue';

createApp(App).mount('#app');
`;
  files['index.html'] = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${projectTitle('Vue', title)}</title>
  </head>
  <body>
    <div id="app"></div>
    <script type="module" src="/src/main.js"></script>
  </body>
</html>
`;
  return {
    title: projectTitle('Vue', title),
    template: 'node',
    files,
  };
}

function staticProject(lib, title, contentJSON) {
  return {
    title: projectTitle(lib, title),
    template: 'html',
    files: flattenContentJSON(contentJSON),
  };
}

const builders = {
  react: (title, content) => reactProject(title, content),
  vue: (title, content) => vueProject(title, content),
  core: (title, content) => staticProject('Core', title, content),
  element: (title, content) => staticProject('Element', title, content),
};

const openFileByMode = {
  react: 'src/App.jsx',
  vue: 'src/App.vue',
  core: 'index.html',
  element: 'index.html',
};

async function getDemoContent(folder, mode) {
  const res = await fetch(`demos/${folder}/${mode}.json`);
  return res.json();
}

export async function openStackBlitz(e, title, folder, mode = 'core') {
  e.preventDefault();
  const link = e.target.closest('button');
  link.style.pointerEvents = 'none';
  link.style.color = 'rgba(0,0,0,0)';
  link.insertAdjacentHTML('beforeend', '<div class="demo-preloader"></div>');

  try {
    const content = await getDemoContent(folder, mode);
    const build = builders[mode] || builders.core;
    const project = build(title, content);

    sdk.openProject(project, {
      newWindow: true,
      openFile: openFileByMode[mode] || 'index.html',
    });
  } finally {
    link.style.pointerEvents = '';
    link.style.color = '';
    const preloader = link.querySelector('.demo-preloader');
    if (preloader) preloader.remove();
  }
}
