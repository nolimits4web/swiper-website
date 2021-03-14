import React from 'react';
import { getParameters } from 'codesandbox/lib/api/define';
import { ReactComponent as CodeSandBoxLogo } from '@/img/codesandbox.svg';
import Heading from '@/components/Heading';
import { WithSidebarLayout } from '@/layouts/withSidebar';
import { useLazyDemos } from 'src/shared/use-lazy-demos';
import demos from 'src/demos.json';

let tableOfContents;

export default function DemosPage() {
  tableOfContents = demos.map(({ title, slug }) => {
    return {
      title,
      slug: slug,
      children: [],
    };
  });

  useLazyDemos();

  const generateCodeSandboxWorkspace = (mode, content, title = '') => {
    // https://github.com/codesandbox/codesandbox-importers/blob/master/packages/import-utils/src/create-sandbox/templates.ts#L63
    // We cant set name & tags in static environment, as codesandbox parses it from package.json
    // Thats why we're including parcel as dependency
    if (mode === 'static') {
      return {
        files: {
          'index.html': {
            content,
          },
          'package.json': {
            content: {
              name: `Swiper - ${title}`,
              tags: ['swiper'],
              dependencies: {
                swiper: 'latest',
                'parcel-bundler': '^1.6.1',
              },
            },
          },
        },
      };
    }
    if (mode === 'angular') {
      return {
        files: {
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
                swiper: 'latest',
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
              <app-root></app-root>
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
          'src/environments/environments.ts': {
            content: `export const environment = {
              production: false
            };
            `,
          },
          'src/environments/environments.prod.ts': {
            content: `export const environment = {
              production: true
            };
            `,
          },
          'src/app/app.module.ts': {
            content: ``,
          },
          'src/app/app.component.ts': {
            content: content,
          },
        },
      };
    }
  };

  const openCodeSandbox = async (e, title, folder, mode = 'static') => {
    e.preventDefault();
    const res = await fetch(`codesandbox/${folder}/${mode}.html`);
    let html = await res.text();
    html = html
      .replace(/..\/package\//g, 'https://unpkg.com/swiper/')
      .replace(/.\/images\//g, 'https://swiperjs.com/demos/images/');

    const codeSandBoxParams = getParameters(
      generateCodeSandboxWorkspace(mode, html, title)
    );
    window.open(
      `https://codesandbox.io/api/v1/sandboxes/define?parameters=${codeSandBoxParams}`
    );
  };

  return (
    <WithSidebarLayout tableOfContents={tableOfContents}>
      <h1>Swiper Demos</h1>
      <p>
        You can download all these demos and hook into the code from GitHub{' '}
        <a
          href="https://github.com/nolimits4web/Swiper/tree/master/demos/"
          target="_blank"
          rel="noopener"
        >
          here
        </a>
      </p>
      {demos.map(({ title, slug, folder }, demoIndex) => (
        <React.Fragment key={title}>
          <Heading level={2} id={slug} toc={true}>
            {title}
          </Heading>
          <div className="flex flex-wrap text-sm my-4">
            <a
              className="no-underline mr-4 mb-2"
              href={`/demos/${folder}/static.html`}
              target="_blank"
              rel="noopener"
            >
              Open in new window
            </a>
            <a
              className="no-underline"
              href={`https://github.com/nolimits4web/Swiper/blob/master/demos/${folder}/static.html`}
              target="_blank"
              rel="noopener"
            >
              Source code
            </a>
            <a
              className="no-underline ml-2"
              href="#"
              onClick={(e) => openCodeSandbox(e, title, folder)}
            >
              <CodeSandBoxLogo className="inline" width="19" height="14" />
              <span>JS</span>
            </a>
            <a
              className="no-underline ml-2"
              href="#"
              onClick={(e) => openCodeSandbox(e, title, folder, 'angular')}
            >
              <CodeSandBoxLogo className="inline" width="19" height="14" />
              <span>Angular</span>
            </a>
          </div>
          <div className="my-4 bg-gray-100 shadow demo">
            <iframe
              data-src={`/demos/${folder}/static.html`}
              scrolling="no"
              frameBorder="0"
              className="h-96 block w-full"
            ></iframe>
          </div>
        </React.Fragment>
      ))}
    </WithSidebarLayout>
  );
}

const meta = {
  title: 'Swiper Demos',
};

DemosPage.layoutProps = {
  WithSidebarLayout,
  meta,
  tableOfContents,
};
