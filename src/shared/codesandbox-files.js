export const angularFiles = (title) => ({
  'package.json': {
    content: {
      name: `Swiper Angular - ${title}`,
      tags: ['swiper'],
      scripts: {
        ng: 'ng',
        start: 'ng serve',
        build: 'ng build --prod',
        test: 'ng test',
        lint: 'ng lint',
        e2e: 'ng e2e',
      },
      dependencies: {
        '@angular/animations': '^11.2.0',
        '@angular/common': '^11.2.0',
        '@angular/compiler': '^11.2.0',
        '@angular/core': '^11.2.0',
        '@angular/forms': '^11.2.0',
        '@angular/platform-browser': '^11.2.0',
        '@angular/platform-browser-dynamic': '^11.2.0',
        '@angular/router': '^11.2.0',
        'core-js': '3.8.3',
        rxjs: '6.6.3',
        tslib: '2.1.0',
        'zone.js': '0.11.3',
        swiper: process.env.swiperReleaseVersion,
      },
      devDependencies: {
        '@angular-devkit/build-angular': '^0.1102.0',
        '@angular/cli': '^11.2.0',
        '@angular/compiler-cli': '^11.2.0',
        '@angular/language-service': '^11.2.0',
        '@types/jasmine': '3.6.3',
        '@types/jasminewd2': '2.0.8',
        '@types/node': '14.14.28',
        codelyzer: '6.0.1',
        'jasmine-core': '3.6.0',
        'jasmine-spec-reporter': '6.0.0',
        karma: '6.1.1',
        'karma-chrome-launcher': '3.1.0',
        'karma-coverage-istanbul-reporter': '3.0.3',
        'karma-jasmine': '4.0.1',
        'karma-jasmine-html-reporter': '1.5.4',
        protractor: '7.0.0',
        'ts-node': '9.1.1',
        tslint: '~6.1.3',
        typescript: '4.1.5',
      },
    },
  },
  'tsconfig.json': {
    content: {
      compileOnSave: false,
      compilerOptions: {
        baseUrl: './',
        outDir: './dist/out-tsc',
        sourceMap: true,
        declaration: false,
        downlevelIteration: true,
        experimentalDecorators: true,
        moduleResolution: 'node',
        importHelpers: true,
        target: 'es2015',
        module: 'es2020',
        lib: ['es2018', 'dom'],
      },
    },
  },
  'src/tsconfig.app.json': {
    content: {
      extends: '../tsconfig.json',
      compilerOptions: {
        outDir: '../out-tsc/app',
        types: [],
      },
      exclude: ['test.ts', '**/*.spec.ts'],
    },
  },
  'src/tsconfig.spec.json': {
    content: {
      extends: '../tsconfig.json',
      compilerOptions: {
        outDir: '../out-tsc/spec',
        types: ['jasmine', 'node'],
      },
      files: ['test.ts', 'polyfills.ts'],
      include: ['**/*.spec.ts', '**/*.d.ts'],
    },
  },
  'angular.json': {
    content: {
      $schema: './node_modules/@angular/cli/lib/config/schema.json',
      version: 1,
      newProjectRoot: 'projects',
      projects: {
        demo: {
          root: '',
          sourceRoot: 'src',
          projectType: 'application',
          prefix: 'app',
          schematics: {},
          architect: {
            build: {
              builder: '@angular-devkit/build-angular:browser',
              options: {
                outputPath: 'dist/demo',
                index: 'src/index.html',
                main: 'src/main.ts',
                polyfills: 'src/polyfills.ts',
                tsConfig: 'src/tsconfig.app.json',
                assets: ['src/favicon.ico', 'src/assets', 'src/app/samples'],
                styles: ['src/styles.scss'],
                scripts: [],
              },
              configurations: {
                production: {
                  fileReplacements: [
                    {
                      replace: 'src/environments/environment.ts',
                      with: 'src/environments/environment.prod.ts',
                    },
                  ],
                  optimization: true,
                  outputHashing: 'all',
                  sourceMap: false,
                  extractCss: true,
                  namedChunks: false,
                  aot: true,
                  extractLicenses: true,
                  vendorChunk: false,
                  buildOptimizer: true,
                },
              },
            },
            serve: {
              builder: '@angular-devkit/build-angular:dev-server',
              options: {
                browserTarget: 'demo:build',
              },
              configurations: {
                production: {
                  browserTarget: 'demo:build:production',
                },
              },
            },
            'extract-i18n': {
              builder: '@angular-devkit/build-angular:extract-i18n',
              options: {
                browserTarget: 'demo:build',
              },
            },
            test: {
              builder: '@angular-devkit/build-angular:karma',
              options: {
                main: 'src/test.ts',
                polyfills: 'src/polyfills.ts',
                tsConfig: 'src/tsconfig.spec.json',
                karmaConfig: 'src/karma.conf.js',
                styles: ['styles.scss'],
                scripts: [],
                assets: ['src/favicon.ico', 'src/assets'],
              },
            },
            lint: {
              builder: '@angular-devkit/build-angular:tslint',
              options: {
                tsConfig: ['src/tsconfig.app.json', 'src/tsconfig.spec.json'],
                exclude: ['**/node_modules/**'],
              },
            },
          },
        },
      },
      defaultProject: 'demo',
    },
  },
  'src/index.html': {
    content: `<!doctype html>
<html lang="en">

<head>
  <meta charset="utf-8">
  <title>Angular</title>
  <base href="/">

  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="icon" type="image/x-icon" href="favicon.ico">
</head>

<body>
  <app-swiper-example></app-swiper-example>
</body>

</html>`,
  },
  'src/main.ts': {
    content: `import "./polyfills";

import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";

import { AppModule } from "./app/app.module";

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .then((ref) => {
    // Ensure Angular destroys itself on hot reloads.
    if (window["ngRef"]) {
      window["ngRef"].destroy();
    }
    // papas fritas para todos
    window["ngRef"] = ref;

    // Otherwise, log the boot error
  })
  .catch((err) => console.error(err));
`,
  },
  'src/styles.scss': {
    content: ``,
  },
  'src/environments/environment.ts': {
    content: `export const environment = {
  production: false
};
    `,
  },
  'src/environments/environment.prod.ts': {
    content: `export const environment = {
  production: true
};
    `,
  },
  'src/app/app.module.ts': {
    content: `import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { CommonModule } from '@angular/common';

import { AppComponent } from "./app.component";
import { SwiperModule } from "swiper/angular";

@NgModule({
  imports: [BrowserModule, CommonModule, FormsModule, SwiperModule],
  declarations: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}`,
  },
  'src/app/app.component.ts': {
    content: ``,
  },
  'src/polyfills.ts': {
    content: `
import "core-js/proposals/reflect-metadata";
import "zone.js/dist/zone";
    `,
  },
});

