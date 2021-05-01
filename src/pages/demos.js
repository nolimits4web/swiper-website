import React, { useRef, useState } from 'react';
import { ReactComponent as CodeSandBoxLogo } from '@/img/codesandbox.svg';
import Heading from '@/components/Heading';
import { WithSidebarLayout } from '@/layouts/withSidebar';
import { useLazyDemos } from 'src/shared/use-lazy-demos';
import demos from 'src/demos.json';
import {
  angularFiles,
  reactFiles,
  svelteFiles,
  vueFiles,
} from 'src/shared/codesandbox-files';
import { compressToBase64 } from 'src/shared/lz-string';

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
    const files = {
      angular: angularFiles,
      react: reactFiles,
      vue: vueFiles,
      svelte: svelteFiles,
    };
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
      {demos.map(({ title, slug, folder, skip }, demoIndex) => (
        <React.Fragment key={title}>
          <Heading level={2} id={slug} toc={true}>
            {title}
          </Heading>
          <div className="flex flex-wrap text-sm my-4">
            <a
              className="no-underline mr-4 mb-2"
              href={`/demos/${folder}/core.html`}
              target="_blank"
              rel="noopener"
            >
              Open in new window
            </a>
            {['Core', 'React', 'Vue', 'Angular', 'Svelte'].map((name) => {
              if (skip && skip.includes(name.toLowerCase())) {
                return <></>;
              }
              return (
                <a
                  key={name}
                  className="no-underline ml-2"
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
          <div className="my-4 bg-gray-100 shadow demo">
            <iframe
              data-src={`/demos/${folder}/core.html`}
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
