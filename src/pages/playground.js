import { useState, useMemo, useEffect, useRef } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import clsx from 'clsx';
import {
  CladdProvider,
  Surface,
  Toolbar,
  ToolbarButton,
  ToolbarSeparator,
  Popover,
  PopoverRoot,
  PopoverTrigger,
  SectionTitle,
  Chip,
  Button,
} from '@cladd-ui/react';
import { getDefaultState } from '@/playground/params-config';
import PlaygroundSidebar from '@/playground/PlaygroundSidebar';
import {
  generateSwiperHTML,
  buildSwiperOptions,
} from '@/playground/generateSwiperHTML';
import { encodeState, decodeState } from '@/playground/url-state';

const DEFAULT_STATE = getDefaultState();

function SidebarIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 18 18"
      fill="currentColor"
      aria-hidden
    >
      <path d="M14.25,2H3.75c-1.517,0-2.75,1.233-2.75,2.75V13.25c0,1.517,1.233,2.75,2.75,2.75H14.25c1.517,0,2.75-1.233,2.75-2.75V4.75c0-1.517-1.233-2.75-2.75-2.75ZM5.75,12.5h-1.5c-.414,0-.75-.336-.75-.75s.336-.75,.75-.75h1.5c.414,0,.75,.336,.75,.75s-.336,.75-.75,.75Zm0-2.75h-1.5c-.414,0-.75-.336-.75-.75s.336-.75,.75-.75h1.5c.414,0,.75,.336,.75,.75s-.336,.75-.75,.75Zm0-2.75h-1.5c-.414,0-.75-.336-.75-.75s.336-.75,.75-.75h1.5c.414,0,.75,.336,.75,.75s-.336,.75-.75,.75Zm9.75,6.25c0,.689-.561,1.25-1.25,1.25h-5.25V3.5h5.25c.689,0,1.25,.561,1.25,1.25V13.25Z" />
    </svg>
  );
}

function ResetIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 18 18"
      fill="currentColor"
      aria-hidden
    >
      <path d="m9,1c-2.489,0-4.7694,1.1479-6.262,3.0327l-.1149-.8306c-.0576-.4102-.4404-.6978-.8457-.6396-.4111.0566-.6973.4355-.6406.8457l.4082,2.9448c.0527.3755.374.647.7422.647.0342,0,.0693-.0024.1035-.0068l2.9443-.4072c.4102-.0571.6973-.4355.6406-.8457s-.4424-.6895-.8457-.6406l-1.4573.2017c1.1984-1.7283,3.163-2.8013,5.3274-2.8013,3.584,0,6.5,2.916,6.5,6.5s-2.916,6.5-6.5,6.5c-3.1797,0-5.874-2.2705-6.4072-5.3989-.0693-.4082-.4551-.6797-.8652-.6133-.4082.0693-.6826.457-.6133.8652.6562,3.8516,3.9727,6.647,7.8857,6.647,4.4111,0,8-3.5889,8-8S13.4111,1,9,1Z" />
      <path d="m10.0605,9l1.4697-1.4697c.293-.293.293-.7676,0-1.0605s-.7676-.293-1.0605,0l-1.4697,1.4697-1.4697-1.4697c-.293-.293-.7676-.293-1.0605,0s-.293.7676,0,1.0605l1.4697,1.4697-1.4697,1.4697c-.293.293-.293.7676,0,1.0605.1465.1465.3379.2197.5303.2197s.3838-.0732.5303-.2197l1.4697-1.4697,1.4697,1.4697c.1465.1465.3379.2197.5303.2197s.3838-.0732.5303-.2197c.293-.293.293-.7676,0-1.0605l-1.4697-1.4697Z" />
    </svg>
  );
}

function CopyIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 18 18"
      fill="currentColor"
      aria-hidden
    >
      <circle cx="9" cy="12.25" r=".75" />
      <circle cx="11.75" cy="12.25" r=".75" />
      <circle cx="6.25" cy="12.25" r=".75" />
      <path d="M6.25,2h-1c-1.517,0-2.75,1.233-2.75,2.75v2.625c0,.482-.393,.875-.875,.875-.414,0-.75,.336-.75,.75s.336,.75,.75,.75c.482,0,.875,.393,.875,.875v2.625c0,1.517,1.233,2.75,2.75,2.75h1c.414,0,.75-.336,.75-.75s-.336-.75-.75-.75h-1c-.689,0-1.25-.561-1.25-1.25v-2.625c0-.628-.245-1.2-.645-1.625,.399-.425,.645-.997,.645-1.625v-2.625c0-.689,.561-1.25,1.25-1.25h1c.414,0,.75-.336,.75-.75s-.336-.75-.75-.75Z" />
      <path d="M16.375,8.25c-.482,0-.875-.393-.875-.875v-2.625c0-1.517-1.233-2.75-2.75-2.75h-1c-.414,0-.75,.336-.75,.75s.336,.75,.75,.75h1c.689,0,1.25,.561,1.25,1.25v2.625c0,.628,.245,1.2,.645,1.625-.399,.425-.645,.997-.645,1.625v2.625c0,.689-.561,1.25-1.25,1.25h-1c-.414,0-.75,.336-.75,.75s.336,.75,.75,.75h1c1.517,0,2.75-1.233,2.75-2.75v-2.625c0-.482,.393-.875,.875-.875,.414,0,.75-.336,.75-.75s-.336-.75-.75-.75Z" />
    </svg>
  );
}

function ExportIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 18 18"
      fill="currentColor"
      aria-hidden
    >
      <path d="M15.25,11c-.414,0-.75,.336-.75,.75v1.5c0,.689-.561,1.25-1.25,1.25H4.75c-.689,0-1.25-.561-1.25-1.25v-1.5c0-.414-.336-.75-.75-.75s-.75,.336-.75,.75v1.5c0,1.517,1.233,2.75,2.75,2.75H13.25c1.517,0,2.75-1.233,2.75-2.75v-1.5c0-.414-.336-.75-.75-.75Z" />
      <path d="M8.47,10.78c.146,.146,.338,.22,.53,.22s.384-.073,.53-.22l3.5-3.5c.293-.293,.293-.768,0-1.061s-.768-.293-1.061,0l-2.22,2.22V2.75c0-.414-.336-.75-.75-.75s-.75,.336-.75,.75v5.689l-2.22-2.22c-.293-.293-.768-.293-1.061,0s-.293,.768,0,1.061l3.5,3.5Z" />
    </svg>
  );
}

