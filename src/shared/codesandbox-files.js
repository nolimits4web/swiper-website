export const angularFiles = (title) => ({
  'package.json': {
    content: {
      name: `Swiper - ${title}`,
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
  '.angular-cli.json': {
    content: {
      apps: [
        {
          root: 'src',
          outDir: 'dist',
          assets: ['assets', 'favicon.ico'],
          index: 'index.html',
          main: 'main.ts',
          polyfills: 'polyfills.ts',
          prefix: 'app',
          styles: ['styles.css'],
          scripts: [],
          environmentSource: 'environments/environment.ts',
          environments: {
            dev: 'environments/environment.ts',
            prod: 'environments/environment.prod.ts',
          },
        },
      ],
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
    content: `import { enableProdMode } from "@angular/core";
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";

import { AppModule } from "./app/app.module";
import { environment } from "./environments/environment";

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch(err => console.log(err));
    `,
  },
  'src/styles.css': {
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

import { AppComponent } from "./app.component";
import { SwiperModule } from "swiper/angular";

@NgModule({
  imports: [BrowserModule, FormsModule, SwiperModule],
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
