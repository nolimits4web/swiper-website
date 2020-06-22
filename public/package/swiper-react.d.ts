import * as React from 'react';

import { SwiperOptions } from './types/swiper-options';
import SwiperClass from './types/swiper-class';

interface Swiper extends SwiperOptions {
  /**
   * Swiper container tag
   *
   * @default 'div'
   */
  tag?: string;

  /**
   * Swiper wrapper tag
   *
   * @default 'div'
   */
  wrapperTag?: string;

  /**
   * Get Swiper instance
   */
  onSwiper?: (swiper: SwiperClass) => void;

  
  /**
   * Fired right after Swiper initialization.
   * @note Note that with swiper.on('init') syntax it will
   * work only in case you set init: false parameter.
   *
   * @example
   * var swiper = new Swiper('.swiper-container', {
   *   init: false,
   *   // other parameters
   * });
   * swiper.on('init', function() {
   *  // do something
   * });
   * // init Swiper
   * swiper.init();
   *
   * @example
   * // Otherwise use it as the parameter:
   * var swiper = new Swiper('.swiper-container', {
   *   // other parameters
   *   on: {
   *     init: function () {
   *       // do something
   *     },
   *   }
   * });
   */
  onInit?: (swiper: Swiper) => any;

  /**
   * Event will be fired right before Swiper destroyed
   */
  onBeforeDestroy?: (swiper: Swiper) => void;

  /**
   * Event will be fired when currently active slide is changed
   */
  onSlideChange?: (swiper: Swiper) => void;

  /**
   * Event will be fired in the beginning of animation to other slide (next or previous).
   */
  onSlideChangeTransitionStart?: (swiper: Swiper) => void;

  /**
   * Event will be fired after animation to other slide (next or previous).
   */
  onSlideChangeTransitionEnd?: (swiper: Swiper) => void;

  /**
   * Same as "slideChangeTransitionStart" but for "forward" direction only
   */
  onSlideNextTransitionStart?: (swiper: Swiper) => void;

  /**
   * Same as "slideChangeTransitionEnd" but for "forward" direction only
   */
  onSlideNextTransitionEnd?: (swiper: Swiper) => void;

  /**
   * Same as "slideChangeTransitionStart" but for "backward" direction only
   */
  onSlidePrevTransitionStart?: (swiper: Swiper) => void;

  /**
   * Same as "slideChangeTransitionEnd" but for "backward" direction only
   */
  onSlidePrevTransitionEnd?: (swiper: Swiper) => void;

  /**
   * Event will be fired in the beginning of transition.
   */
  onTransitionStart?: (swiper: Swiper) => void;

  /**
   * Event will be fired after transition.
   */
  onTransitionEnd?: (swiper: Swiper) => void;

  /**
   * Event will be fired when user touch Swiper. Receives 'touchstart' event as an arguments.
   */
  onTouchStart?: (swiper: Swiper, event: MouseEvent | TouchEvent | PointerEvent) => void;

  /**
   * Event will be fired when user touch and move finger over Swiper. Receives 'touchmove' event as an arguments.
   */
  onTouchMove?: (swiper: Swiper, event: MouseEvent | TouchEvent | PointerEvent) => void;

  /**
   * Event will be fired when user touch and move finger over Swiper in direction opposite to direction parameter. Receives 'touchmove' event as an arguments.
   */
  onTouchMoveOpposite?: (swiper: Swiper, event: MouseEvent | TouchEvent | PointerEvent) => void;

  /**
   * Event will be fired when user touch and move finger over Swiper and move it. Receives 'touchmove' event as an arguments.
   */
  onSliderMove?: (swiper: Swiper, event: MouseEvent | TouchEvent | PointerEvent) => void;

  /**
   * Event will be fired when user release Swiper. Receives 'touchend' event as an arguments.
   */
  onTouchEnd?: (swiper: Swiper, event: MouseEvent | TouchEvent | PointerEvent) => void;

  /**
   * Event will be fired when user click/tap on Swiper. Receives 'touchend' event as an arguments.
   */
  onClick?: (swiper: Swiper, event: MouseEvent | TouchEvent | PointerEvent) => void;

  /**
   * Event will be fired when user click/tap on Swiper. Receives 'touchend' event as an arguments.
   */
  onTap?: (swiper: Swiper, event: MouseEvent | TouchEvent | PointerEvent) => void;

  /**
   * Event will be fired when user double tap on Swiper's container. Receives 'touchend' event as an arguments
   */
  onDoubleTap?: (swiper: Swiper, event: MouseEvent | TouchEvent | PointerEvent) => void;

  /**
   * Event will be fired right after all inner images are loaded. updateOnImagesReady should be also enabled
   */
  onImagesReady?: (swiper: Swiper) => void;

  /**
   * Event will be fired when Swiper progress is changed, as an arguments it receives progress that is always from 0 to 1
   */
  onProgress?: (swiper: Swiper, progress: number) => void;

  /**
   * Event will be fired when Swiper reach its beginning (initial position)
   */
  onReachBeginning?: (swiper: Swiper) => void;

  /**
   * Event will be fired when Swiper reach last slide
   */
  onReachEnd?: (swiper: Swiper) => void;

  /**
   * Event will be fired when Swiper goes to beginning or end position
   */
  onToEdge?: (swiper: Swiper) => void;

  /**
   * Event will be fired when Swiper goes from beginning or end position
   */
  onFromEdge?: (swiper: Swiper) => void;

  /**
   * Event will be fired when swiper's wrapper change its position. Receives current translate value as an arguments
   */
  onSetTranslate?: (swiper: Swiper, translate: number) => void;

  /**
   * Event will be fired everytime when swiper starts animation. Receives current transition duration (in ms) as an arguments
   */
  onSetTransition?: (swiper: Swiper, transition: number) => void;

  /**
   * Event will be fired on window resize right before swiper's onresize manipulation
   */
  onResize?: (swiper: Swiper) => void;

  /**
   * Event will be fired if observer is enabled and it detects DOM mutations
   */
  onObserverUpdate?: (swiper: Swiper) => void;

  /**
   * Event will be fired right before "loop fix"
   */
  onBeforeLoopFix?: (swiper: Swiper) => void;

  /**
   * Event will be fired after "loop fix"
   */
  onLoopFix?: (swiper: Swiper) => void;

  /**
   * Event will be fired on breakpoint change
   */
  onBreakpoint?: (swiper: Swiper, breakpointParams: SwiperOptions) => void;
  
}

interface SwiperSlide {
  /**
   * Slide tag
   *
   * @default 'div'
   */
  tag?: string;

  /**
   * Enables additional wrapper required for zoom mode
   *
   * @default false
   */
  zoom?: boolean;
}

interface Swiper extends React.HTMLAttributes<HTMLElement> {}
interface SwiperSlide extends React.HTMLAttributes<HTMLElement> {}

declare const Swiper: React.FunctionComponent<Swiper>;
declare const SwiperSlide: React.FunctionComponent<SwiperSlide>;

export { Swiper, SwiperSlide };
