import React, { useRef, useState } from 'react';
import { getParameters } from 'codesandbox/lib/api/define';
import { ReactComponent as CodeSandBoxLogo } from '@/img/codesandbox.svg';
import Heading from '@/components/Heading';
import { WithSidebarLayout } from '@/layouts/withSidebar';
import { useLazyDemos } from 'src/shared/use-lazy-demos';
import demos from 'src/demos.json';
import { angularFiles } from 'src/shared/codesandbox-files';

let tableOfContents;

export default function DemosPage() {
  tableOfContents = demos.map(({ title, slug }) => {
    return {
      title,
      slug: slug,
      children: [],
    };
  });
  const formRef = useRef();
  const [currentCodeSandboxParams, setCurrentCodeSandboxParams] = useState(
    null
  );

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
          ...angularFiles(title),
          'src/styles.css': {
            content: ``,
          },
          'src/app/app.component.ts': {
            content: content,
          },
        },
      };
    }
  };

  async function getDemoContent(folder, mode) {
    async function getMain() {
      const path = {
        angular: 'angular.ts',
        static: 'static.html',
        react: 'react.js',
        svelte: 'svelte.js',
      };
      const _mainContent = await fetch(`demos/${folder}/${path[mode]}`);
      let mainContent = await _mainContent.text();
      if (mode === 'static') {
        mainContent = mainContent
          .replace(/..\/package\//g, 'https://unpkg.com/swiper/')
          .replace(/.\/images\//g, 'https://swiperjs.com/demos/images/');
      }
      return mainContent;
    }
    // async function getCSS() {
    //   const path = {
    //     angular: 'angular_styles.css',
    //   };
    //   const currentCSSpath = path[mode];
    //   if (currentCSSpath) {
    //     return await fetch(`demos/${folder}/${currentCSSpath}`);
    //   }
    // }

    return {
      main: await getMain(),
      // css: await getCSS(),
    };
  }

  const openCodeSandbox = async (e, title, folder, mode = 'static') => {
    e.preventDefault();
    const { main } = await getDemoContent(folder, mode);
    const codeSandBoxParams = getParameters(
      generateCodeSandboxWorkspace(mode, main, title)
    );

    setCurrentCodeSandboxParams(codeSandBoxParams);
    formRef.current.submit();
  };

  return (
    <WithSidebarLayout tableOfContents={tableOfContents}>
      <form
        ref={formRef}
        action="https://codesandbox.io/api/v1/sandboxes/define"
        method="POST"
        target="_blank"
      >
        <input
          type="hidden"
          name="parameters"
          value={currentCodeSandboxParams}
        />
      </form>
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
              href={`https://github.com/nolimits4web/Swiper/blob/master/demos/${folder}.html`}
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
