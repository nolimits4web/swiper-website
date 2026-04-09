export const PARAMS_CONFIG = [
  // -----------------------------------------------------------------------
  // Slides
  // -----------------------------------------------------------------------
  {
    title: 'Slides',
    defaultOpen: true,
    params: [
      {
        name: 'totalSlides',
        label: 'Total slides',
        type: 'number',
        default: 5,
        min: 1,
        max: 20,
        step: 1,
      },
      {
        name: 'direction',
        label: 'Direction',
        type: 'select',
        default: 'horizontal',
        options: [
          { value: 'horizontal', label: 'horizontal' },
          { value: 'vertical', label: 'vertical' },
        ],
      },
      {
        name: 'slidesPerView',
        label: 'Slides per view',
        type: 'select',
        default: '1',
        options: [
          { value: 'auto', label: 'auto' },
          ...Array.from({ length: 19 }, (_, i) => {
            const v = (i + 2) / 2;
            return { value: String(v), label: String(v) };
          }),
        ],
      },
      {
        name: 'spaceBetween',
        label: 'Space between',
        type: 'number',
        default: 0,
        min: 0,
        max: 200,
        step: 2,
      },
      {
        name: 'slidesPerGroup',
        label: 'Slides per group',
        type: 'number',
        default: 1,
        min: 1,
        max: 5,
        step: 1,
      },
      {
        name: 'slidesPerGroupSkip',
        label: 'Slides per group skip',
        type: 'number',
        default: 0,
        min: 0,
        max: 5,
        step: 1,
      },
      {
        name: 'slidesPerGroupAuto',
        label: 'Slides per group auto',
        type: 'boolean',
        default: false,
      },
      {
        name: 'slidesOffsetBefore',
        label: 'Slides offset before',
        type: 'number',
        default: 0,
        min: 0,
        max: 200,
        step: 2,
      },
      {
        name: 'slidesOffsetAfter',
        label: 'Slides offset after',
        type: 'number',
        default: 0,
        min: 0,
        max: 200,
        step: 2,
      },
      {
        name: 'initialSlide',
        label: 'Initial slide',
        type: 'number',
        default: 0,
        min: 0,
        max: 20,
        step: 1,
      },
      {
        name: 'speed',
        label: 'Speed (ms)',
        type: 'number',
        default: 300,
        min: 0,
        max: 3000,
        step: 100,
      },
      {
        name: 'centeredSlides',
        label: 'Centered slides',
        type: 'boolean',
        default: false,
      },
      {
        name: 'centeredSlidesBounds',
        label: 'Centered slides bounds',
        type: 'boolean',
        default: false,
        showWhen: (s) => s.centeredSlides,
        indent: true,
      },
      {
        name: 'centerInsufficientSlides',
        label: 'Center insufficient slides',
        type: 'boolean',
        default: false,
      },
      {
        name: 'normalizeSlideIndex',
        label: 'Normalize slide index',
        type: 'boolean',
        default: true,
      },
      {
        name: 'snapToSlideEdge',
        label: 'Snap to slide edge',
        type: 'boolean',
        default: false,
      },
      {
        name: 'autoHeight',
        label: 'Auto height',
        type: 'boolean',
        default: false,
      },
      {
        name: 'roundLengths',
        label: 'Round lengths',
        type: 'boolean',
        default: false,
      },
      {
        name: 'gridRows',
        label: 'Grid rows',
        type: 'number',
        default: 1,
        min: 1,
        max: 4,
        step: 1,
      },
      {
        name: 'gridFill',
        label: 'Grid fill',
        type: 'select',
        default: 'column',
        options: [
          { value: 'column', label: 'column' },
          { value: 'row', label: 'row' },
        ],
      },
      {
        name: 'loopMode',
        label: 'Loop',
        type: 'select',
        default: 'off',
        options: [
          { value: 'off', label: 'Off' },
          { value: 'loop', label: 'Loop' },
          { value: 'rewind', label: 'Rewind' },
        ],
      },
      {
        name: 'loopAddBlankSlides',
        label: 'Loop add blank slides',
        type: 'boolean',
        default: true,
        showWhen: (s) => s.loopMode === 'loop',
        indent: true,
      },
      {
        name: 'loopAdditionalSlides',
        label: 'Loop additional slides',
        type: 'number',
        default: 0,
        min: 0,
        max: 10,
        step: 1,
        showWhen: (s) => s.loopMode === 'loop',
        indent: true,
      },
      {
        name: 'loopPreventsSliding',
        label: 'Loop prevents sliding',
        type: 'boolean',
        default: true,
        showWhen: (s) => s.loopMode === 'loop',
        indent: true,
      },
    ],
  },

  // -----------------------------------------------------------------------
  // Effects
  // -----------------------------------------------------------------------
  {
    title: 'Effects',
    defaultOpen: true,
    params: [
      {
        name: 'effect',
        label: 'Effect',
        type: 'select',
        popover: true,
        default: 'slide',
        options: [
          { value: 'slide', label: 'slide' },
          { value: 'fade', label: 'fade' },
          { value: 'cube', label: 'cube' },
          { value: 'coverflow', label: 'coverflow' },
          { value: 'flip', label: 'flip' },
          { value: 'cards', label: 'cards' },
          { value: 'panorama', label: 'panorama', pro: true },
          { value: 'carousel', label: 'carousel', pro: true },
          { value: 'shutters', label: 'shutters', pro: true },
          { value: 'slicer', label: 'slicer', pro: true },
          { value: 'gl', label: 'gl', pro: true },
          { value: 'tinder', label: 'tinder', pro: true },
          { value: 'material', label: 'material', pro: true },
          { value: 'cards-stack', label: 'cards-stack', pro: true },
          { value: 'expo', label: 'expo', pro: true },
          { value: 'super-flow', label: 'super-flow', pro: true },
        ],
      },
      // -- Fade --
      {
        name: 'fadeEffectCrossFade',
        label: 'Cross fade',
        type: 'boolean',
        default: false,
        showWhen: (s) => s.effect === 'fade',
        indent: true,
      },
      // -- Cube --
      {
        name: 'cubeEffectSlideShadows',
        label: 'Slide shadows',
        type: 'boolean',
        default: true,
        showWhen: (s) => s.effect === 'cube',
        indent: true,
      },
      {
        name: 'cubeEffectShadow',
        label: 'Shadow',
        type: 'boolean',
        default: true,
        showWhen: (s) => s.effect === 'cube',
        indent: true,
      },
      {
        name: 'cubeEffectShadowOffset',
        label: 'Shadow offset',
        type: 'number',
        default: 20,
        min: 0,
        max: 100,
        step: 5,
        showWhen: (s) => s.effect === 'cube',
        indent: true,
      },
      {
        name: 'cubeEffectShadowScale',
        label: 'Shadow scale',
        type: 'number',
        default: 0.94,
        min: 0,
        max: 1,
        step: 0.01,
        showWhen: (s) => s.effect === 'cube',
        indent: true,
      },
      // -- Coverflow --
      {
        name: 'coverflowEffectRotate',
        label: 'Rotate',
        type: 'number',
        default: 50,
        min: 0,
        max: 180,
        step: 5,
        showWhen: (s) => s.effect === 'coverflow',
        indent: true,
      },
      {
        name: 'coverflowEffectStretch',
        label: 'Stretch',
        type: 'number',
        default: 0,
        min: -200,
        max: 200,
        step: 10,
        showWhen: (s) => s.effect === 'coverflow',
        indent: true,
      },
      {
        name: 'coverflowEffectDepth',
        label: 'Depth',
        type: 'number',
        default: 100,
        min: 0,
        max: 500,
        step: 10,
        showWhen: (s) => s.effect === 'coverflow',
        indent: true,
      },
      {
        name: 'coverflowEffectScale',
        label: 'Scale',
        type: 'number',
        default: 1,
        min: 0,
        max: 2,
        step: 0.05,
        showWhen: (s) => s.effect === 'coverflow',
        indent: true,
      },
      {
        name: 'coverflowEffectModifier',
        label: 'Modifier',
        type: 'number',
        default: 1,
        min: 0,
        max: 5,
        step: 0.5,
        showWhen: (s) => s.effect === 'coverflow',
        indent: true,
      },
      {
        name: 'coverflowEffectSlideShadows',
        label: 'Slide shadows',
        type: 'boolean',
        default: true,
        showWhen: (s) => s.effect === 'coverflow',
        indent: true,
      },
      // -- Flip --
      {
        name: 'flipEffectSlideShadows',
        label: 'Slide shadows',
        type: 'boolean',
        default: true,
        showWhen: (s) => s.effect === 'flip',
        indent: true,
      },
      {
        name: 'flipEffectLimitRotation',
        label: 'Limit rotation',
        type: 'boolean',
        default: true,
        showWhen: (s) => s.effect === 'flip',
        indent: true,
      },
      // -- Cards --
      {
        name: 'cardsEffectSlideShadows',
        label: 'Slide shadows',
        type: 'boolean',
        default: true,
        showWhen: (s) => s.effect === 'cards',
        indent: true,
      },
      {
        name: 'cardsEffectRotate',
        label: 'Rotate',
        type: 'boolean',
        default: true,
        showWhen: (s) => s.effect === 'cards',
        indent: true,
      },
      {
        name: 'cardsEffectPerSlideRotate',
        label: 'Per slide rotate',
        type: 'number',
        default: 2,
        min: 0,
        max: 10,
        step: 1,
        showWhen: (s) => s.effect === 'cards',
        indent: true,
      },
      {
        name: 'cardsEffectPerSlideOffset',
        label: 'Per slide offset',
        type: 'number',
        default: 8,
        min: 0,
        max: 30,
        step: 1,
        showWhen: (s) => s.effect === 'cards',
        indent: true,
      },
    ],
  },

  // -----------------------------------------------------------------------
  // Touch & Interaction
  // -----------------------------------------------------------------------
  {
    title: 'Touch & Interaction',
    defaultOpen: false,
    params: [
      {
        name: 'grabCursor',
        label: 'Grab cursor',
        type: 'boolean',
        default: false,
      },
      {
        name: 'simulateTouch',
        label: 'Simulate touch',
        type: 'boolean',
        default: true,
      },
      {
        name: 'allowTouchMove',
        label: 'Allow touch move',
        type: 'boolean',
        default: true,
      },
      {
        name: 'slideToClickedSlide',
        label: 'Slide to clicked slide',
        type: 'boolean',
        default: false,
      },
      {
        name: 'shortSwipes',
        label: 'Short swipes',
        type: 'boolean',
        default: true,
      },
      {
        name: 'longSwipes',
        label: 'Long swipes',
        type: 'boolean',
        default: true,
      },
      {
        name: 'longSwipesRatio',
        label: 'Long swipes ratio',
        type: 'number',
        default: 0.5,
        min: 0,
        max: 1,
        step: 0.1,
        showWhen: (s) => s.longSwipes,
        indent: true,
      },
      {
        name: 'longSwipesMs',
        label: 'Long swipes ms',
        type: 'number',
        default: 300,
        min: 0,
        max: 1000,
        step: 50,
        showWhen: (s) => s.longSwipes,
        indent: true,
      },
      {
        name: 'followFinger',
        label: 'Follow finger',
        type: 'boolean',
        default: true,
      },
      {
        name: 'threshold',
        label: 'Threshold',
        type: 'number',
        default: 5,
        min: 0,
        max: 50,
        step: 1,
      },
      {
        name: 'touchAngle',
        label: 'Touch angle',
        type: 'number',
        default: 45,
        min: 0,
        max: 90,
        step: 5,
      },
      {
        name: 'touchRatio',
        label: 'Touch ratio',
        type: 'number',
        default: 1,
        min: 0,
        max: 3,
        step: 0.1,
      },
      {
        name: 'touchStartPreventDefault',
        label: 'Touch start prevent default',
        type: 'boolean',
        default: true,
      },
      {
        name: 'touchStartForcePreventDefault',
        label: 'Touch start force prevent default',
        type: 'boolean',
        default: false,
      },
      {
        name: 'touchMoveStopPropagation',
        label: 'Touch move stop propagation',
        type: 'boolean',
        default: false,
      },
      {
        name: 'touchReleaseOnEdges',
        label: 'Touch release on edges',
        type: 'boolean',
        default: false,
      },
      {
        name: 'resistance',
        label: 'Resistance',
        type: 'boolean',
        default: true,
      },
      {
        name: 'resistanceRatio',
        label: 'Resistance ratio',
        type: 'number',
        default: 0.85,
        min: 0,
        max: 1,
        step: 0.05,
        showWhen: (s) => s.resistance,
        indent: true,
      },
      {
        name: 'edgeSwipeDetection',
        label: 'Edge swipe detection',
        type: 'boolean',
        default: false,
      },
      {
        name: 'edgeSwipeThreshold',
        label: 'Edge swipe threshold',
        type: 'number',
        default: 20,
        min: 0,
        max: 100,
        step: 5,
        showWhen: (s) => s.edgeSwipeDetection,
        indent: true,
      },
      {
        name: 'noSwiping',
        label: 'No swiping',
        type: 'boolean',
        default: true,
      },
      {
        name: 'preventClicks',
        label: 'Prevent clicks',
        type: 'boolean',
        default: true,
      },
      {
        name: 'preventClicksPropagation',
        label: 'Prevent clicks propagation',
        type: 'boolean',
        default: true,
      },
      {
        name: 'allowSlidePrev',
        label: 'Allow slide prev',
        type: 'boolean',
        default: true,
      },
      {
        name: 'allowSlideNext',
        label: 'Allow slide next',
        type: 'boolean',
        default: true,
      },
      {
        name: 'preventInteractionOnTransition',
        label: 'Prevent interaction on transition',
        type: 'boolean',
        default: false,
      },
    ],
  },

  // -----------------------------------------------------------------------
  // Free Mode
  // -----------------------------------------------------------------------
  {
    title: 'Free Mode',
    moduleToggle: 'freeMode',
    params: [
      {
        name: 'freeModeMomentum',
        label: 'Momentum',
        type: 'boolean',
        default: true,
      },
      {
        name: 'freeModeMomentumRatio',
        label: 'Momentum ratio',
        type: 'number',
        default: 1,
        min: 0,
        max: 5,
        step: 0.1,
        showWhen: (s) => s.freeModeMomentum,
        indent: true,
      },
      {
        name: 'freeModeMomentumVelocityRatio',
        label: 'Momentum velocity ratio',
        type: 'number',
        default: 1,
        min: 0,
        max: 5,
        step: 0.1,
        showWhen: (s) => s.freeModeMomentum,
        indent: true,
      },
      {
        name: 'freeModeMomentumBounce',
        label: 'Momentum bounce',
        type: 'boolean',
        default: true,
        showWhen: (s) => s.freeModeMomentum,
        indent: true,
      },
      {
        name: 'freeModeMomentumBounceRatio',
        label: 'Momentum bounce ratio',
        type: 'number',
        default: 1,
        min: 0,
        max: 5,
        step: 0.1,
        showWhen: (s) => s.freeModeMomentum && s.freeModeMomentumBounce,
        indent: true,
      },
      {
        name: 'freeModeMinimumVelocity',
        label: 'Minimum velocity',
        type: 'number',
        default: 0.02,
        min: 0,
        max: 1,
        step: 0.01,
      },
      {
        name: 'freeModeSticky',
        label: 'Sticky',
        type: 'boolean',
        default: false,
      },
    ],
  },

  // -----------------------------------------------------------------------
  // Navigation
  // -----------------------------------------------------------------------
  {
    title: 'Navigation',
    moduleToggle: 'navigation',
    params: [
      {
        name: 'navigationHideOnClick',
        label: 'Hide on click',
        type: 'boolean',
        default: false,
      },
    ],
  },

  // -----------------------------------------------------------------------
  // Pagination
  // -----------------------------------------------------------------------
  {
    title: 'Pagination',
    moduleToggle: 'pagination',
    params: [
      {
        name: 'paginationType',
        label: 'Type',
        type: 'select',
        default: 'bullets',
        options: [
          { value: 'bullets', label: 'bullets' },
          { value: 'fraction', label: 'fraction' },
          { value: 'progressbar', label: 'progressbar' },
        ],
      },
      {
        name: 'paginationClickable',
        label: 'Clickable',
        type: 'boolean',
        default: false,
      },
      {
        name: 'paginationDynamicBullets',
        label: 'Dynamic bullets',
        type: 'boolean',
        default: false,
        showWhen: (s) => s.paginationType === 'bullets',
        indent: true,
      },
      {
        name: 'paginationDynamicMainBullets',
        label: 'Dynamic main bullets',
        type: 'number',
        default: 1,
        min: 1,
        max: 5,
        step: 1,
        showWhen: (s) =>
          s.paginationType === 'bullets' && s.paginationDynamicBullets,
        indent: true,
      },
      {
        name: 'paginationHideOnClick',
        label: 'Hide on click',
        type: 'boolean',
        default: false,
      },
      {
        name: 'paginationProgressbarOpposite',
        label: 'Progressbar opposite',
        type: 'boolean',
        default: false,
        showWhen: (s) => s.paginationType === 'progressbar',
        indent: true,
      },
    ],
  },

  // -----------------------------------------------------------------------
  // Scrollbar
  // -----------------------------------------------------------------------
  {
    title: 'Scrollbar',
    moduleToggle: 'scrollbar',
    params: [
      {
        name: 'scrollbarHide',
        label: 'Hide',
        type: 'boolean',
        default: false,
      },
      {
        name: 'scrollbarDraggable',
        label: 'Draggable',
        type: 'boolean',
        default: false,
      },
      {
        name: 'scrollbarSnapOnRelease',
        label: 'Snap on release',
        type: 'boolean',
        default: true,
      },
    ],
  },

  // -----------------------------------------------------------------------
  // Autoplay
  // -----------------------------------------------------------------------
  {
    title: 'Autoplay',
    moduleToggle: 'autoplay',
    params: [
      {
        name: 'autoplayDelay',
        label: 'Delay (ms)',
        type: 'number',
        default: 3000,
        min: 500,
        max: 10000,
        step: 500,
      },
      {
        name: 'autoplayStopOnLastSlide',
        label: 'Stop on last slide',
        type: 'boolean',
        default: false,
      },
      {
        name: 'autoplayDisableOnInteraction',
        label: 'Disable on interaction',
        type: 'boolean',
        default: false,
      },
      {
        name: 'autoplayReverseDirection',
        label: 'Reverse direction',
        type: 'boolean',
        default: false,
      },
      {
        name: 'autoplayWaitForTransition',
        label: 'Wait for transition',
        type: 'boolean',
        default: true,
      },
      {
        name: 'autoplayPauseOnMouseEnter',
        label: 'Pause on mouse enter',
        type: 'boolean',
        default: false,
      },
    ],
  },

  // -----------------------------------------------------------------------
  // Keyboard
  // -----------------------------------------------------------------------
  {
    title: 'Keyboard',
    moduleToggle: 'keyboard',
    params: [
      {
        name: 'keyboardOnlyInViewport',
        label: 'Only in viewport',
        type: 'boolean',
        default: true,
      },
      {
        name: 'keyboardPageUpDown',
        label: 'Page Up / Down',
        type: 'boolean',
        default: true,
      },
    ],
  },

  // -----------------------------------------------------------------------
  // Mousewheel
  // -----------------------------------------------------------------------
  {
    title: 'Mousewheel',
    moduleToggle: 'mousewheel',
    params: [
      {
        name: 'mousewheelForceToAxis',
        label: 'Force to axis',
        type: 'boolean',
        default: false,
      },
      {
        name: 'mousewheelReleaseOnEdges',
        label: 'Release on edges',
        type: 'boolean',
        default: false,
      },
      {
        name: 'mousewheelInvert',
        label: 'Invert',
        type: 'boolean',
        default: false,
      },
      {
        name: 'mousewheelSensitivity',
        label: 'Sensitivity',
        type: 'number',
        default: 1,
        min: 0.1,
        max: 5,
        step: 0.1,
      },
      {
        name: 'mousewheelThresholdDelta',
        label: 'Threshold delta',
        type: 'number',
        default: 0,
        min: 0,
        max: 100,
        step: 5,
      },
      {
        name: 'mousewheelThresholdTime',
        label: 'Threshold time (ms)',
        type: 'number',
        default: 0,
        min: 0,
        max: 1000,
        step: 50,
      },
    ],
  },

  // -----------------------------------------------------------------------
  // Advanced
  // -----------------------------------------------------------------------
  {
    title: 'Advanced',
    defaultOpen: false,
    params: [
      {
        name: 'cssMode',
        label: 'CSS mode',
        type: 'boolean',
        default: false,
      },
      {
        name: 'nested',
        label: 'Nested',
        type: 'boolean',
        default: false,
      },
      {
        name: 'passiveListeners',
        label: 'Passive listeners',
        type: 'boolean',
        default: true,
      },
      {
        name: 'watchSlidesProgress',
        label: 'Watch slides progress',
        type: 'boolean',
        default: false,
      },
      {
        name: 'watchOverflow',
        label: 'Watch overflow',
        type: 'boolean',
        default: true,
      },
      {
        name: 'setWrapperSize',
        label: 'Set wrapper size',
        type: 'boolean',
        default: false,
      },
      {
        name: 'oneWayMovement',
        label: 'One way movement',
        type: 'boolean',
        default: false,
      },
      {
        name: 'maxBackfaceHiddenSlides',
        label: 'Max backface hidden slides',
        type: 'number',
        default: 10,
        min: 0,
        max: 50,
        step: 5,
      },
      {
        name: 'lazyPreloadPrevNext',
        label: 'Lazy preload prev/next',
        type: 'number',
        default: 0,
        min: 0,
        max: 5,
        step: 1,
      },
    ],
  },
];

/** Module toggle defaults (not in params arrays). */
export const MODULE_DEFAULTS = {
  freeMode: false,
  navigation: true,
  pagination: false,
  scrollbar: false,
  autoplay: false,
  keyboard: false,
  mousewheel: false,
};

/** Derive default state from config. */
export function getDefaultState() {
  const state = { ...MODULE_DEFAULTS };
  for (const section of PARAMS_CONFIG) {
    for (const p of section.params) {
      state[p.name] = p.default;
    }
  }
  return state;
}
