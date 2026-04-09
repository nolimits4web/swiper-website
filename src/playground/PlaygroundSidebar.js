import { useState } from 'react';
import Link from 'next/link';
import clsx from 'clsx';
import { PARAMS_CONFIG } from './params-config';
import ParamInput from './ParamInput';

function Section({ title, children, defaultOpen = true }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-white/10">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between px-2 py-3"
      >
        <span className="text-[11px] font-semibold uppercase tracking-wider text-white/40">
          {title}
        </span>
        <svg
          className={clsx(
            'h-3.5 w-3.5 text-white/30 transition-transform duration-200',
            open && 'rotate-180'
          )}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>
      {open && <div className="pl-2 pr-2 pb-3">{children}</div>}
    </div>
  );
}

function ModuleSection({ title, enabled, onToggle, children }) {
  return (
    <div className="border-b border-white/10">
      <div className="flex w-full items-center justify-between px-2 py-3">
        <span className="text-[11px] font-semibold uppercase tracking-wider text-white/40">
          {title}
        </span>
        <button
          type="button"
          onClick={() => onToggle(!enabled)}
          className={clsx(
            'relative h-[22px] w-[40px] shrink-0 rounded-full transition-colors duration-200',
            enabled ? 'bg-primary' : 'bg-white/15'
          )}
        >
          <span
            className={clsx(
              'absolute top-[3px] h-4 w-4 rounded-full bg-white shadow transition-all duration-200',
              enabled ? 'left-[20px]' : 'left-[3px]'
            )}
          />
        </button>
      </div>
      {enabled && <div className="px-2 pb-3">{children}</div>}
    </div>
  );
}

export default function PlaygroundSidebar({ params, onUpdate }) {
  return (
    <>
      {/* Scrollable controls */}
      <div
        className="playground-sidebar flex-1 overflow-y-auto pb-4 pt-4"
        style={{
          scrollbarWidth: 'thin',
          scrollbarColor: 'rgba(255,255,255,.1) transparent',
        }}
      >
        {PARAMS_CONFIG.map((section) => {
          if (section.moduleToggle) {
            const enabled = params[section.moduleToggle];
            return (
              <ModuleSection
                key={section.title}
                title={section.title}
                enabled={enabled}
                onToggle={(v) => onUpdate(section.moduleToggle, v)}
              >
                {section.params.map((param) => {
                  if (param.showWhen && !param.showWhen(params)) return null;
                  return (
                    <ParamInput
                      key={param.name}
                      param={param}
                      value={params[param.name]}
                      onChange={(v) => onUpdate(param.name, v)}
                    />
                  );
                })}
              </ModuleSection>
            );
          }

          return (
            <Section
              key={section.title}
              title={section.title}
              defaultOpen={section.defaultOpen}
            >
              {section.params.map((param) => {
                if (param.showWhen && !param.showWhen(params)) return null;
                return (
                  <ParamInput
                    key={param.name}
                    param={param}
                    value={params[param.name]}
                    onChange={(v) => onUpdate(param.name, v)}
                  />
                );
              })}
            </Section>
          );
        })}
      </div>
    </>
  );
}
