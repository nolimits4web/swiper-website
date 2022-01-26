import React, { useRef, useState } from 'react';
import { ReactComponent as CodeSandBoxLogo } from '@/img/codesandbox.svg';
import Heading from '@/components/Heading';
import { WithSidebarLayout } from '@/layouts/withSidebar';
import { useLazyDemos } from 'src/shared/use-lazy-demos';
import demos from 'src/demos.json';
import uiinitiativeDemos from 'src/uiinitiative-demos.json';
import codeSandboxFiles from 'src/shared/codesandbox/codesandbox-files';
import { compressToBase64 } from 'src/shared/lz-string';
import Carbon from '@/components/Carbon';
import { trackOutbound } from 'src/shared/track-outbound';

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
  const [currentCodeSandboxParams, setCurrentCodeSandboxParams] = useState('');

  useLazyDemos();
  const generateCodeSandboxWorkspace = (mode, contentJSON, title = '') => {
    // https://github.com/codesandbox/codesandbox-importers/blob/master/packages/import-utils/src/create-sandbox/templates.ts#L63
    // We cant set name & tags in static environment, as codesandbox parses it from package.json
    // Thats why we're including parcel as dependency
    if (mode === 'core') {
      return {
        files: {
          ...contentJSON,
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
    const files = codeSandboxFiles;
    const currentFile = files[mode] ? files[mode](title) : {};

    // unescape &quot;
    // {{ &quot;enabled&quote;: true }} => {{ "enabled": true }}
    if (mode === 'react') {
      Object.keys(contentJSON).map((file) => {
        console.log(file);
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
  };

  async function getDemoContent(folder, mode) {
    const path = {
      angular: 'angular.json',
      core: 'core.html',
      react: 'react.json',
      svelte: 'svelte.json',
      vue: 'vue.json',
    };
    const _mainContent = await fetch(`demos/${folder}/${path[mode]}`);
    if (mode === 'core') {
      let mainContent = await _mainContent.text();
      return {
        'index.html': {
          content: mainContent,
        },
      };
    }
    return _mainContent.json();
  }

  const compressParameters = (parameters) => {
    return compressToBase64(JSON.stringify(parameters))
      .replace(/\+/g, `-`) // Convert '+' to '-'
      .replace(/\//g, `_`) // Convert '/' to '_'
      .replace(/=+$/, ``); // Remove ending '='
  };

  const openCodeSandbox = async (e, title, folder, mode = 'core') => {
    e.preventDefault();
    const content = await getDemoContent(folder, mode);
    const codeSandBoxParams = compressParameters(
      generateCodeSandboxWorkspace(mode, content, title)
    );

    setCurrentCodeSandboxParams(codeSandBoxParams);
    formRef.current.submit();
  };

  const uiinitiativeDemosGrouped = [];
  uiinitiativeDemos.forEach((demo, index) => {
    const groupIndex = Math.floor(index / 2);
    if (!uiinitiativeDemosGrouped[groupIndex])
      uiinitiativeDemosGrouped[groupIndex] = [];
    uiinitiativeDemosGrouped[groupIndex].push(demo);
  });

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
      <Carbon />
      <h1 className="dark:text-gray-200">Swiper Demos</h1>
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
      <h2>UI Initiative</h2>
      <p>
        Premium Swiper templates & plugins from{' '}
        <a href="https://uiinitiative.com" target="_blank">
          UI Initiative
        </a>
      </p>
      <div className="my-4 flex space-x-4 overflow-auto pb-6">
        {uiinitiativeDemosGrouped.map((demos) => (
          <div className="w-10/12 flex-shrink-0 space-y-4 md:w-6/12 ">
            {demos.map(({ cover, url, title }) => (
              <a
                className="block w-full rounded-lg bg-black bg-opacity-10 dark:border dark:border-white dark:border-opacity-10"
                href={url}
                target="_blank"
                title={title}
                onClick={() => trackOutbound(url)}
              >
                <img
                  width="1200"
                  height="600"
                  className="!m-0 block rounded-lg"
                  src={cover}
                  alt={title}
                />
              </a>
            ))}
          </div>
        ))}
      </div>
      {demos.map(({ title, slug, folder, skip }, demoIndex) => (
        <React.Fragment key={title}>
          <Heading level={2} id={slug} toc={true}>
            {title}
          </Heading>
          <div className="my-4 flex flex-wrap text-sm">
            <a
              className="mb-2 mr-4 no-underline"
              href={`/demos/${folder}/core.html`}
              target="_blank"
              rel="noopener"
            >
              Open in new window
            </a>
            {['Core', 'React', 'Vue', 'Angular', 'Svelte'].map((name) => {
              if (skip && skip.includes(name.toLowerCase())) {
                return null;
              }
              return (
                <a
                  key={name}
                  className="ml-2 no-underline"
                  href="#"
                  onClick={(e) =>
                    openCodeSandbox(e, title, folder, `${name.toLowerCase()}`)
                  }
                >
                  <CodeSandBoxLogo
                    className="inline fill-current"
                    width="19"
                    height="14"
                  />
                  {name}
                </a>
              );
            })}
          </div>
          <div className="demo my-4 bg-gray-100 shadow">
            <iframe
              data-src={`/demos/${folder}/core.html`}
              scrolling="no"
              frameBorder="0"
              className="block h-96 w-full"
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
