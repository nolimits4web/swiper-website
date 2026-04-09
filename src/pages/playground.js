import { useState, useMemo, useEffect } from 'react';
import Head from 'next/head';
import clsx from 'clsx';
import { getDefaultState } from '@/playground/params-config';
import PlaygroundSidebar from '@/playground/PlaygroundSidebar';
import {
  generateSwiperHTML,
  buildSwiperOptions,
} from '@/playground/generateSwiperHTML';
import { encodeState, decodeState } from '@/playground/url-state';
import Link from 'next/link';

const DEFAULT_STATE = getDefaultState();

export default function PlaygroundPage() {
  const [params, setParams] = useState(DEFAULT_STATE);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [exportOpen, setExportOpen] = useState(false);

  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    copyParams();
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  // Restore state from URL hash on mount
  useEffect(() => {
    if (window.location.hash) {
      setParams(decodeState(window.location.hash));
    }
  }, []);

  // Sync state to URL hash on change
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
    <>
      <Head>
        <title>Swiper Playground</title>
      </Head>

      <div className="flex h-screen overflow-hidden bg-[#111]">
        {/* Mobile backdrop */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 z-30 bg-black/60 md:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Sidebar */}
        <div
          className={clsx(
            'fixed inset-y-0 left-0 z-40 flex w-64 shrink-0 flex-col bg-pg-surface-1 rounded-3xl border border-outline  transition-transform duration-300 md:relative mr-2 md:translate-x-0 my-2 ml-2',
            sidebarOpen ? 'translate-x-0' : '-translate-x-[calc(100%+16px)]'
          )}
        >
          <PlaygroundSidebar params={params} onUpdate={updateParam} />
        </div>

        {/* Preview */}
        <div className="min-w-0 flex-1 flex flex-col">
          <div className="h-16 shrink-0 flex items-center justify-between px-4 md:pl-2">
            <div className="flex items-center gap-2">
              {/* Mobile toggle */}
              <div className="flex items-center bg-pg-surface-1 border border-outline rounded-full px-1 h-9 gap-2 md:hidden">
                <button
                  type="button"
                  className="px-2 h-7 hover:bg-pg-surface-2 active:bg-pg-surface-2/50 rounded-full flex items-center text-xs font-medium text-white/80! no-underline!"
                  onClick={() => setSidebarOpen(!sidebarOpen)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    className="size-4"
                  >
                    <g fill="currentColor">
                      <path d="M14.25,2H3.75c-1.517,0-2.75,1.233-2.75,2.75V13.25c0,1.517,1.233,2.75,2.75,2.75H14.25c1.517,0,2.75-1.233,2.75-2.75V4.75c0-1.517-1.233-2.75-2.75-2.75ZM5.75,12.5h-1.5c-.414,0-.75-.336-.75-.75s.336-.75,.75-.75h1.5c.414,0,.75,.336,.75,.75s-.336,.75-.75,.75Zm0-2.75h-1.5c-.414,0-.75-.336-.75-.75s.336-.75,.75-.75h1.5c.414,0,.75,.336,.75,.75s-.336,.75-.75,.75Zm0-2.75h-1.5c-.414,0-.75-.336-.75-.75s.336-.75,.75-.75h1.5c.414,0,.75,.336,.75,.75s-.336,.75-.75,.75Zm9.75,6.25c0,.689-.561,1.25-1.25,1.25h-5.25V3.5h5.25c.689,0,1.25,.561,1.25,1.25V13.25Z"></path>
                    </g>
                  </svg>
                </button>
              </div>
              <div className="flex items-center bg-pg-surface-1 border border-outline rounded-full pl-1.5 pr-2 h-9 gap-2">
                <Link
                  href="/"
                  className="flex shrink-0 items-center transition-opacity hover:opacity-70 !no-underline"
                >
                  <img
                    src="/images/swiper-logo.svg"
                    className="size-6"
                    alt="Swiper"
                  />
                </Link>
                <span className="text-xs font-medium text-white/80 truncate">
                  Playground
                </span>
              </div>
              <div className="sm:flex items-center bg-pg-surface-1 border border-outline rounded-full px-1 h-9 hidden">
                <a
                  className="px-2 h-7 hover:bg-pg-surface-2 active:bg-pg-surface-2/50 rounded-full flex items-center text-xs font-medium text-white/80! no-underline!"
                  href="/swiper-api"
                >
                  API
                </a>
                <a
                  className="px-2 h-7 hover:bg-pg-surface-2 active:bg-pg-surface-2/50 rounded-full flex items-center text-xs font-medium text-white/80! no-underline!"
                  href="/demos"
                >
                  Demos
                </a>
                <a
                  className="px-2 h-7 hover:bg-pg-surface-2 active:bg-pg-surface-2/50 rounded-full flex items-center text-xs font-medium text-white/80! no-underline!"
                  href="/plugins"
                >
                  Plugins
                </a>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center bg-pg-surface-1 border border-outline rounded-full px-1 h-9">
                <button
                  className="px-2 h-7 hover:bg-pg-surface-2 active:bg-pg-surface-2/50 rounded-full flex items-center text-xs font-medium text-white/80! no-underline! gap-1"
                  onClick={resetParams}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    className="size-4"
                  >
                    <g fill="currentColor">
                      <path
                        d="m9,1c-2.489,0-4.7694,1.1479-6.262,3.0327l-.1149-.8306c-.0576-.4102-.4404-.6978-.8457-.6396-.4111.0566-.6973.4355-.6406.8457l.4082,2.9448c.0527.3755.374.647.7422.647.0342,0,.0693-.0024.1035-.0068l2.9443-.4072c.4102-.0571.6973-.4355.6406-.8457s-.4424-.6895-.8457-.6406l-1.4573.2017c1.1984-1.7283,3.163-2.8013,5.3274-2.8013,3.584,0,6.5,2.916,6.5,6.5s-2.916,6.5-6.5,6.5c-3.1797,0-5.874-2.2705-6.4072-5.3989-.0693-.4082-.4551-.6797-.8652-.6133-.4082.0693-.6826.457-.6133.8652.6562,3.8516,3.9727,6.647,7.8857,6.647,4.4111,0,8-3.5889,8-8S13.4111,1,9,1Z"
                        stroke-width="0"
                      ></path>
                      <path
                        d="m10.0605,9l1.4697-1.4697c.293-.293.293-.7676,0-1.0605s-.7676-.293-1.0605,0l-1.4697,1.4697-1.4697-1.4697c-.293-.293-.7676-.293-1.0605,0s-.293.7676,0,1.0605l1.4697,1.4697-1.4697,1.4697c-.293.293-.293.7676,0,1.0605.1465.1465.3379.2197.5303.2197s.3838-.0732.5303-.2197l1.4697-1.4697,1.4697,1.4697c.1465.1465.3379.2197.5303.2197s.3838-.0732.5303-.2197c.293-.293.293-.7676,0-1.0605l-1.4697-1.4697Z"
                        stroke-width="0"
                      ></path>
                    </g>
                  </svg>
                  <span className="hidden xs:inline">Reset</span>
                </button>
                <button
                  className="px-2 h-7 hover:bg-pg-surface-2 active:bg-pg-surface-2/50 rounded-full flex items-center text-xs font-medium text-white/80! no-underline! gap-1"
                  onClick={handleCopy}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    className="size-4"
                  >
                    <g fill="currentColor">
                      <circle cx="9" cy="12.25" r=".75"></circle>
                      <circle cx="11.75" cy="12.25" r=".75"></circle>
                      <circle cx="6.25" cy="12.25" r=".75"></circle>
                      <path d="M6.25,2h-1c-1.517,0-2.75,1.233-2.75,2.75v2.625c0,.482-.393,.875-.875,.875-.414,0-.75,.336-.75,.75s.336,.75,.75,.75c.482,0,.875,.393,.875,.875v2.625c0,1.517,1.233,2.75,2.75,2.75h1c.414,0,.75-.336,.75-.75s-.336-.75-.75-.75h-1c-.689,0-1.25-.561-1.25-1.25v-2.625c0-.628-.245-1.2-.645-1.625,.399-.425,.645-.997,.645-1.625v-2.625c0-.689,.561-1.25,1.25-1.25h1c.414,0,.75-.336,.75-.75s-.336-.75-.75-.75Z"></path>
                      <path d="M16.375,8.25c-.482,0-.875-.393-.875-.875v-2.625c0-1.517-1.233-2.75-2.75-2.75h-1c-.414,0-.75,.336-.75,.75s.336,.75,.75,.75h1c.689,0,1.25,.561,1.25,1.25v2.625c0,.628,.245,1.2,.645,1.625-.399,.425-.645,.997-.645,1.625v2.625c0,.689-.561,1.25-1.25,1.25h-1c-.414,0-.75,.336-.75,.75s.336,.75,.75,.75h1c1.517,0,2.75-1.233,2.75-2.75v-2.625c0-.482,.393-.875,.875-.875,.414,0,.75-.336,.75-.75s-.336-.75-.75-.75Z"></path>
                    </g>
                  </svg>
                  {copied ? (
                    'Copied!'
                  ) : (
                    <>
                      Copy
                      <span className="hidden xs:inline md:hidden lg:inline">
                        {' '}
                        Code
                      </span>{' '}
                    </>
                  )}
                </button>
                <div className="relative">
                  <button
                    className="px-2 h-7 hover:bg-pg-surface-2 active:bg-pg-surface-2/50 rounded-full flex items-center text-xs font-medium text-white/80! no-underline! gap-1"
                    onClick={() => setExportOpen(!exportOpen)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 18 18"
                      className="size-4"
                    >
                      <g fill="currentColor">
                        <path d="M15.25,11c-.414,0-.75,.336-.75,.75v1.5c0,.689-.561,1.25-1.25,1.25H4.75c-.689,0-1.25-.561-1.25-1.25v-1.5c0-.414-.336-.75-.75-.75s-.75,.336-.75,.75v1.5c0,1.517,1.233,2.75,2.75,2.75H13.25c1.517,0,2.75-1.233,2.75-2.75v-1.5c0-.414-.336-.75-.75-.75Z"></path>
                        <path d="M8.47,10.78c.146,.146,.338,.22,.53,.22s.384-.073,.53-.22l3.5-3.5c.293-.293,.293-.768,0-1.061s-.768-.293-1.061,0l-2.22,2.22V2.75c0-.414-.336-.75-.75-.75s-.75,.336-.75,.75v5.689l-2.22-2.22c-.293-.293-.768-.293-1.061,0s-.293,.768,0,1.061l3.5,3.5Z"></path>
                      </g>
                    </svg>
                    Export
                  </button>
                  {exportOpen && (
                    <>
                      <div
                        className="fixed inset-0 z-40"
                        onClick={() => setExportOpen(false)}
                      />
                      <div className="absolute right-0 top-full  z-50 w-80 rounded-3xl border border-outline bg-pg-surface-2 shadow-xl text-sm max-h-[calc(100vh-70px)] overflow-auto">
                        <div className="p-4 pb-3">
                          <div className="flex items-center gap-2 mb-3">
                            <img
                              src="/images/swiper-studio-logo.svg"
                              className="size-8 border border-white/10 rounded-lg"
                              alt="Swiper Studio"
                            />
                            <span className="font-semibold text-white/90">
                              Swiper Studio
                            </span>
                          </div>
                          <p className="text-xs text-on-surface-dark leading-relaxed">
                            Advanced export is available in Swiper Studio — the
                            visual no-code builder for Swiper.
                          </p>
                          <p className="mt-2">
                            <img
                              src="/images/swiper-studio-banner.jpg"
                              alt="Swiper Studio Screenshot"
                              className="w-full rounded-lg"
                            />
                          </p>
                        </div>

                        <div className="border-t border-outline px-4 py-3">
                          <div className="text-xs font-medium uppercase tracking-wider text-on-surface-darker mb-2">
                            Export to code
                          </div>
                          <div className="flex flex-wrap gap-1.5">
                            {[
                              'HTML',
                              'React',
                              'Vue',
                              'Next.js',
                              'Web Component',
                              'JSON',
                            ].map((t) => (
                              <span
                                key={t}
                                className="rounded-full bg-pg-surface-3 border border-outline px-2 py-0.5 text-xs text-on-surface-dark"
                              >
                                {t}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="border-t border-white/10 px-4 py-3">
                          <div className="text-xs font-medium uppercase tracking-wider text-on-surface-darker mb-2">
                            Download & export
                          </div>
                          <div className="flex flex-wrap gap-1.5">
                            {['Images', 'PDF', 'Publish to CDN'].map((t) => (
                              <span
                                key={t}
                                className="rounded-full bg-pg-surface-3 border border-outline px-2 py-0.5 text-xs text-on-surface-dark"
                              >
                                {t}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="border-t border-white/10 px-4 py-3">
                          <div className="text-xs font-medium uppercase tracking-wider text-on-surface-darker mb-2">
                            Integrations
                          </div>
                          <div className="flex flex-wrap gap-1.5">
                            {['Webflow', 'Shopify'].map((t) => (
                              <span
                                key={t}
                                className="rounded-full bg-pg-surface-3 border border-outline px-2 py-0.5 text-xs text-on-surface-dark"
                              >
                                {t}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="border-t border-outline px-4 py-3">
                          <div className="text-xs font-medium uppercase tracking-wider text-on-surface-darker mb-2">
                            And more
                          </div>
                          <p className="text-xs text-on-surface-dark leading-relaxed">
                            Full content & styles editor, premium effects,
                            project sync & management, share links, and much
                            more.
                          </p>
                        </div>

                        <div className="border-t border-outline p-3">
                          <a
                            href="https://studio.swiperjs.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex h-9 w-full items-center justify-center rounded-full bg-primary text-sm font-medium text-black! !no-underline hover:opacity-90 active:opacity-80 transition-opacity"
                          >
                            Open Swiper Studio
                          </a>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
          <iframe
            title="Swiper Preview"
            srcDoc={html}
            className="h-full w-[calc(100%-8px)] mb-2 border-outline/50 border"
          />
        </div>
      </div>
    </>
  );
}

const meta = { title: 'Swiper Playground' };
PlaygroundPage.layoutProps = { meta };