function PlaygroundPageInner() {
  const [params, setParams] = useState(DEFAULT_STATE);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const iframeRef = useRef(null);

  useEffect(() => {
    const onScrubStart = () => {
      const iframe = iframeRef.current;
      if (!iframe) return;
      iframe.style.pointerEvents = 'none';
      const onEnd = () => {
        iframe.style.pointerEvents = '';
        window.removeEventListener('pointerup', onEnd);
        window.removeEventListener('pointercancel', onEnd);
      };
      window.addEventListener('pointerup', onEnd);
      window.addEventListener('pointercancel', onEnd);
    };
    window.addEventListener('playground:scrub-start', onScrubStart);
    return () =>
      window.removeEventListener('playground:scrub-start', onScrubStart);
  }, []);

  const handleCopy = () => {
    copyParams();
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  useEffect(() => {
    if (window.location.hash) {
      setParams(decodeState(window.location.hash));
    }
  }, []);

  useEffect(() => {
    const hash = encodeState(params);
    window.history.replaceState(
      null,
      '',
      hash ? `#${hash}` : window.location.pathname
    );
  }, [params]);

  const updateParam = (key, value) =>
    setParams((prev) => ({ ...prev, [key]: value }));

  const resetParams = () => setParams(DEFAULT_STATE);

  const copyParams = () => {
    const opts = buildSwiperOptions(params);
    const formatted = JSON.stringify(opts, null, 2).replace(/"(\w+)":/g, '$1:');
    const code = `const swiper = new Swiper('.swiper', ${formatted});`;
    navigator.clipboard.writeText(code);
  };

  const html = useMemo(() => generateSwiperHTML(params), [params]);

  return (
    <div className="flex h-screen overflow-hidden bg-cladd-bg">
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/60 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <Surface
        outline
        className={clsx(
          'fixed inset-y-0 left-0 z-40 my-2 ml-2 mr-2 flex w-64 shrink-0 flex-col rounded-3xl transition-transform duration-300 md:relative md:translate-x-0 overflow-hidden',
          sidebarOpen ? 'translate-x-0' : '-translate-x-[calc(100%+16px)]'
        )}
        contentClassName="flex h-full flex-col"
      >
        <PlaygroundSidebar params={params} onUpdate={updateParam} />
      </Surface>

      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex h-16 shrink-0 items-center justify-between gap-2 px-4 md:pl-2">
          <div className="flex items-center gap-1">
            <Toolbar size="md" className="md:hidden">
              <ToolbarButton
                aria-label="Toggle sidebar"
                onClick={() => setSidebarOpen(!sidebarOpen)}
              >
                <SidebarIcon />
              </ToolbarButton>
            </Toolbar>

            <Toolbar size="md">
              <Link
                href="/"
                className="flex shrink-0 items-center !no-underline transition-opacity hover:opacity-70 "
              >
                <img
                  src="/images/swiper-logo.svg"
                  className="size-7"
                  alt="Swiper"
                />
              </Link>
              <span className="px-1 text-xs font-medium text-cladd-fg">
                Playground
              </span>
            </Toolbar>

            <Toolbar
              size="md"
              className="hidden sm:flex [&_a]:text-cladd-fg! [&_a]:no-underline!"
            >
              <ToolbarButton as="a" href="/swiper-api">
                API
              </ToolbarButton>
              <ToolbarButton as="a" href="/demos">
                Demos
              </ToolbarButton>
              <ToolbarButton as="a" href="/plugins">
                Plugins
              </ToolbarButton>
            </Toolbar>
          </div>

          <Toolbar size="md">
            <ToolbarButton onClick={resetParams}>
              <ResetIcon />
              <span className="hidden xs:inline">Reset</span>
            </ToolbarButton>
            <ToolbarButton onClick={handleCopy}>
              <CopyIcon />
              {copied ? (
                'Copied!'
              ) : (
                <>
                  Copy
                  <span className="hidden xs:inline md:hidden lg:inline">
                    {' '}
                    Code
                  </span>
                </>
              )}
            </ToolbarButton>
            <ToolbarSeparator />
            <PopoverRoot>
              <PopoverTrigger>
                <ToolbarButton>
                  <ExportIcon />
                  Export
                </ToolbarButton>
              </PopoverTrigger>
              <Popover className="w-80" offset={8} position="bottom-end">
                <div className="flex flex-col gap-6 p-4 text-sm">
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center gap-2">
                      <img
                        src="/images/swiper-studio-logo.svg"
                        className="size-8 rounded-lg border border-cladd-outline"
                        alt="Swiper Studio"
                      />
                      <span className="font-semibold text-cladd-fg">
                        Swiper Studio
                      </span>
                    </div>
                    <p className="text-cladd-fg-soft">
                      Advanced export is available in Swiper Studio - the visual
                      no-code builder for Swiper.
                    </p>
                    <img
                      src="/images/swiper-studio-banner.jpg"
                      alt="Swiper Studio Screenshot"
                      className="w-full rounded-lg"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <SectionTitle>Export to code</SectionTitle>
                    <div className="flex flex-wrap gap-1.5">
                      {[
                        'HTML',
                        'React',
                        'Vue',
                        'Next.js',
                        'Web Component',
                        'JSON',
                      ].map((t) => (
                        <Chip key={t} size="md" outline>
                          {t}
                        </Chip>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <SectionTitle>Download & export</SectionTitle>
                    <div className="flex flex-wrap gap-1.5">
                      {['Images', 'PDF', 'Publish to CDN'].map((t) => (
                        <Chip key={t} size="md" outline>
                          {t}
                        </Chip>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <SectionTitle>Integrations</SectionTitle>
                    <div className="flex flex-wrap gap-1.5">
                      {['Webflow', 'Shopify'].map((t) => (
                        <Chip key={t} size="md" outline>
                          {t}
                        </Chip>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <SectionTitle>And more</SectionTitle>
                    <p className="text-cladd-fg-soft">
                      Full content & styles editor, premium effects, project
                      sync & management, share links, and much more.
                    </p>
                  </div>

                  <Button
                    as="a"
                    href="https://studio.swiperjs.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    color="brand"
                    variant="gradient-fill"
                    rounded
                    size="lg"
                    className="text-cladd-on-primary! no-underline!"
                  >
                    Open Swiper Studio
                  </Button>
                </div>
              </Popover>
            </PopoverRoot>
          </Toolbar>
        </div>

        <iframe
          ref={iframeRef}
          title="Swiper Preview"
          srcDoc={html}
          className="mb-2 h-full w-[calc(100%-8px)] border border-cladd-outline"
        />
      </div>
    </div>
  );
}

export default function PlaygroundPage() {
  return (
    <>
      <Head>
        <title>Swiper Playground</title>
      </Head>
      <CladdProvider theme="dark" accentColor="brand">
        <PlaygroundPageInner />
      </CladdProvider>
    </>
  );
}

const meta = { title: 'Swiper Playground' };
PlaygroundPage.layoutProps = { meta };