export const reactFiles = (title) => ({
  'package.json': {
    content: {
      name: `Swiper React - ${title}`,
      tags: ['swiper'],
      main: 'src/index.js',
      dependencies: {
        react: '17.0.1',
        'react-dom': '17.0.1',
        'react-scripts': '4.0.0',
        swiper: '*',
      },
      devDependencies: {
        typescript: '4.1.3',
      },
      scripts: {
        start: 'react-scripts start',
        build: 'react-scripts build',
        test: 'react-scripts test --env=jsdom',
        eject: 'react-scripts eject',
      },
      browserslist: ['>0.2%', 'not dead', 'not ie <= 11', 'not op_mini all'],
    },
  },
  'src/App.js': {
    content: '',
  },
  'src/styles.css': {
    content: '',
  },
  'src/index.js': {
    content: `import React, { StrictMode } from "react";
import ReactDOM from "react-dom";

import App from "./App";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <StrictMode>
    <App />
  </StrictMode>,
  rootElement
);`,
  },
  'public/index.html': {
    content: `<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
  <meta name="theme-color" content="#000000">
  <title>React App</title>
</head>

<body>
  <noscript>
    You need to enable JavaScript to run this app.
  </noscript>
  <div id="root"></div>
</body>

</html>`,
  },
});

export const vueFiles = (title) => ({
  'package.json': {
    content: {
      name: `Swiper Vue - ${title}`,
      tags: ['swiper'],
      scripts: {
        serve: 'vue-cli-service serve',
        build: 'vue-cli-service build',
        lint: 'vue-cli-service lint',
      },
      dependencies: {
        'core-js': '^3.6.5',
        vue: '^3.0.0-0',
        swiper: '*',
      },
      devDependencies: {
        '@vue/cli-plugin-babel': '~4.5.0',
        '@vue/cli-plugin-eslint': '~4.5.0',
        '@vue/cli-service': '~4.5.0',
        '@vue/compiler-sfc': '^3.0.0-0',
        'babel-eslint': '^10.1.0',
        eslint: '^6.7.2',
        'eslint-plugin-vue': '^7.0.0-0',
      },

      eslintConfig: {
        root: true,
        env: {
          node: true,
        },
        extends: ['plugin:vue/vue3-essential', 'eslint:recommended'],
        parserOptions: {
          parser: 'babel-eslint',
        },
        rules: {},
      },
      browserslist: ['> 1%', 'last 2 versions', 'not dead'],
    },
  },
  'src/App.vue': {
    content: '',
  },
  'src/main.js': {
    content: `
import { createApp } from 'vue'
import App from './App.vue'

createApp(App).mount('#app')
    `,
  },
  'babel.config.js': {
    content: `
module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ]
}
    `,
  },
  'public/index.html': {
    content: `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width,initial-scale=1.0">
    <link rel="icon" href="favicon.ico">
    <title>Title</title>
  </head>
  <body>
    <noscript>
      <strong>We're sorry but doesn't work properly without JavaScript enabled. Please enable it to continue.</strong>
    </noscript>
    <div id="app"></div>
    <!-- built files will be auto injected -->
  </body>
</html>
    `,
  },
});

