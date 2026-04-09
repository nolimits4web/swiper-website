const SWIPER_CDN = `https://cdn.jsdelivr.net/npm/swiper@${process.env.swiperReleaseVersion || '12'}`;

// ---------------------------------------------------------------------------
// Map flat state → nested Swiper options
// ---------------------------------------------------------------------------

export function buildSwiperOptions(s) {
  const o = {};

  // --- Core / Slides ---
  if (s.direction !== 'horizontal') o.direction = s.direction;

  const spv = s.slidesPerView === 'auto' ? 'auto' : Number(s.slidesPerView);
  if (spv !== 1) o.slidesPerView = spv;

  if (s.spaceBetween > 0) o.spaceBetween = s.spaceBetween;
  if (s.slidesPerGroup > 1) o.slidesPerGroup = s.slidesPerGroup;
  if (s.slidesPerGroupSkip > 0) o.slidesPerGroupSkip = s.slidesPerGroupSkip;
  if (s.slidesPerGroupAuto) o.slidesPerGroupAuto = true;
  if (s.slidesOffsetBefore > 0) o.slidesOffsetBefore = s.slidesOffsetBefore;
  if (s.slidesOffsetAfter > 0) o.slidesOffsetAfter = s.slidesOffsetAfter;
  if (s.initialSlide > 0) o.initialSlide = s.initialSlide;
  if (s.speed !== 300) o.speed = s.speed;

  if (s.centeredSlides) {
    o.centeredSlides = true;
    if (s.centeredSlidesBounds) o.centeredSlidesBounds = true;
  }
  if (s.centerInsufficientSlides) o.centerInsufficientSlides = true;
  if (!s.normalizeSlideIndex) o.normalizeSlideIndex = false;
  if (s.snapToSlideEdge) o.snapToSlideEdge = true;
  if (s.autoHeight) o.autoHeight = true;
  if (s.roundLengths) o.roundLengths = true;

  // --- Touch & Interaction ---
  if (s.grabCursor) o.grabCursor = true;
  if (!s.simulateTouch) o.simulateTouch = false;
  if (!s.allowTouchMove) o.allowTouchMove = false;
  if (s.slideToClickedSlide) o.slideToClickedSlide = true;
  if (!s.shortSwipes) o.shortSwipes = false;
  if (!s.longSwipes) o.longSwipes = false;
  if (s.longSwipesRatio !== 0.5) o.longSwipesRatio = s.longSwipesRatio;
  if (s.longSwipesMs !== 300) o.longSwipesMs = s.longSwipesMs;
  if (!s.followFinger) o.followFinger = false;
  if (s.threshold !== 5) o.threshold = s.threshold;
  if (s.touchAngle !== 45) o.touchAngle = s.touchAngle;
  if (s.touchRatio !== 1) o.touchRatio = s.touchRatio;
  if (!s.touchStartPreventDefault) o.touchStartPreventDefault = false;
  if (s.touchStartForcePreventDefault) o.touchStartForcePreventDefault = true;
  if (s.touchMoveStopPropagation) o.touchMoveStopPropagation = true;
  if (s.touchReleaseOnEdges) o.touchReleaseOnEdges = true;
  if (!s.resistance) o.resistance = false;
  if (s.resistanceRatio !== 0.85) o.resistanceRatio = s.resistanceRatio;
  if (s.edgeSwipeDetection) {
    o.edgeSwipeDetection = true;
    if (s.edgeSwipeThreshold !== 20)
      o.edgeSwipeThreshold = s.edgeSwipeThreshold;
  }
  if (!s.noSwiping) o.noSwiping = false;
  if (!s.preventClicks) o.preventClicks = false;
  if (!s.preventClicksPropagation) o.preventClicksPropagation = false;
  if (!s.allowSlidePrev) o.allowSlidePrev = false;
  if (!s.allowSlideNext) o.allowSlideNext = false;
  if (s.preventInteractionOnTransition) o.preventInteractionOnTransition = true;

  // --- Loop ---
  if (s.loopMode === 'loop') {
    o.loop = true;
    if (!s.loopAddBlankSlides) o.loopAddBlankSlides = false;
    if (s.loopAdditionalSlides > 0)
      o.loopAdditionalSlides = s.loopAdditionalSlides;
    if (!s.loopPreventsSliding) o.loopPreventsSliding = false;
  }
  if (s.loopMode === 'rewind') o.rewind = true;

  // --- Advanced ---
  if (s.cssMode) o.cssMode = true;
  if (s.nested) o.nested = true;
  if (!s.passiveListeners) o.passiveListeners = false;
  if (s.watchSlidesProgress) o.watchSlidesProgress = true;
  if (!s.watchOverflow) o.watchOverflow = false;
  if (s.setWrapperSize) o.setWrapperSize = true;
  if (s.oneWayMovement) o.oneWayMovement = true;
  if (s.maxBackfaceHiddenSlides !== 10)
    o.maxBackfaceHiddenSlides = s.maxBackfaceHiddenSlides;
  if (s.lazyPreloadPrevNext > 0) o.lazyPreloadPrevNext = s.lazyPreloadPrevNext;

  // --- Parallax ---
  if (s.parallax) o.parallax = true;

  // --- Effect ---
  if (s.effect !== 'slide') {
    o.effect = s.effect;

    switch (s.effect) {
      case 'fade':
        if (s.fadeEffectCrossFade) o.fadeEffect = { crossFade: true };
        break;

      case 'cube': {
        const c = {};
        if (!s.cubeEffectSlideShadows) c.slideShadows = false;
        if (!s.cubeEffectShadow) c.shadow = false;
        if (s.cubeEffectShadowOffset !== 20)
          c.shadowOffset = s.cubeEffectShadowOffset;
        if (s.cubeEffectShadowScale !== 0.94)
          c.shadowScale = s.cubeEffectShadowScale;
        if (Object.keys(c).length) o.cubeEffect = c;
        break;
      }

      case 'coverflow': {
        const c = {};
        if (s.coverflowEffectRotate !== 50) c.rotate = s.coverflowEffectRotate;
        if (s.coverflowEffectStretch !== 0)
          c.stretch = s.coverflowEffectStretch;
        if (s.coverflowEffectDepth !== 100) c.depth = s.coverflowEffectDepth;
        if (s.coverflowEffectScale !== 1) c.scale = s.coverflowEffectScale;
        if (s.coverflowEffectModifier !== 1)
          c.modifier = s.coverflowEffectModifier;
        if (!s.coverflowEffectSlideShadows) c.slideShadows = false;
        if (Object.keys(c).length) o.coverflowEffect = c;
        break;
      }

      case 'flip': {
        const f = {};
        if (!s.flipEffectSlideShadows) f.slideShadows = false;
        if (!s.flipEffectLimitRotation) f.limitRotation = false;
        if (Object.keys(f).length) o.flipEffect = f;
        break;
      }

      case 'cards': {
        const c = {};
        if (!s.cardsEffectSlideShadows) c.slideShadows = false;
        if (!s.cardsEffectRotate) c.rotate = false;
        if (s.cardsEffectPerSlideRotate !== 2)
          c.perSlideRotate = s.cardsEffectPerSlideRotate;
        if (s.cardsEffectPerSlideOffset !== 8)
          c.perSlideOffset = s.cardsEffectPerSlideOffset;
        if (Object.keys(c).length) o.cardsEffect = c;
        break;
      }
    }
  }

  // --- Grid ---
  if (s.gridRows > 1) {
    o.grid = { rows: s.gridRows };
    if (s.gridFill !== 'column') o.grid.fill = s.gridFill;
  }

  // --- Free Mode ---
  if (s.freeMode) {
    const fm = { enabled: true };
    if (!s.freeModeMomentum) fm.momentum = false;
    if (s.freeModeMomentumRatio !== 1)
      fm.momentumRatio = s.freeModeMomentumRatio;
    if (s.freeModeMomentumVelocityRatio !== 1)
      fm.momentumVelocityRatio = s.freeModeMomentumVelocityRatio;
    if (!s.freeModeMomentumBounce) fm.momentumBounce = false;
    if (s.freeModeMomentumBounceRatio !== 1)
      fm.momentumBounceRatio = s.freeModeMomentumBounceRatio;
    if (s.freeModeMinimumVelocity !== 0.02)
      fm.minimumVelocity = s.freeModeMinimumVelocity;
    if (s.freeModeSticky) fm.sticky = true;
    o.freeMode = fm;
  }

  // --- Navigation ---
  if (s.navigation) {
    const nav = {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    };
    if (s.navigationHideOnClick) nav.hideOnClick = true;
    o.navigation = nav;
  }

  // --- Pagination ---
  if (s.pagination) {
    const p = { el: '.swiper-pagination' };
    if (s.paginationType !== 'bullets') p.type = s.paginationType;
    if (s.paginationClickable) p.clickable = true;
    if (s.paginationDynamicBullets && s.paginationType === 'bullets') {
      p.dynamicBullets = true;
      if (s.paginationDynamicMainBullets !== 1)
        p.dynamicMainBullets = s.paginationDynamicMainBullets;
    }
    if (s.paginationHideOnClick) p.hideOnClick = true;
    if (s.paginationProgressbarOpposite && s.paginationType === 'progressbar')
      p.progressbarOpposite = true;
    o.pagination = p;
  }

  // --- Scrollbar ---
  if (s.scrollbar) {
    const sb = { el: '.swiper-scrollbar' };
    if (s.scrollbarHide) sb.hide = true;
    if (s.scrollbarDraggable) sb.draggable = true;
    if (!s.scrollbarSnapOnRelease) sb.snapOnRelease = false;
    o.scrollbar = sb;
  }

  // --- Autoplay ---
  if (s.autoplay) {
    const ap = {};
    if (s.autoplayDelay !== 3000) ap.delay = s.autoplayDelay;
    if (s.autoplayStopOnLastSlide) ap.stopOnLastSlide = true;
    if (s.autoplayDisableOnInteraction) ap.disableOnInteraction = true;
    if (s.autoplayReverseDirection) ap.reverseDirection = true;
    if (!s.autoplayWaitForTransition) ap.waitForTransition = false;
    if (s.autoplayPauseOnMouseEnter) ap.pauseOnMouseEnter = true;
    o.autoplay = Object.keys(ap).length ? ap : true;
  }

  // --- Keyboard ---
  if (s.keyboard) {
    const kb = {};
    if (!s.keyboardOnlyInViewport) kb.onlyInViewport = false;
    if (!s.keyboardPageUpDown) kb.pageUpDown = false;
    o.keyboard = Object.keys(kb).length ? kb : true;
  }

  // --- Mousewheel ---
  if (s.mousewheel) {
    const mw = {};
    if (s.mousewheelForceToAxis) mw.forceToAxis = true;
    if (s.mousewheelReleaseOnEdges) mw.releaseOnEdges = true;
    if (s.mousewheelInvert) mw.invert = true;
    if (s.mousewheelSensitivity !== 1) mw.sensitivity = s.mousewheelSensitivity;
    if (s.mousewheelThresholdDelta > 0)
      mw.thresholdDelta = s.mousewheelThresholdDelta;
    if (s.mousewheelThresholdTime > 0)
      mw.thresholdTime = s.mousewheelThresholdTime;
    o.mousewheel = Object.keys(mw).length ? mw : true;
  }

  return o;
}

