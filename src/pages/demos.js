import React, { useRef, useState, Fragment, useEffect } from 'react';
import { ReactComponent as CodeSandBoxLogo } from '@/img/codesandbox.svg';
import { ReactComponent as CodeIcon } from '@/img/code.svg';
import Heading from '@/components/Heading';
import { WithSidebarLayout } from '@/layouts/withSidebar';
import { useLazyDemos } from 'src/shared/use-lazy-demos';
import demos from 'src/demos.json';
import uiinitiativeDemos from 'src/uiinitiative-demos.json';
import codeSandboxFiles from 'src/shared/codesandbox/codesandbox-files';
import { compressToBase64 } from 'src/shared/lz-string';
import Carbon from '@/components/Carbon';
import { trackOutbound } from 'src/shared/track-outbound';
import { Listbox, Transition, Tab } from '@headlessui/react';
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid';
import clsx from 'clsx';

let tableOfContents;

const langList = ['Core', 'React', 'Vue', 'Angular', 'Svelte'];

async function getDemoContent(folder, mode) {
  const fileName = {
    angular: 'angular.json',
    core: 'core.html',
    react: 'react.json',
    svelte: 'svelte.json',
    vue: 'vue.json',
  }[mode.toLowerCase()];
  const _mainContent = await fetch(`demos/${folder}/${fileName}`);
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

function LanguageSwitcher({ value, onChange }) {
  return (
    <div className="w-72">
      <Listbox value={value} onChange={onChange}>
        <div className="relative mt-1">
          <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
            <span className="block truncate">{value}</span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <SelectorIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {langList.map((lang) => (
                <Listbox.Option
                  key={lang}
                  className={({ active }) =>
                    `${active ? 'bg-amber-100 text-amber-900' : 'text-gray-900'}
                      relative cursor-default select-none py-2 pl-10 pr-4`
                  }
                  value={lang}
                >
                  {({ selected, active }) => (
                    <>
                      <span
                        className={`${
                          selected ? 'font-medium' : 'font-normal'
                        } block truncate`}
                      >
                        {lang}
                      </span>
                      {selected ? (
                        <span
                          className={`${
                            active ? 'text-amber-600' : 'text-amber-600'
                          }
                            absolute inset-y-0 left-0 flex items-center pl-3`}
                        >
                          <CheckIcon className="h-5 w-5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
}

function DemoItem({ title, slug, folder, skip, openCodeSandbox }) {
  const [currentLang, setCurrentLang] = useState('react');
  const [open, setOpen] = useState(false);
  const [content, setContent] = useState({});

  useEffect(() => {
    if (open) {
      getDemoContent(folder, currentLang).then((value) => setContent(value));
    }
  }, [open, currentLang]);

  return (
    <>
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
      </div>
      <div className="demo mt-4 bg-gray-100 shadow">
        <iframe
          data-src={`/demos/${folder}/core.html`}
          scrolling="no"
          frameBorder="0"
          className="block h-96 w-full"
        ></iframe>
      </div>
      <div className="flex">
        <LanguageSwitcher value={currentLang} onChange={setCurrentLang} />
        <div className="flex flex-grow items-center justify-end">
          <button
            type="button"
            className="inline-flex items-center"
            onClick={() => setOpen((val) => !val)}
          >
            <CodeIcon className="mr-1" /> source code
          </button>
          {!skip?.includes(currentLang.toLowerCase()) && (
            <button
              type="button"
              className="ml-3 inline-flex items-center"
              onClick={(e) => openCodeSandbox(e, title, folder, currentLang)}
            >
              <CodeSandBoxLogo className="mr-1" /> codesandbox
            </button>
          )}
        </div>
      </div>
      {open && (
        <div className="">
          <Tab.Group>
            <Tab.List className="flex space-x-1 rounded-xl bg-primary p-1">
              {Object.keys(content).map((item) => (
                <Tab
                  key={item}
                  className={({ selected }) =>
                    clsx(
                      'w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700',
                      'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
                      selected
                        ? 'bg-white shadow'
                        : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'
                    )
                  }
                >
                  {item}
                </Tab>
              ))}
            </Tab.List>
            <Tab.Panels>
              {Object.values(content).map((item, itemIdx) => (
                <Tab.Panel key={itemIdx}>
                  <code>{item.content}</code>
                </Tab.Panel>
              ))}
            </Tab.Panels>
          </Tab.Group>
        </div>
      )}
    </>
  );
}

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

  const compressParameters = (parameters) => {
    return compressToBase64(JSON.stringify(parameters))
      .replace(/\+/g, `-`) // Convert '+' to '-'
      .replace(/\//g, `_`) // Convert '/' to '_'
      .replace(/=+$/, ``); // Remove ending '='
  };

  const openCodeSandbox = async (e, title, folder, mode = 'core') => {
    e.preventDefault();
    mode = mode.toLowerCase();
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
        {uiinitiativeDemosGrouped.map((demos, demoIndex) => (
          <div
            className="w-10/12 flex-shrink-0 space-y-4 md:w-6/12 "
            key={demoIndex}
          >
            {demos.map(({ cover, url, title }) => (
              <a
                key={url}
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
      {demos.map((demo, demoIndex) => (
        <DemoItem
          {...demo}
          key={demo.title}
          openCodeSandbox={openCodeSandbox}
        />
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
