import Atropos from 'atropos/react';
import { trackOutbound } from '@/shared/track-outbound';

const UIInitiativeBanner = () => {
  return (
    <div className="my-8">
      <Atropos
        component="a"
        highlight
        href="https://uiinitiative.com"
        target="_blank"
        className="mx-auto block"
        rotateTouch="scroll-y"
        rotateXMax={5}
        rotateYMax={5}
        onClick={() => trackOutbound('https://uiinitiative.com')}
        innerClassName="rounded-2xl"
      >
        <img
          src="/images/uiinitiative-banner.jpg"
          alt="UI Initiative"
          className="rounded-2xl dark:border dark:border-white dark:border-opacity-5"
        />
      </Atropos>
    </div>
  );
};

export default UIInitiativeBanner;
