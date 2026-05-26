import { useState } from 'react';
import clsx from 'clsx';
import { SectionTitle, Switch } from '@cladd-ui/react';
import { PARAMS_CONFIG } from './params-config';
import ParamInput from './ParamInput';

export function TextIcon({ className }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 18 18"
      className={className}
    >
      <g fill="currentColor">
        <path
          d="m12,8h-6c-.4141,0-.75-.3359-.75-.75s.3359-.75.75-.75h6c.4141,0,.75.3359.75.75s-.3359.75-.75.75Z"
          strokeWidth="0"
        ></path>
        <path
          d="m9.25,11.5h-3.25c-.4141,0-.75-.3359-.75-.75s.3359-.75.75-.75h3.25c.4141,0,.75.3359.75.75s-.3359.75-.75.75Z"
          strokeWidth="0"
        ></path>
        <path
          d="m15.25,7.5c-.4141,0-.75-.3359-.75-.75v-2c0-.6895-.5605-1.25-1.25-1.25h-2c-.4141,0-.75-.3359-.75-.75s.3359-.75.75-.75h2c1.5166,0,2.75,1.2334,2.75,2.75v2c0,.4141-.3359.75-.75.75Z"
          strokeWidth="0"
        ></path>
        <path
          d="m6.75,16h-2c-1.5166,0-2.75-1.2334-2.75-2.75v-2c0-.4141.3359-.75.75-.75s.75.3359.75.75v2c0,.6895.5605,1.25,1.25,1.25h2c.4141,0,.75.3359.75.75s-.3359.75-.75.75Z"
          strokeWidth="0"
        ></path>
        <path
          d="m13.25,16h-2c-.4141,0-.75-.3359-.75-.75s.3359-.75.75-.75h2c.6895,0,1.25-.5605,1.25-1.25v-2c0-.4141.3359-.75.75-.75s.75.3359.75.75v2c0,1.5166-1.2334,2.75-2.75,2.75Z"
          strokeWidth="0"
        ></path>
        <path
          d="m2.75,7.5c-.4141,0-.75-.3359-.75-.75v-2c0-1.5166,1.2334-2.75,2.75-2.75h2c.4141,0,.75.3359.75.75s-.3359.75-.75.75h-2c-.6895,0-1.25.5605-1.25,1.25v2c0,.4141-.3359.75-.75.75Z"
          strokeWidth="0"
        ></path>
      </g>
    </svg>
  );
}

export function ImageIcon({ className }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 18 18"
      className={className}
    >
      <g fill="currentColor">
        <path
          d="m8.501,9.5c-.551,0-1-.449-1-1s.449-1,1-1,1,.449,1,1-.449,1-1,1Z"
          strokeWidth="0"
        ></path>
        <path
          d="m13.75,4.5h-6.5c-1.5166,0-2.75,1.2334-2.75,2.75v6.5c0,1.5166,1.2334,2.75,2.75,2.75h6.5c1.5166,0,2.75-1.2334,2.75-2.75v-6.5c0-1.5166-1.2334-2.75-2.75-2.75Zm-7.75,2.75c0-.6895.5605-1.25,1.25-1.25h6.5c.6895,0,1.25.5605,1.25,1.25v4.1113l-1.3477-1.3477c-.3301-.3311-.7695-.5137-1.2363-.5142h-.002c-.4678,0-.9072.1826-1.2373.5127l-4.7009,4.6951c-.2833-.2292-.4758-.5652-.4758-.9573v-6.5Z"
          strokeWidth="0"
        ></path>
        <path
          d="m2.749,12.4048c-.3652,0-.6855-.2676-.7412-.6396l-.9775-6.5806c-.2217-1.5005.8164-2.9019,2.3154-3.1245l6.9238-1.0288c1.1221-.166,2.21.3599,2.7803,1.3423.208.3584.0859.8174-.2725,1.0254-.3564.2065-.8164.0854-1.0244-.2725-.2598-.4473-.7549-.6885-1.2627-.6118l-6.9238,1.0288c-.6816.1011-1.1533.7388-1.0518,1.4209l.9775,6.5801c.0605.4097-.2227.7915-.6318.8521-.0371.0059-.0742.0083-.1113.0083Z"
          strokeWidth="0"
        ></path>
      </g>
    </svg>
  );
}

function Chevron({ open }) {
  return (
    <svg
      className={clsx(
        'size-3 text-cladd-fg-soft transition-transform duration-200',
        open && 'rotate-180'
      )}
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 18 18"
    >
      <g fill="currentColor">
        <path d="M9,13.5c-.192,0-.384-.073-.53-.22L2.22,7.03c-.293-.293-.293-.768,0-1.061s.768-.293,1.061,0l5.72,5.72,5.72-5.72c.293-.293,.768-.293,1.061,0s.293,.768,0,1.061l-6.25,6.25c-.146,.146-.338,.22-.53,.22Z"></path>
      </g>
    </svg>
  );
}

function Section({ title, children, defaultOpen = true }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-cladd-outline px-3 py-2">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex w-full cursor-pointer items-center gap-2 py-1 text-left"
      >
        <SectionTitle className="flex-1">{title}</SectionTitle>
        <Chevron open={open} />
      </button>
      {open && <div className="pt-1 pb-2">{children}</div>}
    </div>
  );
}

function ModuleSection({ title, enabled, onToggle, children }) {
  return (
    <div className="border-b border-cladd-outline px-3 py-2">
      <SectionTitle>
        <span>{title}</span>
        <Switch
          size="sm"
          checked={enabled}
          onChange={onToggle}
          className="ml-auto"
        />
      </SectionTitle>
      {enabled && <div className="pt-2 pb-2">{children}</div>}
    </div>
  );
}

export default function PlaygroundSidebar({ params, onUpdate }) {
  return (
    <div
      className="playground-sidebar flex-1 overflow-y-auto py-2"
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
  );
}