export const svelteFiles = (title) => ({
  'package.json': {
    content: {
      name: `Swiper Svelte - ${title}`,
      tags: ['swiper', 'svelte'],
      scripts: {
        build: 'rollup -c',
        autobuild: 'rollup -c -w',
        dev: 'run-p start:dev autobuild',
        start: 'sirv public',
        'start:dev': 'sirv public --dev',
      },
      dependencies: {
        svelte: '^3.32.3',
        swiper: '*',
      },
      devDependencies: {
        'npm-run-all': '^4.1.5',
        rollup: '^1.10.1',
        'rollup-plugin-commonjs': '^9.3.4',
        'rollup-plugin-node-resolve': '^4.2.3',
        'rollup-plugin-svelte': '^6.1.1',
        'rollup-plugin-terser': '^4.0.4',
        'sirv-cli': '^0.3.1',
      },
    },
  },
  'App.svelte': {
    content: '',
  },
  'index.js': {
    content: `
    import App from "./App.svelte";

    const app = new App({
      target: document.body
    });

    export default app;

    `,
  },
  'rollup.config.js': {
    content: `
// this file will not afect the sandbox but will
// afect the deployment and dowload

import svelte from "rollup-plugin-svelte";
import resolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";
import { terser } from "rollup-plugin-terser";

const production = !process.env.ROLLUP_WATCH;

export default {
  input: "index.js",
  output: {
    sourcemap: true,
    format: "iife",
    name: "app",
    file: "public/bundle.js"
  },
  plugins: [
    svelte({
      // enable run-time checks when not in production
      dev: !production,
      // we'll extract any component CSS out into
      // a separate file — better for performance
      css: css => {
        css.write("public/bundle.css");
      }
    }),

    // If you have external dependencies installed from
    // npm, you'll most likely need these plugins. In
    // some cases you'll need additional configuration —
    // consult the documentation for details:
    // https://github.com/rollup/rollup-plugin-commonjs
    resolve(),
    commonjs(),

    // If we're building for production (npm run build
    // instead of npm run dev), minify
    production && terser()
  ]
};

    `,
  },
});
