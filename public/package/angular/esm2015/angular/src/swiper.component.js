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
        this.showNavigation = true;
        this.showPagination = true;
        this.showScrollbar = true;
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
        var _a, _b, _c, _d;
        const currentNext = typeof this._navigation !== 'boolean' ? (_a = this._navigation) === null || _a === void 0 ? void 0 : _a.nextEl : null;
        const currentPrev = typeof this._navigation !== 'boolean' ? (_b = this._navigation) === null || _b === void 0 ? void 0 : _b.prevEl : null;
        this._navigation = setProperty(val, {
            nextEl: currentNext || null,
            prevEl: currentPrev || null,
        });
        if (typeof this._navigation !== 'boolean' &&
            (typeof ((_c = this._navigation) === null || _c === void 0 ? void 0 : _c.nextEl) === 'string' || typeof ((_d = this._navigation) === null || _d === void 0 ? void 0 : _d.prevEl) === 'string')) {
            this.showNavigation = false;
        }
    }
    get navigation() {
        return this._navigation;
    }
    set pagination(val) {
        var _a, _b;
        const current = typeof this._pagination !== 'boolean' ? (_a = this._pagination) === null || _a === void 0 ? void 0 : _a.el : null;
        this._pagination = setProperty(val, {
            el: current || null,
        });
        if (typeof this._pagination !== 'boolean' && typeof ((_b = this._pagination) === null || _b === void 0 ? void 0 : _b.el) === 'string') {
            this.showPagination = false;
        }
    }
    get pagination() {
        return this._pagination;
    }
    set scrollbar(val) {
        var _a, _b;
        const current = typeof this._scrollbar !== 'boolean' ? (_a = this._scrollbar) === null || _a === void 0 ? void 0 : _a.el : null;
        this._scrollbar = setProperty(val, {
            el: current || null,
        });
        if (typeof this._scrollbar !== 'boolean' && typeof ((_b = this._scrollbar) === null || _b === void 0 ? void 0 : _b.el) === 'string') {
            this.showScrollbar = false;
        }
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
        var _a;
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
        if (this.swiperRef) {
            (_a = this.swiperRef) === null || _a === void 0 ? void 0 : _a.destroy();
            this.initSwiper();
        }
        this._changeDetectorRef.markForCheck();
    }
    get activeSlides() {
        if (this.virtual) {
            return this._activeSlides;
        }
        return of(this.slides);
    }
    _setElement(el, ref, update, key = 'el') {
        if (!el || !ref) {
            return;
        }
        if (ref && el.nativeElement) {
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
                    const extendWith = {
                        cache: false,
                        renderExternal: (data) => {
                            this.updateVirtualSlides(data);
                        },
                        renderExternalUpdate: false,
                    };
                    extend(swiper.params.virtual, extendWith);
                    extend(swiper.originalParams.virtual, extendWith);
                }
                this._changeDetectorRef.detectChanges();
            },
            _slideClass: (_, el, classNames) => {
                const slideIndex = parseInt(el.getAttribute('data-swiper-slide-index'));
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
        var _a;
        (_a = this.swiperRef) === null || _a === void 0 ? void 0 : _a.destroy();
    }
}
SwiperComponent.decorators = [
    { type: Component, args: [{
                selector: 'swiper, [swiper]',
                template: "<ng-content select=\"[slot=container-start]\"></ng-content>\n<ng-container *ngIf=\"navigation && showNavigation\">\n  <div class=\"swiper-button-prev\" #prevElRef></div>\n  <div class=\"swiper-button-next\" #nextElRef></div>\n</ng-container>\n<div *ngIf=\"scrollbar && showScrollbar\" class=\"swiper-scrollbar\" #scrollbarElRef></div>\n<div *ngIf=\"pagination && showPagination\" class=\"swiper-pagination\" #paginationElRef></div>\n<div [ngClass]=\"wrapperClass\">\n  <ng-content select=\"[slot=wrapper-start]\"></ng-content>\n  <ng-template\n    *ngTemplateOutlet=\"\n      slidesTemplate;\n      context: {\n        loopSlides: prependSlides,\n        key: 'prepend'\n      }\n    \"\n  ></ng-template>\n  <ng-template\n    *ngTemplateOutlet=\"\n      slidesTemplate;\n      context: {\n        loopSlides: activeSlides,\n        key: ''\n      }\n    \"\n  ></ng-template>\n  <ng-template\n    *ngTemplateOutlet=\"\n      slidesTemplate;\n      context: {\n        loopSlides: appendSlides,\n        key: 'append'\n      }\n    \"\n  ></ng-template>\n  <ng-content select=\"[slot=wrapper-end]\"></ng-content>\n</div>\n<ng-content select=\"[slot=container-end]\"></ng-content>\n\n<ng-template #slidesTemplate let-loopSlides=\"loopSlides\" let-slideKey=\"key\">\n  <div\n    *ngFor=\"let slide of loopSlides | async\"\n    [ngClass]=\"slide.classNames + ' ' + (slideKey !== '' ? slideDuplicateClass : '')\"\n    [attr.data-swiper-slide-index]=\"slide.virtualIndex ? slide.virtualIndex : slide.slideIndex\"\n    [style]=\"style\"\n    [ngSwitch]=\"slide.zoom\"\n  >\n    <div *ngSwitchCase=\"true\" class=\"swiper-zoom-container\">\n      <ng-template\n        [ngTemplateOutlet]=\"slide.template\"\n        [ngTemplateOutletContext]=\"{\n          $implicit: slide.slideData\n        }\"\n      ></ng-template>\n    </div>\n    <ng-container *ngSwitchDefault>\n      <ng-template\n        [ngTemplateOutlet]=\"slide.template\"\n        [ngTemplateOutletContext]=\"{\n          $implicit: slide.slideData\n        }\"\n      ></ng-template>\n    </ng-container>\n  </div>\n</ng-template>\n",
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3dpcGVyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9hbmd1bGFyL3NyYy9zd2lwZXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFDTCx1QkFBdUIsRUFDdkIsaUJBQWlCLEVBQ2pCLFNBQVMsRUFDVCxlQUFlLEVBQ2YsVUFBVSxFQUNWLFlBQVksRUFDWixXQUFXLEVBQ1gsS0FBSyxFQUNMLE1BQU0sRUFFTixNQUFNLEVBR04sU0FBUyxFQUNULGlCQUFpQixHQUNsQixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLE1BQU0sTUFBTSxhQUFhLENBQUM7QUFDakMsT0FBTyxFQUFjLEVBQUUsRUFBRSxPQUFPLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDL0MsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQ2hFLE9BQU8sRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLFdBQVcsRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQXNCakYsTUFBTSxPQUFPLGVBQWU7SUFtWTFCLFlBQ1UsSUFBWSxFQUNaLFVBQXNCLEVBQ3RCLGtCQUFxQztRQUZyQyxTQUFJLEdBQUosSUFBSSxDQUFRO1FBQ1osZUFBVSxHQUFWLFVBQVUsQ0FBWTtRQUN0Qix1QkFBa0IsR0FBbEIsa0JBQWtCLENBQW1CO1FBcll0QyxTQUFJLEdBQTBCLElBQUksQ0FBQztRQWdGbkMsZUFBVSxHQUFnQyxjQUFjLENBQUM7UUFVekQsaUJBQVksR0FBa0MsZ0JBQWdCLENBQUM7UUFvQ3hFLG1CQUFjLEdBQVksSUFBSSxDQUFDO1FBZ0IvQixtQkFBYyxHQUFZLElBQUksQ0FBQztRQWdCL0Isa0JBQWEsR0FBWSxJQUFJLENBQUM7UUFxQjlCLGtCQUFrQjtRQUNXLHdCQUFtQixHQUFvRCxJQUFJLFlBQVksRUFBTyxDQUFDO1FBQzVILGtCQUFrQjtRQUNXLHdCQUFtQixHQUFvRCxJQUFJLFlBQVksRUFBTyxDQUFDO1FBQzVILGtCQUFrQjtRQUNLLGtCQUFhLEdBQThDLElBQUksWUFBWSxFQUFPLENBQUM7UUFDMUcsa0JBQWtCO1FBQ0MsY0FBUyxHQUEwQyxJQUFJLFlBQVksRUFBTyxDQUFDO1FBQzlGLGtCQUFrQjtRQUNXLHdCQUFtQixHQUFvRCxJQUFJLFlBQVksRUFBTyxDQUFDO1FBQzVILGtCQUFrQjtRQUNHLGdCQUFXLEdBQTRDLElBQUksWUFBWSxFQUFPLENBQUM7UUFDcEcsa0JBQWtCO1FBQ0UsZUFBVSxHQUEyQyxJQUFJLFlBQVksRUFBTyxDQUFDO1FBQ2pHLGtCQUFrQjtRQUNPLG9CQUFlLEdBQWdELElBQUksWUFBWSxFQUFPLENBQUM7UUFDaEgsa0JBQWtCO1FBQ00sbUJBQWMsR0FBK0MsSUFBSSxZQUFZLEVBQU8sQ0FBQztRQUM3RyxrQkFBa0I7UUFDTyxvQkFBZSxHQUFnRCxJQUFJLFlBQVksRUFBTyxDQUFDO1FBQ2hILGtCQUFrQjtRQUNJLGlCQUFZLEdBQTZDLElBQUksWUFBWSxFQUFPLENBQUM7UUFDdkcsa0JBQWtCO1FBQ08sb0JBQWUsR0FBZ0QsSUFBSSxZQUFZLEVBQU8sQ0FBQztRQUNoSCxrQkFBa0I7UUFDTSxtQkFBYyxHQUErQyxJQUFJLFlBQVksRUFBTyxDQUFDO1FBQzdHLGtCQUFrQjtRQUNnQiw2QkFBd0IsR0FBeUQsSUFBSSxZQUFZLEVBQU8sQ0FBQztRQUMzSSxrQkFBa0I7UUFDZSw0QkFBdUIsR0FBd0QsSUFBSSxZQUFZLEVBQU8sQ0FBQztRQUN4SSxrQkFBa0I7UUFDSSxpQkFBWSxHQUE2QyxJQUFJLFlBQVksRUFBTyxDQUFDO1FBQ3ZHLGtCQUFrQjtRQUNTLHNCQUFpQixHQUFrRCxJQUFJLFlBQVksRUFBTyxDQUFDO1FBQ3RILGtCQUFrQjtRQUNELFlBQU8sR0FBd0MsSUFBSSxZQUFZLEVBQU8sQ0FBQztRQUN4RixrQkFBa0I7UUFDRyxnQkFBVyxHQUE0QyxJQUFJLFlBQVksRUFBTyxDQUFDO1FBQ3BHLGtCQUFrQjtRQUNLLGtCQUFhLEdBQThDLElBQUksWUFBWSxFQUFPLENBQUM7UUFDMUcsa0JBQWtCO1FBQ0MsY0FBUyxHQUEwQyxJQUFJLFlBQVksRUFBTyxDQUFDO1FBQzlGLGtCQUFrQjtRQUNFLGVBQVUsR0FBMkMsSUFBSSxZQUFZLEVBQU8sQ0FBQztRQUNqRyxrQkFBa0I7UUFDSSxpQkFBWSxHQUE2QyxJQUFJLFlBQVksRUFBTyxDQUFDO1FBQ3ZHLGtCQUFrQjtRQUNDLGNBQVMsR0FBMEMsSUFBSSxZQUFZLEVBQU8sQ0FBQztRQUM5RixrQkFBa0I7UUFDSyxrQkFBYSxHQUE4QyxJQUFJLFlBQVksRUFBTyxDQUFDO1FBQzFHLGtCQUFrQjtRQUNGLFdBQU0sR0FBdUMsSUFBSSxZQUFZLEVBQU8sQ0FBQztRQUNyRixrQkFBa0I7UUFDRSxlQUFVLEdBQTJDLElBQUksWUFBWSxFQUFPLENBQUM7UUFDakcsa0JBQWtCO1FBQ08sb0JBQWUsR0FBZ0QsSUFBSSxZQUFZLEVBQU8sQ0FBQztRQUNoSCxrQkFBa0I7UUFDUSxxQkFBZ0IsR0FBaUQsSUFBSSxZQUFZLEVBQU8sQ0FBQztRQUNuSCxrQkFBa0I7UUFDQyxjQUFTLEdBQTBDLElBQUksWUFBWSxFQUFPLENBQUM7UUFDOUYsa0JBQWtCO1FBQ1EscUJBQWdCLEdBQWlELElBQUksWUFBWSxFQUFPLENBQUM7UUFDbkgsa0JBQWtCO1FBQ1EscUJBQWdCLEdBQWlELElBQUksWUFBWSxFQUFPLENBQUM7UUFDbkgsa0JBQWtCO1FBQ1EscUJBQWdCLEdBQWlELElBQUksWUFBWSxFQUFPLENBQUM7UUFDbkgsa0JBQWtCO1FBQ1EscUJBQWdCLEdBQWlELElBQUksWUFBWSxFQUFPLENBQUM7UUFDbkgsa0JBQWtCO1FBQ1csd0JBQW1CLEdBQW9ELElBQUksWUFBWSxFQUFPLENBQUM7UUFDNUgsa0JBQWtCO1FBQ1EscUJBQWdCLEdBQWlELElBQUksWUFBWSxFQUFPLENBQUM7UUFDbkgsa0JBQWtCO1FBQ1UsdUJBQWtCLEdBQW1ELElBQUksWUFBWSxFQUFPLENBQUM7UUFDekgsa0JBQWtCO1FBQ1EscUJBQWdCLEdBQWlELElBQUksWUFBWSxFQUFPLENBQUM7UUFDbkgsa0JBQWtCO1FBQ1UsdUJBQWtCLEdBQW1ELElBQUksWUFBWSxFQUFPLENBQUM7UUFDekgsa0JBQWtCO1FBQ0UsZUFBVSxHQUEyQyxJQUFJLFlBQVksRUFBTyxDQUFDO1FBQ2pHLGtCQUFrQjtRQUNRLHFCQUFnQixHQUFpRCxJQUFJLFlBQVksRUFBTyxDQUFDO1FBQ25ILGtCQUFrQjtRQUNFLGVBQVUsR0FBMkMsSUFBSSxZQUFZLEVBQU8sQ0FBQztRQUNqRyxrQkFBa0I7UUFDUyxzQkFBaUIsR0FBa0QsSUFBSSxZQUFZLEVBQU8sQ0FBQztRQUN0SCxrQkFBa0I7UUFDQSxhQUFRLEdBQXlDLElBQUksWUFBWSxFQUFPLENBQUM7UUFDM0Ysa0JBQWtCO1FBQ0EsYUFBUSxHQUF5QyxJQUFJLFlBQVksRUFBTyxDQUFDO1FBQzNGLGtCQUFrQjtRQUNVLHVCQUFrQixHQUFtRCxJQUFJLFlBQVksRUFBTyxDQUFDO1FBQ3pILGtCQUFrQjtRQUNXLHdCQUFtQixHQUFvRCxJQUFJLFlBQVksRUFBTyxDQUFDO1FBQzVILGtCQUFrQjtRQUNZLHlCQUFvQixHQUFxRCxJQUFJLFlBQVksRUFBTyxDQUFDO1FBQy9ILGtCQUFrQjtRQUNPLG9CQUFlLEdBQWdELElBQUksWUFBWSxFQUFPLENBQUM7UUFDaEgsa0JBQWtCO1FBQ00sbUJBQWMsR0FBK0MsSUFBSSxZQUFZLEVBQU8sQ0FBQztRQUM3RyxrQkFBa0I7UUFDSyxrQkFBYSxHQUE4QyxJQUFJLFlBQVksRUFBTyxDQUFDO1FBQzFHLGtCQUFrQjtRQUNrQiwrQkFBMEIsR0FBMkQsSUFBSSxZQUFZLEVBQU8sQ0FBQztRQUNqSixrQkFBa0I7UUFDb0IsaUNBQTRCLEdBQTZELElBQUksWUFBWSxFQUFPLENBQUM7UUFDdkosa0JBQWtCO1FBQ2dCLDZCQUF3QixHQUF5RCxJQUFJLFlBQVksRUFBTyxDQUFDO1FBQzNJLGtCQUFrQjtRQUNrQiwrQkFBMEIsR0FBMkQsSUFBSSxZQUFZLEVBQU8sQ0FBQztRQUNqSixrQkFBa0I7UUFDZ0IsNkJBQXdCLEdBQXlELElBQUksWUFBWSxFQUFPLENBQUM7UUFDM0ksa0JBQWtCO1FBQ2tCLCtCQUEwQixHQUEyRCxJQUFJLFlBQVksRUFBTyxDQUFDO1FBQ2pKLGtCQUFrQjtRQUNtQixnQ0FBMkIsR0FBNEQsSUFBSSxZQUFZLEVBQU8sQ0FBQztRQUNwSixrQkFBa0I7UUFDaUIsOEJBQXlCLEdBQTBELElBQUksWUFBWSxFQUFPLENBQUM7UUFDOUksa0JBQWtCO1FBQ0ksaUJBQVksR0FBNkMsSUFBSSxZQUFZLEVBQU8sQ0FBQztRQUN2RyxrQkFBa0I7UUFDUyxzQkFBaUIsR0FBa0QsSUFBSSxZQUFZLEVBQU8sQ0FBQztRQUN0SCxrQkFBa0I7UUFDWSx5QkFBb0IsR0FBcUQsSUFBSSxZQUFZLEVBQU8sQ0FBQztRQUMvSCxrQkFBa0I7UUFDZ0IsNkJBQXdCLEdBQXlELElBQUksWUFBWSxFQUFPLENBQUM7UUFDM0ksa0JBQWtCO1FBQ2MsMkJBQXNCLEdBQXVELElBQUksWUFBWSxFQUFPLENBQUM7UUFDckksa0JBQWtCO1FBQ1Msc0JBQWlCLEdBQWtELElBQUksWUFBWSxFQUFPLENBQUM7UUFDdEgsa0JBQWtCO1FBQ0gsVUFBSyxHQUFzQyxJQUFJLFlBQVksRUFBTyxDQUFDO1FBQ2xGLGtCQUFrQjtRQUNBLGFBQVEsR0FBeUMsSUFBSSxZQUFZLEVBQU8sQ0FBQztRQUMzRixrQkFBa0I7UUFDRSxlQUFVLEdBQTJDLElBQUksWUFBWSxFQUFPLENBQUM7UUFDakcsa0JBQWtCO1FBQ0csZ0JBQVcsR0FBNEMsSUFBSSxZQUFZLEVBQU8sQ0FBQztRQUNwRyxrQkFBa0I7UUFDVyx3QkFBbUIsR0FBb0QsSUFBSSxZQUFZLEVBQU8sQ0FBQztRQUM1SCxrQkFBa0I7UUFDSSxpQkFBWSxHQUE2QyxJQUFJLFlBQVksRUFBTyxDQUFDO1FBQ3ZHLGtCQUFrQjtRQUNPLG9CQUFlLEdBQWdELElBQUksWUFBWSxFQUFPLENBQUM7UUFDaEgsa0JBQWtCO1FBQ1Msc0JBQWlCLEdBQWtELElBQUksWUFBWSxFQUFPLENBQUM7UUFDdEgsa0JBQWtCO1FBQ0EsYUFBUSxHQUF5QyxJQUFJLFlBQVksRUFBTyxDQUFDO1FBQzNGLGtCQUFrQjtRQUNJLGlCQUFZLEdBQTZDLElBQUksWUFBWSxFQUFPLENBQUM7UUFDdkcsa0JBQWtCO1FBQ0EsYUFBUSxHQUFzQixJQUFJLFlBQVksRUFBTyxDQUFDO1FBRTlELGdCQUFXLEdBQUcsSUFBSSxZQUFZLEVBQVUsQ0FBQztRQTRDMUMsa0JBQWEsR0FBRyxJQUFJLE9BQU8sRUFBMEIsQ0FBQztRQVN6QyxxQkFBZ0IsR0FBRyxrQkFBa0IsQ0FBQztRQTBGNUQsVUFBSyxHQUFRLElBQUksQ0FBQztJQXJGZixDQUFDO0lBM1JKLElBQ0ksVUFBVSxDQUFDLEdBQUc7O1FBQ2hCLE1BQU0sV0FBVyxHQUFHLE9BQU8sSUFBSSxDQUFDLFdBQVcsS0FBSyxTQUFTLENBQUMsQ0FBQyxPQUFDLElBQUksQ0FBQyxXQUFXLDBDQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO1FBQzVGLE1BQU0sV0FBVyxHQUFHLE9BQU8sSUFBSSxDQUFDLFdBQVcsS0FBSyxTQUFTLENBQUMsQ0FBQyxPQUFDLElBQUksQ0FBQyxXQUFXLDBDQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO1FBQzVGLElBQUksQ0FBQyxXQUFXLEdBQUcsV0FBVyxDQUFDLEdBQUcsRUFBRTtZQUNsQyxNQUFNLEVBQUUsV0FBVyxJQUFJLElBQUk7WUFDM0IsTUFBTSxFQUFFLFdBQVcsSUFBSSxJQUFJO1NBQzVCLENBQUMsQ0FBQztRQUNILElBQ0UsT0FBTyxJQUFJLENBQUMsV0FBVyxLQUFLLFNBQVM7WUFDckMsQ0FBQyxjQUFPLElBQUksQ0FBQyxXQUFXLDBDQUFFLE1BQU0sQ0FBQSxLQUFLLFFBQVEsSUFBSSxjQUFPLElBQUksQ0FBQyxXQUFXLDBDQUFFLE1BQU0sQ0FBQSxLQUFLLFFBQVEsQ0FBQyxFQUM5RjtZQUNBLElBQUksQ0FBQyxjQUFjLEdBQUcsS0FBSyxDQUFDO1NBQzdCO0lBQ0gsQ0FBQztJQUNELElBQUksVUFBVTtRQUNaLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQztJQUMxQixDQUFDO0lBSUQsSUFDSSxVQUFVLENBQUMsR0FBRzs7UUFDaEIsTUFBTSxPQUFPLEdBQUcsT0FBTyxJQUFJLENBQUMsV0FBVyxLQUFLLFNBQVMsQ0FBQyxDQUFDLE9BQUMsSUFBSSxDQUFDLFdBQVcsMENBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7UUFDcEYsSUFBSSxDQUFDLFdBQVcsR0FBRyxXQUFXLENBQUMsR0FBRyxFQUFFO1lBQ2xDLEVBQUUsRUFBRSxPQUFPLElBQUksSUFBSTtTQUNwQixDQUFDLENBQUM7UUFDSCxJQUFJLE9BQU8sSUFBSSxDQUFDLFdBQVcsS0FBSyxTQUFTLElBQUksY0FBTyxJQUFJLENBQUMsV0FBVywwQ0FBRSxFQUFFLENBQUEsS0FBSyxRQUFRLEVBQUU7WUFDckYsSUFBSSxDQUFDLGNBQWMsR0FBRyxLQUFLLENBQUM7U0FDN0I7SUFDSCxDQUFDO0lBQ0QsSUFBSSxVQUFVO1FBQ1osT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFDO0lBQzFCLENBQUM7SUFJRCxJQUNJLFNBQVMsQ0FBQyxHQUFHOztRQUNmLE1BQU0sT0FBTyxHQUFHLE9BQU8sSUFBSSxDQUFDLFVBQVUsS0FBSyxTQUFTLENBQUMsQ0FBQyxPQUFDLElBQUksQ0FBQyxVQUFVLDBDQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO1FBQ2xGLElBQUksQ0FBQyxVQUFVLEdBQUcsV0FBVyxDQUFDLEdBQUcsRUFBRTtZQUNqQyxFQUFFLEVBQUUsT0FBTyxJQUFJLElBQUk7U0FDcEIsQ0FBQyxDQUFDO1FBQ0gsSUFBSSxPQUFPLElBQUksQ0FBQyxVQUFVLEtBQUssU0FBUyxJQUFJLGNBQU8sSUFBSSxDQUFDLFVBQVUsMENBQUUsRUFBRSxDQUFBLEtBQUssUUFBUSxFQUFFO1lBQ25GLElBQUksQ0FBQyxhQUFhLEdBQUcsS0FBSyxDQUFDO1NBQzVCO0lBQ0gsQ0FBQztJQUNELElBQUksU0FBUztRQUNYLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQztJQUN6QixDQUFDO0lBSUQsSUFDSSxPQUFPLENBQUMsR0FBRztRQUNiLElBQUksQ0FBQyxRQUFRLEdBQUcsV0FBVyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ25DLENBQUM7SUFDRCxJQUFJLE9BQU87UUFDVCxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUM7SUFDdkIsQ0FBQztJQUdELElBQ0ksS0FBSyxDQUFDLEtBQWE7UUFDckIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUN2QixDQUFDO0lBQ0QsSUFDSSxNQUFNLENBQUMsR0FBa0I7UUFDM0IsSUFBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUN2QixNQUFNLEVBQUUsTUFBTSxFQUFFLEdBQUcsU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ2xDLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLE1BQU0sQ0FBQyxDQUFDO0lBQzlCLENBQUM7SUE0SkQsSUFDSSxTQUFTLENBQUMsRUFBYztRQUMxQixJQUFJLENBQUMsV0FBVyxDQUFDLEVBQUUsRUFBRSxJQUFJLENBQUMsVUFBVSxFQUFFLFlBQVksRUFBRSxRQUFRLENBQUMsQ0FBQztJQUNoRSxDQUFDO0lBQ0QsSUFDSSxTQUFTLENBQUMsRUFBYztRQUMxQixJQUFJLENBQUMsV0FBVyxDQUFDLEVBQUUsRUFBRSxJQUFJLENBQUMsVUFBVSxFQUFFLFlBQVksRUFBRSxRQUFRLENBQUMsQ0FBQztJQUNoRSxDQUFDO0lBQ0QsSUFDSSxjQUFjLENBQUMsRUFBYztRQUMvQixJQUFJLENBQUMsV0FBVyxDQUFDLEVBQUUsRUFBRSxJQUFJLENBQUMsU0FBUyxFQUFFLFdBQVcsQ0FBQyxDQUFDO0lBQ3BELENBQUM7SUFDRCxJQUNJLGVBQWUsQ0FBQyxFQUFjO1FBQ2hDLElBQUksQ0FBQyxXQUFXLENBQUMsRUFBRSxFQUFFLElBQUksQ0FBQyxVQUFVLEVBQUUsWUFBWSxDQUFDLENBQUM7SUFDdEQsQ0FBQztJQUNELElBQ0ksUUFBUSxDQUFDLEdBQW9DOztRQUMvQyxJQUFJLENBQUMsTUFBTSxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxLQUEyQixFQUFFLEtBQWEsRUFBRSxFQUFFO1lBQ25FLEtBQUssQ0FBQyxVQUFVLEdBQUcsS0FBSyxDQUFDO1lBQ3pCLEtBQUssQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQztZQUNuQyxPQUFPLEtBQUssQ0FBQztRQUNmLENBQUMsQ0FBQyxDQUFDO1FBQ0gsSUFBSSxJQUFJLENBQUMsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRTtZQUNuQyxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztTQUN6QjtRQUNELElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFO1lBQ2pCLElBQUksQ0FBQyxhQUFhLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDO1lBQ25GLElBQUksQ0FBQyxZQUFZLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQztTQUNqRTtRQUNELElBQUksSUFBSSxDQUFDLFNBQVMsRUFBRTtZQUNsQixNQUFBLElBQUksQ0FBQyxTQUFTLDBDQUFFLE9BQU8sR0FBRztZQUMxQixJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7U0FDbkI7UUFDRCxJQUFJLENBQUMsa0JBQWtCLENBQUMsWUFBWSxFQUFFLENBQUM7SUFDekMsQ0FBQztJQVNELElBQUksWUFBWTtRQUNkLElBQUksSUFBSSxDQUFDLE9BQU8sRUFBRTtZQUNoQixPQUFPLElBQUksQ0FBQyxhQUFhLENBQUM7U0FDM0I7UUFDRCxPQUFPLEVBQUUsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDekIsQ0FBQztJQVNPLFdBQVcsQ0FBQyxFQUFjLEVBQUUsR0FBUSxFQUFFLE1BQWMsRUFBRSxHQUFHLEdBQUcsSUFBSTtRQUN0RSxJQUFJLENBQUMsRUFBRSxJQUFJLENBQUMsR0FBRyxFQUFFO1lBQ2YsT0FBTztTQUNSO1FBQ0QsSUFBSSxHQUFHLElBQUksRUFBRSxDQUFDLGFBQWEsRUFBRTtZQUMzQixJQUFJLEdBQUcsQ0FBQyxHQUFHLENBQUMsS0FBSyxFQUFFLENBQUMsYUFBYSxFQUFFO2dCQUNqQyxPQUFPO2FBQ1I7WUFDRCxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxDQUFDLGFBQWEsQ0FBQztTQUM3QjtRQUNELE1BQU0sU0FBUyxHQUFHLEVBQUUsQ0FBQztRQUNyQixTQUFTLENBQUMsTUFBTSxDQUFDLEdBQUcsSUFBSSxDQUFDO1FBQ3pCLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUNuQyxDQUFDO0lBQ0QsUUFBUTtRQUNOLE1BQU0sRUFBRSxNQUFNLEVBQUUsR0FBRyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDbkMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsTUFBTSxDQUFDLENBQUM7SUFDOUIsQ0FBQztJQUVELGVBQWU7UUFDYixJQUFJLElBQUksQ0FBQyxJQUFJLEVBQUU7WUFDYixJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7WUFDbEIsSUFBSSxDQUFDLGtCQUFrQixDQUFDLGFBQWEsRUFBRSxDQUFDO1NBQ3pDO0lBQ0gsQ0FBQztJQUVELFVBQVU7UUFDUixNQUFNLEVBQUUsTUFBTSxFQUFFLFlBQVksRUFBRSxZQUFZLEVBQUUsR0FBRyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDL0QsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsWUFBWSxDQUFDLENBQUM7UUFDbEMsWUFBWSxDQUFDLEtBQUssR0FBRyxDQUFDLEtBQUssRUFBRSxHQUFHLElBQUksRUFBRSxFQUFFO1lBQ3RDLE1BQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxLQUFLLEtBQUssRUFBRSxDQUFzQixDQUFDO1lBQ3hELElBQUksT0FBTyxFQUFFO2dCQUNYLE9BQU8sQ0FBQyxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQzthQUN2QjtRQUNILENBQUMsQ0FBQztRQUVGLE1BQU0sQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLEVBQUUsRUFBRTtZQUM3QixXQUFXLEVBQUUsR0FBRyxFQUFFO2dCQUNoQixJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBQ2xELENBQUM7WUFDRCxpQkFBaUIsQ0FBQyxNQUFNLEVBQUUsT0FBTztnQkFDL0IsSUFBSSxDQUFDLGdCQUFnQixHQUFHLE9BQU8sQ0FBQztZQUNsQyxDQUFDO1lBQ0QsT0FBTyxFQUFFLENBQUMsTUFBTSxFQUFFLEVBQUU7Z0JBQ2xCLElBQUksQ0FBQyxTQUFTLEdBQUcsTUFBTSxDQUFDO2dCQUN4QixJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7Z0JBQ25DLE1BQU0sQ0FBQyxVQUFVLEdBQUcsR0FBRyxFQUFFLEdBQUUsQ0FBQyxDQUFDO2dCQUM3QixNQUFNLENBQUMsV0FBVyxHQUFHLEdBQUcsRUFBRSxHQUFFLENBQUMsQ0FBQztnQkFDOUIsSUFBSSxZQUFZLENBQUMsSUFBSSxFQUFFO29CQUNyQixNQUFNLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUM7aUJBQ3pDO2dCQUNELElBQUksTUFBTSxDQUFDLE9BQU8sSUFBSSxNQUFNLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUU7b0JBQ25ELE1BQU0sQ0FBQyxPQUFPLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUM7b0JBQ3BDLE1BQU0sVUFBVSxHQUFHO3dCQUNqQixLQUFLLEVBQUUsS0FBSzt3QkFDWixjQUFjLEVBQUUsQ0FBQyxJQUFJLEVBQUUsRUFBRTs0QkFDdkIsSUFBSSxDQUFDLG1CQUFtQixDQUFDLElBQUksQ0FBQyxDQUFDO3dCQUNqQyxDQUFDO3dCQUNELG9CQUFvQixFQUFFLEtBQUs7cUJBQzVCLENBQUM7b0JBQ0YsTUFBTSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLFVBQVUsQ0FBQyxDQUFDO29CQUMxQyxNQUFNLENBQUMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxPQUFPLEVBQUUsVUFBVSxDQUFDLENBQUM7aUJBQ25EO2dCQUNELElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxhQUFhLEVBQUUsQ0FBQztZQUMxQyxDQUFDO1lBQ0QsV0FBVyxFQUFFLENBQUMsQ0FBQyxFQUFFLEVBQWUsRUFBRSxVQUFVLEVBQUUsRUFBRTtnQkFDOUMsTUFBTSxVQUFVLEdBQUcsUUFBUSxDQUFDLEVBQUUsQ0FBQyxZQUFZLENBQUMseUJBQXlCLENBQUMsQ0FBQyxDQUFDO2dCQUN4RSxJQUFJLElBQUksQ0FBQyxPQUFPLEVBQUU7b0JBQ2hCLE1BQU0sWUFBWSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUU7d0JBQzdDLE9BQU8sSUFBSSxDQUFDLFlBQVksSUFBSSxJQUFJLENBQUMsWUFBWSxLQUFLLFVBQVUsQ0FBQztvQkFDL0QsQ0FBQyxDQUFDLENBQUM7b0JBQ0gsSUFBSSxZQUFZLEVBQUU7d0JBQ2hCLFlBQVksQ0FBQyxVQUFVLEdBQUcsVUFBVSxDQUFDO3dCQUNyQyxPQUFPO3FCQUNSO2lCQUNGO2dCQUNELElBQUksQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLENBQUMsVUFBVSxHQUFHLFVBQVUsQ0FBQztnQkFDaEQsSUFBSSxDQUFDLGtCQUFrQixDQUFDLGFBQWEsRUFBRSxDQUFDO1lBQzFDLENBQUM7U0FDRixDQUFDLENBQUM7UUFDSCxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLGFBQWEsRUFBRSxZQUFZLENBQUMsQ0FBQztJQUMxRCxDQUFDO0lBSU8sbUJBQW1CLENBQUMsV0FBZ0I7UUFDMUMseUJBQXlCO1FBQ3pCLElBQ0UsQ0FBQyxJQUFJLENBQUMsU0FBUztZQUNmLENBQUMsSUFBSSxDQUFDLGtCQUFrQjtnQkFDdEIsSUFBSSxDQUFDLGtCQUFrQixDQUFDLElBQUksS0FBSyxXQUFXLENBQUMsSUFBSTtnQkFDakQsSUFBSSxDQUFDLGtCQUFrQixDQUFDLEVBQUUsS0FBSyxXQUFXLENBQUMsRUFBRTtnQkFDN0MsSUFBSSxDQUFDLGtCQUFrQixDQUFDLE1BQU0sS0FBSyxXQUFXLENBQUMsTUFBTSxDQUFDLEVBQ3hEO1lBQ0EsT0FBTztTQUNSO1FBQ0QsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLFlBQVksRUFBRTtZQUN4QyxDQUFDLENBQUM7Z0JBQ0UsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsRUFBRSxHQUFHLFdBQVcsQ0FBQyxNQUFNLElBQUk7YUFDNUU7WUFDSCxDQUFDLENBQUM7Z0JBQ0UsR0FBRyxFQUFFLEdBQUcsV0FBVyxDQUFDLE1BQU0sSUFBSTthQUMvQixDQUFDO1FBQ04sSUFBSSxDQUFDLGtCQUFrQixHQUFHLFdBQVcsQ0FBQztRQUN0QyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDNUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLGFBQWEsRUFBRSxDQUFDO1FBQ3hDLElBQUksQ0FBQyxTQUFTLENBQUMsWUFBWSxFQUFFLENBQUM7UUFDOUIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxjQUFjLEVBQUUsQ0FBQztRQUNoQyxJQUFJLENBQUMsU0FBUyxDQUFDLG1CQUFtQixFQUFFLENBQUM7UUFDckMsSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEVBQUU7WUFDaEUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7U0FDNUI7UUFDRCxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDcEMsT0FBTztJQUNULENBQUM7SUFFRCxXQUFXLENBQUMsYUFBNEI7UUFDdEMsSUFBSSxDQUFDLFlBQVksQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUNqQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsYUFBYSxFQUFFLENBQUM7SUFDMUMsQ0FBQztJQUVELGdCQUFnQixDQUFDLGFBQWE7UUFDNUIsSUFBSSxDQUFDLENBQUMsYUFBYSxJQUFJLElBQUksQ0FBQyxTQUFTLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxFQUFFO1lBQ25FLE9BQU87U0FDUjtRQUNELE1BQU0sRUFDSixNQUFNLEVBQUUsYUFBYSxFQUNyQixVQUFVLEVBQ1YsVUFBVSxFQUNWLFNBQVMsRUFDVCxPQUFPLEVBQ1AsTUFBTSxHQUNQLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQztRQUVuQixJQUFJLGFBQWEsQ0FBQyxVQUFVLEVBQUU7WUFDNUIsSUFDRSxJQUFJLENBQUMsVUFBVTtnQkFDZixPQUFPLElBQUksQ0FBQyxVQUFVLEtBQUssU0FBUztnQkFDcEMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxFQUFFO2dCQUNsQixVQUFVO2dCQUNWLENBQUMsVUFBVSxDQUFDLEVBQUUsRUFDZDtnQkFDQSxJQUFJLENBQUMsZUFBZSxDQUFDLFlBQVksRUFBRSxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7Z0JBQ3BELFVBQVUsQ0FBQyxJQUFJLEVBQUUsQ0FBQztnQkFDbEIsVUFBVSxDQUFDLE1BQU0sRUFBRSxDQUFDO2dCQUNwQixVQUFVLENBQUMsTUFBTSxFQUFFLENBQUM7YUFDckI7aUJBQU07Z0JBQ0wsVUFBVSxDQUFDLE9BQU8sRUFBRSxDQUFDO2dCQUNyQixVQUFVLENBQUMsRUFBRSxHQUFHLElBQUksQ0FBQzthQUN0QjtTQUNGO1FBRUQsSUFBSSxhQUFhLENBQUMsU0FBUyxFQUFFO1lBQzNCLElBQ0UsSUFBSSxDQUFDLFNBQVM7Z0JBQ2QsT0FBTyxJQUFJLENBQUMsU0FBUyxLQUFLLFNBQVM7Z0JBQ25DLElBQUksQ0FBQyxTQUFTLENBQUMsRUFBRTtnQkFDakIsU0FBUztnQkFDVCxDQUFDLFNBQVMsQ0FBQyxFQUFFLEVBQ2I7Z0JBQ0EsSUFBSSxDQUFDLGVBQWUsQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO2dCQUNsRCxTQUFTLENBQUMsSUFBSSxFQUFFLENBQUM7Z0JBQ2pCLFNBQVMsQ0FBQyxVQUFVLEVBQUUsQ0FBQztnQkFDdkIsU0FBUyxDQUFDLFlBQVksRUFBRSxDQUFDO2FBQzFCO2lCQUFNO2dCQUNMLFNBQVMsQ0FBQyxPQUFPLEVBQUUsQ0FBQztnQkFDcEIsU0FBUyxDQUFDLEVBQUUsR0FBRyxJQUFJLENBQUM7YUFDckI7U0FDRjtRQUVELElBQUksYUFBYSxDQUFDLFVBQVUsRUFBRTtZQUM1QixJQUNFLElBQUksQ0FBQyxVQUFVO2dCQUNmLE9BQU8sSUFBSSxDQUFDLFVBQVUsS0FBSyxTQUFTO2dCQUNwQyxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU07Z0JBQ3RCLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTTtnQkFDdEIsVUFBVTtnQkFDVixDQUFDLFVBQVUsQ0FBQyxNQUFNO2dCQUNsQixDQUFDLFVBQVUsQ0FBQyxNQUFNLEVBQ2xCO2dCQUNBLElBQUksQ0FBQyxlQUFlLENBQUMsWUFBWSxFQUFFLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztnQkFDcEQsVUFBVSxDQUFDLElBQUksRUFBRSxDQUFDO2dCQUNsQixVQUFVLENBQUMsTUFBTSxFQUFFLENBQUM7YUFDckI7aUJBQU0sSUFBSSxVQUFVLENBQUMsTUFBTSxJQUFJLFVBQVUsQ0FBQyxNQUFNLEVBQUU7Z0JBQ2pELFVBQVUsQ0FBQyxPQUFPLEVBQUUsQ0FBQztnQkFDckIsVUFBVSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7Z0JBQ3pCLFVBQVUsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO2FBQzFCO1NBQ0Y7UUFDRCxJQUFJLGFBQWEsQ0FBQyxNQUFNLElBQUksSUFBSSxDQUFDLE1BQU0sSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRTtZQUM3RCxJQUFJLENBQUMsZUFBZSxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDNUMsTUFBTSxXQUFXLEdBQUcsTUFBTSxDQUFDLElBQUksRUFBRSxDQUFDO1lBQ2xDLElBQUksV0FBVztnQkFBRSxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQ3RDO1FBRUQsSUFBSSxhQUFhLENBQUMsVUFBVSxJQUFJLElBQUksQ0FBQyxVQUFVLElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLEVBQUU7WUFDMUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDO1NBQzdEO1FBRUQsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEVBQUUsQ0FBQztJQUMxQixDQUFDO0lBRUQsWUFBWSxDQUFDLGFBQWtDOztRQUM3QyxJQUFJLGFBQWEsQ0FBQyxNQUFNLEVBQUU7WUFDeEIsT0FBTztTQUNSO1FBQ0QsSUFBSSxDQUFDLENBQUMsYUFBYSxJQUFJLElBQUksQ0FBQyxTQUFTLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxFQUFFO1lBQ25FLE9BQU87U0FDUjtRQUNELEtBQUssTUFBTSxHQUFHLElBQUksYUFBYSxFQUFFO1lBQy9CLElBQUksaUJBQWlCLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRTtnQkFDdkMsU0FBUzthQUNWO1lBQ0QsTUFBTSxRQUFRLGVBQUcsYUFBYSxDQUFDLEdBQUcsQ0FBQywwQ0FBRSxZQUFZLG1DQUFJLGFBQWEsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUN4RSxJQUFJLENBQUMsZUFBZSxDQUFDLEdBQUcsRUFBRSxRQUFRLENBQUMsQ0FBQztTQUNyQztRQUVELElBQUksYUFBYSxDQUFDLGNBQWMsRUFBRTtZQUNoQyxJQUFJLENBQUMsU0FBUyxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDO1NBQ3JEO1FBQ0QsSUFBSSxhQUFhLENBQUMsY0FBYyxFQUFFO1lBQ2hDLElBQUksQ0FBQyxTQUFTLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUM7U0FDckQ7UUFDRCxJQUFJLGFBQWEsQ0FBQyxTQUFTLEVBQUU7WUFDM0IsSUFBSSxDQUFDLFNBQVMsQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxLQUFLLENBQUMsQ0FBQztTQUN2RDtRQUNELElBQUksYUFBYSxDQUFDLFdBQVcsRUFBRTtZQUM3QixJQUFJLElBQUksQ0FBQyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFO2dCQUNuQyxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQzthQUN6QjtZQUNELElBQUksQ0FBQyxTQUFTLENBQUMsaUJBQWlCLEdBQUcsSUFBSSxDQUFDO1lBQ3hDLElBQUksQ0FBQyxTQUFTLENBQUMsYUFBYSxFQUFFLENBQUM7U0FDaEM7UUFDRCxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sRUFBRSxDQUFDO0lBQzFCLENBQUM7SUFFRCxnQkFBZ0I7UUFDZCxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRTtZQUNkLE9BQU87U0FDUjtRQUNELElBQUksbUJBQW1CLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQztRQUM3QyxJQUFJLElBQUksQ0FBQyxXQUFXLEVBQUU7WUFDcEIsTUFBTSxVQUFVLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1lBQ3BFLE1BQU0sb0JBQW9CLEdBQ3hCLFVBQVUsSUFBSSxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUM7WUFDNUUsSUFBSSxvQkFBb0IsSUFBSSxvQkFBb0IsQ0FBQyxhQUFhLEVBQUU7Z0JBQzlELG1CQUFtQixHQUFHLG9CQUFvQixDQUFDLGFBQWEsQ0FBQzthQUMxRDtTQUNGO1FBQ0QsSUFBSSxtQkFBbUIsS0FBSyxNQUFNLEVBQUU7WUFDbEMsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQztZQUN2QyxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDO1NBQzNCO1FBQ0QsSUFBSSxZQUFZLEdBQUcsSUFBSSxDQUFDLFlBQVksSUFBSSxtQkFBbUIsQ0FBQztRQUU1RCxZQUFZLElBQUksSUFBSSxDQUFDLG9CQUFvQixDQUFDO1FBRTFDLElBQUksWUFBWSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFO1lBQ3JDLFlBQVksR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQztTQUNuQztRQUNELElBQUksQ0FBQyxZQUFZLEdBQUcsWUFBWSxDQUFDO1FBQ2pDLE9BQU8sWUFBWSxDQUFDO0lBQ3RCLENBQUM7SUFFRCxlQUFlLENBQUMsR0FBRyxFQUFFLEtBQUs7UUFDeEIsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLEVBQUU7WUFDbEQsT0FBTztTQUNSO1FBQ0QsTUFBTSxJQUFJLEdBQUcsR0FBRyxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDbkMsSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRTtZQUMxRCxNQUFNLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1NBQzFEO1FBQ0QsSUFBSSxRQUFRLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxRQUFRLENBQUMsS0FBSyxDQUFDLEVBQUU7WUFDNUQsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFFLEtBQUssQ0FBQyxDQUFDO1NBQzVDO2FBQU07WUFDTCxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxLQUFLLENBQUM7U0FDckM7SUFDSCxDQUFDO0lBRUQsUUFBUSxDQUFDLEtBQWEsRUFBRSxLQUFjLEVBQUUsTUFBZ0I7UUFDdEQsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUU7WUFDbkIsSUFBSSxDQUFDLFlBQVksR0FBRyxLQUFLLENBQUM7WUFDMUIsT0FBTztTQUNSO1FBQ0QsSUFBSSxLQUFLLEtBQUssSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLEVBQUU7WUFDdEMsT0FBTztTQUNSO1FBQ0QsSUFBSSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxHQUFHLEVBQUU7WUFDL0IsSUFBSSxJQUFJLENBQUMsSUFBSSxFQUFFO2dCQUNiLElBQUksQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDLEtBQUssRUFBRSxLQUFLLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQzthQUNuRDtpQkFBTTtnQkFDTCxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsS0FBSyxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUM7YUFDL0M7UUFDSCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFRCxXQUFXOztRQUNULE1BQUEsSUFBSSxDQUFDLFNBQVMsMENBQUUsT0FBTyxHQUFHO0lBQzVCLENBQUM7OztZQWhzQkYsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxrQkFBa0I7Z0JBQzVCLHNqRUFBc0M7Z0JBQ3RDLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO2dCQUMvQyxhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTt5QkFFbkM7Ozs7S0FJQzthQUVKOzs7WUFqQ0MsTUFBTTtZQUpOLFVBQVU7WUFIVixpQkFBaUI7OzttQkEwQ2hCLEtBQUs7d0JBQ0wsS0FBSztnQ0FDTCxLQUFLOzJCQUNMLEtBQUs7b0JBQ0wsS0FBSztzQkFDTCxLQUFLO21DQUNMLEtBQUs7cUJBQ0wsS0FBSztvQkFDTCxLQUFLO3FCQUNMLEtBQUs7NkNBQ0wsS0FBSzt3QkFDTCxLQUFLO2tCQUNMLEtBQUs7aUNBQ0wsS0FBSztpQ0FDTCxLQUFLO3VCQUNMLEtBQUs7K0JBQ0wsS0FBSztvQ0FDTCxLQUFLO3FDQUNMLEtBQUs7MENBQ0wsS0FBSzs0Q0FDTCxLQUFLOzZCQUNMLEtBQUs7c0NBQ0wsS0FBSzt5QkFDTCxLQUFLOzZCQUNMLEtBQUs7K0JBQ0wsS0FBSztxQkFDTCxLQUFLOzBCQUNMLEtBQUs7MkJBQ0wsS0FBSzs0QkFDTCxLQUFLOzhCQUNMLEtBQUs7a0NBQ0wsS0FBSzs2QkFDTCxLQUFLO2lDQUNMLEtBQUs7NkJBQ0wsS0FBSzttQ0FDTCxLQUFLO2lDQUNMLEtBQUs7Z0NBQ0wsS0FBSztrQ0FDTCxLQUFLO3VDQUNMLEtBQUs7NEJBQ0wsS0FBSzsyQkFDTCxLQUFLO3lCQUNMLEtBQUs7eUJBQ0wsS0FBSzs0QkFDTCxLQUFLOzBCQUNMLEtBQUs7eUJBQ0wsS0FBSzs4QkFDTCxLQUFLOzJCQUNMLEtBQUs7MkJBQ0wsS0FBSzs2QkFDTCxLQUFLO3dCQUNMLEtBQUs7dUNBQ0wsS0FBSzt1Q0FDTCxLQUFLOzRDQUNMLEtBQUs7a0NBQ0wsS0FBSztnQ0FDTCxLQUFLO3lCQUNMLEtBQUs7OEJBQ0wsS0FBSztrQ0FDTCxLQUFLO29DQUNMLEtBQUs7eUJBQ0wsS0FBSzs0QkFDTCxLQUFLO3VDQUNMLEtBQUs7a0NBQ0wsS0FBSzs0QkFDTCxLQUFLO2tDQUNMLEtBQUs7bUJBQ0wsS0FBSzttQ0FDTCxLQUFLOzJCQUNMLEtBQUs7cUNBQ0wsS0FBSztnQ0FDTCxLQUFLOzZCQUNMLEtBQUs7NkJBQ0wsS0FBSzsyQkFDTCxLQUFLO3dCQUNMLEtBQUs7NkJBQ0wsS0FBSztnQ0FDTCxLQUFLOytCQUNMLEtBQUs7cUNBQ0wsS0FBSzt5QkFDTCxLQUFLOzhCQUNMLEtBQUs7K0JBQ0wsS0FBSzt3Q0FDTCxLQUFLO2dDQUNMLEtBQUs7a0NBQ0wsS0FBSzs2QkFDTCxLQUFLO3NDQUNMLEtBQUs7NkJBQ0wsS0FBSztzQ0FDTCxLQUFLOzJCQUNMLEtBQUs7aUNBQ0wsS0FBSzttQkFDTCxLQUFLO3VCQUNMLEtBQUs7eUJBQ0wsS0FBSzs4QkFDTCxLQUFLO3lCQUNMLEtBQUs7eUJBQ0wsS0FBSzt5QkFDTCxLQUFLOzZCQUNMLEtBQUs7c0JBQ0wsS0FBSzt1QkFDTCxLQUFLO21CQUNMLEtBQUs7eUJBQ0wsS0FBSzt1QkFDTCxLQUFLO3FCQUNMLEtBQUs7bUJBQ0wsS0FBSzt5QkFDTCxLQUFLO3lCQXFCTCxLQUFLO3dCQWdCTCxLQUFLO3NCQWdCTCxLQUFLO29CQVNMLEtBQUs7cUJBSUwsS0FBSztrQ0FPTCxNQUFNLFNBQUMsbUJBQW1CO2tDQUUxQixNQUFNLFNBQUMsbUJBQW1COzRCQUUxQixNQUFNLFNBQUMsYUFBYTt3QkFFcEIsTUFBTSxTQUFDLFNBQVM7a0NBRWhCLE1BQU0sU0FBQyxtQkFBbUI7MEJBRTFCLE1BQU0sU0FBQyxXQUFXO3lCQUVsQixNQUFNLFNBQUMsVUFBVTs4QkFFakIsTUFBTSxTQUFDLGVBQWU7NkJBRXRCLE1BQU0sU0FBQyxjQUFjOzhCQUVyQixNQUFNLFNBQUMsZUFBZTsyQkFFdEIsTUFBTSxTQUFDLFlBQVk7OEJBRW5CLE1BQU0sU0FBQyxlQUFlOzZCQUV0QixNQUFNLFNBQUMsY0FBYzt1Q0FFckIsTUFBTSxTQUFDLHdCQUF3QjtzQ0FFL0IsTUFBTSxTQUFDLHVCQUF1QjsyQkFFOUIsTUFBTSxTQUFDLFlBQVk7Z0NBRW5CLE1BQU0sU0FBQyxpQkFBaUI7c0JBRXhCLE1BQU0sU0FBQyxPQUFPOzBCQUVkLE1BQU0sU0FBQyxXQUFXOzRCQUVsQixNQUFNLFNBQUMsYUFBYTt3QkFFcEIsTUFBTSxTQUFDLFNBQVM7eUJBRWhCLE1BQU0sU0FBQyxVQUFVOzJCQUVqQixNQUFNLFNBQUMsWUFBWTt3QkFFbkIsTUFBTSxTQUFDLFNBQVM7NEJBRWhCLE1BQU0sU0FBQyxhQUFhO3FCQUVwQixNQUFNLFNBQUMsTUFBTTt5QkFFYixNQUFNLFNBQUMsVUFBVTs4QkFFakIsTUFBTSxTQUFDLGVBQWU7K0JBRXRCLE1BQU0sU0FBQyxnQkFBZ0I7d0JBRXZCLE1BQU0sU0FBQyxTQUFTOytCQUVoQixNQUFNLFNBQUMsZ0JBQWdCOytCQUV2QixNQUFNLFNBQUMsZ0JBQWdCOytCQUV2QixNQUFNLFNBQUMsZ0JBQWdCOytCQUV2QixNQUFNLFNBQUMsZ0JBQWdCO2tDQUV2QixNQUFNLFNBQUMsbUJBQW1COytCQUUxQixNQUFNLFNBQUMsZ0JBQWdCO2lDQUV2QixNQUFNLFNBQUMsa0JBQWtCOytCQUV6QixNQUFNLFNBQUMsZ0JBQWdCO2lDQUV2QixNQUFNLFNBQUMsa0JBQWtCO3lCQUV6QixNQUFNLFNBQUMsVUFBVTsrQkFFakIsTUFBTSxTQUFDLGdCQUFnQjt5QkFFdkIsTUFBTSxTQUFDLFVBQVU7Z0NBRWpCLE1BQU0sU0FBQyxpQkFBaUI7dUJBRXhCLE1BQU0sU0FBQyxRQUFRO3VCQUVmLE1BQU0sU0FBQyxRQUFRO2lDQUVmLE1BQU0sU0FBQyxrQkFBa0I7a0NBRXpCLE1BQU0sU0FBQyxtQkFBbUI7bUNBRTFCLE1BQU0sU0FBQyxvQkFBb0I7OEJBRTNCLE1BQU0sU0FBQyxlQUFlOzZCQUV0QixNQUFNLFNBQUMsY0FBYzs0QkFFckIsTUFBTSxTQUFDLGFBQWE7eUNBRXBCLE1BQU0sU0FBQywwQkFBMEI7MkNBRWpDLE1BQU0sU0FBQyw0QkFBNEI7dUNBRW5DLE1BQU0sU0FBQyx3QkFBd0I7eUNBRS9CLE1BQU0sU0FBQywwQkFBMEI7dUNBRWpDLE1BQU0sU0FBQyx3QkFBd0I7eUNBRS9CLE1BQU0sU0FBQywwQkFBMEI7MENBRWpDLE1BQU0sU0FBQywyQkFBMkI7d0NBRWxDLE1BQU0sU0FBQyx5QkFBeUI7MkJBRWhDLE1BQU0sU0FBQyxZQUFZO2dDQUVuQixNQUFNLFNBQUMsaUJBQWlCO21DQUV4QixNQUFNLFNBQUMsb0JBQW9CO3VDQUUzQixNQUFNLFNBQUMsd0JBQXdCO3FDQUUvQixNQUFNLFNBQUMsc0JBQXNCO2dDQUU3QixNQUFNLFNBQUMsaUJBQWlCO29CQUV4QixNQUFNLFNBQUMsS0FBSzt1QkFFWixNQUFNLFNBQUMsUUFBUTt5QkFFZixNQUFNLFNBQUMsVUFBVTswQkFFakIsTUFBTSxTQUFDLFdBQVc7a0NBRWxCLE1BQU0sU0FBQyxtQkFBbUI7MkJBRTFCLE1BQU0sU0FBQyxZQUFZOzhCQUVuQixNQUFNLFNBQUMsZUFBZTtnQ0FFdEIsTUFBTSxTQUFDLGlCQUFpQjt1QkFFeEIsTUFBTSxTQUFDLFFBQVE7MkJBRWYsTUFBTSxTQUFDLFlBQVk7dUJBRW5CLE1BQU0sU0FBQyxRQUFROzBCQUVmLE1BQU07d0JBRU4sU0FBUyxTQUFDLFdBQVcsRUFBRSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUU7d0JBSXhDLFNBQVMsU0FBQyxXQUFXLEVBQUUsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFOzZCQUl4QyxTQUFTLFNBQUMsZ0JBQWdCLEVBQUUsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFOzhCQUk3QyxTQUFTLFNBQUMsaUJBQWlCLEVBQUUsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFO3VCQUk5QyxlQUFlLFNBQUMsb0JBQW9CLEVBQUUsRUFBRSxXQUFXLEVBQUUsSUFBSSxFQUFFOytCQW1DM0QsV0FBVyxTQUFDLE9BQU8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gIENvbXBvbmVudCxcbiAgQ29udGVudENoaWxkcmVuLFxuICBFbGVtZW50UmVmLFxuICBFdmVudEVtaXR0ZXIsXG4gIEhvc3RCaW5kaW5nLFxuICBJbnB1dCxcbiAgTmdab25lLFxuICBPbkluaXQsXG4gIE91dHB1dCxcbiAgUXVlcnlMaXN0LFxuICBTaW1wbGVDaGFuZ2VzLFxuICBWaWV3Q2hpbGQsXG4gIFZpZXdFbmNhcHN1bGF0aW9uLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCBTd2lwZXIgZnJvbSAnc3dpcGVyL2NvcmUnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgb2YsIFN1YmplY3QgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGdldFBhcmFtcyB9IGZyb20gJy4vdXRpbHMvZ2V0LXBhcmFtcyc7XG5pbXBvcnQgeyBTd2lwZXJTbGlkZURpcmVjdGl2ZSB9IGZyb20gJy4vc3dpcGVyLXNsaWRlLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBleHRlbmQsIGlzT2JqZWN0LCBzZXRQcm9wZXJ0eSwgaWdub3JlTmdPbkNoYW5nZXMgfSBmcm9tICcuL3V0aWxzL3V0aWxzJztcbmltcG9ydCB7XG4gIFN3aXBlck9wdGlvbnMsXG4gIFN3aXBlckV2ZW50cyxcbiAgTmF2aWdhdGlvbk9wdGlvbnMsXG4gIFBhZ2luYXRpb25PcHRpb25zLFxuICBTY3JvbGxiYXJPcHRpb25zLFxuICBWaXJ0dWFsT3B0aW9ucyxcbn0gZnJvbSAnc3dpcGVyL3R5cGVzJztcbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3N3aXBlciwgW3N3aXBlcl0nLFxuICB0ZW1wbGF0ZVVybDogJy4vc3dpcGVyLmNvbXBvbmVudC5odG1sJyxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gIHN0eWxlczogW1xuICAgIGBcbiAgICAgIHN3aXBlciB7XG4gICAgICAgIGRpc3BsYXk6IGJsb2NrO1xuICAgICAgfVxuICAgIGAsXG4gIF0sXG59KVxuZXhwb3J0IGNsYXNzIFN3aXBlckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIEBJbnB1dCgpIGluaXQ6IFN3aXBlck9wdGlvbnNbJ2luaXQnXSA9IHRydWU7XG4gIEBJbnB1dCgpIGRpcmVjdGlvbjogU3dpcGVyT3B0aW9uc1snZGlyZWN0aW9uJ107XG4gIEBJbnB1dCgpIHRvdWNoRXZlbnRzVGFyZ2V0OiBTd2lwZXJPcHRpb25zWyd0b3VjaEV2ZW50c1RhcmdldCddO1xuICBASW5wdXQoKSBpbml0aWFsU2xpZGU6IFN3aXBlck9wdGlvbnNbJ2luaXRpYWxTbGlkZSddO1xuICBASW5wdXQoKSBzcGVlZDogU3dpcGVyT3B0aW9uc1snc3BlZWQnXTtcbiAgQElucHV0KCkgY3NzTW9kZTogU3dpcGVyT3B0aW9uc1snY3NzTW9kZSddO1xuICBASW5wdXQoKSB1cGRhdGVPbldpbmRvd1Jlc2l6ZTogU3dpcGVyT3B0aW9uc1sndXBkYXRlT25XaW5kb3dSZXNpemUnXTtcbiAgQElucHV0KCkgbmVzdGVkOiBTd2lwZXJPcHRpb25zWyduZXN0ZWQnXTtcbiAgQElucHV0KCkgd2lkdGg6IFN3aXBlck9wdGlvbnNbJ3dpZHRoJ107XG4gIEBJbnB1dCgpIGhlaWdodDogU3dpcGVyT3B0aW9uc1snaGVpZ2h0J107XG4gIEBJbnB1dCgpIHByZXZlbnRJbnRlcmFjdGlvbk9uVHJhbnNpdGlvbjogU3dpcGVyT3B0aW9uc1sncHJldmVudEludGVyYWN0aW9uT25UcmFuc2l0aW9uJ107XG4gIEBJbnB1dCgpIHVzZXJBZ2VudDogU3dpcGVyT3B0aW9uc1sndXNlckFnZW50J107XG4gIEBJbnB1dCgpIHVybDogU3dpcGVyT3B0aW9uc1sndXJsJ107XG4gIEBJbnB1dCgpIGVkZ2VTd2lwZURldGVjdGlvbjogYm9vbGVhbiB8IHN0cmluZztcbiAgQElucHV0KCkgZWRnZVN3aXBlVGhyZXNob2xkOiBudW1iZXI7XG4gIEBJbnB1dCgpIGZyZWVNb2RlOiBTd2lwZXJPcHRpb25zWydmcmVlTW9kZSddO1xuICBASW5wdXQoKSBmcmVlTW9kZU1vbWVudHVtOiBTd2lwZXJPcHRpb25zWydmcmVlTW9kZU1vbWVudHVtJ107XG4gIEBJbnB1dCgpIGZyZWVNb2RlTW9tZW50dW1SYXRpbzogU3dpcGVyT3B0aW9uc1snZnJlZU1vZGVNb21lbnR1bVJhdGlvJ107XG4gIEBJbnB1dCgpIGZyZWVNb2RlTW9tZW50dW1Cb3VuY2U6IFN3aXBlck9wdGlvbnNbJ2ZyZWVNb2RlTW9tZW50dW1Cb3VuY2UnXTtcbiAgQElucHV0KCkgZnJlZU1vZGVNb21lbnR1bUJvdW5jZVJhdGlvOiBTd2lwZXJPcHRpb25zWydmcmVlTW9kZU1vbWVudHVtQm91bmNlUmF0aW8nXTtcbiAgQElucHV0KCkgZnJlZU1vZGVNb21lbnR1bVZlbG9jaXR5UmF0aW86IFN3aXBlck9wdGlvbnNbJ2ZyZWVNb2RlTW9tZW50dW1WZWxvY2l0eVJhdGlvJ107XG4gIEBJbnB1dCgpIGZyZWVNb2RlU3RpY2t5OiBTd2lwZXJPcHRpb25zWydmcmVlTW9kZVN0aWNreSddO1xuICBASW5wdXQoKSBmcmVlTW9kZU1pbmltdW1WZWxvY2l0eTogU3dpcGVyT3B0aW9uc1snZnJlZU1vZGVNaW5pbXVtVmVsb2NpdHknXTtcbiAgQElucHV0KCkgYXV0b0hlaWdodDogU3dpcGVyT3B0aW9uc1snYXV0b0hlaWdodCddO1xuICBASW5wdXQoKSBzZXRXcmFwcGVyU2l6ZTogU3dpcGVyT3B0aW9uc1snc2V0V3JhcHBlclNpemUnXTtcbiAgQElucHV0KCkgdmlydHVhbFRyYW5zbGF0ZTogU3dpcGVyT3B0aW9uc1sndmlydHVhbFRyYW5zbGF0ZSddO1xuICBASW5wdXQoKSBlZmZlY3Q6IFN3aXBlck9wdGlvbnNbJ2VmZmVjdCddO1xuICBASW5wdXQoKSBicmVha3BvaW50czogU3dpcGVyT3B0aW9uc1snYnJlYWtwb2ludHMnXTtcbiAgQElucHV0KCkgc3BhY2VCZXR3ZWVuOiBTd2lwZXJPcHRpb25zWydzcGFjZUJldHdlZW4nXTtcbiAgQElucHV0KCkgc2xpZGVzUGVyVmlldzogU3dpcGVyT3B0aW9uc1snc2xpZGVzUGVyVmlldyddO1xuICBASW5wdXQoKSBzbGlkZXNQZXJDb2x1bW46IFN3aXBlck9wdGlvbnNbJ3NsaWRlc1BlckNvbHVtbiddO1xuICBASW5wdXQoKSBzbGlkZXNQZXJDb2x1bW5GaWxsOiBTd2lwZXJPcHRpb25zWydzbGlkZXNQZXJDb2x1bW5GaWxsJ107XG4gIEBJbnB1dCgpIHNsaWRlc1Blckdyb3VwOiBTd2lwZXJPcHRpb25zWydzbGlkZXNQZXJHcm91cCddO1xuICBASW5wdXQoKSBzbGlkZXNQZXJHcm91cFNraXA6IFN3aXBlck9wdGlvbnNbJ3NsaWRlc1Blckdyb3VwU2tpcCddO1xuICBASW5wdXQoKSBjZW50ZXJlZFNsaWRlczogU3dpcGVyT3B0aW9uc1snY2VudGVyZWRTbGlkZXMnXTtcbiAgQElucHV0KCkgY2VudGVyZWRTbGlkZXNCb3VuZHM6IFN3aXBlck9wdGlvbnNbJ2NlbnRlcmVkU2xpZGVzQm91bmRzJ107XG4gIEBJbnB1dCgpIHNsaWRlc09mZnNldEJlZm9yZTogU3dpcGVyT3B0aW9uc1snc2xpZGVzT2Zmc2V0QmVmb3JlJ107XG4gIEBJbnB1dCgpIHNsaWRlc09mZnNldEFmdGVyOiBTd2lwZXJPcHRpb25zWydzbGlkZXNPZmZzZXRBZnRlciddO1xuICBASW5wdXQoKSBub3JtYWxpemVTbGlkZUluZGV4OiBTd2lwZXJPcHRpb25zWydub3JtYWxpemVTbGlkZUluZGV4J107XG4gIEBJbnB1dCgpIGNlbnRlckluc3VmZmljaWVudFNsaWRlczogU3dpcGVyT3B0aW9uc1snY2VudGVySW5zdWZmaWNpZW50U2xpZGVzJ107XG4gIEBJbnB1dCgpIHdhdGNoT3ZlcmZsb3c6IFN3aXBlck9wdGlvbnNbJ3dhdGNoT3ZlcmZsb3cnXTtcbiAgQElucHV0KCkgcm91bmRMZW5ndGhzOiBTd2lwZXJPcHRpb25zWydyb3VuZExlbmd0aHMnXTtcbiAgQElucHV0KCkgdG91Y2hSYXRpbzogU3dpcGVyT3B0aW9uc1sndG91Y2hSYXRpbyddO1xuICBASW5wdXQoKSB0b3VjaEFuZ2xlOiBTd2lwZXJPcHRpb25zWyd0b3VjaEFuZ2xlJ107XG4gIEBJbnB1dCgpIHNpbXVsYXRlVG91Y2g6IFN3aXBlck9wdGlvbnNbJ3NpbXVsYXRlVG91Y2gnXTtcbiAgQElucHV0KCkgc2hvcnRTd2lwZXM6IFN3aXBlck9wdGlvbnNbJ3Nob3J0U3dpcGVzJ107XG4gIEBJbnB1dCgpIGxvbmdTd2lwZXM6IFN3aXBlck9wdGlvbnNbJ2xvbmdTd2lwZXMnXTtcbiAgQElucHV0KCkgbG9uZ1N3aXBlc1JhdGlvOiBTd2lwZXJPcHRpb25zWydsb25nU3dpcGVzUmF0aW8nXTtcbiAgQElucHV0KCkgbG9uZ1N3aXBlc01zOiBTd2lwZXJPcHRpb25zWydsb25nU3dpcGVzTXMnXTtcbiAgQElucHV0KCkgZm9sbG93RmluZ2VyOiBTd2lwZXJPcHRpb25zWydmb2xsb3dGaW5nZXInXTtcbiAgQElucHV0KCkgYWxsb3dUb3VjaE1vdmU6IFN3aXBlck9wdGlvbnNbJ2FsbG93VG91Y2hNb3ZlJ107XG4gIEBJbnB1dCgpIHRocmVzaG9sZDogU3dpcGVyT3B0aW9uc1sndGhyZXNob2xkJ107XG4gIEBJbnB1dCgpIHRvdWNoTW92ZVN0b3BQcm9wYWdhdGlvbjogU3dpcGVyT3B0aW9uc1sndG91Y2hNb3ZlU3RvcFByb3BhZ2F0aW9uJ107XG4gIEBJbnB1dCgpIHRvdWNoU3RhcnRQcmV2ZW50RGVmYXVsdDogU3dpcGVyT3B0aW9uc1sndG91Y2hTdGFydFByZXZlbnREZWZhdWx0J107XG4gIEBJbnB1dCgpIHRvdWNoU3RhcnRGb3JjZVByZXZlbnREZWZhdWx0OiBTd2lwZXJPcHRpb25zWyd0b3VjaFN0YXJ0Rm9yY2VQcmV2ZW50RGVmYXVsdCddO1xuICBASW5wdXQoKSB0b3VjaFJlbGVhc2VPbkVkZ2VzOiBTd2lwZXJPcHRpb25zWyd0b3VjaFJlbGVhc2VPbkVkZ2VzJ107XG4gIEBJbnB1dCgpIHVuaXF1ZU5hdkVsZW1lbnRzOiBTd2lwZXJPcHRpb25zWyd1bmlxdWVOYXZFbGVtZW50cyddO1xuICBASW5wdXQoKSByZXNpc3RhbmNlOiBTd2lwZXJPcHRpb25zWydyZXNpc3RhbmNlJ107XG4gIEBJbnB1dCgpIHJlc2lzdGFuY2VSYXRpbzogU3dpcGVyT3B0aW9uc1sncmVzaXN0YW5jZVJhdGlvJ107XG4gIEBJbnB1dCgpIHdhdGNoU2xpZGVzUHJvZ3Jlc3M6IFN3aXBlck9wdGlvbnNbJ3dhdGNoU2xpZGVzUHJvZ3Jlc3MnXTtcbiAgQElucHV0KCkgd2F0Y2hTbGlkZXNWaXNpYmlsaXR5OiBTd2lwZXJPcHRpb25zWyd3YXRjaFNsaWRlc1Zpc2liaWxpdHknXTtcbiAgQElucHV0KCkgZ3JhYkN1cnNvcjogU3dpcGVyT3B0aW9uc1snZ3JhYkN1cnNvciddO1xuICBASW5wdXQoKSBwcmV2ZW50Q2xpY2tzOiBTd2lwZXJPcHRpb25zWydwcmV2ZW50Q2xpY2tzJ107XG4gIEBJbnB1dCgpIHByZXZlbnRDbGlja3NQcm9wYWdhdGlvbjogU3dpcGVyT3B0aW9uc1sncHJldmVudENsaWNrc1Byb3BhZ2F0aW9uJ107XG4gIEBJbnB1dCgpIHNsaWRlVG9DbGlja2VkU2xpZGU6IFN3aXBlck9wdGlvbnNbJ3NsaWRlVG9DbGlja2VkU2xpZGUnXTtcbiAgQElucHV0KCkgcHJlbG9hZEltYWdlczogU3dpcGVyT3B0aW9uc1sncHJlbG9hZEltYWdlcyddO1xuICBASW5wdXQoKSB1cGRhdGVPbkltYWdlc1JlYWR5OiBTd2lwZXJPcHRpb25zWyd1cGRhdGVPbkltYWdlc1JlYWR5J107XG4gIEBJbnB1dCgpIGxvb3A6IFN3aXBlck9wdGlvbnNbJ2xvb3AnXTtcbiAgQElucHV0KCkgbG9vcEFkZGl0aW9uYWxTbGlkZXM6IFN3aXBlck9wdGlvbnNbJ2xvb3BBZGRpdGlvbmFsU2xpZGVzJ107XG4gIEBJbnB1dCgpIGxvb3BlZFNsaWRlczogU3dpcGVyT3B0aW9uc1snbG9vcGVkU2xpZGVzJ107XG4gIEBJbnB1dCgpIGxvb3BGaWxsR3JvdXBXaXRoQmxhbms6IFN3aXBlck9wdGlvbnNbJ2xvb3BGaWxsR3JvdXBXaXRoQmxhbmsnXTtcbiAgQElucHV0KCkgbG9vcFByZXZlbnRzU2xpZGU6IFN3aXBlck9wdGlvbnNbJ2xvb3BQcmV2ZW50c1NsaWRlJ107XG4gIEBJbnB1dCgpIGFsbG93U2xpZGVQcmV2OiBTd2lwZXJPcHRpb25zWydhbGxvd1NsaWRlUHJldiddO1xuICBASW5wdXQoKSBhbGxvd1NsaWRlTmV4dDogU3dpcGVyT3B0aW9uc1snYWxsb3dTbGlkZU5leHQnXTtcbiAgQElucHV0KCkgc3dpcGVIYW5kbGVyOiBTd2lwZXJPcHRpb25zWydzd2lwZUhhbmRsZXInXTtcbiAgQElucHV0KCkgbm9Td2lwaW5nOiBTd2lwZXJPcHRpb25zWydub1N3aXBpbmcnXTtcbiAgQElucHV0KCkgbm9Td2lwaW5nQ2xhc3M6IFN3aXBlck9wdGlvbnNbJ25vU3dpcGluZ0NsYXNzJ107XG4gIEBJbnB1dCgpIG5vU3dpcGluZ1NlbGVjdG9yOiBTd2lwZXJPcHRpb25zWydub1N3aXBpbmdTZWxlY3RvciddO1xuICBASW5wdXQoKSBwYXNzaXZlTGlzdGVuZXJzOiBTd2lwZXJPcHRpb25zWydwYXNzaXZlTGlzdGVuZXJzJ107XG4gIEBJbnB1dCgpIGNvbnRhaW5lck1vZGlmaWVyQ2xhc3M6IFN3aXBlck9wdGlvbnNbJ2NvbnRhaW5lck1vZGlmaWVyQ2xhc3MnXTtcbiAgQElucHV0KCkgc2xpZGVDbGFzczogU3dpcGVyT3B0aW9uc1snc2xpZGVDbGFzcyddID0gJ3N3aXBlci1zbGlkZSc7XG4gIEBJbnB1dCgpIHNsaWRlQmxhbmtDbGFzczogU3dpcGVyT3B0aW9uc1snc2xpZGVCbGFua0NsYXNzJ107XG4gIEBJbnB1dCgpIHNsaWRlQWN0aXZlQ2xhc3M6IFN3aXBlck9wdGlvbnNbJ3NsaWRlQWN0aXZlQ2xhc3MnXTtcbiAgQElucHV0KCkgc2xpZGVEdXBsaWNhdGVBY3RpdmVDbGFzczogU3dpcGVyT3B0aW9uc1snc2xpZGVEdXBsaWNhdGVBY3RpdmVDbGFzcyddO1xuICBASW5wdXQoKSBzbGlkZVZpc2libGVDbGFzczogU3dpcGVyT3B0aW9uc1snc2xpZGVWaXNpYmxlQ2xhc3MnXTtcbiAgQElucHV0KCkgc2xpZGVEdXBsaWNhdGVDbGFzczogU3dpcGVyT3B0aW9uc1snc2xpZGVEdXBsaWNhdGVDbGFzcyddO1xuICBASW5wdXQoKSBzbGlkZU5leHRDbGFzczogU3dpcGVyT3B0aW9uc1snc2xpZGVOZXh0Q2xhc3MnXTtcbiAgQElucHV0KCkgc2xpZGVEdXBsaWNhdGVOZXh0Q2xhc3M6IFN3aXBlck9wdGlvbnNbJ3NsaWRlRHVwbGljYXRlTmV4dENsYXNzJ107XG4gIEBJbnB1dCgpIHNsaWRlUHJldkNsYXNzOiBTd2lwZXJPcHRpb25zWydzbGlkZVByZXZDbGFzcyddO1xuICBASW5wdXQoKSBzbGlkZUR1cGxpY2F0ZVByZXZDbGFzczogU3dpcGVyT3B0aW9uc1snc2xpZGVEdXBsaWNhdGVQcmV2Q2xhc3MnXTtcbiAgQElucHV0KCkgd3JhcHBlckNsYXNzOiBTd2lwZXJPcHRpb25zWyd3cmFwcGVyQ2xhc3MnXSA9ICdzd2lwZXItd3JhcHBlcic7XG4gIEBJbnB1dCgpIHJ1bkNhbGxiYWNrc09uSW5pdDogU3dpcGVyT3B0aW9uc1sncnVuQ2FsbGJhY2tzT25Jbml0J107XG4gIEBJbnB1dCgpIGExMXk6IFN3aXBlck9wdGlvbnNbJ2ExMXknXTtcbiAgQElucHV0KCkgYXV0b3BsYXk6IFN3aXBlck9wdGlvbnNbJ2F1dG9wbGF5J107XG4gIEBJbnB1dCgpIGNvbnRyb2xsZXI6IFN3aXBlck9wdGlvbnNbJ2NvbnRyb2xsZXInXTtcbiAgQElucHV0KCkgY292ZXJmbG93RWZmZWN0OiBTd2lwZXJPcHRpb25zWydjb3ZlcmZsb3dFZmZlY3QnXTtcbiAgQElucHV0KCkgY3ViZUVmZmVjdDogU3dpcGVyT3B0aW9uc1snY3ViZUVmZmVjdCddO1xuICBASW5wdXQoKSBmYWRlRWZmZWN0OiBTd2lwZXJPcHRpb25zWydmYWRlRWZmZWN0J107XG4gIEBJbnB1dCgpIGZsaXBFZmZlY3Q6IFN3aXBlck9wdGlvbnNbJ2ZsaXBFZmZlY3QnXTtcbiAgQElucHV0KCkgaGFzaE5hdmlnYXRpb246IFN3aXBlck9wdGlvbnNbJ2hhc2hOYXZpZ2F0aW9uJ107XG4gIEBJbnB1dCgpIGhpc3Rvcnk6IFN3aXBlck9wdGlvbnNbJ2hpc3RvcnknXTtcbiAgQElucHV0KCkga2V5Ym9hcmQ6IFN3aXBlck9wdGlvbnNbJ2tleWJvYXJkJ107XG4gIEBJbnB1dCgpIGxhenk6IFN3aXBlck9wdGlvbnNbJ2xhenknXTtcbiAgQElucHV0KCkgbW91c2V3aGVlbDogU3dpcGVyT3B0aW9uc1snbW91c2V3aGVlbCddO1xuICBASW5wdXQoKSBwYXJhbGxheDogU3dpcGVyT3B0aW9uc1sncGFyYWxsYXgnXTtcbiAgQElucHV0KCkgdGh1bWJzOiBTd2lwZXJPcHRpb25zWyd0aHVtYnMnXTtcbiAgQElucHV0KCkgem9vbTogU3dpcGVyT3B0aW9uc1snem9vbSddO1xuICBASW5wdXQoKVxuICBzZXQgbmF2aWdhdGlvbih2YWwpIHtcbiAgICBjb25zdCBjdXJyZW50TmV4dCA9IHR5cGVvZiB0aGlzLl9uYXZpZ2F0aW9uICE9PSAnYm9vbGVhbicgPyB0aGlzLl9uYXZpZ2F0aW9uPy5uZXh0RWwgOiBudWxsO1xuICAgIGNvbnN0IGN1cnJlbnRQcmV2ID0gdHlwZW9mIHRoaXMuX25hdmlnYXRpb24gIT09ICdib29sZWFuJyA/IHRoaXMuX25hdmlnYXRpb24/LnByZXZFbCA6IG51bGw7XG4gICAgdGhpcy5fbmF2aWdhdGlvbiA9IHNldFByb3BlcnR5KHZhbCwge1xuICAgICAgbmV4dEVsOiBjdXJyZW50TmV4dCB8fCBudWxsLFxuICAgICAgcHJldkVsOiBjdXJyZW50UHJldiB8fCBudWxsLFxuICAgIH0pO1xuICAgIGlmIChcbiAgICAgIHR5cGVvZiB0aGlzLl9uYXZpZ2F0aW9uICE9PSAnYm9vbGVhbicgJiZcbiAgICAgICh0eXBlb2YgdGhpcy5fbmF2aWdhdGlvbj8ubmV4dEVsID09PSAnc3RyaW5nJyB8fCB0eXBlb2YgdGhpcy5fbmF2aWdhdGlvbj8ucHJldkVsID09PSAnc3RyaW5nJylcbiAgICApIHtcbiAgICAgIHRoaXMuc2hvd05hdmlnYXRpb24gPSBmYWxzZTtcbiAgICB9XG4gIH1cbiAgZ2V0IG5hdmlnYXRpb24oKSB7XG4gICAgcmV0dXJuIHRoaXMuX25hdmlnYXRpb247XG4gIH1cbiAgcHJpdmF0ZSBfbmF2aWdhdGlvbjogTmF2aWdhdGlvbk9wdGlvbnMgfCBib29sZWFuO1xuICBzaG93TmF2aWdhdGlvbjogYm9vbGVhbiA9IHRydWU7XG5cbiAgQElucHV0KClcbiAgc2V0IHBhZ2luYXRpb24odmFsKSB7XG4gICAgY29uc3QgY3VycmVudCA9IHR5cGVvZiB0aGlzLl9wYWdpbmF0aW9uICE9PSAnYm9vbGVhbicgPyB0aGlzLl9wYWdpbmF0aW9uPy5lbCA6IG51bGw7XG4gICAgdGhpcy5fcGFnaW5hdGlvbiA9IHNldFByb3BlcnR5KHZhbCwge1xuICAgICAgZWw6IGN1cnJlbnQgfHwgbnVsbCxcbiAgICB9KTtcbiAgICBpZiAodHlwZW9mIHRoaXMuX3BhZ2luYXRpb24gIT09ICdib29sZWFuJyAmJiB0eXBlb2YgdGhpcy5fcGFnaW5hdGlvbj8uZWwgPT09ICdzdHJpbmcnKSB7XG4gICAgICB0aGlzLnNob3dQYWdpbmF0aW9uID0gZmFsc2U7XG4gICAgfVxuICB9XG4gIGdldCBwYWdpbmF0aW9uKCkge1xuICAgIHJldHVybiB0aGlzLl9wYWdpbmF0aW9uO1xuICB9XG4gIHByaXZhdGUgX3BhZ2luYXRpb246IFBhZ2luYXRpb25PcHRpb25zIHwgYm9vbGVhbjtcbiAgc2hvd1BhZ2luYXRpb246IGJvb2xlYW4gPSB0cnVlO1xuXG4gIEBJbnB1dCgpXG4gIHNldCBzY3JvbGxiYXIodmFsKSB7XG4gICAgY29uc3QgY3VycmVudCA9IHR5cGVvZiB0aGlzLl9zY3JvbGxiYXIgIT09ICdib29sZWFuJyA/IHRoaXMuX3Njcm9sbGJhcj8uZWwgOiBudWxsO1xuICAgIHRoaXMuX3Njcm9sbGJhciA9IHNldFByb3BlcnR5KHZhbCwge1xuICAgICAgZWw6IGN1cnJlbnQgfHwgbnVsbCxcbiAgICB9KTtcbiAgICBpZiAodHlwZW9mIHRoaXMuX3Njcm9sbGJhciAhPT0gJ2Jvb2xlYW4nICYmIHR5cGVvZiB0aGlzLl9zY3JvbGxiYXI/LmVsID09PSAnc3RyaW5nJykge1xuICAgICAgdGhpcy5zaG93U2Nyb2xsYmFyID0gZmFsc2U7XG4gICAgfVxuICB9XG4gIGdldCBzY3JvbGxiYXIoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3Njcm9sbGJhcjtcbiAgfVxuICBwcml2YXRlIF9zY3JvbGxiYXI6IFNjcm9sbGJhck9wdGlvbnMgfCBib29sZWFuO1xuICBzaG93U2Nyb2xsYmFyOiBib29sZWFuID0gdHJ1ZTtcblxuICBASW5wdXQoKVxuICBzZXQgdmlydHVhbCh2YWwpIHtcbiAgICB0aGlzLl92aXJ0dWFsID0gc2V0UHJvcGVydHkodmFsKTtcbiAgfVxuICBnZXQgdmlydHVhbCgpIHtcbiAgICByZXR1cm4gdGhpcy5fdmlydHVhbDtcbiAgfVxuICBwcml2YXRlIF92aXJ0dWFsOiBWaXJ0dWFsT3B0aW9ucyB8IGJvb2xlYW47XG5cbiAgQElucHV0KClcbiAgc2V0IGluZGV4KGluZGV4OiBudW1iZXIpIHtcbiAgICB0aGlzLnNldEluZGV4KGluZGV4KTtcbiAgfVxuICBASW5wdXQoKVxuICBzZXQgY29uZmlnKHZhbDogU3dpcGVyT3B0aW9ucykge1xuICAgIHRoaXMudXBkYXRlU3dpcGVyKHZhbCk7XG4gICAgY29uc3QgeyBwYXJhbXMgfSA9IGdldFBhcmFtcyh2YWwpO1xuICAgIE9iamVjdC5hc3NpZ24odGhpcywgcGFyYW1zKTtcbiAgfVxuICAvLyBwcmV0dGllci1pZ25vcmVcbiAgQE91dHB1dCgnX2JlZm9yZUJyZWFrcG9pbnQnKSBzX19iZWZvcmVCcmVha3BvaW50OiBFdmVudEVtaXR0ZXI8U3dpcGVyRXZlbnRzWydfYmVmb3JlQnJlYWtwb2ludCddPiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICAvLyBwcmV0dGllci1pZ25vcmVcbiAgQE91dHB1dCgnX2NvbnRhaW5lckNsYXNzZXMnKSBzX19jb250YWluZXJDbGFzc2VzOiBFdmVudEVtaXR0ZXI8U3dpcGVyRXZlbnRzWydfY29udGFpbmVyQ2xhc3NlcyddPiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICAvLyBwcmV0dGllci1pZ25vcmVcbiAgQE91dHB1dCgnX3NsaWRlQ2xhc3MnKSBzX19zbGlkZUNsYXNzOiBFdmVudEVtaXR0ZXI8U3dpcGVyRXZlbnRzWydfc2xpZGVDbGFzcyddPiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICAvLyBwcmV0dGllci1pZ25vcmVcbiAgQE91dHB1dCgnX3N3aXBlcicpIHNfX3N3aXBlcjogRXZlbnRFbWl0dGVyPFN3aXBlckV2ZW50c1snX3N3aXBlciddPiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICAvLyBwcmV0dGllci1pZ25vcmVcbiAgQE91dHB1dCgnYWN0aXZlSW5kZXhDaGFuZ2UnKSBzX2FjdGl2ZUluZGV4Q2hhbmdlOiBFdmVudEVtaXR0ZXI8U3dpcGVyRXZlbnRzWydhY3RpdmVJbmRleENoYW5nZSddPiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICAvLyBwcmV0dGllci1pZ25vcmVcbiAgQE91dHB1dCgnYWZ0ZXJJbml0Jykgc19hZnRlckluaXQ6IEV2ZW50RW1pdHRlcjxTd2lwZXJFdmVudHNbJ2FmdGVySW5pdCddPiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICAvLyBwcmV0dGllci1pZ25vcmVcbiAgQE91dHB1dCgnYXV0b3BsYXknKSBzX2F1dG9wbGF5OiBFdmVudEVtaXR0ZXI8U3dpcGVyRXZlbnRzWydhdXRvcGxheSddPiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICAvLyBwcmV0dGllci1pZ25vcmVcbiAgQE91dHB1dCgnYXV0b3BsYXlTdGFydCcpIHNfYXV0b3BsYXlTdGFydDogRXZlbnRFbWl0dGVyPFN3aXBlckV2ZW50c1snYXV0b3BsYXlTdGFydCddPiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICAvLyBwcmV0dGllci1pZ25vcmVcbiAgQE91dHB1dCgnYXV0b3BsYXlTdG9wJykgc19hdXRvcGxheVN0b3A6IEV2ZW50RW1pdHRlcjxTd2lwZXJFdmVudHNbJ2F1dG9wbGF5U3RvcCddPiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICAvLyBwcmV0dGllci1pZ25vcmVcbiAgQE91dHB1dCgnYmVmb3JlRGVzdHJveScpIHNfYmVmb3JlRGVzdHJveTogRXZlbnRFbWl0dGVyPFN3aXBlckV2ZW50c1snYmVmb3JlRGVzdHJveSddPiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICAvLyBwcmV0dGllci1pZ25vcmVcbiAgQE91dHB1dCgnYmVmb3JlSW5pdCcpIHNfYmVmb3JlSW5pdDogRXZlbnRFbWl0dGVyPFN3aXBlckV2ZW50c1snYmVmb3JlSW5pdCddPiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICAvLyBwcmV0dGllci1pZ25vcmVcbiAgQE91dHB1dCgnYmVmb3JlTG9vcEZpeCcpIHNfYmVmb3JlTG9vcEZpeDogRXZlbnRFbWl0dGVyPFN3aXBlckV2ZW50c1snYmVmb3JlTG9vcEZpeCddPiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICAvLyBwcmV0dGllci1pZ25vcmVcbiAgQE91dHB1dCgnYmVmb3JlUmVzaXplJykgc19iZWZvcmVSZXNpemU6IEV2ZW50RW1pdHRlcjxTd2lwZXJFdmVudHNbJ2JlZm9yZVJlc2l6ZSddPiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICAvLyBwcmV0dGllci1pZ25vcmVcbiAgQE91dHB1dCgnYmVmb3JlU2xpZGVDaGFuZ2VTdGFydCcpIHNfYmVmb3JlU2xpZGVDaGFuZ2VTdGFydDogRXZlbnRFbWl0dGVyPFN3aXBlckV2ZW50c1snYmVmb3JlU2xpZGVDaGFuZ2VTdGFydCddPiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICAvLyBwcmV0dGllci1pZ25vcmVcbiAgQE91dHB1dCgnYmVmb3JlVHJhbnNpdGlvblN0YXJ0Jykgc19iZWZvcmVUcmFuc2l0aW9uU3RhcnQ6IEV2ZW50RW1pdHRlcjxTd2lwZXJFdmVudHNbJ2JlZm9yZVRyYW5zaXRpb25TdGFydCddPiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICAvLyBwcmV0dGllci1pZ25vcmVcbiAgQE91dHB1dCgnYnJlYWtwb2ludCcpIHNfYnJlYWtwb2ludDogRXZlbnRFbWl0dGVyPFN3aXBlckV2ZW50c1snYnJlYWtwb2ludCddPiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICAvLyBwcmV0dGllci1pZ25vcmVcbiAgQE91dHB1dCgnY2hhbmdlRGlyZWN0aW9uJykgc19jaGFuZ2VEaXJlY3Rpb246IEV2ZW50RW1pdHRlcjxTd2lwZXJFdmVudHNbJ2NoYW5nZURpcmVjdGlvbiddPiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICAvLyBwcmV0dGllci1pZ25vcmVcbiAgQE91dHB1dCgnY2xpY2snKSBzX2NsaWNrOiBFdmVudEVtaXR0ZXI8U3dpcGVyRXZlbnRzWydjbGljayddPiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICAvLyBwcmV0dGllci1pZ25vcmVcbiAgQE91dHB1dCgnZG91YmxlVGFwJykgc19kb3VibGVUYXA6IEV2ZW50RW1pdHRlcjxTd2lwZXJFdmVudHNbJ2RvdWJsZVRhcCddPiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICAvLyBwcmV0dGllci1pZ25vcmVcbiAgQE91dHB1dCgnZG91YmxlQ2xpY2snKSBzX2RvdWJsZUNsaWNrOiBFdmVudEVtaXR0ZXI8U3dpcGVyRXZlbnRzWydkb3VibGVDbGljayddPiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICAvLyBwcmV0dGllci1pZ25vcmVcbiAgQE91dHB1dCgnZGVzdHJveScpIHNfZGVzdHJveTogRXZlbnRFbWl0dGVyPFN3aXBlckV2ZW50c1snZGVzdHJveSddPiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICAvLyBwcmV0dGllci1pZ25vcmVcbiAgQE91dHB1dCgnZnJvbUVkZ2UnKSBzX2Zyb21FZGdlOiBFdmVudEVtaXR0ZXI8U3dpcGVyRXZlbnRzWydmcm9tRWRnZSddPiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICAvLyBwcmV0dGllci1pZ25vcmVcbiAgQE91dHB1dCgnaGFzaENoYW5nZScpIHNfaGFzaENoYW5nZTogRXZlbnRFbWl0dGVyPFN3aXBlckV2ZW50c1snaGFzaENoYW5nZSddPiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICAvLyBwcmV0dGllci1pZ25vcmVcbiAgQE91dHB1dCgnaGFzaFNldCcpIHNfaGFzaFNldDogRXZlbnRFbWl0dGVyPFN3aXBlckV2ZW50c1snaGFzaFNldCddPiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICAvLyBwcmV0dGllci1pZ25vcmVcbiAgQE91dHB1dCgnaW1hZ2VzUmVhZHknKSBzX2ltYWdlc1JlYWR5OiBFdmVudEVtaXR0ZXI8U3dpcGVyRXZlbnRzWydpbWFnZXNSZWFkeSddPiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICAvLyBwcmV0dGllci1pZ25vcmVcbiAgQE91dHB1dCgnaW5pdCcpIHNfaW5pdDogRXZlbnRFbWl0dGVyPFN3aXBlckV2ZW50c1snaW5pdCddPiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICAvLyBwcmV0dGllci1pZ25vcmVcbiAgQE91dHB1dCgna2V5UHJlc3MnKSBzX2tleVByZXNzOiBFdmVudEVtaXR0ZXI8U3dpcGVyRXZlbnRzWydrZXlQcmVzcyddPiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICAvLyBwcmV0dGllci1pZ25vcmVcbiAgQE91dHB1dCgnbGF6eUltYWdlTG9hZCcpIHNfbGF6eUltYWdlTG9hZDogRXZlbnRFbWl0dGVyPFN3aXBlckV2ZW50c1snbGF6eUltYWdlTG9hZCddPiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICAvLyBwcmV0dGllci1pZ25vcmVcbiAgQE91dHB1dCgnbGF6eUltYWdlUmVhZHknKSBzX2xhenlJbWFnZVJlYWR5OiBFdmVudEVtaXR0ZXI8U3dpcGVyRXZlbnRzWydsYXp5SW1hZ2VSZWFkeSddPiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICAvLyBwcmV0dGllci1pZ25vcmVcbiAgQE91dHB1dCgnbG9vcEZpeCcpIHNfbG9vcEZpeDogRXZlbnRFbWl0dGVyPFN3aXBlckV2ZW50c1snbG9vcEZpeCddPiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICAvLyBwcmV0dGllci1pZ25vcmVcbiAgQE91dHB1dCgnbW9tZW50dW1Cb3VuY2UnKSBzX21vbWVudHVtQm91bmNlOiBFdmVudEVtaXR0ZXI8U3dpcGVyRXZlbnRzWydtb21lbnR1bUJvdW5jZSddPiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICAvLyBwcmV0dGllci1pZ25vcmVcbiAgQE91dHB1dCgnbmF2aWdhdGlvbkhpZGUnKSBzX25hdmlnYXRpb25IaWRlOiBFdmVudEVtaXR0ZXI8U3dpcGVyRXZlbnRzWyduYXZpZ2F0aW9uSGlkZSddPiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICAvLyBwcmV0dGllci1pZ25vcmVcbiAgQE91dHB1dCgnbmF2aWdhdGlvblNob3cnKSBzX25hdmlnYXRpb25TaG93OiBFdmVudEVtaXR0ZXI8U3dpcGVyRXZlbnRzWyduYXZpZ2F0aW9uU2hvdyddPiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICAvLyBwcmV0dGllci1pZ25vcmVcbiAgQE91dHB1dCgnb2JzZXJ2ZXJVcGRhdGUnKSBzX29ic2VydmVyVXBkYXRlOiBFdmVudEVtaXR0ZXI8U3dpcGVyRXZlbnRzWydvYnNlcnZlclVwZGF0ZSddPiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICAvLyBwcmV0dGllci1pZ25vcmVcbiAgQE91dHB1dCgnb3JpZW50YXRpb25jaGFuZ2UnKSBzX29yaWVudGF0aW9uY2hhbmdlOiBFdmVudEVtaXR0ZXI8U3dpcGVyRXZlbnRzWydvcmllbnRhdGlvbmNoYW5nZSddPiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICAvLyBwcmV0dGllci1pZ25vcmVcbiAgQE91dHB1dCgncGFnaW5hdGlvbkhpZGUnKSBzX3BhZ2luYXRpb25IaWRlOiBFdmVudEVtaXR0ZXI8U3dpcGVyRXZlbnRzWydwYWdpbmF0aW9uSGlkZSddPiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICAvLyBwcmV0dGllci1pZ25vcmVcbiAgQE91dHB1dCgncGFnaW5hdGlvblJlbmRlcicpIHNfcGFnaW5hdGlvblJlbmRlcjogRXZlbnRFbWl0dGVyPFN3aXBlckV2ZW50c1sncGFnaW5hdGlvblJlbmRlciddPiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICAvLyBwcmV0dGllci1pZ25vcmVcbiAgQE91dHB1dCgncGFnaW5hdGlvblNob3cnKSBzX3BhZ2luYXRpb25TaG93OiBFdmVudEVtaXR0ZXI8U3dpcGVyRXZlbnRzWydwYWdpbmF0aW9uU2hvdyddPiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICAvLyBwcmV0dGllci1pZ25vcmVcbiAgQE91dHB1dCgncGFnaW5hdGlvblVwZGF0ZScpIHNfcGFnaW5hdGlvblVwZGF0ZTogRXZlbnRFbWl0dGVyPFN3aXBlckV2ZW50c1sncGFnaW5hdGlvblVwZGF0ZSddPiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICAvLyBwcmV0dGllci1pZ25vcmVcbiAgQE91dHB1dCgncHJvZ3Jlc3MnKSBzX3Byb2dyZXNzOiBFdmVudEVtaXR0ZXI8U3dpcGVyRXZlbnRzWydwcm9ncmVzcyddPiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICAvLyBwcmV0dGllci1pZ25vcmVcbiAgQE91dHB1dCgncmVhY2hCZWdpbm5pbmcnKSBzX3JlYWNoQmVnaW5uaW5nOiBFdmVudEVtaXR0ZXI8U3dpcGVyRXZlbnRzWydyZWFjaEJlZ2lubmluZyddPiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICAvLyBwcmV0dGllci1pZ25vcmVcbiAgQE91dHB1dCgncmVhY2hFbmQnKSBzX3JlYWNoRW5kOiBFdmVudEVtaXR0ZXI8U3dpcGVyRXZlbnRzWydyZWFjaEVuZCddPiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICAvLyBwcmV0dGllci1pZ25vcmVcbiAgQE91dHB1dCgncmVhbEluZGV4Q2hhbmdlJykgc19yZWFsSW5kZXhDaGFuZ2U6IEV2ZW50RW1pdHRlcjxTd2lwZXJFdmVudHNbJ3JlYWxJbmRleENoYW5nZSddPiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICAvLyBwcmV0dGllci1pZ25vcmVcbiAgQE91dHB1dCgncmVzaXplJykgc19yZXNpemU6IEV2ZW50RW1pdHRlcjxTd2lwZXJFdmVudHNbJ3Jlc2l6ZSddPiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICAvLyBwcmV0dGllci1pZ25vcmVcbiAgQE91dHB1dCgnc2Nyb2xsJykgc19zY3JvbGw6IEV2ZW50RW1pdHRlcjxTd2lwZXJFdmVudHNbJ3Njcm9sbCddPiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICAvLyBwcmV0dGllci1pZ25vcmVcbiAgQE91dHB1dCgnc2Nyb2xsYmFyRHJhZ0VuZCcpIHNfc2Nyb2xsYmFyRHJhZ0VuZDogRXZlbnRFbWl0dGVyPFN3aXBlckV2ZW50c1snc2Nyb2xsYmFyRHJhZ0VuZCddPiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICAvLyBwcmV0dGllci1pZ25vcmVcbiAgQE91dHB1dCgnc2Nyb2xsYmFyRHJhZ01vdmUnKSBzX3Njcm9sbGJhckRyYWdNb3ZlOiBFdmVudEVtaXR0ZXI8U3dpcGVyRXZlbnRzWydzY3JvbGxiYXJEcmFnTW92ZSddPiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICAvLyBwcmV0dGllci1pZ25vcmVcbiAgQE91dHB1dCgnc2Nyb2xsYmFyRHJhZ1N0YXJ0Jykgc19zY3JvbGxiYXJEcmFnU3RhcnQ6IEV2ZW50RW1pdHRlcjxTd2lwZXJFdmVudHNbJ3Njcm9sbGJhckRyYWdTdGFydCddPiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICAvLyBwcmV0dGllci1pZ25vcmVcbiAgQE91dHB1dCgnc2V0VHJhbnNpdGlvbicpIHNfc2V0VHJhbnNpdGlvbjogRXZlbnRFbWl0dGVyPFN3aXBlckV2ZW50c1snc2V0VHJhbnNpdGlvbiddPiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICAvLyBwcmV0dGllci1pZ25vcmVcbiAgQE91dHB1dCgnc2V0VHJhbnNsYXRlJykgc19zZXRUcmFuc2xhdGU6IEV2ZW50RW1pdHRlcjxTd2lwZXJFdmVudHNbJ3NldFRyYW5zbGF0ZSddPiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICAvLyBwcmV0dGllci1pZ25vcmVcbiAgQE91dHB1dCgnc2xpZGVDaGFuZ2UnKSBzX3NsaWRlQ2hhbmdlOiBFdmVudEVtaXR0ZXI8U3dpcGVyRXZlbnRzWydzbGlkZUNoYW5nZSddPiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICAvLyBwcmV0dGllci1pZ25vcmVcbiAgQE91dHB1dCgnc2xpZGVDaGFuZ2VUcmFuc2l0aW9uRW5kJykgc19zbGlkZUNoYW5nZVRyYW5zaXRpb25FbmQ6IEV2ZW50RW1pdHRlcjxTd2lwZXJFdmVudHNbJ3NsaWRlQ2hhbmdlVHJhbnNpdGlvbkVuZCddPiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICAvLyBwcmV0dGllci1pZ25vcmVcbiAgQE91dHB1dCgnc2xpZGVDaGFuZ2VUcmFuc2l0aW9uU3RhcnQnKSBzX3NsaWRlQ2hhbmdlVHJhbnNpdGlvblN0YXJ0OiBFdmVudEVtaXR0ZXI8U3dpcGVyRXZlbnRzWydzbGlkZUNoYW5nZVRyYW5zaXRpb25TdGFydCddPiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICAvLyBwcmV0dGllci1pZ25vcmVcbiAgQE91dHB1dCgnc2xpZGVOZXh0VHJhbnNpdGlvbkVuZCcpIHNfc2xpZGVOZXh0VHJhbnNpdGlvbkVuZDogRXZlbnRFbWl0dGVyPFN3aXBlckV2ZW50c1snc2xpZGVOZXh0VHJhbnNpdGlvbkVuZCddPiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICAvLyBwcmV0dGllci1pZ25vcmVcbiAgQE91dHB1dCgnc2xpZGVOZXh0VHJhbnNpdGlvblN0YXJ0Jykgc19zbGlkZU5leHRUcmFuc2l0aW9uU3RhcnQ6IEV2ZW50RW1pdHRlcjxTd2lwZXJFdmVudHNbJ3NsaWRlTmV4dFRyYW5zaXRpb25TdGFydCddPiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICAvLyBwcmV0dGllci1pZ25vcmVcbiAgQE91dHB1dCgnc2xpZGVQcmV2VHJhbnNpdGlvbkVuZCcpIHNfc2xpZGVQcmV2VHJhbnNpdGlvbkVuZDogRXZlbnRFbWl0dGVyPFN3aXBlckV2ZW50c1snc2xpZGVQcmV2VHJhbnNpdGlvbkVuZCddPiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICAvLyBwcmV0dGllci1pZ25vcmVcbiAgQE91dHB1dCgnc2xpZGVQcmV2VHJhbnNpdGlvblN0YXJ0Jykgc19zbGlkZVByZXZUcmFuc2l0aW9uU3RhcnQ6IEV2ZW50RW1pdHRlcjxTd2lwZXJFdmVudHNbJ3NsaWRlUHJldlRyYW5zaXRpb25TdGFydCddPiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICAvLyBwcmV0dGllci1pZ25vcmVcbiAgQE91dHB1dCgnc2xpZGVSZXNldFRyYW5zaXRpb25TdGFydCcpIHNfc2xpZGVSZXNldFRyYW5zaXRpb25TdGFydDogRXZlbnRFbWl0dGVyPFN3aXBlckV2ZW50c1snc2xpZGVSZXNldFRyYW5zaXRpb25TdGFydCddPiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICAvLyBwcmV0dGllci1pZ25vcmVcbiAgQE91dHB1dCgnc2xpZGVSZXNldFRyYW5zaXRpb25FbmQnKSBzX3NsaWRlUmVzZXRUcmFuc2l0aW9uRW5kOiBFdmVudEVtaXR0ZXI8U3dpcGVyRXZlbnRzWydzbGlkZVJlc2V0VHJhbnNpdGlvbkVuZCddPiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICAvLyBwcmV0dGllci1pZ25vcmVcbiAgQE91dHB1dCgnc2xpZGVyTW92ZScpIHNfc2xpZGVyTW92ZTogRXZlbnRFbWl0dGVyPFN3aXBlckV2ZW50c1snc2xpZGVyTW92ZSddPiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICAvLyBwcmV0dGllci1pZ25vcmVcbiAgQE91dHB1dCgnc2xpZGVyRmlyc3RNb3ZlJykgc19zbGlkZXJGaXJzdE1vdmU6IEV2ZW50RW1pdHRlcjxTd2lwZXJFdmVudHNbJ3NsaWRlckZpcnN0TW92ZSddPiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICAvLyBwcmV0dGllci1pZ25vcmVcbiAgQE91dHB1dCgnc2xpZGVzTGVuZ3RoQ2hhbmdlJykgc19zbGlkZXNMZW5ndGhDaGFuZ2U6IEV2ZW50RW1pdHRlcjxTd2lwZXJFdmVudHNbJ3NsaWRlc0xlbmd0aENoYW5nZSddPiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICAvLyBwcmV0dGllci1pZ25vcmVcbiAgQE91dHB1dCgnc2xpZGVzR3JpZExlbmd0aENoYW5nZScpIHNfc2xpZGVzR3JpZExlbmd0aENoYW5nZTogRXZlbnRFbWl0dGVyPFN3aXBlckV2ZW50c1snc2xpZGVzR3JpZExlbmd0aENoYW5nZSddPiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICAvLyBwcmV0dGllci1pZ25vcmVcbiAgQE91dHB1dCgnc25hcEdyaWRMZW5ndGhDaGFuZ2UnKSBzX3NuYXBHcmlkTGVuZ3RoQ2hhbmdlOiBFdmVudEVtaXR0ZXI8U3dpcGVyRXZlbnRzWydzbmFwR3JpZExlbmd0aENoYW5nZSddPiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICAvLyBwcmV0dGllci1pZ25vcmVcbiAgQE91dHB1dCgnc25hcEluZGV4Q2hhbmdlJykgc19zbmFwSW5kZXhDaGFuZ2U6IEV2ZW50RW1pdHRlcjxTd2lwZXJFdmVudHNbJ3NuYXBJbmRleENoYW5nZSddPiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICAvLyBwcmV0dGllci1pZ25vcmVcbiAgQE91dHB1dCgndGFwJykgc190YXA6IEV2ZW50RW1pdHRlcjxTd2lwZXJFdmVudHNbJ3RhcCddPiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICAvLyBwcmV0dGllci1pZ25vcmVcbiAgQE91dHB1dCgndG9FZGdlJykgc190b0VkZ2U6IEV2ZW50RW1pdHRlcjxTd2lwZXJFdmVudHNbJ3RvRWRnZSddPiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICAvLyBwcmV0dGllci1pZ25vcmVcbiAgQE91dHB1dCgndG91Y2hFbmQnKSBzX3RvdWNoRW5kOiBFdmVudEVtaXR0ZXI8U3dpcGVyRXZlbnRzWyd0b3VjaEVuZCddPiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICAvLyBwcmV0dGllci1pZ25vcmVcbiAgQE91dHB1dCgndG91Y2hNb3ZlJykgc190b3VjaE1vdmU6IEV2ZW50RW1pdHRlcjxTd2lwZXJFdmVudHNbJ3RvdWNoTW92ZSddPiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICAvLyBwcmV0dGllci1pZ25vcmVcbiAgQE91dHB1dCgndG91Y2hNb3ZlT3Bwb3NpdGUnKSBzX3RvdWNoTW92ZU9wcG9zaXRlOiBFdmVudEVtaXR0ZXI8U3dpcGVyRXZlbnRzWyd0b3VjaE1vdmVPcHBvc2l0ZSddPiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICAvLyBwcmV0dGllci1pZ25vcmVcbiAgQE91dHB1dCgndG91Y2hTdGFydCcpIHNfdG91Y2hTdGFydDogRXZlbnRFbWl0dGVyPFN3aXBlckV2ZW50c1sndG91Y2hTdGFydCddPiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICAvLyBwcmV0dGllci1pZ25vcmVcbiAgQE91dHB1dCgndHJhbnNpdGlvbkVuZCcpIHNfdHJhbnNpdGlvbkVuZDogRXZlbnRFbWl0dGVyPFN3aXBlckV2ZW50c1sndHJhbnNpdGlvbkVuZCddPiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICAvLyBwcmV0dGllci1pZ25vcmVcbiAgQE91dHB1dCgndHJhbnNpdGlvblN0YXJ0Jykgc190cmFuc2l0aW9uU3RhcnQ6IEV2ZW50RW1pdHRlcjxTd2lwZXJFdmVudHNbJ3RyYW5zaXRpb25TdGFydCddPiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICAvLyBwcmV0dGllci1pZ25vcmVcbiAgQE91dHB1dCgndXBkYXRlJykgc191cGRhdGU6IEV2ZW50RW1pdHRlcjxTd2lwZXJFdmVudHNbJ3VwZGF0ZSddPiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICAvLyBwcmV0dGllci1pZ25vcmVcbiAgQE91dHB1dCgnem9vbUNoYW5nZScpIHNfem9vbUNoYW5nZTogRXZlbnRFbWl0dGVyPFN3aXBlckV2ZW50c1snem9vbUNoYW5nZSddPiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICAvLyBwcmV0dGllci1pZ25vcmVcbiAgQE91dHB1dCgnc3dpcGVyJykgc19zd2lwZXI6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG5cbiAgQE91dHB1dCgpIGluZGV4Q2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxudW1iZXI+KCk7XG5cbiAgQFZpZXdDaGlsZCgncHJldkVsUmVmJywgeyBzdGF0aWM6IGZhbHNlIH0pXG4gIHNldCBwcmV2RWxSZWYoZWw6IEVsZW1lbnRSZWYpIHtcbiAgICB0aGlzLl9zZXRFbGVtZW50KGVsLCB0aGlzLm5hdmlnYXRpb24sICduYXZpZ2F0aW9uJywgJ3ByZXZFbCcpO1xuICB9XG4gIEBWaWV3Q2hpbGQoJ25leHRFbFJlZicsIHsgc3RhdGljOiBmYWxzZSB9KVxuICBzZXQgbmV4dEVsUmVmKGVsOiBFbGVtZW50UmVmKSB7XG4gICAgdGhpcy5fc2V0RWxlbWVudChlbCwgdGhpcy5uYXZpZ2F0aW9uLCAnbmF2aWdhdGlvbicsICduZXh0RWwnKTtcbiAgfVxuICBAVmlld0NoaWxkKCdzY3JvbGxiYXJFbFJlZicsIHsgc3RhdGljOiBmYWxzZSB9KVxuICBzZXQgc2Nyb2xsYmFyRWxSZWYoZWw6IEVsZW1lbnRSZWYpIHtcbiAgICB0aGlzLl9zZXRFbGVtZW50KGVsLCB0aGlzLnNjcm9sbGJhciwgJ3Njcm9sbGJhcicpO1xuICB9XG4gIEBWaWV3Q2hpbGQoJ3BhZ2luYXRpb25FbFJlZicsIHsgc3RhdGljOiBmYWxzZSB9KVxuICBzZXQgcGFnaW5hdGlvbkVsUmVmKGVsOiBFbGVtZW50UmVmKSB7XG4gICAgdGhpcy5fc2V0RWxlbWVudChlbCwgdGhpcy5wYWdpbmF0aW9uLCAncGFnaW5hdGlvbicpO1xuICB9XG4gIEBDb250ZW50Q2hpbGRyZW4oU3dpcGVyU2xpZGVEaXJlY3RpdmUsIHsgZGVzY2VuZGFudHM6IHRydWUgfSlcbiAgc2V0IHNsaWRlc0VsKHZhbDogUXVlcnlMaXN0PFN3aXBlclNsaWRlRGlyZWN0aXZlPikge1xuICAgIHRoaXMuc2xpZGVzID0gdmFsLm1hcCgoc2xpZGU6IFN3aXBlclNsaWRlRGlyZWN0aXZlLCBpbmRleDogbnVtYmVyKSA9PiB7XG4gICAgICBzbGlkZS5zbGlkZUluZGV4ID0gaW5kZXg7XG4gICAgICBzbGlkZS5jbGFzc05hbWVzID0gdGhpcy5zbGlkZUNsYXNzO1xuICAgICAgcmV0dXJuIHNsaWRlO1xuICAgIH0pO1xuICAgIGlmICh0aGlzLmxvb3AgJiYgIXRoaXMubG9vcGVkU2xpZGVzKSB7XG4gICAgICB0aGlzLmNhbGNMb29wZWRTbGlkZXMoKTtcbiAgICB9XG4gICAgaWYgKCF0aGlzLnZpcnR1YWwpIHtcbiAgICAgIHRoaXMucHJlcGVuZFNsaWRlcyA9IG9mKHRoaXMuc2xpZGVzLnNsaWNlKHRoaXMuc2xpZGVzLmxlbmd0aCAtIHRoaXMubG9vcGVkU2xpZGVzKSk7XG4gICAgICB0aGlzLmFwcGVuZFNsaWRlcyA9IG9mKHRoaXMuc2xpZGVzLnNsaWNlKDAsIHRoaXMubG9vcGVkU2xpZGVzKSk7XG4gICAgfVxuICAgIGlmICh0aGlzLnN3aXBlclJlZikge1xuICAgICAgdGhpcy5zd2lwZXJSZWY/LmRlc3Ryb3koKTtcbiAgICAgIHRoaXMuaW5pdFN3aXBlcigpO1xuICAgIH1cbiAgICB0aGlzLl9jaGFuZ2VEZXRlY3RvclJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgfVxuICBwcml2YXRlIHNsaWRlczogU3dpcGVyU2xpZGVEaXJlY3RpdmVbXTtcblxuICBwcmVwZW5kU2xpZGVzOiBPYnNlcnZhYmxlPFN3aXBlclNsaWRlRGlyZWN0aXZlW10+O1xuICBhcHBlbmRTbGlkZXM6IE9ic2VydmFibGU8U3dpcGVyU2xpZGVEaXJlY3RpdmVbXT47XG5cbiAgc3dpcGVyUmVmOiBTd2lwZXI7XG4gIHJlYWRvbmx5IF9hY3RpdmVTbGlkZXMgPSBuZXcgU3ViamVjdDxTd2lwZXJTbGlkZURpcmVjdGl2ZVtdPigpO1xuXG4gIGdldCBhY3RpdmVTbGlkZXMoKSB7XG4gICAgaWYgKHRoaXMudmlydHVhbCkge1xuICAgICAgcmV0dXJuIHRoaXMuX2FjdGl2ZVNsaWRlcztcbiAgICB9XG4gICAgcmV0dXJuIG9mKHRoaXMuc2xpZGVzKTtcbiAgfVxuXG4gIEBIb3N0QmluZGluZygnY2xhc3MnKSBjb250YWluZXJDbGFzc2VzID0gJ3N3aXBlci1jb250YWluZXInO1xuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIHpvbmU6IE5nWm9uZSxcbiAgICBwcml2YXRlIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYsXG4gICAgcHJpdmF0ZSBfY2hhbmdlRGV0ZWN0b3JSZWY6IENoYW5nZURldGVjdG9yUmVmLFxuICApIHt9XG5cbiAgcHJpdmF0ZSBfc2V0RWxlbWVudChlbDogRWxlbWVudFJlZiwgcmVmOiBhbnksIHVwZGF0ZTogc3RyaW5nLCBrZXkgPSAnZWwnKSB7XG4gICAgaWYgKCFlbCB8fCAhcmVmKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmIChyZWYgJiYgZWwubmF0aXZlRWxlbWVudCkge1xuICAgICAgaWYgKHJlZltrZXldID09PSBlbC5uYXRpdmVFbGVtZW50KSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIHJlZltrZXldID0gZWwubmF0aXZlRWxlbWVudDtcbiAgICB9XG4gICAgY29uc3QgdXBkYXRlT2JqID0ge307XG4gICAgdXBkYXRlT2JqW3VwZGF0ZV0gPSB0cnVlO1xuICAgIHRoaXMudXBkYXRlSW5pdFN3aXBlcih1cGRhdGVPYmopO1xuICB9XG4gIG5nT25Jbml0KCk6IHZvaWQge1xuICAgIGNvbnN0IHsgcGFyYW1zIH0gPSBnZXRQYXJhbXModGhpcyk7XG4gICAgT2JqZWN0LmFzc2lnbih0aGlzLCBwYXJhbXMpO1xuICB9XG5cbiAgbmdBZnRlclZpZXdJbml0KCkge1xuICAgIGlmICh0aGlzLmluaXQpIHtcbiAgICAgIHRoaXMuaW5pdFN3aXBlcigpO1xuICAgICAgdGhpcy5fY2hhbmdlRGV0ZWN0b3JSZWYuZGV0ZWN0Q2hhbmdlcygpO1xuICAgIH1cbiAgfVxuXG4gIGluaXRTd2lwZXIoKSB7XG4gICAgY29uc3QgeyBwYXJhbXM6IHN3aXBlclBhcmFtcywgcGFzc2VkUGFyYW1zIH0gPSBnZXRQYXJhbXModGhpcyk7XG4gICAgT2JqZWN0LmFzc2lnbih0aGlzLCBzd2lwZXJQYXJhbXMpO1xuICAgIHN3aXBlclBhcmFtcy5vbkFueSA9IChldmVudCwgLi4uYXJncykgPT4ge1xuICAgICAgY29uc3QgZW1pdHRlciA9IHRoaXNbYHNfJHtldmVudH1gXSBhcyBFdmVudEVtaXR0ZXI8YW55PjtcbiAgICAgIGlmIChlbWl0dGVyKSB7XG4gICAgICAgIGVtaXR0ZXIuZW1pdCguLi5hcmdzKTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgT2JqZWN0LmFzc2lnbihzd2lwZXJQYXJhbXMub24sIHtcbiAgICAgIHNsaWRlQ2hhbmdlOiAoKSA9PiB7XG4gICAgICAgIHRoaXMuaW5kZXhDaGFuZ2UuZW1pdCh0aGlzLnN3aXBlclJlZi5yZWFsSW5kZXgpO1xuICAgICAgfSxcbiAgICAgIF9jb250YWluZXJDbGFzc2VzKHN3aXBlciwgY2xhc3Nlcykge1xuICAgICAgICB0aGlzLmNvbnRhaW5lckNsYXNzZXMgPSBjbGFzc2VzO1xuICAgICAgfSxcbiAgICAgIF9zd2lwZXI6IChzd2lwZXIpID0+IHtcbiAgICAgICAgdGhpcy5zd2lwZXJSZWYgPSBzd2lwZXI7XG4gICAgICAgIHRoaXMuc19zd2lwZXIuZW1pdCh0aGlzLnN3aXBlclJlZik7XG4gICAgICAgIHN3aXBlci5sb29wQ3JlYXRlID0gKCkgPT4ge307XG4gICAgICAgIHN3aXBlci5sb29wRGVzdHJveSA9ICgpID0+IHt9O1xuICAgICAgICBpZiAoc3dpcGVyUGFyYW1zLmxvb3ApIHtcbiAgICAgICAgICBzd2lwZXIubG9vcGVkU2xpZGVzID0gdGhpcy5sb29wZWRTbGlkZXM7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHN3aXBlci52aXJ0dWFsICYmIHN3aXBlci5wYXJhbXMudmlydHVhbC5lbmFibGVkKSB7XG4gICAgICAgICAgc3dpcGVyLnZpcnR1YWwuc2xpZGVzID0gdGhpcy5zbGlkZXM7XG4gICAgICAgICAgY29uc3QgZXh0ZW5kV2l0aCA9IHtcbiAgICAgICAgICAgIGNhY2hlOiBmYWxzZSxcbiAgICAgICAgICAgIHJlbmRlckV4dGVybmFsOiAoZGF0YSkgPT4ge1xuICAgICAgICAgICAgICB0aGlzLnVwZGF0ZVZpcnR1YWxTbGlkZXMoZGF0YSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgcmVuZGVyRXh0ZXJuYWxVcGRhdGU6IGZhbHNlLFxuICAgICAgICAgIH07XG4gICAgICAgICAgZXh0ZW5kKHN3aXBlci5wYXJhbXMudmlydHVhbCwgZXh0ZW5kV2l0aCk7XG4gICAgICAgICAgZXh0ZW5kKHN3aXBlci5vcmlnaW5hbFBhcmFtcy52aXJ0dWFsLCBleHRlbmRXaXRoKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9jaGFuZ2VEZXRlY3RvclJlZi5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgICB9LFxuICAgICAgX3NsaWRlQ2xhc3M6IChfLCBlbDogSFRNTEVsZW1lbnQsIGNsYXNzTmFtZXMpID0+IHtcbiAgICAgICAgY29uc3Qgc2xpZGVJbmRleCA9IHBhcnNlSW50KGVsLmdldEF0dHJpYnV0ZSgnZGF0YS1zd2lwZXItc2xpZGUtaW5kZXgnKSk7XG4gICAgICAgIGlmICh0aGlzLnZpcnR1YWwpIHtcbiAgICAgICAgICBjb25zdCB2aXJ0dWFsU2xpZGUgPSB0aGlzLnNsaWRlcy5maW5kKChpdGVtKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gaXRlbS52aXJ0dWFsSW5kZXggJiYgaXRlbS52aXJ0dWFsSW5kZXggPT09IHNsaWRlSW5kZXg7XG4gICAgICAgICAgfSk7XG4gICAgICAgICAgaWYgKHZpcnR1YWxTbGlkZSkge1xuICAgICAgICAgICAgdmlydHVhbFNsaWRlLmNsYXNzTmFtZXMgPSBjbGFzc05hbWVzO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB0aGlzLnNsaWRlc1tzbGlkZUluZGV4XS5jbGFzc05hbWVzID0gY2xhc3NOYW1lcztcbiAgICAgICAgdGhpcy5fY2hhbmdlRGV0ZWN0b3JSZWYuZGV0ZWN0Q2hhbmdlcygpO1xuICAgICAgfSxcbiAgICB9KTtcbiAgICBuZXcgU3dpcGVyKHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LCBzd2lwZXJQYXJhbXMpO1xuICB9XG5cbiAgc3R5bGU6IGFueSA9IG51bGw7XG4gIGN1cnJlbnRWaXJ0dWFsRGF0YTogYW55OyAvLyBUT0RPOiB0eXBlIHZpcnR1YWxEYXRhO1xuICBwcml2YXRlIHVwZGF0ZVZpcnR1YWxTbGlkZXModmlydHVhbERhdGE6IGFueSkge1xuICAgIC8vIFRPRE86IHR5cGUgdmlydHVhbERhdGFcbiAgICBpZiAoXG4gICAgICAhdGhpcy5zd2lwZXJSZWYgfHxcbiAgICAgICh0aGlzLmN1cnJlbnRWaXJ0dWFsRGF0YSAmJlxuICAgICAgICB0aGlzLmN1cnJlbnRWaXJ0dWFsRGF0YS5mcm9tID09PSB2aXJ0dWFsRGF0YS5mcm9tICYmXG4gICAgICAgIHRoaXMuY3VycmVudFZpcnR1YWxEYXRhLnRvID09PSB2aXJ0dWFsRGF0YS50byAmJlxuICAgICAgICB0aGlzLmN1cnJlbnRWaXJ0dWFsRGF0YS5vZmZzZXQgPT09IHZpcnR1YWxEYXRhLm9mZnNldClcbiAgICApIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5zdHlsZSA9IHRoaXMuc3dpcGVyUmVmLmlzSG9yaXpvbnRhbCgpXG4gICAgICA/IHtcbiAgICAgICAgICBbdGhpcy5zd2lwZXJSZWYucnRsVHJhbnNsYXRlID8gJ3JpZ2h0JyA6ICdsZWZ0J106IGAke3ZpcnR1YWxEYXRhLm9mZnNldH1weGAsXG4gICAgICAgIH1cbiAgICAgIDoge1xuICAgICAgICAgIHRvcDogYCR7dmlydHVhbERhdGEub2Zmc2V0fXB4YCxcbiAgICAgICAgfTtcbiAgICB0aGlzLmN1cnJlbnRWaXJ0dWFsRGF0YSA9IHZpcnR1YWxEYXRhO1xuICAgIHRoaXMuX2FjdGl2ZVNsaWRlcy5uZXh0KHZpcnR1YWxEYXRhLnNsaWRlcyk7XG4gICAgdGhpcy5fY2hhbmdlRGV0ZWN0b3JSZWYuZGV0ZWN0Q2hhbmdlcygpO1xuICAgIHRoaXMuc3dpcGVyUmVmLnVwZGF0ZVNsaWRlcygpO1xuICAgIHRoaXMuc3dpcGVyUmVmLnVwZGF0ZVByb2dyZXNzKCk7XG4gICAgdGhpcy5zd2lwZXJSZWYudXBkYXRlU2xpZGVzQ2xhc3NlcygpO1xuICAgIGlmICh0aGlzLnN3aXBlclJlZi5sYXp5ICYmIHRoaXMuc3dpcGVyUmVmLnBhcmFtcy5sYXp5WydlbmFibGVkJ10pIHtcbiAgICAgIHRoaXMuc3dpcGVyUmVmLmxhenkubG9hZCgpO1xuICAgIH1cbiAgICB0aGlzLnN3aXBlclJlZi52aXJ0dWFsLnVwZGF0ZSh0cnVlKTtcbiAgICByZXR1cm47XG4gIH1cblxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VkUGFyYW1zOiBTaW1wbGVDaGFuZ2VzKSB7XG4gICAgdGhpcy51cGRhdGVTd2lwZXIoY2hhbmdlZFBhcmFtcyk7XG4gICAgdGhpcy5fY2hhbmdlRGV0ZWN0b3JSZWYuZGV0ZWN0Q2hhbmdlcygpO1xuICB9XG5cbiAgdXBkYXRlSW5pdFN3aXBlcihjaGFuZ2VkUGFyYW1zKSB7XG4gICAgaWYgKCEoY2hhbmdlZFBhcmFtcyAmJiB0aGlzLnN3aXBlclJlZiAmJiAhdGhpcy5zd2lwZXJSZWYuZGVzdHJveWVkKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjb25zdCB7XG4gICAgICBwYXJhbXM6IGN1cnJlbnRQYXJhbXMsXG4gICAgICBwYWdpbmF0aW9uLFxuICAgICAgbmF2aWdhdGlvbixcbiAgICAgIHNjcm9sbGJhcixcbiAgICAgIHZpcnR1YWwsXG4gICAgICB0aHVtYnMsXG4gICAgfSA9IHRoaXMuc3dpcGVyUmVmO1xuXG4gICAgaWYgKGNoYW5nZWRQYXJhbXMucGFnaW5hdGlvbikge1xuICAgICAgaWYgKFxuICAgICAgICB0aGlzLnBhZ2luYXRpb24gJiZcbiAgICAgICAgdHlwZW9mIHRoaXMucGFnaW5hdGlvbiAhPT0gJ2Jvb2xlYW4nICYmXG4gICAgICAgIHRoaXMucGFnaW5hdGlvbi5lbCAmJlxuICAgICAgICBwYWdpbmF0aW9uICYmXG4gICAgICAgICFwYWdpbmF0aW9uLmVsXG4gICAgICApIHtcbiAgICAgICAgdGhpcy51cGRhdGVQYXJhbWV0ZXIoJ3BhZ2luYXRpb24nLCB0aGlzLnBhZ2luYXRpb24pO1xuICAgICAgICBwYWdpbmF0aW9uLmluaXQoKTtcbiAgICAgICAgcGFnaW5hdGlvbi5yZW5kZXIoKTtcbiAgICAgICAgcGFnaW5hdGlvbi51cGRhdGUoKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHBhZ2luYXRpb24uZGVzdHJveSgpO1xuICAgICAgICBwYWdpbmF0aW9uLmVsID0gbnVsbDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoY2hhbmdlZFBhcmFtcy5zY3JvbGxiYXIpIHtcbiAgICAgIGlmIChcbiAgICAgICAgdGhpcy5zY3JvbGxiYXIgJiZcbiAgICAgICAgdHlwZW9mIHRoaXMuc2Nyb2xsYmFyICE9PSAnYm9vbGVhbicgJiZcbiAgICAgICAgdGhpcy5zY3JvbGxiYXIuZWwgJiZcbiAgICAgICAgc2Nyb2xsYmFyICYmXG4gICAgICAgICFzY3JvbGxiYXIuZWxcbiAgICAgICkge1xuICAgICAgICB0aGlzLnVwZGF0ZVBhcmFtZXRlcignc2Nyb2xsYmFyJywgdGhpcy5zY3JvbGxiYXIpO1xuICAgICAgICBzY3JvbGxiYXIuaW5pdCgpO1xuICAgICAgICBzY3JvbGxiYXIudXBkYXRlU2l6ZSgpO1xuICAgICAgICBzY3JvbGxiYXIuc2V0VHJhbnNsYXRlKCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzY3JvbGxiYXIuZGVzdHJveSgpO1xuICAgICAgICBzY3JvbGxiYXIuZWwgPSBudWxsO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChjaGFuZ2VkUGFyYW1zLm5hdmlnYXRpb24pIHtcbiAgICAgIGlmIChcbiAgICAgICAgdGhpcy5uYXZpZ2F0aW9uICYmXG4gICAgICAgIHR5cGVvZiB0aGlzLm5hdmlnYXRpb24gIT09ICdib29sZWFuJyAmJlxuICAgICAgICB0aGlzLm5hdmlnYXRpb24ucHJldkVsICYmXG4gICAgICAgIHRoaXMubmF2aWdhdGlvbi5uZXh0RWwgJiZcbiAgICAgICAgbmF2aWdhdGlvbiAmJlxuICAgICAgICAhbmF2aWdhdGlvbi5wcmV2RWwgJiZcbiAgICAgICAgIW5hdmlnYXRpb24ubmV4dEVsXG4gICAgICApIHtcbiAgICAgICAgdGhpcy51cGRhdGVQYXJhbWV0ZXIoJ25hdmlnYXRpb24nLCB0aGlzLm5hdmlnYXRpb24pO1xuICAgICAgICBuYXZpZ2F0aW9uLmluaXQoKTtcbiAgICAgICAgbmF2aWdhdGlvbi51cGRhdGUoKTtcbiAgICAgIH0gZWxzZSBpZiAobmF2aWdhdGlvbi5wcmV2RWwgJiYgbmF2aWdhdGlvbi5uZXh0RWwpIHtcbiAgICAgICAgbmF2aWdhdGlvbi5kZXN0cm95KCk7XG4gICAgICAgIG5hdmlnYXRpb24ubmV4dEVsID0gbnVsbDtcbiAgICAgICAgbmF2aWdhdGlvbi5wcmV2RWwgPSBudWxsO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAoY2hhbmdlZFBhcmFtcy50aHVtYnMgJiYgdGhpcy50aHVtYnMgJiYgdGhpcy50aHVtYnMuc3dpcGVyKSB7XG4gICAgICB0aGlzLnVwZGF0ZVBhcmFtZXRlcigndGh1bWJzJywgdGhpcy50aHVtYnMpO1xuICAgICAgY29uc3QgaW5pdGlhbGl6ZWQgPSB0aHVtYnMuaW5pdCgpO1xuICAgICAgaWYgKGluaXRpYWxpemVkKSB0aHVtYnMudXBkYXRlKHRydWUpO1xuICAgIH1cblxuICAgIGlmIChjaGFuZ2VkUGFyYW1zLmNvbnRyb2xsZXIgJiYgdGhpcy5jb250cm9sbGVyICYmIHRoaXMuY29udHJvbGxlci5jb250cm9sKSB7XG4gICAgICB0aGlzLnN3aXBlclJlZi5jb250cm9sbGVyLmNvbnRyb2wgPSB0aGlzLmNvbnRyb2xsZXIuY29udHJvbDtcbiAgICB9XG5cbiAgICB0aGlzLnN3aXBlclJlZi51cGRhdGUoKTtcbiAgfVxuXG4gIHVwZGF0ZVN3aXBlcihjaGFuZ2VkUGFyYW1zOiBTaW1wbGVDaGFuZ2VzIHwgYW55KSB7XG4gICAgaWYgKGNoYW5nZWRQYXJhbXMuY29uZmlnKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmICghKGNoYW5nZWRQYXJhbXMgJiYgdGhpcy5zd2lwZXJSZWYgJiYgIXRoaXMuc3dpcGVyUmVmLmRlc3Ryb3llZCkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgZm9yIChjb25zdCBrZXkgaW4gY2hhbmdlZFBhcmFtcykge1xuICAgICAgaWYgKGlnbm9yZU5nT25DaGFuZ2VzLmluZGV4T2Yoa2V5KSA+PSAwKSB7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuICAgICAgY29uc3QgbmV3VmFsdWUgPSBjaGFuZ2VkUGFyYW1zW2tleV0/LmN1cnJlbnRWYWx1ZSA/PyBjaGFuZ2VkUGFyYW1zW2tleV07XG4gICAgICB0aGlzLnVwZGF0ZVBhcmFtZXRlcihrZXksIG5ld1ZhbHVlKTtcbiAgICB9XG5cbiAgICBpZiAoY2hhbmdlZFBhcmFtcy5hbGxvd1NsaWRlTmV4dCkge1xuICAgICAgdGhpcy5zd2lwZXJSZWYuYWxsb3dTbGlkZU5leHQgPSB0aGlzLmFsbG93U2xpZGVOZXh0O1xuICAgIH1cbiAgICBpZiAoY2hhbmdlZFBhcmFtcy5hbGxvd1NsaWRlUHJldikge1xuICAgICAgdGhpcy5zd2lwZXJSZWYuYWxsb3dTbGlkZVByZXYgPSB0aGlzLmFsbG93U2xpZGVQcmV2O1xuICAgIH1cbiAgICBpZiAoY2hhbmdlZFBhcmFtcy5kaXJlY3Rpb24pIHtcbiAgICAgIHRoaXMuc3dpcGVyUmVmLmNoYW5nZURpcmVjdGlvbih0aGlzLmRpcmVjdGlvbiwgZmFsc2UpO1xuICAgIH1cbiAgICBpZiAoY2hhbmdlZFBhcmFtcy5icmVha3BvaW50cykge1xuICAgICAgaWYgKHRoaXMubG9vcCAmJiAhdGhpcy5sb29wZWRTbGlkZXMpIHtcbiAgICAgICAgdGhpcy5jYWxjTG9vcGVkU2xpZGVzKCk7XG4gICAgICB9XG4gICAgICB0aGlzLnN3aXBlclJlZi5jdXJyZW50QnJlYWtwb2ludCA9IG51bGw7XG4gICAgICB0aGlzLnN3aXBlclJlZi5zZXRCcmVha3BvaW50KCk7XG4gICAgfVxuICAgIHRoaXMuc3dpcGVyUmVmLnVwZGF0ZSgpO1xuICB9XG5cbiAgY2FsY0xvb3BlZFNsaWRlcygpIHtcbiAgICBpZiAoIXRoaXMubG9vcCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBsZXQgc2xpZGVzUGVyVmlld1BhcmFtcyA9IHRoaXMuc2xpZGVzUGVyVmlldztcbiAgICBpZiAodGhpcy5icmVha3BvaW50cykge1xuICAgICAgY29uc3QgYnJlYWtwb2ludCA9IFN3aXBlci5wcm90b3R5cGUuZ2V0QnJlYWtwb2ludCh0aGlzLmJyZWFrcG9pbnRzKTtcbiAgICAgIGNvbnN0IGJyZWFrcG9pbnRPbmx5UGFyYW1zID1cbiAgICAgICAgYnJlYWtwb2ludCBpbiB0aGlzLmJyZWFrcG9pbnRzID8gdGhpcy5icmVha3BvaW50c1ticmVha3BvaW50XSA6IHVuZGVmaW5lZDtcbiAgICAgIGlmIChicmVha3BvaW50T25seVBhcmFtcyAmJiBicmVha3BvaW50T25seVBhcmFtcy5zbGlkZXNQZXJWaWV3KSB7XG4gICAgICAgIHNsaWRlc1BlclZpZXdQYXJhbXMgPSBicmVha3BvaW50T25seVBhcmFtcy5zbGlkZXNQZXJWaWV3O1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAoc2xpZGVzUGVyVmlld1BhcmFtcyA9PT0gJ2F1dG8nKSB7XG4gICAgICB0aGlzLmxvb3BlZFNsaWRlcyA9IHRoaXMuc2xpZGVzLmxlbmd0aDtcbiAgICAgIHJldHVybiB0aGlzLnNsaWRlcy5sZW5ndGg7XG4gICAgfVxuICAgIGxldCBsb29wZWRTbGlkZXMgPSB0aGlzLmxvb3BlZFNsaWRlcyB8fCBzbGlkZXNQZXJWaWV3UGFyYW1zO1xuXG4gICAgbG9vcGVkU2xpZGVzICs9IHRoaXMubG9vcEFkZGl0aW9uYWxTbGlkZXM7XG5cbiAgICBpZiAobG9vcGVkU2xpZGVzID4gdGhpcy5zbGlkZXMubGVuZ3RoKSB7XG4gICAgICBsb29wZWRTbGlkZXMgPSB0aGlzLnNsaWRlcy5sZW5ndGg7XG4gICAgfVxuICAgIHRoaXMubG9vcGVkU2xpZGVzID0gbG9vcGVkU2xpZGVzO1xuICAgIHJldHVybiBsb29wZWRTbGlkZXM7XG4gIH1cblxuICB1cGRhdGVQYXJhbWV0ZXIoa2V5LCB2YWx1ZSkge1xuICAgIGlmICghKHRoaXMuc3dpcGVyUmVmICYmICF0aGlzLnN3aXBlclJlZi5kZXN0cm95ZWQpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGNvbnN0IF9rZXkgPSBrZXkucmVwbGFjZSgvXl8vLCAnJyk7XG4gICAgaWYgKE9iamVjdC5rZXlzKHRoaXMuc3dpcGVyUmVmLm1vZHVsZXMpLmluZGV4T2YoX2tleSkgPj0gMCkge1xuICAgICAgZXh0ZW5kKHZhbHVlLCB0aGlzLnN3aXBlclJlZi5tb2R1bGVzW19rZXldLnBhcmFtc1tfa2V5XSk7XG4gICAgfVxuICAgIGlmIChpc09iamVjdCh0aGlzLnN3aXBlclJlZi5wYXJhbXNbX2tleV0pICYmIGlzT2JqZWN0KHZhbHVlKSkge1xuICAgICAgZXh0ZW5kKHRoaXMuc3dpcGVyUmVmLnBhcmFtc1tfa2V5XSwgdmFsdWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnN3aXBlclJlZi5wYXJhbXNbX2tleV0gPSB2YWx1ZTtcbiAgICB9XG4gIH1cblxuICBzZXRJbmRleChpbmRleDogbnVtYmVyLCBzcGVlZD86IG51bWJlciwgc2lsZW50PzogYm9vbGVhbik6IHZvaWQge1xuICAgIGlmICghdGhpcy5zd2lwZXJSZWYpIHtcbiAgICAgIHRoaXMuaW5pdGlhbFNsaWRlID0gaW5kZXg7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmIChpbmRleCA9PT0gdGhpcy5zd2lwZXJSZWYucmVhbEluZGV4KSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMuem9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XG4gICAgICBpZiAodGhpcy5sb29wKSB7XG4gICAgICAgIHRoaXMuc3dpcGVyUmVmLnNsaWRlVG9Mb29wKGluZGV4LCBzcGVlZCwgIXNpbGVudCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLnN3aXBlclJlZi5zbGlkZVRvKGluZGV4LCBzcGVlZCwgIXNpbGVudCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLnN3aXBlclJlZj8uZGVzdHJveSgpO1xuICB9XG59XG4iXX0=