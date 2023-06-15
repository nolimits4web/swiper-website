import Atropos from 'atropos/react';

const UIInitiativeBanner = () => {
  return (
    <div className="px-4 pt-4">
      <Atropos
        highlight
        className="mx-auto block"
        rotateTouch="scroll-y"
        rotateXMax={5}
        rotateYMax={5}
        innerClassName="rounded-3xl"
        eventsEl=".uiinitiative-card"
      >
        <img
          src="/images/uiinitiative-banner.jpg"
          alt="UI Initiative"
          className="rounded-3xl"
        />
      </Atropos>
    </div>
  );
};

export default UIInitiativeBanner;
