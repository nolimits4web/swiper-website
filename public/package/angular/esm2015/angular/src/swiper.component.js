import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChildren, ElementRef, EventEmitter, HostBinding, Input, NgZone, Output, ViewChild, ViewEncapsulation, } from '@angular/core';
import Swiper from 'swiper/core';
import { of, Subject } from 'rxjs';
import { getParams } from './utils/get-params';
import { SwiperSlideDirective } from './swiper-slide.directive';
import { extend, isObject, setProperty, ignoreNgOnChanges } from './utils/utils';
export class SwiperComponent {
    constructor(zone, elementRef, _changeDetectorRef) {
        this.zone = zone;
        this.elementRef = elementRef;
        this._changeDetectorRef = _changeDetectorRef;
        this.init = true;
        this.slideClass = 'swiper-slide';
        this.wrapperClass = 'swiper-wrapper';
        // prettier-ignore
        this.s__beforeBreakpoint = new EventEmitter();
        // prettier-ignore
        this.s__containerClasses = new EventEmitter();
        // prettier-ignore
        this.s__slideClass = new EventEmitter();
        // prettier-ignore
        this.s__swiper = new EventEmitter();
        // prettier-ignore
        this.s_activeIndexChange = new EventEmitter();
        // prettier-ignore
        this.s_afterInit = new EventEmitter();
        // prettier-ignore
        this.s_autoplay = new EventEmitter();
        // prettier-ignore
        this.s_autoplayStart = new EventEmitter();
        // prettier-ignore
        this.s_autoplayStop = new EventEmitter();
        // prettier-ignore
        this.s_beforeDestroy = new EventEmitter();
        // prettier-ignore
        this.s_beforeInit = new EventEmitter();
        // prettier-ignore
        this.s_beforeLoopFix = new EventEmitter();
        // prettier-ignore
        this.s_beforeResize = new EventEmitter();
        // prettier-ignore
        this.s_beforeSlideChangeStart = new EventEmitter();
        // prettier-ignore
        this.s_beforeTransitionStart = new EventEmitter();
        // prettier-ignore
        this.s_breakpoint = new EventEmitter();
        // prettier-ignore
        this.s_changeDirection = new EventEmitter();
        // prettier-ignore
        this.s_click = new EventEmitter();
        // prettier-ignore
        this.s_doubleTap = new EventEmitter();
        // prettier-ignore
        this.s_doubleClick = new EventEmitter();
        // prettier-ignore
        this.s_destroy = new EventEmitter();
        // prettier-ignore
        this.s_fromEdge = new EventEmitter();
        // prettier-ignore
        this.s_hashChange = new EventEmitter();
        // prettier-ignore
        this.s_hashSet = new EventEmitter();
        // prettier-ignore
        this.s_imagesReady = new EventEmitter();
        // prettier-ignore
        this.s_init = new EventEmitter();
        // prettier-ignore
        this.s_keyPress = new EventEmitter();
        // prettier-ignore
        this.s_lazyImageLoad = new EventEmitter();
        // prettier-ignore
        this.s_lazyImageReady = new EventEmitter();
        // prettier-ignore
        this.s_loopFix = new EventEmitter();
        // prettier-ignore
        this.s_momentumBounce = new EventEmitter();
        // prettier-ignore
        this.s_navigationHide = new EventEmitter();
        // prettier-ignore
        this.s_navigationShow = new EventEmitter();
        // prettier-ignore
        this.s_observerUpdate = new EventEmitter();
        // prettier-ignore
        this.s_orientationchange = new EventEmitter();
        // prettier-ignore
        this.s_paginationHide = new EventEmitter();
        // prettier-ignore
        this.s_paginationRender = new EventEmitter();
        // prettier-ignore
        this.s_paginationShow = new EventEmitter();
        // prettier-ignore
        this.s_paginationUpdate = new EventEmitter();
        // prettier-ignore
        this.s_progress = new EventEmitter();
        // prettier-ignore
        this.s_reachBeginning = new EventEmitter();
        // prettier-ignore
        this.s_reachEnd = new EventEmitter();
        // prettier-ignore
        this.s_realIndexChange = new EventEmitter();
        // prettier-ignore
        this.s_resize = new EventEmitter();
        // prettier-ignore
        this.s_scroll = new EventEmitter();
        // prettier-ignore
        this.s_scrollbarDragEnd = new EventEmitter();
        // prettier-ignore
        this.s_scrollbarDragMove = new EventEmitter();
        // prettier-ignore
        this.s_scrollbarDragStart = new EventEmitter();
        // prettier-ignore
        this.s_setTransition = new EventEmitter();
        // prettier-ignore
        this.s_setTranslate = new EventEmitter();
        // prettier-ignore
        this.s_slideChange = new EventEmitter();
        // prettier-ignore
        this.s_slideChangeTransitionEnd = new EventEmitter();
        // prettier-ignore
        this.s_slideChangeTransitionStart = new EventEmitter();
        // prettier-ignore
        this.s_slideNextTransitionEnd = new EventEmitter();
        // prettier-ignore
        this.s_slideNextTransitionStart = new EventEmitter();
        // prettier-ignore
        this.s_slidePrevTransitionEnd = new EventEmitter();
        // prettier-ignore
        this.s_slidePrevTransitionStart = new EventEmitter();
        // prettier-ignore
        this.s_slideResetTransitionStart = new EventEmitter();
        // prettier-ignore
        this.s_slideResetTransitionEnd = new EventEmitter();
        // prettier-ignore
        this.s_sliderMove = new EventEmitter();
        // prettier-ignore
        this.s_sliderFirstMove = new EventEmitter();
        // prettier-ignore
        this.s_slidesLengthChange = new EventEmitter();
        // prettier-ignore
        this.s_slidesGridLengthChange = new EventEmitter();
        // prettier-ignore
        this.s_snapGridLengthChange = new EventEmitter();
        // prettier-ignore
        this.s_snapIndexChange = new EventEmitter();
        // prettier-ignore
        this.s_tap = new EventEmitter();
        // prettier-ignore
        this.s_toEdge = new EventEmitter();
        // prettier-ignore
        this.s_touchEnd = new EventEmitter();
        // prettier-ignore
        this.s_touchMove = new EventEmitter();
        // prettier-ignore
        this.s_touchMoveOpposite = new EventEmitter();
        // prettier-ignore
        this.s_touchStart = new EventEmitter();
        // prettier-ignore
        this.s_transitionEnd = new EventEmitter();
        // prettier-ignore
        this.s_transitionStart = new EventEmitter();
        // prettier-ignore
        this.s_update = new EventEmitter();
        // prettier-ignore
        this.s_zoomChange = new EventEmitter();
        // prettier-ignore
        this.s_swiper = new EventEmitter();
        this.indexChange = new EventEmitter();
        this._activeSlides = new Subject();
        this.containerClasses = 'swiper-container';
        this.style = null;
    }
    set navigation(val) {
        this._navigation = setProperty(val, {
            nextEl: null,
            prevEl: null,
        });
    }
    get navigation() {
        return this._navigation;
    }
    set pagination(val) {
        this._pagination = setProperty(val, {
            el: null,
        });
    }
    get pagination() {
        return this._pagination;
    }
    set scrollbar(val) {
        this._scrollbar = setProperty(val, {
            el: null,
        });
    }
    get scrollbar() {
        return this._scrollbar;
    }
    set virtual(val) {
        this._virtual = setProperty(val);
    }
    get virtual() {
        return this._virtual;
    }
    set index(index) {
        this.setIndex(index);
    }
    set config(val) {
        this.updateSwiper(val);
        const { params } = getParams(val);
        Object.assign(this, params);
    }
    set prevElRef(el) {
        this._setElement(el, this.navigation, 'navigation', 'prevEl');
    }
    set nextElRef(el) {
        this._setElement(el, this.navigation, 'navigation', 'nextEl');
    }
    set scrollbarElRef(el) {
        this._setElement(el, this.scrollbar, 'scrollbar');
    }
    set paginationElRef(el) {
        this._setElement(el, this.pagination, 'pagination');
    }
    set slidesEl(val) {
        this.slides = val.map((slide, index) => {
            slide.slideIndex = index;
            slide.classNames = this.slideClass;
            return slide;
        });
        if (this.loop && !this.loopedSlides) {
            this.calcLoopedSlides();
        }
        if (!this.virtual) {
            this.prependSlides = of(this.slides.slice(this.slides.length - this.loopedSlides));
            this.appendSlides = of(this.slides.slice(0, this.loopedSlides));
        }
    }
    get activeSlides() {
        if (this.virtual) {
            return this._activeSlides;
        }
        return of(this.slides);
    }
    _setElement(el, ref, update, key = 'el') {
        if (!el && !ref) {
            return;
        }
        if (ref) {
            if (ref[key] === el.nativeElement) {
                return;
            }
            ref[key] = el.nativeElement;
        }
        const updateObj = {};
        updateObj[update] = true;
        this.updateInitSwiper(updateObj);
    }
    ngOnInit() {
        const { params } = getParams(this);
        Object.assign(this, params);
    }
    ngAfterViewInit() {
        if (this.init) {
            this.initSwiper();
            this._changeDetectorRef.detectChanges();
        }
    }
    initSwiper() {
        const { params: swiperParams, passedParams } = getParams(this);
        Object.assign(this, swiperParams);
        swiperParams.onAny = (event, ...args) => {
            const emitter = this[`s_${event}`];
            if (emitter) {
                emitter.emit(...args);
            }
        };
        Object.assign(swiperParams.on, {
            slideChange: () => {
                this.indexChange.emit(this.swiperRef.realIndex);
            },
            _containerClasses(swiper, classes) {
                this.containerClasses = classes;
            },
            _swiper: (swiper) => {
                this.swiperRef = swiper;
                this.s_swiper.emit(this.swiperRef);
                swiper.loopCreate = () => { };
                swiper.loopDestroy = () => { };
                if (swiperParams.loop) {
                    swiper.loopedSlides = this.loopedSlides;
                }
                if (swiper.virtual && swiper.params.virtual.enabled) {
                    swiper.virtual.slides = this.slides;
                    swiper.params.virtual.cache = false;
                    swiper.params.virtual.renderExternal = (data) => {
                        this.updateVirtualSlides(data);
                    };
                    swiper.params.virtual.renderExternalUpdate = false;
                }
                this._changeDetectorRef.detectChanges();
            },
            _slideClass: (_, el, classNames) => {
                const slideIndex = parseInt(el.dataset.swiperSlideIndex);
                if (this.virtual) {
                    const virtualSlide = this.slides.find((item) => {
                        return item.virtualIndex && item.virtualIndex === slideIndex;
                    });
                    if (virtualSlide) {
                        virtualSlide.classNames = classNames;
                        return;
                    }
                }
                this.slides[slideIndex].classNames = classNames;
                this._changeDetectorRef.detectChanges();
            },
        });
        new Swiper(this.elementRef.nativeElement, swiperParams);
    }
    updateVirtualSlides(virtualData) {
        // TODO: type virtualData
        if (!this.swiperRef ||
            (this.currentVirtualData &&
                this.currentVirtualData.from === virtualData.from &&
                this.currentVirtualData.to === virtualData.to &&
                this.currentVirtualData.offset === virtualData.offset)) {
            return;
        }
        this.style = this.swiperRef.isHorizontal()
            ? {
                [this.swiperRef.rtlTranslate ? 'right' : 'left']: `${virtualData.offset}px`,
            }
            : {
                top: `${virtualData.offset}px`,
            };
        this.currentVirtualData = virtualData;
        this._activeSlides.next(virtualData.slides);
        this._changeDetectorRef.detectChanges();
        this.swiperRef.updateSlides();
        this.swiperRef.updateProgress();
        this.swiperRef.updateSlidesClasses();
        if (this.swiperRef.lazy && this.swiperRef.params.lazy['enabled']) {
            this.swiperRef.lazy.load();
        }
        this.swiperRef.virtual.update(true);
        return;
    }
    ngOnChanges(changedParams) {
        this.updateSwiper(changedParams);
        this._changeDetectorRef.detectChanges();
    }
    updateInitSwiper(changedParams) {
        if (!(changedParams && this.swiperRef && !this.swiperRef.destroyed)) {
            return;
        }
        const { params: currentParams, pagination, navigation, scrollbar, virtual, thumbs, } = this.swiperRef;
        if (changedParams.pagination) {
            if (this.pagination &&
                typeof this.pagination !== 'boolean' &&
                this.pagination.el &&
                pagination &&
                !pagination.el) {
                this.updateParameter('pagination', this.pagination);
                pagination.init();
                pagination.render();
                pagination.update();
            }
            else {
                pagination.destroy();
                pagination.el = null;
            }
        }
        if (changedParams.scrollbar) {
            if (this.scrollbar &&
                typeof this.scrollbar !== 'boolean' &&
                this.scrollbar.el &&
                scrollbar &&
                !scrollbar.el) {
                this.updateParameter('scrollbar', this.scrollbar);
                scrollbar.init();
                scrollbar.updateSize();
                scrollbar.setTranslate();
            }
            else {
                scrollbar.destroy();
                scrollbar.el = null;
            }
        }
        if (changedParams.navigation) {
            if (this.navigation &&
                typeof this.navigation !== 'boolean' &&
                this.navigation.prevEl &&
                this.navigation.nextEl &&
                navigation &&
                !navigation.prevEl &&
                !navigation.nextEl) {
                this.updateParameter('navigation', this.navigation);
                navigation.init();
                navigation.update();
            }
            else if (navigation.prevEl && navigation.nextEl) {
                navigation.destroy();
                navigation.nextEl = null;
                navigation.prevEl = null;
            }
        }
        if (changedParams.thumbs && this.thumbs && this.thumbs.swiper) {
            this.updateParameter('thumbs', this.thumbs);
            const initialized = thumbs.init();
            if (initialized)
                thumbs.update(true);
        }
        if (changedParams.controller && this.controller && this.controller.control) {
            this.swiperRef.controller.control = this.controller.control;
        }
        this.swiperRef.update();
    }
    updateSwiper(changedParams) {
        var _a, _b;
        if (changedParams.config) {
            return;
        }
        if (!(changedParams && this.swiperRef && !this.swiperRef.destroyed)) {
            return;
        }
        for (const key in changedParams) {
            if (ignoreNgOnChanges.indexOf(key) >= 0) {
                continue;
            }
            const newValue = (_b = (_a = changedParams[key]) === null || _a === void 0 ? void 0 : _a.currentValue) !== null && _b !== void 0 ? _b : changedParams[key];
            this.updateParameter(key, newValue);
        }
        if (changedParams.allowSlideNext) {
            this.swiperRef.allowSlideNext = this.allowSlideNext;
        }
        if (changedParams.allowSlidePrev) {
            this.swiperRef.allowSlidePrev = this.allowSlidePrev;
        }
        if (changedParams.direction) {
            this.swiperRef.changeDirection(this.direction, false);
        }
        if (changedParams.breakpoints) {
            if (this.loop && !this.loopedSlides) {
                this.calcLoopedSlides();
            }
            this.swiperRef.currentBreakpoint = null;
            this.swiperRef.setBreakpoint();
        }
        this.swiperRef.update();
    }
    calcLoopedSlides() {
        if (!this.loop) {
            return;
        }
        let slidesPerViewParams = this.slidesPerView;
        if (this.breakpoints) {
            const breakpoint = Swiper.prototype.getBreakpoint(this.breakpoints);
            const breakpointOnlyParams = breakpoint in this.breakpoints ? this.breakpoints[breakpoint] : undefined;
            if (breakpointOnlyParams && breakpointOnlyParams.slidesPerView) {
                slidesPerViewParams = breakpointOnlyParams.slidesPerView;
            }
        }
        if (slidesPerViewParams === 'auto') {
            this.loopedSlides = this.slides.length;
            return this.slides.length;
        }
        let loopedSlides = this.loopedSlides || slidesPerViewParams;
        loopedSlides += this.loopAdditionalSlides;
        if (loopedSlides > this.slides.length) {
            loopedSlides = this.slides.length;
        }
        this.loopedSlides = loopedSlides;
        return loopedSlides;
    }
    updateParameter(key, value) {
        if (!(this.swiperRef && !this.swiperRef.destroyed)) {
            return;
        }
        const _key = key.replace(/^_/, '');
        if (Object.keys(this.swiperRef.modules).indexOf(_key) >= 0) {
            extend(value, this.swiperRef.modules[_key].params[_key]);
        }
        if (isObject(this.swiperRef.params[_key]) && isObject(value)) {
            extend(this.swiperRef.params[_key], value);
        }
        else {
            this.swiperRef.params[_key] = value;
        }
    }
    setIndex(index, speed, silent) {
        if (!this.swiperRef) {
            this.initialSlide = index;
            return;
        }
        if (index === this.swiperRef.realIndex) {
            return;
        }
        this.zone.runOutsideAngular(() => {
            if (this.loop) {
                this.swiperRef.slideToLoop(index, speed, !silent);
            }
            else {
                this.swiperRef.slideTo(index, speed, !silent);
            }
        });
    }
    ngOnDestroy() {
        this.swiperRef.destroy();
    }
}
SwiperComponent.decorators = [
    { type: Component, args: [{
                selector: 'swiper, [swiper]',
                template: "<ng-content select=\"[slot=container-start]\"></ng-content>\n<ng-container *ngIf=\"navigation\">\n  <div class=\"swiper-button-prev\" #prevElRef></div>\n  <div class=\"swiper-button-next\" #nextElRef></div>\n</ng-container>\n<div *ngIf=\"scrollbar\" class=\"swiper-scrollbar\" #scrollbarElRef></div>\n<div *ngIf=\"pagination\" class=\"swiper-pagination\" #paginationElRef></div>\n<div [ngClass]=\"wrapperClass\">\n  <ng-content select=\"[slot=wrapper-start]\"></ng-content>\n  <ng-template\n    *ngTemplateOutlet=\"\n      slidesTemplate;\n      context: {\n        loopSlides: prependSlides,\n        key: 'prepend'\n      }\n    \"\n  ></ng-template>\n  <ng-template\n    *ngTemplateOutlet=\"\n      slidesTemplate;\n      context: {\n        loopSlides: activeSlides,\n        key: ''\n      }\n    \"\n  ></ng-template>\n  <ng-template\n    *ngTemplateOutlet=\"\n      slidesTemplate;\n      context: {\n        loopSlides: appendSlides,\n        key: 'append'\n      }\n    \"\n  ></ng-template>\n  <ng-content select=\"[slot=wrapper-end]\"></ng-content>\n</div>\n<ng-content select=\"[slot=container-end]\"></ng-content>\n\n<ng-template #slidesTemplate let-loopSlides=\"loopSlides\" let-slideKey=\"key\">\n  <div\n    *ngFor=\"let slide of loopSlides | async\"\n    [ngClass]=\"slide.classNames + ' ' + (slideKey !== '' ? slideDuplicateClass : '')\"\n    [attr.data-swiper-slide-index]=\"slide.virtualIndex ? slide.virtualIndex : slide.slideIndex\"\n    [style]=\"style\"\n  >\n    <ng-template\n      [ngTemplateOutlet]=\"slide.template\"\n      [ngTemplateOutletContext]=\"{\n        $implicit: slide.slideData\n      }\"\n    ></ng-template>\n  </div>\n</ng-template>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                encapsulation: ViewEncapsulation.None,
                styles: [`
      swiper {
        display: block;
      }
    `]
            },] }
];
SwiperComponent.ctorParameters = () => [
    { type: NgZone },
    { type: ElementRef },
    { type: ChangeDetectorRef }
];
SwiperComponent.propDecorators = {
    init: [{ type: Input }],
    direction: [{ type: Input }],
    touchEventsTarget: [{ type: Input }],
    initialSlide: [{ type: Input }],
    speed: [{ type: Input }],
    cssMode: [{ type: Input }],
    updateOnWindowResize: [{ type: Input }],
    nested: [{ type: Input }],
    width: [{ type: Input }],
    height: [{ type: Input }],
    preventInteractionOnTransition: [{ type: Input }],
    userAgent: [{ type: Input }],
    url: [{ type: Input }],
    edgeSwipeDetection: [{ type: Input }],
    edgeSwipeThreshold: [{ type: Input }],
    freeMode: [{ type: Input }],
    freeModeMomentum: [{ type: Input }],
    freeModeMomentumRatio: [{ type: Input }],
    freeModeMomentumBounce: [{ type: Input }],
    freeModeMomentumBounceRatio: [{ type: Input }],
    freeModeMomentumVelocityRatio: [{ type: Input }],
    freeModeSticky: [{ type: Input }],
    freeModeMinimumVelocity: [{ type: Input }],
    autoHeight: [{ type: Input }],
    setWrapperSize: [{ type: Input }],
    virtualTranslate: [{ type: Input }],
    effect: [{ type: Input }],
    breakpoints: [{ type: Input }],
    spaceBetween: [{ type: Input }],
    slidesPerView: [{ type: Input }],
    slidesPerColumn: [{ type: Input }],
    slidesPerColumnFill: [{ type: Input }],
    slidesPerGroup: [{ type: Input }],
    slidesPerGroupSkip: [{ type: Input }],
    centeredSlides: [{ type: Input }],
    centeredSlidesBounds: [{ type: Input }],
    slidesOffsetBefore: [{ type: Input }],
    slidesOffsetAfter: [{ type: Input }],
    normalizeSlideIndex: [{ type: Input }],
    centerInsufficientSlides: [{ type: Input }],
    watchOverflow: [{ type: Input }],
    roundLengths: [{ type: Input }],
    touchRatio: [{ type: Input }],
    touchAngle: [{ type: Input }],
    simulateTouch: [{ type: Input }],
    shortSwipes: [{ type: Input }],
    longSwipes: [{ type: Input }],
    longSwipesRatio: [{ type: Input }],
    longSwipesMs: [{ type: Input }],
    followFinger: [{ type: Input }],
    allowTouchMove: [{ type: Input }],
    threshold: [{ type: Input }],
    touchMoveStopPropagation: [{ type: Input }],
    touchStartPreventDefault: [{ type: Input }],
    touchStartForcePreventDefault: [{ type: Input }],
    touchReleaseOnEdges: [{ type: Input }],
    uniqueNavElements: [{ type: Input }],
    resistance: [{ type: Input }],
    resistanceRatio: [{ type: Input }],
    watchSlidesProgress: [{ type: Input }],
    watchSlidesVisibility: [{ type: Input }],
    grabCursor: [{ type: Input }],
    preventClicks: [{ type: Input }],
    preventClicksPropagation: [{ type: Input }],
    slideToClickedSlide: [{ type: Input }],
    preloadImages: [{ type: Input }],
    updateOnImagesReady: [{ type: Input }],
    loop: [{ type: Input }],
    loopAdditionalSlides: [{ type: Input }],
    loopedSlides: [{ type: Input }],
    loopFillGroupWithBlank: [{ type: Input }],
    loopPreventsSlide: [{ type: Input }],
    allowSlidePrev: [{ type: Input }],
    allowSlideNext: [{ type: Input }],
    swipeHandler: [{ type: Input }],
    noSwiping: [{ type: Input }],
    noSwipingClass: [{ type: Input }],
    noSwipingSelector: [{ type: Input }],
    passiveListeners: [{ type: Input }],
    containerModifierClass: [{ type: Input }],
    slideClass: [{ type: Input }],
    slideBlankClass: [{ type: Input }],
    slideActiveClass: [{ type: Input }],
    slideDuplicateActiveClass: [{ type: Input }],
    slideVisibleClass: [{ type: Input }],
    slideDuplicateClass: [{ type: Input }],
    slideNextClass: [{ type: Input }],
    slideDuplicateNextClass: [{ type: Input }],
    slidePrevClass: [{ type: Input }],
    slideDuplicatePrevClass: [{ type: Input }],
    wrapperClass: [{ type: Input }],
    runCallbacksOnInit: [{ type: Input }],
    a11y: [{ type: Input }],
    autoplay: [{ type: Input }],
    controller: [{ type: Input }],
    coverflowEffect: [{ type: Input }],
    cubeEffect: [{ type: Input }],
    fadeEffect: [{ type: Input }],
    flipEffect: [{ type: Input }],
    hashNavigation: [{ type: Input }],
    history: [{ type: Input }],
    keyboard: [{ type: Input }],
    lazy: [{ type: Input }],
    mousewheel: [{ type: Input }],
    parallax: [{ type: Input }],
    thumbs: [{ type: Input }],
    zoom: [{ type: Input }],
    navigation: [{ type: Input }],
    pagination: [{ type: Input }],
    scrollbar: [{ type: Input }],
    virtual: [{ type: Input }],
    index: [{ type: Input }],
    config: [{ type: Input }],
    s__beforeBreakpoint: [{ type: Output, args: ['_beforeBreakpoint',] }],
    s__containerClasses: [{ type: Output, args: ['_containerClasses',] }],
    s__slideClass: [{ type: Output, args: ['_slideClass',] }],
    s__swiper: [{ type: Output, args: ['_swiper',] }],
    s_activeIndexChange: [{ type: Output, args: ['activeIndexChange',] }],
    s_afterInit: [{ type: Output, args: ['afterInit',] }],
    s_autoplay: [{ type: Output, args: ['autoplay',] }],
    s_autoplayStart: [{ type: Output, args: ['autoplayStart',] }],
    s_autoplayStop: [{ type: Output, args: ['autoplayStop',] }],
    s_beforeDestroy: [{ type: Output, args: ['beforeDestroy',] }],
    s_beforeInit: [{ type: Output, args: ['beforeInit',] }],
    s_beforeLoopFix: [{ type: Output, args: ['beforeLoopFix',] }],
    s_beforeResize: [{ type: Output, args: ['beforeResize',] }],
    s_beforeSlideChangeStart: [{ type: Output, args: ['beforeSlideChangeStart',] }],
    s_beforeTransitionStart: [{ type: Output, args: ['beforeTransitionStart',] }],
    s_breakpoint: [{ type: Output, args: ['breakpoint',] }],
    s_changeDirection: [{ type: Output, args: ['changeDirection',] }],
    s_click: [{ type: Output, args: ['click',] }],
    s_doubleTap: [{ type: Output, args: ['doubleTap',] }],
    s_doubleClick: [{ type: Output, args: ['doubleClick',] }],
    s_destroy: [{ type: Output, args: ['destroy',] }],
    s_fromEdge: [{ type: Output, args: ['fromEdge',] }],
    s_hashChange: [{ type: Output, args: ['hashChange',] }],
    s_hashSet: [{ type: Output, args: ['hashSet',] }],
    s_imagesReady: [{ type: Output, args: ['imagesReady',] }],
    s_init: [{ type: Output, args: ['init',] }],
    s_keyPress: [{ type: Output, args: ['keyPress',] }],
    s_lazyImageLoad: [{ type: Output, args: ['lazyImageLoad',] }],
    s_lazyImageReady: [{ type: Output, args: ['lazyImageReady',] }],
    s_loopFix: [{ type: Output, args: ['loopFix',] }],
    s_momentumBounce: [{ type: Output, args: ['momentumBounce',] }],
    s_navigationHide: [{ type: Output, args: ['navigationHide',] }],
    s_navigationShow: [{ type: Output, args: ['navigationShow',] }],
    s_observerUpdate: [{ type: Output, args: ['observerUpdate',] }],
    s_orientationchange: [{ type: Output, args: ['orientationchange',] }],
    s_paginationHide: [{ type: Output, args: ['paginationHide',] }],
    s_paginationRender: [{ type: Output, args: ['paginationRender',] }],
    s_paginationShow: [{ type: Output, args: ['paginationShow',] }],
    s_paginationUpdate: [{ type: Output, args: ['paginationUpdate',] }],
    s_progress: [{ type: Output, args: ['progress',] }],
    s_reachBeginning: [{ type: Output, args: ['reachBeginning',] }],
    s_reachEnd: [{ type: Output, args: ['reachEnd',] }],
    s_realIndexChange: [{ type: Output, args: ['realIndexChange',] }],
    s_resize: [{ type: Output, args: ['resize',] }],
    s_scroll: [{ type: Output, args: ['scroll',] }],
    s_scrollbarDragEnd: [{ type: Output, args: ['scrollbarDragEnd',] }],
    s_scrollbarDragMove: [{ type: Output, args: ['scrollbarDragMove',] }],
    s_scrollbarDragStart: [{ type: Output, args: ['scrollbarDragStart',] }],
    s_setTransition: [{ type: Output, args: ['setTransition',] }],
    s_setTranslate: [{ type: Output, args: ['setTranslate',] }],
    s_slideChange: [{ type: Output, args: ['slideChange',] }],
    s_slideChangeTransitionEnd: [{ type: Output, args: ['slideChangeTransitionEnd',] }],
    s_slideChangeTransitionStart: [{ type: Output, args: ['slideChangeTransitionStart',] }],
    s_slideNextTransitionEnd: [{ type: Output, args: ['slideNextTransitionEnd',] }],
    s_slideNextTransitionStart: [{ type: Output, args: ['slideNextTransitionStart',] }],
    s_slidePrevTransitionEnd: [{ type: Output, args: ['slidePrevTransitionEnd',] }],
    s_slidePrevTransitionStart: [{ type: Output, args: ['slidePrevTransitionStart',] }],
    s_slideResetTransitionStart: [{ type: Output, args: ['slideResetTransitionStart',] }],
    s_slideResetTransitionEnd: [{ type: Output, args: ['slideResetTransitionEnd',] }],
    s_sliderMove: [{ type: Output, args: ['sliderMove',] }],
    s_sliderFirstMove: [{ type: Output, args: ['sliderFirstMove',] }],
    s_slidesLengthChange: [{ type: Output, args: ['slidesLengthChange',] }],
    s_slidesGridLengthChange: [{ type: Output, args: ['slidesGridLengthChange',] }],
    s_snapGridLengthChange: [{ type: Output, args: ['snapGridLengthChange',] }],
    s_snapIndexChange: [{ type: Output, args: ['snapIndexChange',] }],
    s_tap: [{ type: Output, args: ['tap',] }],
    s_toEdge: [{ type: Output, args: ['toEdge',] }],
    s_touchEnd: [{ type: Output, args: ['touchEnd',] }],
    s_touchMove: [{ type: Output, args: ['touchMove',] }],
    s_touchMoveOpposite: [{ type: Output, args: ['touchMoveOpposite',] }],
    s_touchStart: [{ type: Output, args: ['touchStart',] }],
    s_transitionEnd: [{ type: Output, args: ['transitionEnd',] }],
    s_transitionStart: [{ type: Output, args: ['transitionStart',] }],
    s_update: [{ type: Output, args: ['update',] }],
    s_zoomChange: [{ type: Output, args: ['zoomChange',] }],
    s_swiper: [{ type: Output, args: ['swiper',] }],
    indexChange: [{ type: Output }],
    prevElRef: [{ type: ViewChild, args: ['prevElRef', { static: false },] }],
    nextElRef: [{ type: ViewChild, args: ['nextElRef', { static: false },] }],
    scrollbarElRef: [{ type: ViewChild, args: ['scrollbarElRef', { static: false },] }],
    paginationElRef: [{ type: ViewChild, args: ['paginationElRef', { static: false },] }],
    slidesEl: [{ type: ContentChildren, args: [SwiperSlideDirective, { descendants: true },] }],
    containerClasses: [{ type: HostBinding, args: ['class',] }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3dpcGVyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIuLi8uLi8uLi9zcmMvIiwic291cmNlcyI6WyJhbmd1bGFyL3NyYy9zd2lwZXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFDTCx1QkFBdUIsRUFDdkIsaUJBQWlCLEVBQ2pCLFNBQVMsRUFDVCxlQUFlLEVBQ2YsVUFBVSxFQUNWLFlBQVksRUFDWixXQUFXLEVBQ1gsS0FBSyxFQUNMLE1BQU0sRUFFTixNQUFNLEVBR04sU0FBUyxFQUNULGlCQUFpQixHQUNsQixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLE1BQU0sTUFBTSxhQUFhLENBQUM7QUFDakMsT0FBTyxFQUFjLEVBQUUsRUFBRSxPQUFPLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDL0MsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQ2hFLE9BQU8sRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLFdBQVcsRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQXNCakYsTUFBTSxPQUFPLGVBQWU7SUEyVzFCLFlBQ1UsSUFBWSxFQUNaLFVBQXNCLEVBQ3RCLGtCQUFxQztRQUZyQyxTQUFJLEdBQUosSUFBSSxDQUFRO1FBQ1osZUFBVSxHQUFWLFVBQVUsQ0FBWTtRQUN0Qix1QkFBa0IsR0FBbEIsa0JBQWtCLENBQW1CO1FBN1d0QyxTQUFJLEdBQTBCLElBQUksQ0FBQztRQWdGbkMsZUFBVSxHQUFnQyxjQUFjLENBQUM7UUFVekQsaUJBQVksR0FBa0MsZ0JBQWdCLENBQUM7UUFzRXhFLGtCQUFrQjtRQUNXLHdCQUFtQixHQUFvRCxJQUFJLFlBQVksRUFBTyxDQUFDO1FBQzVILGtCQUFrQjtRQUNXLHdCQUFtQixHQUFvRCxJQUFJLFlBQVksRUFBTyxDQUFDO1FBQzVILGtCQUFrQjtRQUNLLGtCQUFh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QUl4QyxTQUFTLFNBQUMsV0FBVyxFQUFFLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRTs2QkFJeEMsU0FBUyxTQUFDLGdCQUFnQixFQUFFLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRTs4QkFJN0MsU0FBUyxTQUFDLGlCQUFpQixFQUFFLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRTt1QkFJOUMsZUFBZSxTQUFDLG9CQUFvQixFQUFFLEVBQUUsV0FBVyxFQUFFLElBQUksRUFBRTsrQkE4QjNELFdBQVcsU0FBQyxPQUFPIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIENoYW5nZURldGVjdG9yUmVmLFxuICBDb21wb25lbnQsXG4gIENvbnRlbnRDaGlsZHJlbixcbiAgRWxlbWVudFJlZixcbiAgRXZlbnRFbWl0dGVyLFxuICBIb3N0QmluZGluZyxcbiAgSW5wdXQsXG4gIE5nWm9uZSxcbiAgT25Jbml0LFxuICBPdXRwdXQsXG4gIFF1ZXJ5TGlzdCxcbiAgU2ltcGxlQ2hhbmdlcyxcbiAgVmlld0NoaWxkLFxuICBWaWV3RW5jYXBzdWxhdGlvbixcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgU3dpcGVyIGZyb20gJ3N3aXBlci9jb3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUsIG9mLCBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBnZXRQYXJhbXMgfSBmcm9tICcuL3V0aWxzL2dldC1wYXJhbXMnO1xuaW1wb3J0IHsgU3dpcGVyU2xpZGVEaXJlY3RpdmUgfSBmcm9tICcuL3N3aXBlci1zbGlkZS5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgZXh0ZW5kLCBpc09iamVjdCwgc2V0UHJvcGVydHksIGlnbm9yZU5nT25DaGFuZ2VzIH0gZnJvbSAnLi91dGlscy91dGlscyc7XG5pbXBvcnQge1xuICBTd2lwZXJPcHRpb25zLFxuICBTd2lwZXJFdmVudHMsXG4gIE5hdmlnYXRpb25PcHRpb25zLFxuICBQYWdpbmF0aW9uT3B0aW9ucyxcbiAgU2Nyb2xsYmFyT3B0aW9ucyxcbiAgVmlydHVhbE9wdGlvbnMsXG59IGZyb20gJ3N3aXBlci90eXBlcyc7XG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdzd2lwZXIsIFtzd2lwZXJdJyxcbiAgdGVtcGxhdGVVcmw6ICcuL3N3aXBlci5jb21wb25lbnQuaHRtbCcsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICBzdHlsZXM6IFtcbiAgICBgXG4gICAgICBzd2lwZXIge1xuICAgICAgICBkaXNwbGF5OiBibG9jaztcbiAgICAgIH1cbiAgICBgLFxuICBdLFxufSlcbmV4cG9ydCBjbGFzcyBTd2lwZXJDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICBASW5wdXQoKSBpbml0OiBTd2lwZXJPcHRpb25zWydpbml0J10gPSB0cnVlO1xuICBASW5wdXQoKSBkaXJlY3Rpb246IFN3aXBlck9wdGlvbnNbJ2RpcmVjdGlvbiddO1xuICBASW5wdXQoKSB0b3VjaEV2ZW50c1RhcmdldDogU3dpcGVyT3B0aW9uc1sndG91Y2hFdmVudHNUYXJnZXQnXTtcbiAgQElucHV0KCkgaW5pdGlhbFNsaWRlOiBTd2lwZXJPcHRpb25zWydpbml0aWFsU2xpZGUnXTtcbiAgQElucHV0KCkgc3BlZWQ6IFN3aXBlck9wdGlvbnNbJ3NwZWVkJ107XG4gIEBJbnB1dCgpIGNzc01vZGU6IFN3aXBlck9wdGlvbnNbJ2Nzc01vZGUnXTtcbiAgQElucHV0KCkgdXBkYXRlT25XaW5kb3dSZXNpemU6IFN3aXBlck9wdGlvbnNbJ3VwZGF0ZU9uV2luZG93UmVzaXplJ107XG4gIEBJbnB1dCgpIG5lc3RlZDogU3dpcGVyT3B0aW9uc1snbmVzdGVkJ107XG4gIEBJbnB1dCgpIHdpZHRoOiBTd2lwZXJPcHRpb25zWyd3aWR0aCddO1xuICBASW5wdXQoKSBoZWlnaHQ6IFN3aXBlck9wdGlvbnNbJ2hlaWdodCddO1xuICBASW5wdXQoKSBwcmV2ZW50SW50ZXJhY3Rpb25PblRyYW5zaXRpb246IFN3aXBlck9wdGlvbnNbJ3ByZXZlbnRJbnRlcmFjdGlvbk9uVHJhbnNpdGlvbiddO1xuICBASW5wdXQoKSB1c2VyQWdlbnQ6IFN3aXBlck9wdGlvbnNbJ3VzZXJBZ2VudCddO1xuICBASW5wdXQoKSB1cmw6IFN3aXBlck9wdGlvbnNbJ3VybCddO1xuICBASW5wdXQoKSBlZGdlU3dpcGVEZXRlY3Rpb246IGJvb2xlYW47XG4gIEBJbnB1dCgpIGVkZ2VTd2lwZVRocmVzaG9sZDogbnVtYmVyO1xuICBASW5wdXQoKSBmcmVlTW9kZTogU3dpcGVyT3B0aW9uc1snZnJlZU1vZGUnXTtcbiAgQElucHV0KCkgZnJlZU1vZGVNb21lbnR1bTogU3dpcGVyT3B0aW9uc1snZnJlZU1vZGVNb21lbnR1bSddO1xuICBASW5wdXQoKSBmcmVlTW9kZU1vbWVudHVtUmF0aW86IFN3aXBlck9wdGlvbnNbJ2ZyZWVNb2RlTW9tZW50dW1SYXRpbyddO1xuICBASW5wdXQoKSBmcmVlTW9kZU1vbWVudHVtQm91bmNlOiBTd2lwZXJPcHRpb25zWydmcmVlTW9kZU1vbWVudHVtQm91bmNlJ107XG4gIEBJbnB1dCgpIGZyZWVNb2RlTW9tZW50dW1Cb3VuY2VSYXRpbzogU3dpcGVyT3B0aW9uc1snZnJlZU1vZGVNb21lbnR1bUJvdW5jZVJhdGlvJ107XG4gIEBJbnB1dCgpIGZyZWVNb2RlTW9tZW50dW1WZWxvY2l0eVJhdGlvOiBTd2lwZXJPcHRpb25zWydmcmVlTW9kZU1vbWVudHVtVmVsb2NpdHlSYXRpbyddO1xuICBASW5wdXQoKSBmcmVlTW9kZVN0aWNreTogU3dpcGVyT3B0aW9uc1snZnJlZU1vZGVTdGlja3knXTtcbiAgQElucHV0KCkgZnJlZU1vZGVNaW5pbXVtVmVsb2NpdHk6IFN3aXBlck9wdGlvbnNbJ2ZyZWVNb2RlTWluaW11bVZlbG9jaXR5J107XG4gIEBJbnB1dCgpIGF1dG9IZWlnaHQ6IFN3aXBlck9wdGlvbnNbJ2F1dG9IZWlnaHQnXTtcbiAgQElucHV0KCkgc2V0V3JhcHBlclNpemU6IFN3aXBlck9wdGlvbnNbJ3NldFdyYXBwZXJTaXplJ107XG4gIEBJbnB1dCgpIHZpcnR1YWxUcmFuc2xhdGU6IFN3aXBlck9wdGlvbnNbJ3ZpcnR1YWxUcmFuc2xhdGUnXTtcbiAgQElucHV0KCkgZWZmZWN0OiBTd2lwZXJPcHRpb25zWydlZmZlY3QnXTtcbiAgQElucHV0KCkgYnJlYWtwb2ludHM6IFN3aXBlck9wdGlvbnNbJ2JyZWFrcG9pbnRzJ107XG4gIEBJbnB1dCgpIHNwYWNlQmV0d2VlbjogU3dpcGVyT3B0aW9uc1snc3BhY2VCZXR3ZWVuJ107XG4gIEBJbnB1dCgpIHNsaWRlc1BlclZpZXc6IFN3aXBlck9wdGlvbnNbJ3NsaWRlc1BlclZpZXcnXTtcbiAgQElucHV0KCkgc2xpZGVzUGVyQ29sdW1uOiBTd2lwZXJPcHRpb25zWydzbGlkZXNQZXJDb2x1bW4nXTtcbiAgQElucHV0KCkgc2xpZGVzUGVyQ29sdW1uRmlsbDogU3dpcGVyT3B0aW9uc1snc2xpZGVzUGVyQ29sdW1uRmlsbCddO1xuICBASW5wdXQoKSBzbGlkZXNQZXJHcm91cDogU3dpcGVyT3B0aW9uc1snc2xpZGVzUGVyR3JvdXAnXTtcbiAgQElucHV0KCkgc2xpZGVzUGVyR3JvdXBTa2lwOiBTd2lwZXJPcHRpb25zWydzbGlkZXNQZXJHcm91cFNraXAnXTtcbiAgQElucHV0KCkgY2VudGVyZWRTbGlkZXM6IFN3aXBlck9wdGlvbnNbJ2NlbnRlcmVkU2xpZGVzJ107XG4gIEBJbnB1dCgpIGNlbnRlcmVkU2xpZGVzQm91bmRzOiBTd2lwZXJPcHRpb25zWydjZW50ZXJlZFNsaWRlc0JvdW5kcyddO1xuICBASW5wdXQoKSBzbGlkZXNPZmZzZXRCZWZvcmU6IFN3aXBlck9wdGlvbnNbJ3NsaWRlc09mZnNldEJlZm9yZSddO1xuICBASW5wdXQoKSBzbGlkZXNPZmZzZXRBZnRlcjogU3dpcGVyT3B0aW9uc1snc2xpZGVzT2Zmc2V0QWZ0ZXInXTtcbiAgQElucHV0KCkgbm9ybWFsaXplU2xpZGVJbmRleDogU3dpcGVyT3B0aW9uc1snbm9ybWFsaXplU2xpZGVJbmRleCddO1xuICBASW5wdXQoKSBjZW50ZXJJbnN1ZmZpY2llbnRTbGlkZXM6IFN3aXBlck9wdGlvbnNbJ2NlbnRlckluc3VmZmljaWVudFNsaWRlcyddO1xuICBASW5wdXQoKSB3YXRjaE92ZXJmbG93OiBTd2lwZXJPcHRpb25zWyd3YXRjaE92ZXJmbG93J107XG4gIEBJbnB1dCgpIHJvdW5kTGVuZ3RoczogU3dpcGVyT3B0aW9uc1sncm91bmRMZW5ndGhzJ107XG4gIEBJbnB1dCgpIHRvdWNoUmF0aW86IFN3aXBlck9wdGlvbnNbJ3RvdWNoUmF0aW8nXTtcbiAgQElucHV0KCkgdG91Y2hBbmdsZTogU3dpcGVyT3B0aW9uc1sndG91Y2hBbmdsZSddO1xuICBASW5wdXQoKSBzaW11bGF0ZVRvdWNoOiBTd2lwZXJPcHRpb25zWydzaW11bGF0ZVRvdWNoJ107XG4gIEBJbnB1dCgpIHNob3J0U3dpcGVzOiBTd2lwZXJPcHRpb25zWydzaG9ydFN3aXBlcyddO1xuICBASW5wdXQoKSBsb25nU3dpcGVzOiBTd2lwZXJPcHRpb25zWydsb25nU3dpcGVzJ107XG4gIEBJbnB1dCgpIGxvbmdTd2lwZXNSYXRpbzogU3dpcGVyT3B0aW9uc1snbG9uZ1N3aXBlc1JhdGlvJ107XG4gIEBJbnB1dCgpIGxvbmdTd2lwZXNNczogU3dpcGVyT3B0aW9uc1snbG9uZ1N3aXBlc01zJ107XG4gIEBJbnB1dCgpIGZvbGxvd0ZpbmdlcjogU3dpcGVyT3B0aW9uc1snZm9sbG93RmluZ2VyJ107XG4gIEBJbnB1dCgpIGFsbG93VG91Y2hNb3ZlOiBTd2lwZXJPcHRpb25zWydhbGxvd1RvdWNoTW92ZSddO1xuICBASW5wdXQoKSB0aHJlc2hvbGQ6IFN3aXBlck9wdGlvbnNbJ3RocmVzaG9sZCddO1xuICBASW5wdXQoKSB0b3VjaE1vdmVTdG9wUHJvcGFnYXRpb246IFN3aXBlck9wdGlvbnNbJ3RvdWNoTW92ZVN0b3BQcm9wYWdhdGlvbiddO1xuICBASW5wdXQoKSB0b3VjaFN0YXJ0UHJldmVudERlZmF1bHQ6IFN3aXBlck9wdGlvbnNbJ3RvdWNoU3RhcnRQcmV2ZW50RGVmYXVsdCddO1xuICBASW5wdXQoKSB0b3VjaFN0YXJ0Rm9yY2VQcmV2ZW50RGVmYXVsdDogU3dpcGVyT3B0aW9uc1sndG91Y2hTdGFydEZvcmNlUHJldmVudERlZmF1bHQnXTtcbiAgQElucHV0KCkgdG91Y2hSZWxlYXNlT25FZGdlczogU3dpcGVyT3B0aW9uc1sndG91Y2hSZWxlYXNlT25FZGdlcyddO1xuICBASW5wdXQoKSB1bmlxdWVOYXZFbGVtZW50czogU3dpcGVyT3B0aW9uc1sndW5pcXVlTmF2RWxlbWVudHMnXTtcbiAgQElucHV0KCkgcmVzaXN0YW5jZTogU3dpcGVyT3B0aW9uc1sncmVzaXN0YW5jZSddO1xuICBASW5wdXQoKSByZXNpc3RhbmNlUmF0aW86IFN3aXBlck9wdGlvbnNbJ3Jlc2lzdGFuY2VSYXRpbyddO1xuICBASW5wdXQoKSB3YXRjaFNsaWRlc1Byb2dyZXNzOiBTd2lwZXJPcHRpb25zWyd3YXRjaFNsaWRlc1Byb2dyZXNzJ107XG4gIEBJbnB1dCgpIHdhdGNoU2xpZGVzVmlzaWJpbGl0eTogU3dpcGVyT3B0aW9uc1snd2F0Y2hTbGlkZXNWaXNpYmlsaXR5J107XG4gIEBJbnB1dCgpIGdyYWJDdXJzb3I6IFN3aXBlck9wdGlvbnNbJ2dyYWJDdXJzb3InXTtcbiAgQElucHV0KCkgcHJldmVudENsaWNrczogU3dpcGVyT3B0aW9uc1sncHJldmVudENsaWNrcyddO1xuICBASW5wdXQoKSBwcmV2ZW50Q2xpY2tzUHJvcGFnYXRpb246IFN3aXBlck9wdGlvbnNbJ3ByZXZlbnRDbGlja3NQcm9wYWdhdGlvbiddO1xuICBASW5wdXQoKSBzbGlkZVRvQ2xpY2tlZFNsaWRlOiBTd2lwZXJPcHRpb25zWydzbGlkZVRvQ2xpY2tlZFNsaWRlJ107XG4gIEBJbnB1dCgpIHByZWxvYWRJbWFnZXM6IFN3aXBlck9wdGlvbnNbJ3ByZWxvYWRJbWFnZXMnXTtcbiAgQElucHV0KCkgdXBkYXRlT25JbWFnZXNSZWFkeTogU3dpcGVyT3B0aW9uc1sndXBkYXRlT25JbWFnZXNSZWFkeSddO1xuICBASW5wdXQoKSBsb29wOiBTd2lwZXJPcHRpb25zWydsb29wJ107XG4gIEBJbnB1dCgpIGxvb3BBZGRpdGlvbmFsU2xpZGVzOiBTd2lwZXJPcHRpb25zWydsb29wQWRkaXRpb25hbFNsaWRlcyddO1xuICBASW5wdXQoKSBsb29wZWRTbGlkZXM6IFN3aXBlck9wdGlvbnNbJ2xvb3BlZFNsaWRlcyddO1xuICBASW5wdXQoKSBsb29wRmlsbEdyb3VwV2l0aEJsYW5rOiBTd2lwZXJPcHRpb25zWydsb29wRmlsbEdyb3VwV2l0aEJsYW5rJ107XG4gIEBJbnB1dCgpIGxvb3BQcmV2ZW50c1NsaWRlOiBTd2lwZXJPcHRpb25zWydsb29wUHJldmVudHNTbGlkZSddO1xuICBASW5wdXQoKSBhbGxvd1NsaWRlUHJldjogU3dpcGVyT3B0aW9uc1snYWxsb3dTbGlkZVByZXYnXTtcbiAgQElucHV0KCkgYWxsb3dTbGlkZU5leHQ6IFN3aXBlck9wdGlvbnNbJ2FsbG93U2xpZGVOZXh0J107XG4gIEBJbnB1dCgpIHN3aXBlSGFuZGxlcjogU3dpcGVyT3B0aW9uc1snc3dpcGVIYW5kbGVyJ107XG4gIEBJbnB1dCgpIG5vU3dpcGluZzogU3dpcGVyT3B0aW9uc1snbm9Td2lwaW5nJ107XG4gIEBJbnB1dCgpIG5vU3dpcGluZ0NsYXNzOiBTd2lwZXJPcHRpb25zWydub1N3aXBpbmdDbGFzcyddO1xuICBASW5wdXQoKSBub1N3aXBpbmdTZWxlY3RvcjogU3dpcGVyT3B0aW9uc1snbm9Td2lwaW5nU2VsZWN0b3InXTtcbiAgQElucHV0KCkgcGFzc2l2ZUxpc3RlbmVyczogU3dpcGVyT3B0aW9uc1sncGFzc2l2ZUxpc3RlbmVycyddO1xuICBASW5wdXQoKSBjb250YWluZXJNb2RpZmllckNsYXNzOiBTd2lwZXJPcHRpb25zWydjb250YWluZXJNb2RpZmllckNsYXNzJ107XG4gIEBJbnB1dCgpIHNsaWRlQ2xhc3M6IFN3aXBlck9wdGlvbnNbJ3NsaWRlQ2xhc3MnXSA9ICdzd2lwZXItc2xpZGUnO1xuICBASW5wdXQoKSBzbGlkZUJsYW5rQ2xhc3M6IFN3aXBlck9wdGlvbnNbJ3NsaWRlQmxhbmtDbGFzcyddO1xuICBASW5wdXQoKSBzbGlkZUFjdGl2ZUNsYXNzOiBTd2lwZXJPcHRpb25zWydzbGlkZUFjdGl2ZUNsYXNzJ107XG4gIEBJbnB1dCgpIHNsaWRlRHVwbGljYXRlQWN0aXZlQ2xhc3M6IFN3aXBlck9wdGlvbnNbJ3NsaWRlRHVwbGljYXRlQWN0aXZlQ2xhc3MnXTtcbiAgQElucHV0KCkgc2xpZGVWaXNpYmxlQ2xhc3M6IFN3aXBlck9wdGlvbnNbJ3NsaWRlVmlzaWJsZUNsYXNzJ107XG4gIEBJbnB1dCgpIHNsaWRlRHVwbGljYXRlQ2xhc3M6IFN3aXBlck9wdGlvbnNbJ3NsaWRlRHVwbGljYXRlQ2xhc3MnXTtcbiAgQElucHV0KCkgc2xpZGVOZXh0Q2xhc3M6IFN3aXBlck9wdGlvbnNbJ3NsaWRlTmV4dENsYXNzJ107XG4gIEBJbnB1dCgpIHNsaWRlRHVwbGljYXRlTmV4dENsYXNzOiBTd2lwZXJPcHRpb25zWydzbGlkZUR1cGxpY2F0ZU5leHRDbGFzcyddO1xuICBASW5wdXQoKSBzbGlkZVByZXZDbGFzczogU3dpcGVyT3B0aW9uc1snc2xpZGVQcmV2Q2xhc3MnXTtcbiAgQElucHV0KCkgc2xpZGVEdXBsaWNhdGVQcmV2Q2xhc3M6IFN3aXBlck9wdGlvbnNbJ3NsaWRlRHVwbGljYXRlUHJldkNsYXNzJ107XG4gIEBJbnB1dCgpIHdyYXBwZXJDbGFzczogU3dpcGVyT3B0aW9uc1snd3JhcHBlckNsYXNzJ10gPSAnc3dpcGVyLXdyYXBwZXInO1xuICBASW5wdXQoKSBydW5DYWxsYmFja3NPbkluaXQ6IFN3aXBlck9wdGlvbnNbJ3J1bkNhbGxiYWNrc09uSW5pdCddO1xuICBASW5wdXQoKSBhMTF5OiBTd2lwZXJPcHRpb25zWydhMTF5J107XG4gIEBJbnB1dCgpIGF1dG9wbGF5OiBTd2lwZXJPcHRpb25zWydhdXRvcGxheSddO1xuICBASW5wdXQoKSBjb250cm9sbGVyOiBTd2lwZXJPcHRpb25zWydjb250cm9sbGVyJ107XG4gIEBJbnB1dCgpIGNvdmVyZmxvd0VmZmVjdDogU3dpcGVyT3B0aW9uc1snY292ZXJmbG93RWZmZWN0J107XG4gIEBJbnB1dCgpIGN1YmVFZmZlY3Q6IFN3aXBlck9wdGlvbnNbJ2N1YmVFZmZlY3QnXTtcbiAgQElucHV0KCkgZmFkZUVmZmVjdDogU3dpcGVyT3B0aW9uc1snZmFkZUVmZmVjdCddO1xuICBASW5wdXQoKSBmbGlwRWZmZWN0OiBTd2lwZXJPcHRpb25zWydmbGlwRWZmZWN0J107XG4gIEBJbnB1dCgpIGhhc2hOYXZpZ2F0aW9uOiBTd2lwZXJPcHRpb25zWydoYXNoTmF2aWdhdGlvbiddO1xuICBASW5wdXQoKSBoaXN0b3J5OiBTd2lwZXJPcHRpb25zWydoaXN0b3J5J107XG4gIEBJbnB1dCgpIGtleWJvYXJkOiBTd2lwZXJPcHRpb25zWydrZXlib2FyZCddO1xuICBASW5wdXQoKSBsYXp5OiBTd2lwZXJPcHRpb25zWydsYXp5J107XG4gIEBJbnB1dCgpIG1vdXNld2hlZWw6IFN3aXBlck9wdGlvbnNbJ21vdXNld2hlZWwnXTtcbiAgQElucHV0KCkgcGFyYWxsYXg6IFN3aXBlck9wdGlvbnNbJ3BhcmFsbGF4J107XG4gIEBJbnB1dCgpIHRodW1iczogU3dpcGVyT3B0aW9uc1sndGh1bWJzJ107XG4gIEBJbnB1dCgpIHpvb206IFN3aXBlck9wdGlvbnNbJ3pvb20nXTtcbiAgQElucHV0KClcbiAgc2V0IG5hdmlnYXRpb24odmFsKSB7XG4gICAgdGhpcy5fbmF2aWdhdGlvbiA9IHNldFByb3BlcnR5KHZhbCwge1xuICAgICAgbmV4dEVsOiBudWxsLFxuICAgICAgcHJldkVsOiBudWxsLFxuICAgIH0pO1xuICB9XG4gIGdldCBuYXZpZ2F0aW9uKCkge1xuICAgIHJldHVybiB0aGlzLl9uYXZpZ2F0aW9uO1xuICB9XG4gIHByaXZhdGUgX25hdmlnYXRpb246IE5hdmlnYXRpb25PcHRpb25zIHwgYm9vbGVhbjtcblxuICBASW5wdXQoKVxuICBzZXQgcGFnaW5hdGlvbih2YWwpIHtcbiAgICB0aGlzLl9wYWdpbmF0aW9uID0gc2V0UHJvcGVydHkodmFsLCB7XG4gICAgICBlbDogbnVsbCxcbiAgICB9KTtcbiAgfVxuICBnZXQgcGFnaW5hdGlvbigpIHtcbiAgICByZXR1cm4gdGhpcy5fcGFnaW5hdGlvbjtcbiAgfVxuICBwcml2YXRlIF9wYWdpbmF0aW9uOiBQYWdpbmF0aW9uT3B0aW9ucyB8IGJvb2xlYW47XG5cbiAgQElucHV0KClcbiAgc2V0IHNjcm9sbGJhcih2YWwpIHtcbiAgICB0aGlzLl9zY3JvbGxiYXIgPSBzZXRQcm9wZXJ0eSh2YWwsIHtcbiAgICAgIGVsOiBudWxsLFxuICAgIH0pO1xuICB9XG4gIGdldCBzY3JvbGxiYXIoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3Njcm9sbGJhcjtcbiAgfVxuICBwcml2YXRlIF9zY3JvbGxiYXI6IFNjcm9sbGJhck9wdGlvbnMgfCBib29sZWFuO1xuXG4gIEBJbnB1dCgpXG4gIHNldCB2aXJ0dWFsKHZhbCkge1xuICAgIHRoaXMuX3ZpcnR1YWwgPSBzZXRQcm9wZXJ0eSh2YWwpO1xuICB9XG4gIGdldCB2aXJ0dWFsKCkge1xuICAgIHJldHVybiB0aGlzLl92aXJ0dWFsO1xuICB9XG4gIHByaXZhdGUgX3ZpcnR1YWw6IFZpcnR1YWxPcHRpb25zIHwgYm9vbGVhbjtcblxuICBASW5wdXQoKVxuICBzZXQgaW5kZXgoaW5kZXg6IG51bWJlcikge1xuICAgIHRoaXMuc2V0SW5kZXgoaW5kZXgpO1xuICB9XG4gIEBJbnB1dCgpXG4gIHNldCBjb25maWcodmFsOiBTd2lwZXJPcHRpb25zKSB7XG4gICAgdGhpcy51cGRhdGVTd2lwZXIodmFsKTtcbiAgICBjb25zdCB7IHBhcmFtcyB9ID0gZ2V0UGFyYW1zKHZhbCk7XG4gICAgT2JqZWN0LmFzc2lnbih0aGlzLCBwYXJhbXMpO1xuICB9XG4gIC8vIHByZXR0aWVyLWlnbm9yZVxuICBAT3V0cHV0KCdfYmVmb3JlQnJlYWtwb2ludCcpIHNfX2JlZm9yZUJyZWFrcG9pbnQ6IEV2ZW50RW1pdHRlcjxTd2lwZXJFdmVudHNbJ19iZWZvcmVCcmVha3BvaW50J10+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG4gIC8vIHByZXR0aWVyLWlnbm9yZVxuICBAT3V0cHV0KCdfY29udGFpbmVyQ2xhc3NlcycpIHNfX2NvbnRhaW5lckNsYXNzZXM6IEV2ZW50RW1pdHRlcjxTd2lwZXJFdmVudHNbJ19jb250YWluZXJDbGFzc2VzJ10+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG4gIC8vIHByZXR0aWVyLWlnbm9yZVxuICBAT3V0cHV0KCdfc2xpZGVDbGFzcycpIHNfX3NsaWRlQ2xhc3M6IEV2ZW50RW1pdHRlcjxTd2lwZXJFdmVudHNbJ19zbGlkZUNsYXNzJ10+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG4gIC8vIHByZXR0aWVyLWlnbm9yZVxuICBAT3V0cHV0KCdfc3dpcGVyJykgc19fc3dpcGVyOiBFdmVudEVtaXR0ZXI8U3dpcGVyRXZlbnRzWydfc3dpcGVyJ10+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG4gIC8vIHByZXR0aWVyLWlnbm9yZVxuICBAT3V0cHV0KCdhY3RpdmVJbmRleENoYW5nZScpIHNfYWN0aXZlSW5kZXhDaGFuZ2U6IEV2ZW50RW1pdHRlcjxTd2lwZXJFdmVudHNbJ2FjdGl2ZUluZGV4Q2hhbmdlJ10+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG4gIC8vIHByZXR0aWVyLWlnbm9yZVxuICBAT3V0cHV0KCdhZnRlckluaXQnKSBzX2FmdGVySW5pdDogRXZlbnRFbWl0dGVyPFN3aXBlckV2ZW50c1snYWZ0ZXJJbml0J10+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG4gIC8vIHByZXR0aWVyLWlnbm9yZVxuICBAT3V0cHV0KCdhdXRvcGxheScpIHNfYXV0b3BsYXk6IEV2ZW50RW1pdHRlcjxTd2lwZXJFdmVudHNbJ2F1dG9wbGF5J10+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG4gIC8vIHByZXR0aWVyLWlnbm9yZVxuICBAT3V0cHV0KCdhdXRvcGxheVN0YXJ0Jykgc19hdXRvcGxheVN0YXJ0OiBFdmVudEVtaXR0ZXI8U3dpcGVyRXZlbnRzWydhdXRvcGxheVN0YXJ0J10+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG4gIC8vIHByZXR0aWVyLWlnbm9yZVxuICBAT3V0cHV0KCdhdXRvcGxheVN0b3AnKSBzX2F1dG9wbGF5U3RvcDogRXZlbnRFbWl0dGVyPFN3aXBlckV2ZW50c1snYXV0b3BsYXlTdG9wJ10+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG4gIC8vIHByZXR0aWVyLWlnbm9yZVxuICBAT3V0cHV0KCdiZWZvcmVEZXN0cm95Jykgc19iZWZvcmVEZXN0cm95OiBFdmVudEVtaXR0ZXI8U3dpcGVyRXZlbnRzWydiZWZvcmVEZXN0cm95J10+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG4gIC8vIHByZXR0aWVyLWlnbm9yZVxuICBAT3V0cHV0KCdiZWZvcmVJbml0Jykgc19iZWZvcmVJbml0OiBFdmVudEVtaXR0ZXI8U3dpcGVyRXZlbnRzWydiZWZvcmVJbml0J10+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG4gIC8vIHByZXR0aWVyLWlnbm9yZVxuICBAT3V0cHV0KCdiZWZvcmVMb29wRml4Jykgc19iZWZvcmVMb29wRml4OiBFdmVudEVtaXR0ZXI8U3dpcGVyRXZlbnRzWydiZWZvcmVMb29wRml4J10+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG4gIC8vIHByZXR0aWVyLWlnbm9yZVxuICBAT3V0cHV0KCdiZWZvcmVSZXNpemUnKSBzX2JlZm9yZVJlc2l6ZTogRXZlbnRFbWl0dGVyPFN3aXBlckV2ZW50c1snYmVmb3JlUmVzaXplJ10+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG4gIC8vIHByZXR0aWVyLWlnbm9yZVxuICBAT3V0cHV0KCdiZWZvcmVTbGlkZUNoYW5nZVN0YXJ0Jykgc19iZWZvcmVTbGlkZUNoYW5nZVN0YXJ0OiBFdmVudEVtaXR0ZXI8U3dpcGVyRXZlbnRzWydiZWZvcmVTbGlkZUNoYW5nZVN0YXJ0J10+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG4gIC8vIHByZXR0aWVyLWlnbm9yZVxuICBAT3V0cHV0KCdiZWZvcmVUcmFuc2l0aW9uU3RhcnQnKSBzX2JlZm9yZVRyYW5zaXRpb25TdGFydDogRXZlbnRFbWl0dGVyPFN3aXBlckV2ZW50c1snYmVmb3JlVHJhbnNpdGlvblN0YXJ0J10+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG4gIC8vIHByZXR0aWVyLWlnbm9yZVxuICBAT3V0cHV0KCdicmVha3BvaW50Jykgc19icmVha3BvaW50OiBFdmVudEVtaXR0ZXI8U3dpcGVyRXZlbnRzWydicmVha3BvaW50J10+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG4gIC8vIHByZXR0aWVyLWlnbm9yZVxuICBAT3V0cHV0KCdjaGFuZ2VEaXJlY3Rpb24nKSBzX2NoYW5nZURpcmVjdGlvbjogRXZlbnRFbWl0dGVyPFN3aXBlckV2ZW50c1snY2hhbmdlRGlyZWN0aW9uJ10+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG4gIC8vIHByZXR0aWVyLWlnbm9yZVxuICBAT3V0cHV0KCdjbGljaycpIHNfY2xpY2s6IEV2ZW50RW1pdHRlcjxTd2lwZXJFdmVudHNbJ2NsaWNrJ10+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG4gIC8vIHByZXR0aWVyLWlnbm9yZVxuICBAT3V0cHV0KCdkb3VibGVUYXAnKSBzX2RvdWJsZVRhcDogRXZlbnRFbWl0dGVyPFN3aXBlckV2ZW50c1snZG91YmxlVGFwJ10+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG4gIC8vIHByZXR0aWVyLWlnbm9yZVxuICBAT3V0cHV0KCdkb3VibGVDbGljaycpIHNfZG91YmxlQ2xpY2s6IEV2ZW50RW1pdHRlcjxTd2lwZXJFdmVudHNbJ2RvdWJsZUNsaWNrJ10+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG4gIC8vIHByZXR0aWVyLWlnbm9yZVxuICBAT3V0cHV0KCdkZXN0cm95Jykgc19kZXN0cm95OiBFdmVudEVtaXR0ZXI8U3dpcGVyRXZlbnRzWydkZXN0cm95J10+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG4gIC8vIHByZXR0aWVyLWlnbm9yZVxuICBAT3V0cHV0KCdmcm9tRWRnZScpIHNfZnJvbUVkZ2U6IEV2ZW50RW1pdHRlcjxTd2lwZXJFdmVudHNbJ2Zyb21FZGdlJ10+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG4gIC8vIHByZXR0aWVyLWlnbm9yZVxuICBAT3V0cHV0KCdoYXNoQ2hhbmdlJykgc19oYXNoQ2hhbmdlOiBFdmVudEVtaXR0ZXI8U3dpcGVyRXZlbnRzWydoYXNoQ2hhbmdlJ10+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG4gIC8vIHByZXR0aWVyLWlnbm9yZVxuICBAT3V0cHV0KCdoYXNoU2V0Jykgc19oYXNoU2V0OiBFdmVudEVtaXR0ZXI8U3dpcGVyRXZlbnRzWydoYXNoU2V0J10+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG4gIC8vIHByZXR0aWVyLWlnbm9yZVxuICBAT3V0cHV0KCdpbWFnZXNSZWFkeScpIHNfaW1hZ2VzUmVhZHk6IEV2ZW50RW1pdHRlcjxTd2lwZXJFdmVudHNbJ2ltYWdlc1JlYWR5J10+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG4gIC8vIHByZXR0aWVyLWlnbm9yZVxuICBAT3V0cHV0KCdpbml0Jykgc19pbml0OiBFdmVudEVtaXR0ZXI8U3dpcGVyRXZlbnRzWydpbml0J10+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG4gIC8vIHByZXR0aWVyLWlnbm9yZVxuICBAT3V0cHV0KCdrZXlQcmVzcycpIHNfa2V5UHJlc3M6IEV2ZW50RW1pdHRlcjxTd2lwZXJFdmVudHNbJ2tleVByZXNzJ10+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG4gIC8vIHByZXR0aWVyLWlnbm9yZVxuICBAT3V0cHV0KCdsYXp5SW1hZ2VMb2FkJykgc19sYXp5SW1hZ2VMb2FkOiBFdmVudEVtaXR0ZXI8U3dpcGVyRXZlbnRzWydsYXp5SW1hZ2VMb2FkJ10+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG4gIC8vIHByZXR0aWVyLWlnbm9yZVxuICBAT3V0cHV0KCdsYXp5SW1hZ2VSZWFkeScpIHNfbGF6eUltYWdlUmVhZHk6IEV2ZW50RW1pdHRlcjxTd2lwZXJFdmVudHNbJ2xhenlJbWFnZVJlYWR5J10+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG4gIC8vIHByZXR0aWVyLWlnbm9yZVxuICBAT3V0cHV0KCdsb29wRml4Jykgc19sb29wRml4OiBFdmVudEVtaXR0ZXI8U3dpcGVyRXZlbnRzWydsb29wRml4J10+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG4gIC8vIHByZXR0aWVyLWlnbm9yZVxuICBAT3V0cHV0KCdtb21lbnR1bUJvdW5jZScpIHNfbW9tZW50dW1Cb3VuY2U6IEV2ZW50RW1pdHRlcjxTd2lwZXJFdmVudHNbJ21vbWVudHVtQm91bmNlJ10+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG4gIC8vIHByZXR0aWVyLWlnbm9yZVxuICBAT3V0cHV0KCduYXZpZ2F0aW9uSGlkZScpIHNfbmF2aWdhdGlvbkhpZGU6IEV2ZW50RW1pdHRlcjxTd2lwZXJFdmVudHNbJ25hdmlnYXRpb25IaWRlJ10+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG4gIC8vIHByZXR0aWVyLWlnbm9yZVxuICBAT3V0cHV0KCduYXZpZ2F0aW9uU2hvdycpIHNfbmF2aWdhdGlvblNob3c6IEV2ZW50RW1pdHRlcjxTd2lwZXJFdmVudHNbJ25hdmlnYXRpb25TaG93J10+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG4gIC8vIHByZXR0aWVyLWlnbm9yZVxuICBAT3V0cHV0KCdvYnNlcnZlclVwZGF0ZScpIHNfb2JzZXJ2ZXJVcGRhdGU6IEV2ZW50RW1pdHRlcjxTd2lwZXJFdmVudHNbJ29ic2VydmVyVXBkYXRlJ10+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG4gIC8vIHByZXR0aWVyLWlnbm9yZVxuICBAT3V0cHV0KCdvcmllbnRhdGlvbmNoYW5nZScpIHNfb3JpZW50YXRpb25jaGFuZ2U6IEV2ZW50RW1pdHRlcjxTd2lwZXJFdmVudHNbJ29yaWVudGF0aW9uY2hhbmdlJ10+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG4gIC8vIHByZXR0aWVyLWlnbm9yZVxuICBAT3V0cHV0KCdwYWdpbmF0aW9uSGlkZScpIHNfcGFnaW5hdGlvbkhpZGU6IEV2ZW50RW1pdHRlcjxTd2lwZXJFdmVudHNbJ3BhZ2luYXRpb25IaWRlJ10+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG4gIC8vIHByZXR0aWVyLWlnbm9yZVxuICBAT3V0cHV0KCdwYWdpbmF0aW9uUmVuZGVyJykgc19wYWdpbmF0aW9uUmVuZGVyOiBFdmVudEVtaXR0ZXI8U3dpcGVyRXZlbnRzWydwYWdpbmF0aW9uUmVuZGVyJ10+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG4gIC8vIHByZXR0aWVyLWlnbm9yZVxuICBAT3V0cHV0KCdwYWdpbmF0aW9uU2hvdycpIHNfcGFnaW5hdGlvblNob3c6IEV2ZW50RW1pdHRlcjxTd2lwZXJFdmVudHNbJ3BhZ2luYXRpb25TaG93J10+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG4gIC8vIHByZXR0aWVyLWlnbm9yZVxuICBAT3V0cHV0KCdwYWdpbmF0aW9uVXBkYXRlJykgc19wYWdpbmF0aW9uVXBkYXRlOiBFdmVudEVtaXR0ZXI8U3dpcGVyRXZlbnRzWydwYWdpbmF0aW9uVXBkYXRlJ10+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG4gIC8vIHByZXR0aWVyLWlnbm9yZVxuICBAT3V0cHV0KCdwcm9ncmVzcycpIHNfcHJvZ3Jlc3M6IEV2ZW50RW1pdHRlcjxTd2lwZXJFdmVudHNbJ3Byb2dyZXNzJ10+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG4gIC8vIHByZXR0aWVyLWlnbm9yZVxuICBAT3V0cHV0KCdyZWFjaEJlZ2lubmluZycpIHNfcmVhY2hCZWdpbm5pbmc6IEV2ZW50RW1pdHRlcjxTd2lwZXJFdmVudHNbJ3JlYWNoQmVnaW5uaW5nJ10+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG4gIC8vIHByZXR0aWVyLWlnbm9yZVxuICBAT3V0cHV0KCdyZWFjaEVuZCcpIHNfcmVhY2hFbmQ6IEV2ZW50RW1pdHRlcjxTd2lwZXJFdmVudHNbJ3JlYWNoRW5kJ10+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG4gIC8vIHByZXR0aWVyLWlnbm9yZVxuICBAT3V0cHV0KCdyZWFsSW5kZXhDaGFuZ2UnKSBzX3JlYWxJbmRleENoYW5nZTogRXZlbnRFbWl0dGVyPFN3aXBlckV2ZW50c1sncmVhbEluZGV4Q2hhbmdlJ10+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG4gIC8vIHByZXR0aWVyLWlnbm9yZVxuICBAT3V0cHV0KCdyZXNpemUnKSBzX3Jlc2l6ZTogRXZlbnRFbWl0dGVyPFN3aXBlckV2ZW50c1sncmVzaXplJ10+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG4gIC8vIHByZXR0aWVyLWlnbm9yZVxuICBAT3V0cHV0KCdzY3JvbGwnKSBzX3Njcm9sbDogRXZlbnRFbWl0dGVyPFN3aXBlckV2ZW50c1snc2Nyb2xsJ10+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG4gIC8vIHByZXR0aWVyLWlnbm9yZVxuICBAT3V0cHV0KCdzY3JvbGxiYXJEcmFnRW5kJykgc19zY3JvbGxiYXJEcmFnRW5kOiBFdmVudEVtaXR0ZXI8U3dpcGVyRXZlbnRzWydzY3JvbGxiYXJEcmFnRW5kJ10+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG4gIC8vIHByZXR0aWVyLWlnbm9yZVxuICBAT3V0cHV0KCdzY3JvbGxiYXJEcmFnTW92ZScpIHNfc2Nyb2xsYmFyRHJhZ01vdmU6IEV2ZW50RW1pdHRlcjxTd2lwZXJFdmVudHNbJ3Njcm9sbGJhckRyYWdNb3ZlJ10+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG4gIC8vIHByZXR0aWVyLWlnbm9yZVxuICBAT3V0cHV0KCdzY3JvbGxiYXJEcmFnU3RhcnQnKSBzX3Njcm9sbGJhckRyYWdTdGFydDogRXZlbnRFbWl0dGVyPFN3aXBlckV2ZW50c1snc2Nyb2xsYmFyRHJhZ1N0YXJ0J10+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG4gIC8vIHByZXR0aWVyLWlnbm9yZVxuICBAT3V0cHV0KCdzZXRUcmFuc2l0aW9uJykgc19zZXRUcmFuc2l0aW9uOiBFdmVudEVtaXR0ZXI8U3dpcGVyRXZlbnRzWydzZXRUcmFuc2l0aW9uJ10+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG4gIC8vIHByZXR0aWVyLWlnbm9yZVxuICBAT3V0cHV0KCdzZXRUcmFuc2xhdGUnKSBzX3NldFRyYW5zbGF0ZTogRXZlbnRFbWl0dGVyPFN3aXBlckV2ZW50c1snc2V0VHJhbnNsYXRlJ10+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG4gIC8vIHByZXR0aWVyLWlnbm9yZVxuICBAT3V0cHV0KCdzbGlkZUNoYW5nZScpIHNfc2xpZGVDaGFuZ2U6IEV2ZW50RW1pdHRlcjxTd2lwZXJFdmVudHNbJ3NsaWRlQ2hhbmdlJ10+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG4gIC8vIHByZXR0aWVyLWlnbm9yZVxuICBAT3V0cHV0KCdzbGlkZUNoYW5nZVRyYW5zaXRpb25FbmQnKSBzX3NsaWRlQ2hhbmdlVHJhbnNpdGlvbkVuZDogRXZlbnRFbWl0dGVyPFN3aXBlckV2ZW50c1snc2xpZGVDaGFuZ2VUcmFuc2l0aW9uRW5kJ10+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG4gIC8vIHByZXR0aWVyLWlnbm9yZVxuICBAT3V0cHV0KCdzbGlkZUNoYW5nZVRyYW5zaXRpb25TdGFydCcpIHNfc2xpZGVDaGFuZ2VUcmFuc2l0aW9uU3RhcnQ6IEV2ZW50RW1pdHRlcjxTd2lwZXJFdmVudHNbJ3NsaWRlQ2hhbmdlVHJhbnNpdGlvblN0YXJ0J10+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG4gIC8vIHByZXR0aWVyLWlnbm9yZVxuICBAT3V0cHV0KCdzbGlkZU5leHRUcmFuc2l0aW9uRW5kJykgc19zbGlkZU5leHRUcmFuc2l0aW9uRW5kOiBFdmVudEVtaXR0ZXI8U3dpcGVyRXZlbnRzWydzbGlkZU5leHRUcmFuc2l0aW9uRW5kJ10+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG4gIC8vIHByZXR0aWVyLWlnbm9yZVxuICBAT3V0cHV0KCdzbGlkZU5leHRUcmFuc2l0aW9uU3RhcnQnKSBzX3NsaWRlTmV4dFRyYW5zaXRpb25TdGFydDogRXZlbnRFbWl0dGVyPFN3aXBlckV2ZW50c1snc2xpZGVOZXh0VHJhbnNpdGlvblN0YXJ0J10+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG4gIC8vIHByZXR0aWVyLWlnbm9yZVxuICBAT3V0cHV0KCdzbGlkZVByZXZUcmFuc2l0aW9uRW5kJykgc19zbGlkZVByZXZUcmFuc2l0aW9uRW5kOiBFdmVudEVtaXR0ZXI8U3dpcGVyRXZlbnRzWydzbGlkZVByZXZUcmFuc2l0aW9uRW5kJ10+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG4gIC8vIHByZXR0aWVyLWlnbm9yZVxuICBAT3V0cHV0KCdzbGlkZVByZXZUcmFuc2l0aW9uU3RhcnQnKSBzX3NsaWRlUHJldlRyYW5zaXRpb25TdGFydDogRXZlbnRFbWl0dGVyPFN3aXBlckV2ZW50c1snc2xpZGVQcmV2VHJhbnNpdGlvblN0YXJ0J10+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG4gIC8vIHByZXR0aWVyLWlnbm9yZVxuICBAT3V0cHV0KCdzbGlkZVJlc2V0VHJhbnNpdGlvblN0YXJ0Jykgc19zbGlkZVJlc2V0VHJhbnNpdGlvblN0YXJ0OiBFdmVudEVtaXR0ZXI8U3dpcGVyRXZlbnRzWydzbGlkZVJlc2V0VHJhbnNpdGlvblN0YXJ0J10+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG4gIC8vIHByZXR0aWVyLWlnbm9yZVxuICBAT3V0cHV0KCdzbGlkZVJlc2V0VHJhbnNpdGlvbkVuZCcpIHNfc2xpZGVSZXNldFRyYW5zaXRpb25FbmQ6IEV2ZW50RW1pdHRlcjxTd2lwZXJFdmVudHNbJ3NsaWRlUmVzZXRUcmFuc2l0aW9uRW5kJ10+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG4gIC8vIHByZXR0aWVyLWlnbm9yZVxuICBAT3V0cHV0KCdzbGlkZXJNb3ZlJykgc19zbGlkZXJNb3ZlOiBFdmVudEVtaXR0ZXI8U3dpcGVyRXZlbnRzWydzbGlkZXJNb3ZlJ10+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG4gIC8vIHByZXR0aWVyLWlnbm9yZVxuICBAT3V0cHV0KCdzbGlkZXJGaXJzdE1vdmUnKSBzX3NsaWRlckZpcnN0TW92ZTogRXZlbnRFbWl0dGVyPFN3aXBlckV2ZW50c1snc2xpZGVyRmlyc3RNb3ZlJ10+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG4gIC8vIHByZXR0aWVyLWlnbm9yZVxuICBAT3V0cHV0KCdzbGlkZXNMZW5ndGhDaGFuZ2UnKSBzX3NsaWRlc0xlbmd0aENoYW5nZTogRXZlbnRFbWl0dGVyPFN3aXBlckV2ZW50c1snc2xpZGVzTGVuZ3RoQ2hhbmdlJ10+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG4gIC8vIHByZXR0aWVyLWlnbm9yZVxuICBAT3V0cHV0KCdzbGlkZXNHcmlkTGVuZ3RoQ2hhbmdlJykgc19zbGlkZXNHcmlkTGVuZ3RoQ2hhbmdlOiBFdmVudEVtaXR0ZXI8U3dpcGVyRXZlbnRzWydzbGlkZXNHcmlkTGVuZ3RoQ2hhbmdlJ10+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG4gIC8vIHByZXR0aWVyLWlnbm9yZVxuICBAT3V0cHV0KCdzbmFwR3JpZExlbmd0aENoYW5nZScpIHNfc25hcEdyaWRMZW5ndGhDaGFuZ2U6IEV2ZW50RW1pdHRlcjxTd2lwZXJFdmVudHNbJ3NuYXBHcmlkTGVuZ3RoQ2hhbmdlJ10+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG4gIC8vIHByZXR0aWVyLWlnbm9yZVxuICBAT3V0cHV0KCdzbmFwSW5kZXhDaGFuZ2UnKSBzX3NuYXBJbmRleENoYW5nZTogRXZlbnRFbWl0dGVyPFN3aXBlckV2ZW50c1snc25hcEluZGV4Q2hhbmdlJ10+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG4gIC8vIHByZXR0aWVyLWlnbm9yZVxuICBAT3V0cHV0KCd0YXAnKSBzX3RhcDogRXZlbnRFbWl0dGVyPFN3aXBlckV2ZW50c1sndGFwJ10+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG4gIC8vIHByZXR0aWVyLWlnbm9yZVxuICBAT3V0cHV0KCd0b0VkZ2UnKSBzX3RvRWRnZTogRXZlbnRFbWl0dGVyPFN3aXBlckV2ZW50c1sndG9FZGdlJ10+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG4gIC8vIHByZXR0aWVyLWlnbm9yZVxuICBAT3V0cHV0KCd0b3VjaEVuZCcpIHNfdG91Y2hFbmQ6IEV2ZW50RW1pdHRlcjxTd2lwZXJFdmVudHNbJ3RvdWNoRW5kJ10+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG4gIC8vIHByZXR0aWVyLWlnbm9yZVxuICBAT3V0cHV0KCd0b3VjaE1vdmUnKSBzX3RvdWNoTW92ZTogRXZlbnRFbWl0dGVyPFN3aXBlckV2ZW50c1sndG91Y2hNb3ZlJ10+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG4gIC8vIHByZXR0aWVyLWlnbm9yZVxuICBAT3V0cHV0KCd0b3VjaE1vdmVPcHBvc2l0ZScpIHNfdG91Y2hNb3ZlT3Bwb3NpdGU6IEV2ZW50RW1pdHRlcjxTd2lwZXJFdmVudHNbJ3RvdWNoTW92ZU9wcG9zaXRlJ10+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG4gIC8vIHByZXR0aWVyLWlnbm9yZVxuICBAT3V0cHV0KCd0b3VjaFN0YXJ0Jykgc190b3VjaFN0YXJ0OiBFdmVudEVtaXR0ZXI8U3dpcGVyRXZlbnRzWyd0b3VjaFN0YXJ0J10+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG4gIC8vIHByZXR0aWVyLWlnbm9yZVxuICBAT3V0cHV0KCd0cmFuc2l0aW9uRW5kJykgc190cmFuc2l0aW9uRW5kOiBFdmVudEVtaXR0ZXI8U3dpcGVyRXZlbnRzWyd0cmFuc2l0aW9uRW5kJ10+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG4gIC8vIHByZXR0aWVyLWlnbm9yZVxuICBAT3V0cHV0KCd0cmFuc2l0aW9uU3RhcnQnKSBzX3RyYW5zaXRpb25TdGFydDogRXZlbnRFbWl0dGVyPFN3aXBlckV2ZW50c1sndHJhbnNpdGlvblN0YXJ0J10+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG4gIC8vIHByZXR0aWVyLWlnbm9yZVxuICBAT3V0cHV0KCd1cGRhdGUnKSBzX3VwZGF0ZTogRXZlbnRFbWl0dGVyPFN3aXBlckV2ZW50c1sndXBkYXRlJ10+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG4gIC8vIHByZXR0aWVyLWlnbm9yZVxuICBAT3V0cHV0KCd6b29tQ2hhbmdlJykgc196b29tQ2hhbmdlOiBFdmVudEVtaXR0ZXI8U3dpcGVyRXZlbnRzWyd6b29tQ2hhbmdlJ10+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG4gIC8vIHByZXR0aWVyLWlnbm9yZVxuICBAT3V0cHV0KCdzd2lwZXInKSBzX3N3aXBlcjogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcblxuICBAT3V0cHV0KCkgaW5kZXhDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPG51bWJlcj4oKTtcblxuICBAVmlld0NoaWxkKCdwcmV2RWxSZWYnLCB7IHN0YXRpYzogZmFsc2UgfSlcbiAgc2V0IHByZXZFbFJlZihlbDogRWxlbWVudFJlZikge1xuICAgIHRoaXMuX3NldEVsZW1lbnQoZWwsIHRoaXMubmF2aWdhdGlvbiwgJ25hdmlnYXRpb24nLCAncHJldkVsJyk7XG4gIH1cbiAgQFZpZXdDaGlsZCgnbmV4dEVsUmVmJywgeyBzdGF0aWM6IGZhbHNlIH0pXG4gIHNldCBuZXh0RWxSZWYoZWw6IEVsZW1lbnRSZWYpIHtcbiAgICB0aGlzLl9zZXRFbGVtZW50KGVsLCB0aGlzLm5hdmlnYXRpb24sICduYXZpZ2F0aW9uJywgJ25leHRFbCcpO1xuICB9XG4gIEBWaWV3Q2hpbGQoJ3Njcm9sbGJhckVsUmVmJywgeyBzdGF0aWM6IGZhbHNlIH0pXG4gIHNldCBzY3JvbGxiYXJFbFJlZihlbDogRWxlbWVudFJlZikge1xuICAgIHRoaXMuX3NldEVsZW1lbnQoZWwsIHRoaXMuc2Nyb2xsYmFyLCAnc2Nyb2xsYmFyJyk7XG4gIH1cbiAgQFZpZXdDaGlsZCgncGFnaW5hdGlvbkVsUmVmJywgeyBzdGF0aWM6IGZhbHNlIH0pXG4gIHNldCBwYWdpbmF0aW9uRWxSZWYoZWw6IEVsZW1lbnRSZWYpIHtcbiAgICB0aGlzLl9zZXRFbGVtZW50KGVsLCB0aGlzLnBhZ2luYXRpb24sICdwYWdpbmF0aW9uJyk7XG4gIH1cbiAgQENvbnRlbnRDaGlsZHJlbihTd2lwZXJTbGlkZURpcmVjdGl2ZSwgeyBkZXNjZW5kYW50czogdHJ1ZSB9KVxuICBzZXQgc2xpZGVzRWwodmFsOiBRdWVyeUxpc3Q8U3dpcGVyU2xpZGVEaXJlY3RpdmU+KSB7XG4gICAgdGhpcy5zbGlkZXMgPSB2YWwubWFwKChzbGlkZTogU3dpcGVyU2xpZGVEaXJlY3RpdmUsIGluZGV4OiBudW1iZXIpID0+IHtcbiAgICAgIHNsaWRlLnNsaWRlSW5kZXggPSBpbmRleDtcbiAgICAgIHNsaWRlLmNsYXNzTmFtZXMgPSB0aGlzLnNsaWRlQ2xhc3M7XG4gICAgICByZXR1cm4gc2xpZGU7XG4gICAgfSk7XG4gICAgaWYgKHRoaXMubG9vcCAmJiAhdGhpcy5sb29wZWRTbGlkZXMpIHtcbiAgICAgIHRoaXMuY2FsY0xvb3BlZFNsaWRlcygpO1xuICAgIH1cbiAgICBpZiAoIXRoaXMudmlydHVhbCkge1xuICAgICAgdGhpcy5wcmVwZW5kU2xpZGVzID0gb2YodGhpcy5zbGlkZXMuc2xpY2UodGhpcy5zbGlkZXMubGVuZ3RoIC0gdGhpcy5sb29wZWRTbGlkZXMpKTtcbiAgICAgIHRoaXMuYXBwZW5kU2xpZGVzID0gb2YodGhpcy5zbGlkZXMuc2xpY2UoMCwgdGhpcy5sb29wZWRTbGlkZXMpKTtcbiAgICB9XG4gIH1cbiAgcHJpdmF0ZSBzbGlkZXM6IFN3aXBlclNsaWRlRGlyZWN0aXZlW107XG5cbiAgcHJlcGVuZFNsaWRlczogT2JzZXJ2YWJsZTxTd2lwZXJTbGlkZURpcmVjdGl2ZVtdPjtcbiAgYXBwZW5kU2xpZGVzOiBPYnNlcnZhYmxlPFN3aXBlclNsaWRlRGlyZWN0aXZlW10+O1xuXG4gIHN3aXBlclJlZjogU3dpcGVyO1xuICByZWFkb25seSBfYWN0aXZlU2xpZGVzID0gbmV3IFN1YmplY3Q8U3dpcGVyU2xpZGVEaXJlY3RpdmVbXT4oKTtcblxuICBnZXQgYWN0aXZlU2xpZGVzKCkge1xuICAgIGlmICh0aGlzLnZpcnR1YWwpIHtcbiAgICAgIHJldHVybiB0aGlzLl9hY3RpdmVTbGlkZXM7XG4gICAgfVxuICAgIHJldHVybiBvZih0aGlzLnNsaWRlcyk7XG4gIH1cblxuICBASG9zdEJpbmRpbmcoJ2NsYXNzJykgY29udGFpbmVyQ2xhc3NlcyA9ICdzd2lwZXItY29udGFpbmVyJztcbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSB6b25lOiBOZ1pvbmUsXG4gICAgcHJpdmF0ZSBlbGVtZW50UmVmOiBFbGVtZW50UmVmLFxuICAgIHByaXZhdGUgX2NoYW5nZURldGVjdG9yUmVmOiBDaGFuZ2VEZXRlY3RvclJlZixcbiAgKSB7fVxuXG4gIHByaXZhdGUgX3NldEVsZW1lbnQoZWw6IEVsZW1lbnRSZWYsIHJlZjogYW55LCB1cGRhdGU6IHN0cmluZywga2V5ID0gJ2VsJykge1xuICAgIGlmICghZWwgJiYgIXJlZikge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAocmVmKSB7XG4gICAgICBpZiAocmVmW2tleV0gPT09IGVsLm5hdGl2ZUVsZW1lbnQpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgcmVmW2tleV0gPSBlbC5uYXRpdmVFbGVtZW50O1xuICAgIH1cbiAgICBjb25zdCB1cGRhdGVPYmogPSB7fTtcbiAgICB1cGRhdGVPYmpbdXBkYXRlXSA9IHRydWU7XG4gICAgdGhpcy51cGRhdGVJbml0U3dpcGVyKHVwZGF0ZU9iaik7XG4gIH1cbiAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgY29uc3QgeyBwYXJhbXMgfSA9IGdldFBhcmFtcyh0aGlzKTtcbiAgICBPYmplY3QuYXNzaWduKHRoaXMsIHBhcmFtcyk7XG4gIH1cblxuICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgaWYgKHRoaXMuaW5pdCkge1xuICAgICAgdGhpcy5pbml0U3dpcGVyKCk7XG4gICAgICB0aGlzLl9jaGFuZ2VEZXRlY3RvclJlZi5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgfVxuICB9XG5cbiAgaW5pdFN3aXBlcigpIHtcbiAgICBjb25zdCB7IHBhcmFtczogc3dpcGVyUGFyYW1zLCBwYXNzZWRQYXJhbXMgfSA9IGdldFBhcmFtcyh0aGlzKTtcbiAgICBPYmplY3QuYXNzaWduKHRoaXMsIHN3aXBlclBhcmFtcyk7XG4gICAgc3dpcGVyUGFyYW1zLm9uQW55ID0gKGV2ZW50LCAuLi5hcmdzKSA9PiB7XG4gICAgICBjb25zdCBlbWl0dGVyID0gdGhpc1tgc18ke2V2ZW50fWBdIGFzIEV2ZW50RW1pdHRlcjxhbnk+O1xuICAgICAgaWYgKGVtaXR0ZXIpIHtcbiAgICAgICAgZW1pdHRlci5lbWl0KC4uLmFyZ3MpO1xuICAgICAgfVxuICAgIH07XG5cbiAgICBPYmplY3QuYXNzaWduKHN3aXBlclBhcmFtcy5vbiwge1xuICAgICAgc2xpZGVDaGFuZ2U6ICgpID0+IHtcbiAgICAgICAgdGhpcy5pbmRleENoYW5nZS5lbWl0KHRoaXMuc3dpcGVyUmVmLnJlYWxJbmRleCk7XG4gICAgICB9LFxuICAgICAgX2NvbnRhaW5lckNsYXNzZXMoc3dpcGVyLCBjbGFzc2VzKSB7XG4gICAgICAgIHRoaXMuY29udGFpbmVyQ2xhc3NlcyA9IGNsYXNzZXM7XG4gICAgICB9LFxuICAgICAgX3N3aXBlcjogKHN3aXBlcikgPT4ge1xuICAgICAgICB0aGlzLnN3aXBlclJlZiA9IHN3aXBlcjtcbiAgICAgICAgdGhpcy5zX3N3aXBlci5lbWl0KHRoaXMuc3dpcGVyUmVmKTtcbiAgICAgICAgc3dpcGVyLmxvb3BDcmVhdGUgPSAoKSA9PiB7fTtcbiAgICAgICAgc3dpcGVyLmxvb3BEZXN0cm95ID0gKCkgPT4ge307XG4gICAgICAgIGlmIChzd2lwZXJQYXJhbXMubG9vcCkge1xuICAgICAgICAgIHN3aXBlci5sb29wZWRTbGlkZXMgPSB0aGlzLmxvb3BlZFNsaWRlcztcbiAgICAgICAgfVxuICAgICAgICBpZiAoc3dpcGVyLnZpcnR1YWwgJiYgc3dpcGVyLnBhcmFtcy52aXJ0dWFsLmVuYWJsZWQpIHtcbiAgICAgICAgICBzd2lwZXIudmlydHVhbC5zbGlkZXMgPSB0aGlzLnNsaWRlcztcbiAgICAgICAgICBzd2lwZXIucGFyYW1zLnZpcnR1YWwuY2FjaGUgPSBmYWxzZTtcbiAgICAgICAgICBzd2lwZXIucGFyYW1zLnZpcnR1YWwucmVuZGVyRXh0ZXJuYWwgPSAoZGF0YSkgPT4ge1xuICAgICAgICAgICAgdGhpcy51cGRhdGVWaXJ0dWFsU2xpZGVzKGRhdGEpO1xuICAgICAgICAgIH07XG4gICAgICAgICAgc3dpcGVyLnBhcmFtcy52aXJ0dWFsLnJlbmRlckV4dGVybmFsVXBkYXRlID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fY2hhbmdlRGV0ZWN0b3JSZWYuZGV0ZWN0Q2hhbmdlcygpO1xuICAgICAgfSxcbiAgICAgIF9zbGlkZUNsYXNzOiAoXywgZWw6IEhUTUxFbGVtZW50LCBjbGFzc05hbWVzKSA9PiB7XG4gICAgICAgIGNvbnN0IHNsaWRlSW5kZXggPSBwYXJzZUludChlbC5kYXRhc2V0LnN3aXBlclNsaWRlSW5kZXgpO1xuICAgICAgICBpZiAodGhpcy52aXJ0dWFsKSB7XG4gICAgICAgICAgY29uc3QgdmlydHVhbFNsaWRlID0gdGhpcy5zbGlkZXMuZmluZCgoaXRlbSkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIGl0ZW0udmlydHVhbEluZGV4ICYmIGl0ZW0udmlydHVhbEluZGV4ID09PSBzbGlkZUluZGV4O1xuICAgICAgICAgIH0pO1xuICAgICAgICAgIGlmICh2aXJ0dWFsU2xpZGUpIHtcbiAgICAgICAgICAgIHZpcnR1YWxTbGlkZS5jbGFzc05hbWVzID0gY2xhc3NOYW1lcztcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5zbGlkZXNbc2xpZGVJbmRleF0uY2xhc3NOYW1lcyA9IGNsYXNzTmFtZXM7XG4gICAgICAgIHRoaXMuX2NoYW5nZURldGVjdG9yUmVmLmRldGVjdENoYW5nZXMoKTtcbiAgICAgIH0sXG4gICAgfSk7XG4gICAgbmV3IFN3aXBlcih0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCwgc3dpcGVyUGFyYW1zKTtcbiAgfVxuXG4gIHN0eWxlOiBhbnkgPSBudWxsO1xuICBjdXJyZW50VmlydHVhbERhdGE6IGFueTsgLy8gVE9ETzogdHlwZSB2aXJ0dWFsRGF0YTtcbiAgcHJpdmF0ZSB1cGRhdGVWaXJ0dWFsU2xpZGVzKHZpcnR1YWxEYXRhOiBhbnkpIHtcbiAgICAvLyBUT0RPOiB0eXBlIHZpcnR1YWxEYXRhXG4gICAgaWYgKFxuICAgICAgIXRoaXMuc3dpcGVyUmVmIHx8XG4gICAgICAodGhpcy5jdXJyZW50VmlydHVhbERhdGEgJiZcbiAgICAgICAgdGhpcy5jdXJyZW50VmlydHVhbERhdGEuZnJvbSA9PT0gdmlydHVhbERhdGEuZnJvbSAmJlxuICAgICAgICB0aGlzLmN1cnJlbnRWaXJ0dWFsRGF0YS50byA9PT0gdmlydHVhbERhdGEudG8gJiZcbiAgICAgICAgdGhpcy5jdXJyZW50VmlydHVhbERhdGEub2Zmc2V0ID09PSB2aXJ0dWFsRGF0YS5vZmZzZXQpXG4gICAgKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMuc3R5bGUgPSB0aGlzLnN3aXBlclJlZi5pc0hvcml6b250YWwoKVxuICAgICAgPyB7XG4gICAgICAgICAgW3RoaXMuc3dpcGVyUmVmLnJ0bFRyYW5zbGF0ZSA/ICdyaWdodCcgOiAnbGVmdCddOiBgJHt2aXJ0dWFsRGF0YS5vZmZzZXR9cHhgLFxuICAgICAgICB9XG4gICAgICA6IHtcbiAgICAgICAgICB0b3A6IGAke3ZpcnR1YWxEYXRhLm9mZnNldH1weGAsXG4gICAgICAgIH07XG4gICAgdGhpcy5jdXJyZW50VmlydHVhbERhdGEgPSB2aXJ0dWFsRGF0YTtcbiAgICB0aGlzLl9hY3RpdmVTbGlkZXMubmV4dCh2aXJ0dWFsRGF0YS5zbGlkZXMpO1xuICAgIHRoaXMuX2NoYW5nZURldGVjdG9yUmVmLmRldGVjdENoYW5nZXMoKTtcbiAgICB0aGlzLnN3aXBlclJlZi51cGRhdGVTbGlkZXMoKTtcbiAgICB0aGlzLnN3aXBlclJlZi51cGRhdGVQcm9ncmVzcygpO1xuICAgIHRoaXMuc3dpcGVyUmVmLnVwZGF0ZVNsaWRlc0NsYXNzZXMoKTtcbiAgICBpZiAodGhpcy5zd2lwZXJSZWYubGF6eSAmJiB0aGlzLnN3aXBlclJlZi5wYXJhbXMubGF6eVsnZW5hYmxlZCddKSB7XG4gICAgICB0aGlzLnN3aXBlclJlZi5sYXp5LmxvYWQoKTtcbiAgICB9XG4gICAgdGhpcy5zd2lwZXJSZWYudmlydHVhbC51cGRhdGUodHJ1ZSk7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgbmdPbkNoYW5nZXMoY2hhbmdlZFBhcmFtczogU2ltcGxlQ2hhbmdlcykge1xuICAgIHRoaXMudXBkYXRlU3dpcGVyKGNoYW5nZWRQYXJhbXMpO1xuICAgIHRoaXMuX2NoYW5nZURldGVjdG9yUmVmLmRldGVjdENoYW5nZXMoKTtcbiAgfVxuXG4gIHVwZGF0ZUluaXRTd2lwZXIoY2hhbmdlZFBhcmFtcykge1xuICAgIGlmICghKGNoYW5nZWRQYXJhbXMgJiYgdGhpcy5zd2lwZXJSZWYgJiYgIXRoaXMuc3dpcGVyUmVmLmRlc3Ryb3llZCkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY29uc3Qge1xuICAgICAgcGFyYW1zOiBjdXJyZW50UGFyYW1zLFxuICAgICAgcGFnaW5hdGlvbixcbiAgICAgIG5hdmlnYXRpb24sXG4gICAgICBzY3JvbGxiYXIsXG4gICAgICB2aXJ0dWFsLFxuICAgICAgdGh1bWJzLFxuICAgIH0gPSB0aGlzLnN3aXBlclJlZjtcblxuICAgIGlmIChjaGFuZ2VkUGFyYW1zLnBhZ2luYXRpb24pIHtcbiAgICAgIGlmIChcbiAgICAgICAgdGhpcy5wYWdpbmF0aW9uICYmXG4gICAgICAgIHR5cGVvZiB0aGlzLnBhZ2luYXRpb24gIT09ICdib29sZWFuJyAmJlxuICAgICAgICB0aGlzLnBhZ2luYXRpb24uZWwgJiZcbiAgICAgICAgcGFnaW5hdGlvbiAmJlxuICAgICAgICAhcGFnaW5hdGlvbi5lbFxuICAgICAgKSB7XG4gICAgICAgIHRoaXMudXBkYXRlUGFyYW1ldGVyKCdwYWdpbmF0aW9uJywgdGhpcy5wYWdpbmF0aW9uKTtcbiAgICAgICAgcGFnaW5hdGlvbi5pbml0KCk7XG4gICAgICAgIHBhZ2luYXRpb24ucmVuZGVyKCk7XG4gICAgICAgIHBhZ2luYXRpb24udXBkYXRlKCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBwYWdpbmF0aW9uLmRlc3Ryb3koKTtcbiAgICAgICAgcGFnaW5hdGlvbi5lbCA9IG51bGw7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKGNoYW5nZWRQYXJhbXMuc2Nyb2xsYmFyKSB7XG4gICAgICBpZiAoXG4gICAgICAgIHRoaXMuc2Nyb2xsYmFyICYmXG4gICAgICAgIHR5cGVvZiB0aGlzLnNjcm9sbGJhciAhPT0gJ2Jvb2xlYW4nICYmXG4gICAgICAgIHRoaXMuc2Nyb2xsYmFyLmVsICYmXG4gICAgICAgIHNjcm9sbGJhciAmJlxuICAgICAgICAhc2Nyb2xsYmFyLmVsXG4gICAgICApIHtcbiAgICAgICAgdGhpcy51cGRhdGVQYXJhbWV0ZXIoJ3Njcm9sbGJhcicsIHRoaXMuc2Nyb2xsYmFyKTtcbiAgICAgICAgc2Nyb2xsYmFyLmluaXQoKTtcbiAgICAgICAgc2Nyb2xsYmFyLnVwZGF0ZVNpemUoKTtcbiAgICAgICAgc2Nyb2xsYmFyLnNldFRyYW5zbGF0ZSgpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc2Nyb2xsYmFyLmRlc3Ryb3koKTtcbiAgICAgICAgc2Nyb2xsYmFyLmVsID0gbnVsbDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoY2hhbmdlZFBhcmFtcy5uYXZpZ2F0aW9uKSB7XG4gICAgICBpZiAoXG4gICAgICAgIHRoaXMubmF2aWdhdGlvbiAmJlxuICAgICAgICB0eXBlb2YgdGhpcy5uYXZpZ2F0aW9uICE9PSAnYm9vbGVhbicgJiZcbiAgICAgICAgdGhpcy5uYXZpZ2F0aW9uLnByZXZFbCAmJlxuICAgICAgICB0aGlzLm5hdmlnYXRpb24ubmV4dEVsICYmXG4gICAgICAgIG5hdmlnYXRpb24gJiZcbiAgICAgICAgIW5hdmlnYXRpb24ucHJldkVsICYmXG4gICAgICAgICFuYXZpZ2F0aW9uLm5leHRFbFxuICAgICAgKSB7XG4gICAgICAgIHRoaXMudXBkYXRlUGFyYW1ldGVyKCduYXZpZ2F0aW9uJywgdGhpcy5uYXZpZ2F0aW9uKTtcbiAgICAgICAgbmF2aWdhdGlvbi5pbml0KCk7XG4gICAgICAgIG5hdmlnYXRpb24udXBkYXRlKCk7XG4gICAgICB9IGVsc2UgaWYgKG5hdmlnYXRpb24ucHJldkVsICYmIG5hdmlnYXRpb24ubmV4dEVsKSB7XG4gICAgICAgIG5hdmlnYXRpb24uZGVzdHJveSgpO1xuICAgICAgICBuYXZpZ2F0aW9uLm5leHRFbCA9IG51bGw7XG4gICAgICAgIG5hdmlnYXRpb24ucHJldkVsID0gbnVsbDtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKGNoYW5nZWRQYXJhbXMudGh1bWJzICYmIHRoaXMudGh1bWJzICYmIHRoaXMudGh1bWJzLnN3aXBlcikge1xuICAgICAgdGhpcy51cGRhdGVQYXJhbWV0ZXIoJ3RodW1icycsIHRoaXMudGh1bWJzKTtcbiAgICAgIGNvbnN0IGluaXRpYWxpemVkID0gdGh1bWJzLmluaXQoKTtcbiAgICAgIGlmIChpbml0aWFsaXplZCkgdGh1bWJzLnVwZGF0ZSh0cnVlKTtcbiAgICB9XG5cbiAgICBpZiAoY2hhbmdlZFBhcmFtcy5jb250cm9sbGVyICYmIHRoaXMuY29udHJvbGxlciAmJiB0aGlzLmNvbnRyb2xsZXIuY29udHJvbCkge1xuICAgICAgdGhpcy5zd2lwZXJSZWYuY29udHJvbGxlci5jb250cm9sID0gdGhpcy5jb250cm9sbGVyLmNvbnRyb2w7XG4gICAgfVxuXG4gICAgdGhpcy5zd2lwZXJSZWYudXBkYXRlKCk7XG4gIH1cblxuICB1cGRhdGVTd2lwZXIoY2hhbmdlZFBhcmFtczogU2ltcGxlQ2hhbmdlcyB8IGFueSkge1xuICAgIGlmIChjaGFuZ2VkUGFyYW1zLmNvbmZpZykge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAoIShjaGFuZ2VkUGFyYW1zICYmIHRoaXMuc3dpcGVyUmVmICYmICF0aGlzLnN3aXBlclJlZi5kZXN0cm95ZWQpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGZvciAoY29uc3Qga2V5IGluIGNoYW5nZWRQYXJhbXMpIHtcbiAgICAgIGlmIChpZ25vcmVOZ09uQ2hhbmdlcy5pbmRleE9mKGtleSkgPj0gMCkge1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cbiAgICAgIGNvbnN0IG5ld1ZhbHVlID0gY2hhbmdlZFBhcmFtc1trZXldPy5jdXJyZW50VmFsdWUgPz8gY2hhbmdlZFBhcmFtc1trZXldO1xuICAgICAgdGhpcy51cGRhdGVQYXJhbWV0ZXIoa2V5LCBuZXdWYWx1ZSk7XG4gICAgfVxuXG4gICAgaWYgKGNoYW5nZWRQYXJhbXMuYWxsb3dTbGlkZU5leHQpIHtcbiAgICAgIHRoaXMuc3dpcGVyUmVmLmFsbG93U2xpZGVOZXh0ID0gdGhpcy5hbGxvd1NsaWRlTmV4dDtcbiAgICB9XG4gICAgaWYgKGNoYW5nZWRQYXJhbXMuYWxsb3dTbGlkZVByZXYpIHtcbiAgICAgIHRoaXMuc3dpcGVyUmVmLmFsbG93U2xpZGVQcmV2ID0gdGhpcy5hbGxvd1NsaWRlUHJldjtcbiAgICB9XG4gICAgaWYgKGNoYW5nZWRQYXJhbXMuZGlyZWN0aW9uKSB7XG4gICAgICB0aGlzLnN3aXBlclJlZi5jaGFuZ2VEaXJlY3Rpb24odGhpcy5kaXJlY3Rpb24sIGZhbHNlKTtcbiAgICB9XG4gICAgaWYgKGNoYW5nZWRQYXJhbXMuYnJlYWtwb2ludHMpIHtcbiAgICAgIGlmICh0aGlzLmxvb3AgJiYgIXRoaXMubG9vcGVkU2xpZGVzKSB7XG4gICAgICAgIHRoaXMuY2FsY0xvb3BlZFNsaWRlcygpO1xuICAgICAgfVxuICAgICAgdGhpcy5zd2lwZXJSZWYuY3VycmVudEJyZWFrcG9pbnQgPSBudWxsO1xuICAgICAgdGhpcy5zd2lwZXJSZWYuc2V0QnJlYWtwb2ludCgpO1xuICAgIH1cbiAgICB0aGlzLnN3aXBlclJlZi51cGRhdGUoKTtcbiAgfVxuXG4gIGNhbGNMb29wZWRTbGlkZXMoKSB7XG4gICAgaWYgKCF0aGlzLmxvb3ApIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgbGV0IHNsaWRlc1BlclZpZXdQYXJhbXMgPSB0aGlzLnNsaWRlc1BlclZpZXc7XG4gICAgaWYgKHRoaXMuYnJlYWtwb2ludHMpIHtcbiAgICAgIGNvbnN0IGJyZWFrcG9pbnQgPSBTd2lwZXIucHJvdG90eXBlLmdldEJyZWFrcG9pbnQodGhpcy5icmVha3BvaW50cyk7XG4gICAgICBjb25zdCBicmVha3BvaW50T25seVBhcmFtcyA9XG4gICAgICAgIGJyZWFrcG9pbnQgaW4gdGhpcy5icmVha3BvaW50cyA/IHRoaXMuYnJlYWtwb2ludHNbYnJlYWtwb2ludF0gOiB1bmRlZmluZWQ7XG4gICAgICBpZiAoYnJlYWtwb2ludE9ubHlQYXJhbXMgJiYgYnJlYWtwb2ludE9ubHlQYXJhbXMuc2xpZGVzUGVyVmlldykge1xuICAgICAgICBzbGlkZXNQZXJWaWV3UGFyYW1zID0gYnJlYWtwb2ludE9ubHlQYXJhbXMuc2xpZGVzUGVyVmlldztcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKHNsaWRlc1BlclZpZXdQYXJhbXMgPT09ICdhdXRvJykge1xuICAgICAgdGhpcy5sb29wZWRTbGlkZXMgPSB0aGlzLnNsaWRlcy5sZW5ndGg7XG4gICAgICByZXR1cm4gdGhpcy5zbGlkZXMubGVuZ3RoO1xuICAgIH1cbiAgICBsZXQgbG9vcGVkU2xpZGVzID0gdGhpcy5sb29wZWRTbGlkZXMgfHwgc2xpZGVzUGVyVmlld1BhcmFtcztcblxuICAgIGxvb3BlZFNsaWRlcyArPSB0aGlzLmxvb3BBZGRpdGlvbmFsU2xpZGVzO1xuXG4gICAgaWYgKGxvb3BlZFNsaWRlcyA+IHRoaXMuc2xpZGVzLmxlbmd0aCkge1xuICAgICAgbG9vcGVkU2xpZGVzID0gdGhpcy5zbGlkZXMubGVuZ3RoO1xuICAgIH1cbiAgICB0aGlzLmxvb3BlZFNsaWRlcyA9IGxvb3BlZFNsaWRlcztcbiAgICByZXR1cm4gbG9vcGVkU2xpZGVzO1xuICB9XG5cbiAgdXBkYXRlUGFyYW1ldGVyKGtleSwgdmFsdWUpIHtcbiAgICBpZiAoISh0aGlzLnN3aXBlclJlZiAmJiAhdGhpcy5zd2lwZXJSZWYuZGVzdHJveWVkKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjb25zdCBfa2V5ID0ga2V5LnJlcGxhY2UoL15fLywgJycpO1xuICAgIGlmIChPYmplY3Qua2V5cyh0aGlzLnN3aXBlclJlZi5tb2R1bGVzKS5pbmRleE9mKF9rZXkpID49IDApIHtcbiAgICAgIGV4dGVuZCh2YWx1ZSwgdGhpcy5zd2lwZXJSZWYubW9kdWxlc1tfa2V5XS5wYXJhbXNbX2tleV0pO1xuICAgIH1cbiAgICBpZiAoaXNPYmplY3QodGhpcy5zd2lwZXJSZWYucGFyYW1zW19rZXldKSAmJiBpc09iamVjdCh2YWx1ZSkpIHtcbiAgICAgIGV4dGVuZCh0aGlzLnN3aXBlclJlZi5wYXJhbXNbX2tleV0sIHZhbHVlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5zd2lwZXJSZWYucGFyYW1zW19rZXldID0gdmFsdWU7XG4gICAgfVxuICB9XG5cbiAgc2V0SW5kZXgoaW5kZXg6IG51bWJlciwgc3BlZWQ/OiBudW1iZXIsIHNpbGVudD86IGJvb2xlYW4pOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMuc3dpcGVyUmVmKSB7XG4gICAgICB0aGlzLmluaXRpYWxTbGlkZSA9IGluZGV4O1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAoaW5kZXggPT09IHRoaXMuc3dpcGVyUmVmLnJlYWxJbmRleCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLnpvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xuICAgICAgaWYgKHRoaXMubG9vcCkge1xuICAgICAgICB0aGlzLnN3aXBlclJlZi5zbGlkZVRvTG9vcChpbmRleCwgc3BlZWQsICFzaWxlbnQpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5zd2lwZXJSZWYuc2xpZGVUbyhpbmRleCwgc3BlZWQsICFzaWxlbnQpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy5zd2lwZXJSZWYuZGVzdHJveSgpO1xuICB9XG59XG4iXX0=