// ---------------------------------------------------------------------------
// Full HTML document
// ---------------------------------------------------------------------------

export function generateSwiperHTML(state) {
  const opts = buildSwiperOptions(state);

  // Slides
  const slideContent = state.slideContent || 'text';
  const parallax = state.parallax;
  const slides = Array.from({ length: state.totalSlides }, (_, i) => {
    const imgIndex = (i % 10) + 1;
    const imgSrc = `/demos/images/abstract-${imgIndex}.jpg`;
    const parallaxTextAttr = parallax ? ' data-swiper-parallax="-100%"' : '';
    const parallaxImageAttr = parallax ? ' data-swiper-parallax="30%"' : '';
    if (slideContent === 'images') {
      return `      <div class="swiper-slide"><img src="${imgSrc}"${parallaxImageAttr} /></div>`;
    }
    if (slideContent === 'text-images') {
      return `      <div class="swiper-slide"><img src="${imgSrc}"${parallaxImageAttr} /><span${parallaxTextAttr}>Slide ${i + 1}</span></div>`;
    }
    if (parallax) {
      return `      <div class="swiper-slide" style="background:#444"><span${parallaxTextAttr}>Slide ${i + 1}</span></div>`;
    }
    return `      <div class="swiper-slide" style="background:#444">Slide ${i + 1}</div>`;
  }).join('\n');

  // Optional DOM elements
  const navHTML = state.navigation
    ? '\n    <div class="swiper-button-next"></div>\n    <div class="swiper-button-prev"></div>'
    : '';
  const pagHTML = state.pagination
    ? '\n    <div class="swiper-pagination"></div>'
    : '';
  const scrollHTML = state.scrollbar
    ? '\n    <div class="swiper-scrollbar"></div>'
    : '';

  // Extra CSS
  const autoSlideCSS =
    state.slidesPerView === 'auto' ? '\n    .swiper-slide{width:70%}' : '';

  const gridCSS =
    state.gridRows > 1
      ? `\n    .swiper-slide{height:calc((100% - ${(state.gridRows - 1) * Math.max(state.spaceBetween, 0)}px) / ${state.gridRows}) !important}`
      : '';

  const autoHeightCSS = state.autoHeight
    ? '\n    .swiper{height:auto}\n    .swiper-slide{height:auto}'
    : '';

  return `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<link rel="stylesheet" href="${SWIPER_CDN}/swiper-bundle.min.css">
<style>
  *{margin:0;padding:0;box-sizing:border-box}
  html,body{width:100%;height:100%;background:#0a0a0a;overflow:hidden}
  .swiper{width:100%;height:100%}
  .swiper-slide{
    display:flex;align-items:center;justify-content:center;
    font-size:48px;font-weight:700;
    color:rgba(255,255,255,.85);
    font-family:-apple-system,BlinkMacSystemFont,system-ui,sans-serif;
    user-select:none;position:relative;overflow:hidden;
  }
  .swiper-slide img{width:100%;height:100%;object-fit:cover;display:block}
  .swiper-slide span{position:absolute;z-index:1}${autoSlideCSS}${gridCSS}${autoHeightCSS}
</style>
</head>
<body>
  <div class="swiper">
    <div class="swiper-wrapper">
${slides}
    </div>${navHTML}${pagHTML}${scrollHTML}
  </div>
  <script src="${SWIPER_CDN}/swiper-bundle.min.js"></script>
  <script>new Swiper('.swiper',${JSON.stringify(opts)});</script>
</body>
</html>`;
}
