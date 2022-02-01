import { packageName, commonFiles } from './common';

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
      },
      dependencies: {
        '@angular/animations': '~13.2.0',
        '@angular/common': '~13.2.0',
        '@angular/compiler': '~13.2.0',
        '@angular/core': '~13.2.0',
        '@angular/forms': '~13.2.0',
        '@angular/platform-browser': '~13.2.0',
        '@angular/platform-browser-dynamic': '~13.2.0',
        '@angular/router': '~13.2.0',
        "rxjs": "~7.5.0",
        "tslib": "^2.3.0",
        "zone.js": "~0.11.4"
        swiper: '^8.0.0',
      },
      devDependencies: {
        "@angular-devkit/build-angular": "~13.2.1",
        "@angular/cli": "~13.2.1",
        "@angular/compiler-cli": "~13.2.0",
        "@types/node": "^12.11.1",
        "typescript": "~4.5.2"
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
        target: 'es2017',
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
    if (window["ngRef"]) {
      window["ngRef"].destroy();
    }
    window["ngRef"] = ref;
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
  'sandbox.config.json': {
    content: `{
    "infiniteLoopProtection": true,
    "hardReloadOnChange": false,
    "view": "browser",
    "template": "node",
    "container": {
      "node": "14",
      "port": 4200
    }
  }`,
  },
});
export default angularFiles;
