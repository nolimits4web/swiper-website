import { packageName } from './common';

const angularFiles = (title) => ({
  'package.json': {
    content: {
      name: packageName('Angular', title),
      license: 'MIT',
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
export default angularFiles;
