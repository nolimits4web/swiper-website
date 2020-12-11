import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChildren, ElementRef, EventEmitter, HostBinding, Input, Output, ViewChild, ViewEncapsulation, } from '@angular/core';
import Swiper from 'swiper/core';
import { of, Subject } from 'rxjs';
import { getParams } from './utils/get-params';
import { SwiperSlideDirective } from './swiper-slide.directive';
import { extend, isObject, setProperty, ignoreNgOnChanges } from './utils/utils';
export class SwiperComponent {
    constructor(elementRef, _changeDetectorRef) {
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
            if (this.pagination && this.pagination.el && pagination && !pagination.el) {
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
            if (this.scrollbar && this.scrollbar.el && scrollbar && !scrollbar.el) {
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
        if (!(changedParams && this.swiperRef && !this.swiperRef.destroyed)) {
            return;
        }
        for (const key in changedParams) {
            if (ignoreNgOnChanges.indexOf(key) >= 0) {
                continue;
            }
            this.updateParameter(key, changedParams[key].currentValue);
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
    ngOnDestroy() {
        this.swiperRef.destroy();
    }
}
SwiperComponent.decorators = [
    { type: Component, args: [{
                selector: 'swiper, [swiper]',
                template: "<ng-content select=\"[slot=container-start]\"></ng-content>\n<ng-container *ngIf=\"navigation\">\n  <div class=\"swiper-button-prev\" #prevElRef></div>\n  <div class=\"swiper-button-next\" #nextElRef></div>\n</ng-container>\n<div *ngIf=\"scrollbar\" class=\"swiper-scrollbar\" #scrollbarElRef></div>\n<div *ngIf=\"pagination\" class=\"swiper-pagination\" #paginationElRef></div>\n<div [ngClass]=\"wrapperClass\">\n  <ng-content select=\"[slot=wrapper-start]\"></ng-content>\n  <ng-template\n    *ngTemplateOutlet=\"\n      slidesTemplate;\n      context: {\n        loopSlides: prependSlides,\n        key: 'prepend'\n      }\n    \"\n  ></ng-template>\n  <ng-template\n    *ngTemplateOutlet=\"\n      slidesTemplate;\n      context: {\n        loopSlides: activeSlides,\n        key: ''\n      }\n    \"\n  ></ng-template>\n  <ng-template\n    *ngTemplateOutlet=\"\n      slidesTemplate;\n      context: {\n        loopSlides: appendSlides,\n        key: 'append'\n      }\n    \"\n  ></ng-template>\n  <ng-content select=\"[slot=wrapper-end]\"></ng-content>\n</div>\n<ng-content select=\"[slow=container-end]\"></ng-content>\n\n<ng-template #slidesTemplate let-loopSlides=\"loopSlides\" let-slideKey=\"key\">\n  <div\n    *ngFor=\"let slide of loopSlides | async\"\n    [ngClass]=\"slide.classNames + ' ' + (slideKey !== '' ? slideDuplicateClass : '')\"\n    [attr.data-swiper-slide-index]=\"slide.virtualIndex ? slide.virtualIndex : slide.slideIndex\"\n    [style]=\"style\"\n  >\n    <ng-template\n      [ngTemplateOutlet]=\"slide.template\"\n      [ngTemplateOutletContext]=\"{\n        $implicit: slide.slideData\n      }\"\n    ></ng-template>\n  </div>\n</ng-template>\n",
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
    navigation: [{ type: Input }],
    pagination: [{ type: Input }],
    parallax: [{ type: Input }],
    scrollbar: [{ type: Input }],
    virtual: [{ type: Input }],
    thumbs: [{ type: Input }],
    zoom: [{ type: Input }],
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
    prevElRef: [{ type: ViewChild, args: ['prevElRef', { static: false },] }],
    nextElRef: [{ type: ViewChild, args: ['nextElRef', { static: false },] }],
    scrollbarElRef: [{ type: ViewChild, args: ['scrollbarElRef', { static: false },] }],
    paginationElRef: [{ type: ViewChild, args: ['paginationElRef', { static: false },] }],
    slidesEl: [{ type: ContentChildren, args: [SwiperSlideDirective, { descendants: true },] }],
    containerClasses: [{ type: HostBinding, args: ['class',] }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3dpcGVyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIuLi8uLi8uLi9zcmMvIiwic291cmNlcyI6WyJhbmd1bGFyL3NyYy9zd2lwZXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFDTCx1QkFBdUIsRUFDdkIsaUJBQWlCLEVBQ2pCLFNBQVMsRUFDVCxlQUFlLEVBQ2YsVUFBVSxFQUNWLFlBQVksRUFDWixXQUFXLEVBQ1gsS0FBSyxFQUVMLE1BQU0sRUFHTixTQUFTLEVBQ1QsaUJBQWlCLEdBQ2xCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sTUFBTSxNQUFNLGFBQWEsQ0FBQztBQXVCakMsT0FBTyxFQUFjLEVBQUUsRUFBRSxPQUFPLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDL0MsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQ2hFLE9BQU8sRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLFdBQVcsRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQWNqRixNQUFNLE9BQU8sZUFBZTtJQThWMUIsWUFBb0IsVUFBc0IsRUFBVSxrQkFBcUM7UUFBckUsZUFBVSxHQUFWLFVBQVUsQ0FBWTtRQUFVLHVCQUFrQixHQUFsQixrQkFBa0IsQ0FBbUI7UUE3VmhGLFNBQUksR0FBWSxJQUFJLENBQUM7UUFnRnJCLGVBQVUsR0FBVyxjQUFjLENBQUM7UUFVcEMsaUJBQVksR0FBVyxnQkFBZ0IsQ0FBQztRQTJEakQsa0JBQWtCO1FBQ1csd0JBQW1CLEdBQW9ELElBQUksWUFBWSxFQUFPLENBQUM7UUFDNUgsa0JBQWtCO1FBQ1csd0JBQW1CLEdBQW9ELElBQUksWUFBWSxFQUFPLENBQUM7UUFDNUgsa0JBQWtCO1FBQ0ssa0JBQWEsR0FBOEMsSUFBSSxZQUFZLEVBQU8sQ0FBQztRQUMxRyxrQkFBa0I7UUFDQyxjQUFT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Y3RvclJlZixcbiAgQ29tcG9uZW50LFxuICBDb250ZW50Q2hpbGRyZW4sXG4gIEVsZW1lbnRSZWYsXG4gIEV2ZW50RW1pdHRlcixcbiAgSG9zdEJpbmRpbmcsXG4gIElucHV0LFxuICBPbkluaXQsXG4gIE91dHB1dCxcbiAgUXVlcnlMaXN0LFxuICBTaW1wbGVDaGFuZ2VzLFxuICBWaWV3Q2hpbGQsXG4gIFZpZXdFbmNhcHN1bGF0aW9uLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCBTd2lwZXIgZnJvbSAnc3dpcGVyL2NvcmUnO1xuaW1wb3J0IHtcbiAgQTExeU9wdGlvbnMsXG4gIEF1dG9wbGF5T3B0aW9ucyxcbiAgQ29udHJvbGxlck9wdGlvbnMsXG4gIENvdmVyZmxvd0VmZmVjdE9wdGlvbnMsXG4gIEN1YmVFZmZlY3RPcHRpb25zLFxuICBGYWRlRWZmZWN0T3B0aW9ucyxcbiAgRmxpcEVmZmVjdE9wdGlvbnMsXG4gIEhhc2hOYXZpZ2F0aW9uT3B0aW9ucyxcbiAgSGlzdG9yeU9wdGlvbnMsXG4gIEtleWJvYXJkT3B0aW9ucyxcbiAgTGF6eU9wdGlvbnMsXG4gIE1vdXNld2hlZWxPcHRpb25zLFxuICBOYXZpZ2F0aW9uT3B0aW9ucyxcbiAgUGFnaW5hdGlvbk9wdGlvbnMsXG4gIFNjcm9sbGJhck9wdGlvbnMsXG4gIFRodW1ic09wdGlvbnMsXG4gIFZpcnR1YWxEYXRhLFxuICBWaXJ0dWFsT3B0aW9ucyxcbiAgWm9vbU9wdGlvbnMsXG4gIFN3aXBlckV2ZW50cyxcbn0gZnJvbSAnc3dpcGVyL3R5cGVzJztcbmltcG9ydCB7IE9ic2VydmFibGUsIG9mLCBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBnZXRQYXJhbXMgfSBmcm9tICcuL3V0aWxzL2dldC1wYXJhbXMnO1xuaW1wb3J0IHsgU3dpcGVyU2xpZGVEaXJlY3RpdmUgfSBmcm9tICcuL3N3aXBlci1zbGlkZS5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgZXh0ZW5kLCBpc09iamVjdCwgc2V0UHJvcGVydHksIGlnbm9yZU5nT25DaGFuZ2VzIH0gZnJvbSAnLi91dGlscy91dGlscyc7XG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdzd2lwZXIsIFtzd2lwZXJdJyxcbiAgdGVtcGxhdGVVcmw6ICcuL3N3aXBlci5jb21wb25lbnQuaHRtbCcsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICBzdHlsZXM6IFtcbiAgICBgXG4gICAgICBzd2lwZXIge1xuICAgICAgICBkaXNwbGF5OiBibG9jaztcbiAgICAgIH1cbiAgICBgLFxuICBdLFxufSlcbmV4cG9ydCBjbGFzcyBTd2lwZXJDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICBASW5wdXQoKSBpbml0OiBib29sZWFuID0gdHJ1ZTtcbiAgQElucHV0KCkgZGlyZWN0aW9uOiAnaG9yaXpvbnRhbCcgfCAndmVydGljYWwnO1xuICBASW5wdXQoKSB0b3VjaEV2ZW50c1RhcmdldDogc3RyaW5nO1xuICBASW5wdXQoKSBpbml0aWFsU2xpZGU6IG51bWJlcjtcbiAgQElucHV0KCkgc3BlZWQ6IG51bWJlcjtcbiAgQElucHV0KCkgY3NzTW9kZTogYm9vbGVhbjtcbiAgQElucHV0KCkgdXBkYXRlT25XaW5kb3dSZXNpemU6IGJvb2xlYW47XG4gIEBJbnB1dCgpIG5lc3RlZDogYm9vbGVhbjtcbiAgQElucHV0KCkgd2lkdGg6IG51bWJlcjtcbiAgQElucHV0KCkgaGVpZ2h0OiBudW1iZXI7XG4gIEBJbnB1dCgpIHByZXZlbnRJbnRlcmFjdGlvbk9uVHJhbnNpdGlvbjogYm9vbGVhbjtcbiAgQElucHV0KCkgdXNlckFnZW50OiBzdHJpbmc7XG4gIEBJbnB1dCgpIHVybDogc3RyaW5nO1xuICBASW5wdXQoKSBlZGdlU3dpcGVEZXRlY3Rpb246IGJvb2xlYW47XG4gIEBJbnB1dCgpIGVkZ2VTd2lwZVRocmVzaG9sZDogbnVtYmVyO1xuICBASW5wdXQoKSBmcmVlTW9kZTogYm9vbGVhbjtcbiAgQElucHV0KCkgZnJlZU1vZGVNb21lbnR1bTogYm9vbGVhbjtcbiAgQElucHV0KCkgZnJlZU1vZGVNb21lbnR1bVJhdGlvOiBudW1iZXI7XG4gIEBJbnB1dCgpIGZyZWVNb2RlTW9tZW50dW1Cb3VuY2U6IGJvb2xlYW47XG4gIEBJbnB1dCgpIGZyZWVNb2RlTW9tZW50dW1Cb3VuY2VSYXRpbzogbnVtYmVyO1xuICBASW5wdXQoKSBmcmVlTW9kZU1vbWVudHVtVmVsb2NpdHlSYXRpbzogbnVtYmVyO1xuICBASW5wdXQoKSBmcmVlTW9kZVN0aWNreTogYm9vbGVhbjtcbiAgQElucHV0KCkgZnJlZU1vZGVNaW5pbXVtVmVsb2NpdHk6IG51bWJlcjtcbiAgQElucHV0KCkgYXV0b0hlaWdodDogYm9vbGVhbjtcbiAgQElucHV0KCkgc2V0V3JhcHBlclNpemU6IGJvb2xlYW47XG4gIEBJbnB1dCgpIHZpcnR1YWxUcmFuc2xhdGU6IGJvb2xlYW47XG4gIEBJbnB1dCgpIGVmZmVjdDogc3RyaW5nO1xuICBASW5wdXQoKSBicmVha3BvaW50czogT2JqZWN0O1xuICBASW5wdXQoKSBzcGFjZUJldHdlZW46IG51bWJlcjtcbiAgQElucHV0KCkgc2xpZGVzUGVyVmlldzogbnVtYmVyIHwgJ2F1dG8nO1xuICBASW5wdXQoKSBzbGlkZXNQZXJDb2x1bW46IG51bWJlcjtcbiAgQElucHV0KCkgc2xpZGVzUGVyQ29sdW1uRmlsbDogc3RyaW5nO1xuICBASW5wdXQoKSBzbGlkZXNQZXJHcm91cDogbnVtYmVyO1xuICBASW5wdXQoKSBzbGlkZXNQZXJHcm91cFNraXA6IG51bWJlcjtcbiAgQElucHV0KCkgY2VudGVyZWRTbGlkZXM6IGJvb2xlYW47XG4gIEBJbnB1dCgpIGNlbnRlcmVkU2xpZGVzQm91bmRzOiBib29sZWFuO1xuICBASW5wdXQoKSBzbGlkZXNPZmZzZXRCZWZvcmU6IG51bWJlcjtcbiAgQElucHV0KCkgc2xpZGVzT2Zmc2V0QWZ0ZXI6IG51bWJlcjtcbiAgQElucHV0KCkgbm9ybWFsaXplU2xpZGVJbmRleDogYm9vbGVhbjtcbiAgQElucHV0KCkgY2VudGVySW5zdWZmaWNpZW50U2xpZGVzOiBib29sZWFuO1xuICBASW5wdXQoKSB3YXRjaE92ZXJmbG93OiBib29sZWFuO1xuICBASW5wdXQoKSByb3VuZExlbmd0aHM6IGJvb2xlYW47XG4gIEBJbnB1dCgpIHRvdWNoUmF0aW86IG51bWJlcjtcbiAgQElucHV0KCkgdG91Y2hBbmdsZTogbnVtYmVyO1xuICBASW5wdXQoKSBzaW11bGF0ZVRvdWNoOiBib29sZWFuO1xuICBASW5wdXQoKSBzaG9ydFN3aXBlczogYm9vbGVhbjtcbiAgQElucHV0KCkgbG9uZ1N3aXBlczogYm9vbGVhbjtcbiAgQElucHV0KCkgbG9uZ1N3aXBlc1JhdGlvOiBudW1iZXI7XG4gIEBJbnB1dCgpIGxvbmdTd2lwZXNNczogbnVtYmVyO1xuICBASW5wdXQoKSBmb2xsb3dGaW5nZXI6IGJvb2xlYW47XG4gIEBJbnB1dCgpIGFsbG93VG91Y2hNb3ZlOiBib29sZWFuO1xuICBASW5wdXQoKSB0aHJlc2hvbGQ6IG51bWJlcjtcbiAgQElucHV0KCkgdG91Y2hNb3ZlU3RvcFByb3BhZ2F0aW9uOiBib29sZWFuO1xuICBASW5wdXQoKSB0b3VjaFN0YXJ0UHJldmVudERlZmF1bHQ6IGJvb2xlYW47XG4gIEBJbnB1dCgpIHRvdWNoU3RhcnRGb3JjZVByZXZlbnREZWZhdWx0OiBib29sZWFuO1xuICBASW5wdXQoKSB0b3VjaFJlbGVhc2VPbkVkZ2VzOiBib29sZWFuO1xuICBASW5wdXQoKSB1bmlxdWVOYXZFbGVtZW50czogYm9vbGVhbjtcbiAgQElucHV0KCkgcmVzaXN0YW5jZTogYm9vbGVhbjtcbiAgQElucHV0KCkgcmVzaXN0YW5jZVJhdGlvOiBudW1iZXI7XG4gIEBJbnB1dCgpIHdhdGNoU2xpZGVzUHJvZ3Jlc3M6IGJvb2xlYW47XG4gIEBJbnB1dCgpIHdhdGNoU2xpZGVzVmlzaWJpbGl0eTogYm9vbGVhbjtcbiAgQElucHV0KCkgZ3JhYkN1cnNvcjogYm9vbGVhbjtcbiAgQElucHV0KCkgcHJldmVudENsaWNrczogYm9vbGVhbjtcbiAgQElucHV0KCkgcHJldmVudENsaWNrc1Byb3BhZ2F0aW9uOiBib29sZWFuO1xuICBASW5wdXQoKSBzbGlkZVRvQ2xpY2tlZFNsaWRlOiBib29sZWFuO1xuICBASW5wdXQoKSBwcmVsb2FkSW1hZ2VzOiBib29sZWFuO1xuICBASW5wdXQoKSB1cGRhdGVPbkltYWdlc1JlYWR5OiBib29sZWFuO1xuICBASW5wdXQoKSBsb29wOiBib29sZWFuO1xuICBASW5wdXQoKSBsb29wQWRkaXRpb25hbFNsaWRlczogbnVtYmVyO1xuICBASW5wdXQoKSBsb29wZWRTbGlkZXM6IG51bWJlcjtcbiAgQElucHV0KCkgbG9vcEZpbGxHcm91cFdpdGhCbGFuazogYm9vbGVhbjtcbiAgQElucHV0KCkgbG9vcFByZXZlbnRzU2xpZGU6IGJvb2xlYW47XG4gIEBJbnB1dCgpIGFsbG93U2xpZGVQcmV2OiBib29sZWFuO1xuICBASW5wdXQoKSBhbGxvd1NsaWRlTmV4dDogYm9vbGVhbjtcbiAgQElucHV0KCkgc3dpcGVIYW5kbGVyOiBib29sZWFuO1xuICBASW5wdXQoKSBub1N3aXBpbmc6IGJvb2xlYW47XG4gIEBJbnB1dCgpIG5vU3dpcGluZ0NsYXNzOiBzdHJpbmc7XG4gIEBJbnB1dCgpIG5vU3dpcGluZ1NlbGVjdG9yOiBzdHJpbmc7XG4gIEBJbnB1dCgpIHBhc3NpdmVMaXN0ZW5lcnM6IGJvb2xlYW47XG4gIEBJbnB1dCgpIGNvbnRhaW5lck1vZGlmaWVyQ2xhc3M6IHN0cmluZztcbiAgQElucHV0KCkgc2xpZGVDbGFzczogc3RyaW5nID0gJ3N3aXBlci1zbGlkZSc7XG4gIEBJbnB1dCgpIHNsaWRlQmxhbmtDbGFzczogc3RyaW5nO1xuICBASW5wdXQoKSBzbGlkZUFjdGl2ZUNsYXNzOiBzdHJpbmc7XG4gIEBJbnB1dCgpIHNsaWRlRHVwbGljYXRlQWN0aXZlQ2xhc3M6IHN0cmluZztcbiAgQElucHV0KCkgc2xpZGVWaXNpYmxlQ2xhc3M6IHN0cmluZztcbiAgQElucHV0KCkgc2xpZGVEdXBsaWNhdGVDbGFzczogc3RyaW5nO1xuICBASW5wdXQoKSBzbGlkZU5leHRDbGFzczogc3RyaW5nO1xuICBASW5wdXQoKSBzbGlkZUR1cGxpY2F0ZU5leHRDbGFzczogc3RyaW5nO1xuICBASW5wdXQoKSBzbGlkZVByZXZDbGFzczogc3RyaW5nO1xuICBASW5wdXQoKSBzbGlkZUR1cGxpY2F0ZVByZXZDbGFzczogc3RyaW5nO1xuICBASW5wdXQoKSB3cmFwcGVyQ2xhc3M6IHN0cmluZyA9ICdzd2lwZXItd3JhcHBlcic7XG4gIEBJbnB1dCgpIHJ1bkNhbGxiYWNrc09uSW5pdDogYm9vbGVhbjtcbiAgQElucHV0KCkgYTExeTogQTExeU9wdGlvbnM7XG4gIEBJbnB1dCgpIGF1dG9wbGF5OiBBdXRvcGxheU9wdGlvbnMgfCBib29sZWFuO1xuICBASW5wdXQoKSBjb250cm9sbGVyOiBDb250cm9sbGVyT3B0aW9ucztcbiAgQElucHV0KCkgY292ZXJmbG93RWZmZWN0OiBDb3ZlcmZsb3dFZmZlY3RPcHRpb25zO1xuICBASW5wdXQoKSBjdWJlRWZmZWN0OiBDdWJlRWZmZWN0T3B0aW9ucztcbiAgQElucHV0KCkgZmFkZUVmZmVjdDogRmFkZUVmZmVjdE9wdGlvbnM7XG4gIEBJbnB1dCgpIGZsaXBFZmZlY3Q6IEZsaXBFZmZlY3RPcHRpb25zO1xuICBASW5wdXQoKSBoYXNoTmF2aWdhdGlvbjogSGFzaE5hdmlnYXRpb25PcHRpb25zIHwgYm9vbGVhbjtcbiAgQElucHV0KCkgaGlzdG9yeTogSGlzdG9yeU9wdGlvbnMgfCBib29sZWFuO1xuICBASW5wdXQoKSBrZXlib2FyZDogS2V5Ym9hcmRPcHRpb25zIHwgYm9vbGVhbjtcbiAgQElucHV0KCkgbGF6eTogTGF6eU9wdGlvbnMgfCBib29sZWFuO1xuICBASW5wdXQoKSBtb3VzZXdoZWVsOiBNb3VzZXdoZWVsT3B0aW9ucyB8IGJvb2xlYW47XG4gIEBJbnB1dCgpXG4gIHNldCBuYXZpZ2F0aW9uKHZhbCkge1xuICAgIHRoaXMuX25hdmlnYXRpb24gPSBzZXRQcm9wZXJ0eSh2YWwsIHtcbiAgICAgIG5leHRFbDogbnVsbCxcbiAgICAgIHByZXZFbDogbnVsbCxcbiAgICB9KTtcbiAgfVxuICBnZXQgbmF2aWdhdGlvbigpIHtcbiAgICByZXR1cm4gdGhpcy5fbmF2aWdhdGlvbjtcbiAgfVxuICBwcml2YXRlIF9uYXZpZ2F0aW9uOiBOYXZpZ2F0aW9uT3B0aW9ucyB8IGZhbHNlO1xuXG4gIEBJbnB1dCgpXG4gIHNldCBwYWdpbmF0aW9uKHZhbCkge1xuICAgIHRoaXMuX3BhZ2luYXRpb24gPSBzZXRQcm9wZXJ0eSh2YWwsIHtcbiAgICAgIGVsOiBudWxsLFxuICAgIH0pO1xuICB9XG4gIGdldCBwYWdpbmF0aW9uKCkge1xuICAgIHJldHVybiB0aGlzLl9wYWdpbmF0aW9uO1xuICB9XG4gIHByaXZhdGUgX3BhZ2luYXRpb246IFBhZ2luYXRpb25PcHRpb25zIHwgZmFsc2U7XG4gIEBJbnB1dCgpIHBhcmFsbGF4OiBib29sZWFuO1xuXG4gIEBJbnB1dCgpXG4gIHNldCBzY3JvbGxiYXIodmFsKSB7XG4gICAgdGhpcy5fc2Nyb2xsYmFyID0gc2V0UHJvcGVydHkodmFsLCB7XG4gICAgICBlbDogbnVsbCxcbiAgICB9KTtcbiAgfVxuICBnZXQgc2Nyb2xsYmFyKCkge1xuICAgIHJldHVybiB0aGlzLl9zY3JvbGxiYXI7XG4gIH1cbiAgcHJpdmF0ZSBfc2Nyb2xsYmFyOiBTY3JvbGxiYXJPcHRpb25zIHwgZmFsc2U7XG5cbiAgQElucHV0KClcbiAgc2V0IHZpcnR1YWwodmFsKSB7XG4gICAgdGhpcy5fdmlydHVhbCA9IHNldFByb3BlcnR5KHZhbCk7XG4gIH1cbiAgZ2V0IHZpcnR1YWwoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3ZpcnR1YWw7XG4gIH1cbiAgcHJpdmF0ZSBfdmlydHVhbDogVmlydHVhbE9wdGlvbnMgfCBmYWxzZTtcbiAgQElucHV0KCkgdGh1bWJzOiBUaHVtYnNPcHRpb25zO1xuICBASW5wdXQoKSB6b29tOiBab29tT3B0aW9ucyB8IGJvb2xlYW47XG4gIC8vIHByZXR0aWVyLWlnbm9yZVxuICBAT3V0cHV0KCdfYmVmb3JlQnJlYWtwb2ludCcpIHNfX2JlZm9yZUJyZWFrcG9pbnQ6IEV2ZW50RW1pdHRlcjxTd2lwZXJFdmVudHNbJ19iZWZvcmVCcmVha3BvaW50J10+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG4gIC8vIHByZXR0aWVyLWlnbm9yZVxuICBAT3V0cHV0KCdfY29udGFpbmVyQ2xhc3NlcycpIHNfX2NvbnRhaW5lckNsYXNzZXM6IEV2ZW50RW1pdHRlcjxTd2lwZXJFdmVudHNbJ19jb250YWluZXJDbGFzc2VzJ10+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG4gIC8vIHByZXR0aWVyLWlnbm9yZVxuICBAT3V0cHV0KCdfc2xpZGVDbGFzcycpIHNfX3NsaWRlQ2xhc3M6IEV2ZW50RW1pdHRlcjxTd2lwZXJFdmVudHNbJ19zbGlkZUNsYXNzJ10+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG4gIC8vIHByZXR0aWVyLWlnbm9yZVxuICBAT3V0cHV0KCdfc3dpcGVyJykgc19fc3dpcGVyOiBFdmVudEVtaXR0ZXI8U3dpcGVyRXZlbnRzWydfc3dpcGVyJ10+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG4gIC8vIHByZXR0aWVyLWlnbm9yZVxuICBAT3V0cHV0KCdhY3RpdmVJbmRleENoYW5nZScpIHNfYWN0aXZlSW5kZXhDaGFuZ2U6IEV2ZW50RW1pdHRlcjxTd2lwZXJFdmVudHNbJ2FjdGl2ZUluZGV4Q2hhbmdlJ10+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG4gIC8vIHByZXR0aWVyLWlnbm9yZVxuICBAT3V0cHV0KCdhZnRlckluaXQnKSBzX2FmdGVySW5pdDogRXZlbnRFbWl0dGVyPFN3aXBlckV2ZW50c1snYWZ0ZXJJbml0J10+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG4gIC8vIHByZXR0aWVyLWlnbm9yZVxuICBAT3V0cHV0KCdhdXRvcGxheScpIHNfYXV0b3BsYXk6IEV2ZW50RW1pdHRlcjxTd2lwZXJFdmVudHNbJ2F1dG9wbGF5J10+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG4gIC8vIHByZXR0aWVyLWlnbm9yZVxuICBAT3V0cHV0KCdhdXRvcGxheVN0YXJ0Jykgc19hdXRvcGxheVN0YXJ0OiBFdmVudEVtaXR0ZXI8U3dpcGVyRXZlbnRzWydhdXRvcGxheVN0YXJ0J10+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG4gIC8vIHByZXR0aWVyLWlnbm9yZVxuICBAT3V0cHV0KCdhdXRvcGxheVN0b3AnKSBzX2F1dG9wbGF5U3RvcDogRXZlbnRFbWl0dGVyPFN3aXBlckV2ZW50c1snYXV0b3BsYXlTdG9wJ10+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG4gIC8vIHByZXR0aWVyLWlnbm9yZVxuICBAT3V0cHV0KCdiZWZvcmVEZXN0cm95Jykgc19iZWZvcmVEZXN0cm95OiBFdmVudEVtaXR0ZXI8U3dpcGVyRXZlbnRzWydiZWZvcmVEZXN0cm95J10+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG4gIC8vIHByZXR0aWVyLWlnbm9yZVxuICBAT3V0cHV0KCdiZWZvcmVJbml0Jykgc19iZWZvcmVJbml0OiBFdmVudEVtaXR0ZXI8U3dpcGVyRXZlbnRzWydiZWZvcmVJbml0J10+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG4gIC8vIHByZXR0aWVyLWlnbm9yZVxuICBAT3V0cHV0KCdiZWZvcmVMb29wRml4Jykgc19iZWZvcmVMb29wRml4OiBFdmVudEVtaXR0ZXI8U3dpcGVyRXZlbnRzWydiZWZvcmVMb29wRml4J10+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG4gIC8vIHByZXR0aWVyLWlnbm9yZVxuICBAT3V0cHV0KCdiZWZvcmVSZXNpemUnKSBzX2JlZm9yZVJlc2l6ZTogRXZlbnRFbWl0dGVyPFN3aXBlckV2ZW50c1snYmVmb3JlUmVzaXplJ10+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG4gIC8vIHByZXR0aWVyLWlnbm9yZVxuICBAT3V0cHV0KCdiZWZvcmVTbGlkZUNoYW5nZVN0YXJ0Jykgc19iZWZvcmVTbGlkZUNoYW5nZVN0YXJ0OiBFdmVudEVtaXR0ZXI8U3dpcGVyRXZlbnRzWydiZWZvcmVTbGlkZUNoYW5nZVN0YXJ0J10+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG4gIC8vIHByZXR0aWVyLWlnbm9yZVxuICBAT3V0cHV0KCdiZWZvcmVUcmFuc2l0aW9uU3RhcnQnKSBzX2JlZm9yZVRyYW5zaXRpb25TdGFydDogRXZlbnRFbWl0dGVyPFN3aXBlckV2ZW50c1snYmVmb3JlVHJhbnNpdGlvblN0YXJ0J10+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG4gIC8vIHByZXR0aWVyLWlnbm9yZVxuICBAT3V0cHV0KCdicmVha3BvaW50Jykgc19icmVha3BvaW50OiBFdmVudEVtaXR0ZXI8U3dpcGVyRXZlbnRzWydicmVha3BvaW50J10+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG4gIC8vIHByZXR0aWVyLWlnbm9yZVxuICBAT3V0cHV0KCdjaGFuZ2VEaXJlY3Rpb24nKSBzX2NoYW5nZURpcmVjdGlvbjogRXZlbnRFbWl0dGVyPFN3aXBlckV2ZW50c1snY2hhbmdlRGlyZWN0aW9uJ10+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG4gIC8vIHByZXR0aWVyLWlnbm9yZVxuICBAT3V0cHV0KCdjbGljaycpIHNfY2xpY2s6IEV2ZW50RW1pdHRlcjxTd2lwZXJFdmVudHNbJ2NsaWNrJ10+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG4gIC8vIHByZXR0aWVyLWlnbm9yZVxuICBAT3V0cHV0KCdkb3VibGVUYXAnKSBzX2RvdWJsZVRhcDogRXZlbnRFbWl0dGVyPFN3aXBlckV2ZW50c1snZG91YmxlVGFwJ10+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG4gIC8vIHByZXR0aWVyLWlnbm9yZVxuICBAT3V0cHV0KCdkb3VibGVDbGljaycpIHNfZG91YmxlQ2xpY2s6IEV2ZW50RW1pdHRlcjxTd2lwZXJFdmVudHNbJ2RvdWJsZUNsaWNrJ10+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG4gIC8vIHByZXR0aWVyLWlnbm9yZVxuICBAT3V0cHV0KCdkZXN0cm95Jykgc19kZXN0cm95OiBFdmVudEVtaXR0ZXI8U3dpcGVyRXZlbnRzWydkZXN0cm95J10+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG4gIC8vIHByZXR0aWVyLWlnbm9yZVxuICBAT3V0cHV0KCdmcm9tRWRnZScpIHNfZnJvbUVkZ2U6IEV2ZW50RW1pdHRlcjxTd2lwZXJFdmVudHNbJ2Zyb21FZGdlJ10+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG4gIC8vIHByZXR0aWVyLWlnbm9yZVxuICBAT3V0cHV0KCdoYXNoQ2hhbmdlJykgc19oYXNoQ2hhbmdlOiBFdmVudEVtaXR0ZXI8U3dpcGVyRXZlbnRzWydoYXNoQ2hhbmdlJ10+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG4gIC8vIHByZXR0aWVyLWlnbm9yZVxuICBAT3V0cHV0KCdoYXNoU2V0Jykgc19oYXNoU2V0OiBFdmVudEVtaXR0ZXI8U3dpcGVyRXZlbnRzWydoYXNoU2V0J10+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG4gIC8vIHByZXR0aWVyLWlnbm9yZVxuICBAT3V0cHV0KCdpbWFnZXNSZWFkeScpIHNfaW1hZ2VzUmVhZHk6IEV2ZW50RW1pdHRlcjxTd2lwZXJFdmVudHNbJ2ltYWdlc1JlYWR5J10+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG4gIC8vIHByZXR0aWVyLWlnbm9yZVxuICBAT3V0cHV0KCdpbml0Jykgc19pbml0OiBFdmVudEVtaXR0ZXI8U3dpcGVyRXZlbnRzWydpbml0J10+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG4gIC8vIHByZXR0aWVyLWlnbm9yZVxuICBAT3V0cHV0KCdrZXlQcmVzcycpIHNfa2V5UHJlc3M6IEV2ZW50RW1pdHRlcjxTd2lwZXJFdmVudHNbJ2tleVByZXNzJ10+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG4gIC8vIHByZXR0aWVyLWlnbm9yZVxuICBAT3V0cHV0KCdsYXp5SW1hZ2VMb2FkJykgc19sYXp5SW1hZ2VMb2FkOiBFdmVudEVtaXR0ZXI8U3dpcGVyRXZlbnRzWydsYXp5SW1hZ2VMb2FkJ10+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG4gIC8vIHByZXR0aWVyLWlnbm9yZVxuICBAT3V0cHV0KCdsYXp5SW1hZ2VSZWFkeScpIHNfbGF6eUltYWdlUmVhZHk6IEV2ZW50RW1pdHRlcjxTd2lwZXJFdmVudHNbJ2xhenlJbWFnZVJlYWR5J10+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG4gIC8vIHByZXR0aWVyLWlnbm9yZVxuICBAT3V0cHV0KCdsb29wRml4Jykgc19sb29wRml4OiBFdmVudEVtaXR0ZXI8U3dpcGVyRXZlbnRzWydsb29wRml4J10+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG4gIC8vIHByZXR0aWVyLWlnbm9yZVxuICBAT3V0cHV0KCdtb21lbnR1bUJvdW5jZScpIHNfbW9tZW50dW1Cb3VuY2U6IEV2ZW50RW1pdHRlcjxTd2lwZXJFdmVudHNbJ21vbWVudHVtQm91bmNlJ10+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG4gIC8vIHByZXR0aWVyLWlnbm9yZVxuICBAT3V0cHV0KCduYXZpZ2F0aW9uSGlkZScpIHNfbmF2aWdhdGlvbkhpZGU6IEV2ZW50RW1pdHRlcjxTd2lwZXJFdmVudHNbJ25hdmlnYXRpb25IaWRlJ10+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG4gIC8vIHByZXR0aWVyLWlnbm9yZVxuICBAT3V0cHV0KCduYXZpZ2F0aW9uU2hvdycpIHNfbmF2aWdhdGlvblNob3c6IEV2ZW50RW1pdHRlcjxTd2lwZXJFdmVudHNbJ25hdmlnYXRpb25TaG93J10+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG4gIC8vIHByZXR0aWVyLWlnbm9yZVxuICBAT3V0cHV0KCdvYnNlcnZlclVwZGF0ZScpIHNfb2JzZXJ2ZXJVcGRhdGU6IEV2ZW50RW1pdHRlcjxTd2lwZXJFdmVudHNbJ29ic2VydmVyVXBkYXRlJ10+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG4gIC8vIHByZXR0aWVyLWlnbm9yZVxuICBAT3V0cHV0KCdvcmllbnRhdGlvbmNoYW5nZScpIHNfb3JpZW50YXRpb25jaGFuZ2U6IEV2ZW50RW1pdHRlcjxTd2lwZXJFdmVudHNbJ29yaWVudGF0aW9uY2hhbmdlJ10+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG4gIC8vIHByZXR0aWVyLWlnbm9yZVxuICBAT3V0cHV0KCdwYWdpbmF0aW9uSGlkZScpIHNfcGFnaW5hdGlvbkhpZGU6IEV2ZW50RW1pdHRlcjxTd2lwZXJFdmVudHNbJ3BhZ2luYXRpb25IaWRlJ10+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG4gIC8vIHByZXR0aWVyLWlnbm9yZVxuICBAT3V0cHV0KCdwYWdpbmF0aW9uUmVuZGVyJykgc19wYWdpbmF0aW9uUmVuZGVyOiBFdmVudEVtaXR0ZXI8U3dpcGVyRXZlbnRzWydwYWdpbmF0aW9uUmVuZGVyJ10+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG4gIC8vIHByZXR0aWVyLWlnbm9yZVxuICBAT3V0cHV0KCdwYWdpbmF0aW9uU2hvdycpIHNfcGFnaW5hdGlvblNob3c6IEV2ZW50RW1pdHRlcjxTd2lwZXJFdmVudHNbJ3BhZ2luYXRpb25TaG93J10+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG4gIC8vIHByZXR0aWVyLWlnbm9yZVxuICBAT3V0cHV0KCdwYWdpbmF0aW9uVXBkYXRlJykgc19wYWdpbmF0aW9uVXBkYXRlOiBFdmVudEVtaXR0ZXI8U3dpcGVyRXZlbnRzWydwYWdpbmF0aW9uVXBkYXRlJ10+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG4gIC8vIHByZXR0aWVyLWlnbm9yZVxuICBAT3V0cHV0KCdwcm9ncmVzcycpIHNfcHJvZ3Jlc3M6IEV2ZW50RW1pdHRlcjxTd2lwZXJFdmVudHNbJ3Byb2dyZXNzJ10+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG4gIC8vIHByZXR0aWVyLWlnbm9yZVxuICBAT3V0cHV0KCdyZWFjaEJlZ2lubmluZycpIHNfcmVhY2hCZWdpbm5pbmc6IEV2ZW50RW1pdHRlcjxTd2lwZXJFdmVudHNbJ3JlYWNoQmVnaW5uaW5nJ10+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG4gIC8vIHByZXR0aWVyLWlnbm9yZVxuICBAT3V0cHV0KCdyZWFjaEVuZCcpIHNfcmVhY2hFbmQ6IEV2ZW50RW1pdHRlcjxTd2lwZXJFdmVudHNbJ3JlYWNoRW5kJ10+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG4gIC8vIHByZXR0aWVyLWlnbm9yZVxuICBAT3V0cHV0KCdyZWFsSW5kZXhDaGFuZ2UnKSBzX3JlYWxJbmRleENoYW5nZTogRXZlbnRFbWl0dGVyPFN3aXBlckV2ZW50c1sncmVhbEluZGV4Q2hhbmdlJ10+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG4gIC8vIHByZXR0aWVyLWlnbm9yZVxuICBAT3V0cHV0KCdyZXNpemUnKSBzX3Jlc2l6ZTogRXZlbnRFbWl0dGVyPFN3aXBlckV2ZW50c1sncmVzaXplJ10+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG4gIC8vIHByZXR0aWVyLWlnbm9yZVxuICBAT3V0cHV0KCdzY3JvbGwnKSBzX3Njcm9sbDogRXZlbnRFbWl0dGVyPFN3aXBlckV2ZW50c1snc2Nyb2xsJ10+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG4gIC8vIHByZXR0aWVyLWlnbm9yZVxuICBAT3V0cHV0KCdzY3JvbGxiYXJEcmFnRW5kJykgc19zY3JvbGxiYXJEcmFnRW5kOiBFdmVudEVtaXR0ZXI8U3dpcGVyRXZlbnRzWydzY3JvbGxiYXJEcmFnRW5kJ10+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG4gIC8vIHByZXR0aWVyLWlnbm9yZVxuICBAT3V0cHV0KCdzY3JvbGxiYXJEcmFnTW92ZScpIHNfc2Nyb2xsYmFyRHJhZ01vdmU6IEV2ZW50RW1pdHRlcjxTd2lwZXJFdmVudHNbJ3Njcm9sbGJhckRyYWdNb3ZlJ10+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG4gIC8vIHByZXR0aWVyLWlnbm9yZVxuICBAT3V0cHV0KCdzY3JvbGxiYXJEcmFnU3RhcnQnKSBzX3Njcm9sbGJhckRyYWdTdGFydDogRXZlbnRFbWl0dGVyPFN3aXBlckV2ZW50c1snc2Nyb2xsYmFyRHJhZ1N0YXJ0J10+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG4gIC8vIHByZXR0aWVyLWlnbm9yZVxuICBAT3V0cHV0KCdzZXRUcmFuc2l0aW9uJykgc19zZXRUcmFuc2l0aW9uOiBFdmVudEVtaXR0ZXI8U3dpcGVyRXZlbnRzWydzZXRUcmFuc2l0aW9uJ10+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG4gIC8vIHByZXR0aWVyLWlnbm9yZVxuICBAT3V0cHV0KCdzZXRUcmFuc2xhdGUnKSBzX3NldFRyYW5zbGF0ZTogRXZlbnRFbWl0dGVyPFN3aXBlckV2ZW50c1snc2V0VHJhbnNsYXRlJ10+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG4gIC8vIHByZXR0aWVyLWlnbm9yZVxuICBAT3V0cHV0KCdzbGlkZUNoYW5nZScpIHNfc2xpZGVDaGFuZ2U6IEV2ZW50RW1pdHRlcjxTd2lwZXJFdmVudHNbJ3NsaWRlQ2hhbmdlJ10+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG4gIC8vIHByZXR0aWVyLWlnbm9yZVxuICBAT3V0cHV0KCdzbGlkZUNoYW5nZVRyYW5zaXRpb25FbmQnKSBzX3NsaWRlQ2hhbmdlVHJhbnNpdGlvbkVuZDogRXZlbnRFbWl0dGVyPFN3aXBlckV2ZW50c1snc2xpZGVDaGFuZ2VUcmFuc2l0aW9uRW5kJ10+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG4gIC8vIHByZXR0aWVyLWlnbm9yZVxuICBAT3V0cHV0KCdzbGlkZUNoYW5nZVRyYW5zaXRpb25TdGFydCcpIHNfc2xpZGVDaGFuZ2VUcmFuc2l0aW9uU3RhcnQ6IEV2ZW50RW1pdHRlcjxTd2lwZXJFdmVudHNbJ3NsaWRlQ2hhbmdlVHJhbnNpdGlvblN0YXJ0J10+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG4gIC8vIHByZXR0aWVyLWlnbm9yZVxuICBAT3V0cHV0KCdzbGlkZU5leHRUcmFuc2l0aW9uRW5kJykgc19zbGlkZU5leHRUcmFuc2l0aW9uRW5kOiBFdmVudEVtaXR0ZXI8U3dpcGVyRXZlbnRzWydzbGlkZU5leHRUcmFuc2l0aW9uRW5kJ10+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG4gIC8vIHByZXR0aWVyLWlnbm9yZVxuICBAT3V0cHV0KCdzbGlkZU5leHRUcmFuc2l0aW9uU3RhcnQnKSBzX3NsaWRlTmV4dFRyYW5zaXRpb25TdGFydDogRXZlbnRFbWl0dGVyPFN3aXBlckV2ZW50c1snc2xpZGVOZXh0VHJhbnNpdGlvblN0YXJ0J10+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG4gIC8vIHByZXR0aWVyLWlnbm9yZVxuICBAT3V0cHV0KCdzbGlkZVByZXZUcmFuc2l0aW9uRW5kJykgc19zbGlkZVByZXZUcmFuc2l0aW9uRW5kOiBFdmVudEVtaXR0ZXI8U3dpcGVyRXZlbnRzWydzbGlkZVByZXZUcmFuc2l0aW9uRW5kJ10+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG4gIC8vIHByZXR0aWVyLWlnbm9yZVxuICBAT3V0cHV0KCdzbGlkZVByZXZUcmFuc2l0aW9uU3RhcnQnKSBzX3NsaWRlUHJldlRyYW5zaXRpb25TdGFydDogRXZlbnRFbWl0dGVyPFN3aXBlckV2ZW50c1snc2xpZGVQcmV2VHJhbnNpdGlvblN0YXJ0J10+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG4gIC8vIHByZXR0aWVyLWlnbm9yZVxuICBAT3V0cHV0KCdzbGlkZVJlc2V0VHJhbnNpdGlvblN0YXJ0Jykgc19zbGlkZVJlc2V0VHJhbnNpdGlvblN0YXJ0OiBFdmVudEVtaXR0ZXI8U3dpcGVyRXZlbnRzWydzbGlkZVJlc2V0VHJhbnNpdGlvblN0YXJ0J10+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG4gIC8vIHByZXR0aWVyLWlnbm9yZVxuICBAT3V0cHV0KCdzbGlkZVJlc2V0VHJhbnNpdGlvbkVuZCcpIHNfc2xpZGVSZXNldFRyYW5zaXRpb25FbmQ6IEV2ZW50RW1pdHRlcjxTd2lwZXJFdmVudHNbJ3NsaWRlUmVzZXRUcmFuc2l0aW9uRW5kJ10+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG4gIC8vIHByZXR0aWVyLWlnbm9yZVxuICBAT3V0cHV0KCdzbGlkZXJNb3ZlJykgc19zbGlkZXJNb3ZlOiBFdmVudEVtaXR0ZXI8U3dpcGVyRXZlbnRzWydzbGlkZXJNb3ZlJ10+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG4gIC8vIHByZXR0aWVyLWlnbm9yZVxuICBAT3V0cHV0KCdzbGlkZXJGaXJzdE1vdmUnKSBzX3NsaWRlckZpcnN0TW92ZTogRXZlbnRFbWl0dGVyPFN3aXBlckV2ZW50c1snc2xpZGVyRmlyc3RNb3ZlJ10+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG4gIC8vIHByZXR0aWVyLWlnbm9yZVxuICBAT3V0cHV0KCdzbGlkZXNMZW5ndGhDaGFuZ2UnKSBzX3NsaWRlc0xlbmd0aENoYW5nZTogRXZlbnRFbWl0dGVyPFN3aXBlckV2ZW50c1snc2xpZGVzTGVuZ3RoQ2hhbmdlJ10+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG4gIC8vIHByZXR0aWVyLWlnbm9yZVxuICBAT3V0cHV0KCdzbGlkZXNHcmlkTGVuZ3RoQ2hhbmdlJykgc19zbGlkZXNHcmlkTGVuZ3RoQ2hhbmdlOiBFdmVudEVtaXR0ZXI8U3dpcGVyRXZlbnRzWydzbGlkZXNHcmlkTGVuZ3RoQ2hhbmdlJ10+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG4gIC8vIHByZXR0aWVyLWlnbm9yZVxuICBAT3V0cHV0KCdzbmFwR3JpZExlbmd0aENoYW5nZScpIHNfc25hcEdyaWRMZW5ndGhDaGFuZ2U6IEV2ZW50RW1pdHRlcjxTd2lwZXJFdmVudHNbJ3NuYXBHcmlkTGVuZ3RoQ2hhbmdlJ10+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG4gIC8vIHByZXR0aWVyLWlnbm9yZVxuICBAT3V0cHV0KCdzbmFwSW5kZXhDaGFuZ2UnKSBzX3NuYXBJbmRleENoYW5nZTogRXZlbnRFbWl0dGVyPFN3aXBlckV2ZW50c1snc25hcEluZGV4Q2hhbmdlJ10+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG4gIC8vIHByZXR0aWVyLWlnbm9yZVxuICBAT3V0cHV0KCd0YXAnKSBzX3RhcDogRXZlbnRFbWl0dGVyPFN3aXBlckV2ZW50c1sndGFwJ10+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG4gIC8vIHByZXR0aWVyLWlnbm9yZVxuICBAT3V0cHV0KCd0b0VkZ2UnKSBzX3RvRWRnZTogRXZlbnRFbWl0dGVyPFN3aXBlckV2ZW50c1sndG9FZGdlJ10+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG4gIC8vIHByZXR0aWVyLWlnbm9yZVxuICBAT3V0cHV0KCd0b3VjaEVuZCcpIHNfdG91Y2hFbmQ6IEV2ZW50RW1pdHRlcjxTd2lwZXJFdmVudHNbJ3RvdWNoRW5kJ10+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG4gIC8vIHByZXR0aWVyLWlnbm9yZVxuICBAT3V0cHV0KCd0b3VjaE1vdmUnKSBzX3RvdWNoTW92ZTogRXZlbnRFbWl0dGVyPFN3aXBlckV2ZW50c1sndG91Y2hNb3ZlJ10+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG4gIC8vIHByZXR0aWVyLWlnbm9yZVxuICBAT3V0cHV0KCd0b3VjaE1vdmVPcHBvc2l0ZScpIHNfdG91Y2hNb3ZlT3Bwb3NpdGU6IEV2ZW50RW1pdHRlcjxTd2lwZXJFdmVudHNbJ3RvdWNoTW92ZU9wcG9zaXRlJ10+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG4gIC8vIHByZXR0aWVyLWlnbm9yZVxuICBAT3V0cHV0KCd0b3VjaFN0YXJ0Jykgc190b3VjaFN0YXJ0OiBFdmVudEVtaXR0ZXI8U3dpcGVyRXZlbnRzWyd0b3VjaFN0YXJ0J10+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG4gIC8vIHByZXR0aWVyLWlnbm9yZVxuICBAT3V0cHV0KCd0cmFuc2l0aW9uRW5kJykgc190cmFuc2l0aW9uRW5kOiBFdmVudEVtaXR0ZXI8U3dpcGVyRXZlbnRzWyd0cmFuc2l0aW9uRW5kJ10+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG4gIC8vIHByZXR0aWVyLWlnbm9yZVxuICBAT3V0cHV0KCd0cmFuc2l0aW9uU3RhcnQnKSBzX3RyYW5zaXRpb25TdGFydDogRXZlbnRFbWl0dGVyPFN3aXBlckV2ZW50c1sndHJhbnNpdGlvblN0YXJ0J10+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG4gIC8vIHByZXR0aWVyLWlnbm9yZVxuICBAT3V0cHV0KCd1cGRhdGUnKSBzX3VwZGF0ZTogRXZlbnRFbWl0dGVyPFN3aXBlckV2ZW50c1sndXBkYXRlJ10+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG4gIC8vIHByZXR0aWVyLWlnbm9yZVxuICBAT3V0cHV0KCd6b29tQ2hhbmdlJykgc196b29tQ2hhbmdlOiBFdmVudEVtaXR0ZXI8U3dpcGVyRXZlbnRzWyd6b29tQ2hhbmdlJ10+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG4gIC8vIHByZXR0aWVyLWlnbm9yZVxuICBAT3V0cHV0KCdzd2lwZXInKSBzX3N3aXBlcjogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcblxuICBAVmlld0NoaWxkKCdwcmV2RWxSZWYnLCB7IHN0YXRpYzogZmFsc2UgfSlcbiAgc2V0IHByZXZFbFJlZihlbDogRWxlbWVudFJlZikge1xuICAgIHRoaXMuX3NldEVsZW1lbnQoZWwsIHRoaXMubmF2aWdhdGlvbiwgJ25hdmlnYXRpb24nLCAncHJldkVsJyk7XG4gIH1cbiAgQFZpZXdDaGlsZCgnbmV4dEVsUmVmJywgeyBzdGF0aWM6IGZhbHNlIH0pXG4gIHNldCBuZXh0RWxSZWYoZWw6IEVsZW1lbnRSZWYpIHtcbiAgICB0aGlzLl9zZXRFbGVtZW50KGVsLCB0aGlzLm5hdmlnYXRpb24sICduYXZpZ2F0aW9uJywgJ25leHRFbCcpO1xuICB9XG4gIEBWaWV3Q2hpbGQoJ3Njcm9sbGJhckVsUmVmJywgeyBzdGF0aWM6IGZhbHNlIH0pXG4gIHNldCBzY3JvbGxiYXJFbFJlZihlbDogRWxlbWVudFJlZikge1xuICAgIHRoaXMuX3NldEVsZW1lbnQoZWwsIHRoaXMuc2Nyb2xsYmFyLCAnc2Nyb2xsYmFyJyk7XG4gIH1cbiAgQFZpZXdDaGlsZCgncGFnaW5hdGlvbkVsUmVmJywgeyBzdGF0aWM6IGZhbHNlIH0pXG4gIHNldCBwYWdpbmF0aW9uRWxSZWYoZWw6IEVsZW1lbnRSZWYpIHtcbiAgICB0aGlzLl9zZXRFbGVtZW50KGVsLCB0aGlzLnBhZ2luYXRpb24sICdwYWdpbmF0aW9uJyk7XG4gIH1cbiAgQENvbnRlbnRDaGlsZHJlbihTd2lwZXJTbGlkZURpcmVjdGl2ZSwgeyBkZXNjZW5kYW50czogdHJ1ZSB9KVxuICBzZXQgc2xpZGVzRWwodmFsOiBRdWVyeUxpc3Q8U3dpcGVyU2xpZGVEaXJlY3RpdmU+KSB7XG4gICAgdGhpcy5zbGlkZXMgPSB2YWwubWFwKChzbGlkZTogU3dpcGVyU2xpZGVEaXJlY3RpdmUsIGluZGV4OiBudW1iZXIpID0+IHtcbiAgICAgIHNsaWRlLnNsaWRlSW5kZXggPSBpbmRleDtcbiAgICAgIHNsaWRlLmNsYXNzTmFtZXMgPSB0aGlzLnNsaWRlQ2xhc3M7XG4gICAgICByZXR1cm4gc2xpZGU7XG4gICAgfSk7XG4gICAgaWYgKHRoaXMubG9vcCAmJiAhdGhpcy5sb29wZWRTbGlkZXMpIHtcbiAgICAgIHRoaXMuY2FsY0xvb3BlZFNsaWRlcygpO1xuICAgIH1cbiAgICBpZiAoIXRoaXMudmlydHVhbCkge1xuICAgICAgdGhpcy5wcmVwZW5kU2xpZGVzID0gb2YodGhpcy5zbGlkZXMuc2xpY2UodGhpcy5zbGlkZXMubGVuZ3RoIC0gdGhpcy5sb29wZWRTbGlkZXMpKTtcbiAgICAgIHRoaXMuYXBwZW5kU2xpZGVzID0gb2YodGhpcy5zbGlkZXMuc2xpY2UoMCwgdGhpcy5sb29wZWRTbGlkZXMpKTtcbiAgICB9XG4gIH1cbiAgcHJpdmF0ZSBzbGlkZXM6IFN3aXBlclNsaWRlRGlyZWN0aXZlW107XG5cbiAgcHJlcGVuZFNsaWRlczogT2JzZXJ2YWJsZTxTd2lwZXJTbGlkZURpcmVjdGl2ZVtdPjtcbiAgYXBwZW5kU2xpZGVzOiBPYnNlcnZhYmxlPFN3aXBlclNsaWRlRGlyZWN0aXZlW10+O1xuXG4gIHN3aXBlclJlZjogU3dpcGVyO1xuICByZWFkb25seSBfYWN0aXZlU2xpZGVzID0gbmV3IFN1YmplY3Q8U3dpcGVyU2xpZGVEaXJlY3RpdmVbXT4oKTtcblxuICBnZXQgYWN0aXZlU2xpZGVzKCkge1xuICAgIGlmICh0aGlzLnZpcnR1YWwpIHtcbiAgICAgIHJldHVybiB0aGlzLl9hY3RpdmVTbGlkZXM7XG4gICAgfVxuICAgIHJldHVybiBvZih0aGlzLnNsaWRlcyk7XG4gIH1cblxuICBASG9zdEJpbmRpbmcoJ2NsYXNzJykgY29udGFpbmVyQ2xhc3NlcyA9ICdzd2lwZXItY29udGFpbmVyJztcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBlbGVtZW50UmVmOiBFbGVtZW50UmVmLCBwcml2YXRlIF9jaGFuZ2VEZXRlY3RvclJlZjogQ2hhbmdlRGV0ZWN0b3JSZWYpIHt9XG5cbiAgcHJpdmF0ZSBfc2V0RWxlbWVudChlbDogRWxlbWVudFJlZiwgcmVmOiBhbnksIHVwZGF0ZTogc3RyaW5nLCBrZXkgPSAnZWwnKSB7XG4gICAgaWYgKCFlbCAmJiAhcmVmKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmIChyZWYpIHtcbiAgICAgIGlmIChyZWZba2V5XSA9PT0gZWwubmF0aXZlRWxlbWVudCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICByZWZba2V5XSA9IGVsLm5hdGl2ZUVsZW1lbnQ7XG4gICAgfVxuICAgIGNvbnN0IHVwZGF0ZU9iaiA9IHt9O1xuICAgIHVwZGF0ZU9ialt1cGRhdGVdID0gdHJ1ZTtcbiAgICB0aGlzLnVwZGF0ZUluaXRTd2lwZXIodXBkYXRlT2JqKTtcbiAgfVxuICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICBjb25zdCB7IHBhcmFtcyB9ID0gZ2V0UGFyYW1zKHRoaXMpO1xuICAgIE9iamVjdC5hc3NpZ24odGhpcywgcGFyYW1zKTtcbiAgfVxuXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICBpZiAodGhpcy5pbml0KSB7XG4gICAgICB0aGlzLmluaXRTd2lwZXIoKTtcbiAgICAgIHRoaXMuX2NoYW5nZURldGVjdG9yUmVmLmRldGVjdENoYW5nZXMoKTtcbiAgICB9XG4gIH1cblxuICBpbml0U3dpcGVyKCkge1xuICAgIGNvbnN0IHsgcGFyYW1zOiBzd2lwZXJQYXJhbXMsIHBhc3NlZFBhcmFtcyB9ID0gZ2V0UGFyYW1zKHRoaXMpO1xuICAgIE9iamVjdC5hc3NpZ24odGhpcywgc3dpcGVyUGFyYW1zKTtcbiAgICBzd2lwZXJQYXJhbXMub25BbnkgPSAoZXZlbnQsIC4uLmFyZ3MpID0+IHtcbiAgICAgIGNvbnN0IGVtaXR0ZXIgPSB0aGlzW2BzXyR7ZXZlbnR9YF0gYXMgRXZlbnRFbWl0dGVyPGFueT47XG4gICAgICBpZiAoZW1pdHRlcikge1xuICAgICAgICBlbWl0dGVyLmVtaXQoLi4uYXJncyk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIE9iamVjdC5hc3NpZ24oc3dpcGVyUGFyYW1zLm9uLCB7XG4gICAgICBfY29udGFpbmVyQ2xhc3Nlcyhzd2lwZXIsIGNsYXNzZXMpIHtcbiAgICAgICAgdGhpcy5jb250YWluZXJDbGFzc2VzID0gY2xhc3NlcztcbiAgICAgIH0sXG4gICAgICBfc3dpcGVyOiAoc3dpcGVyKSA9PiB7XG4gICAgICAgIHRoaXMuc3dpcGVyUmVmID0gc3dpcGVyO1xuICAgICAgICB0aGlzLnNfc3dpcGVyLmVtaXQodGhpcy5zd2lwZXJSZWYpO1xuICAgICAgICBzd2lwZXIubG9vcENyZWF0ZSA9ICgpID0+IHt9O1xuICAgICAgICBzd2lwZXIubG9vcERlc3Ryb3kgPSAoKSA9PiB7fTtcbiAgICAgICAgaWYgKHN3aXBlclBhcmFtcy5sb29wKSB7XG4gICAgICAgICAgc3dpcGVyLmxvb3BlZFNsaWRlcyA9IHRoaXMubG9vcGVkU2xpZGVzO1xuICAgICAgICB9XG4gICAgICAgIGlmIChzd2lwZXIudmlydHVhbCAmJiBzd2lwZXIucGFyYW1zLnZpcnR1YWwuZW5hYmxlZCkge1xuICAgICAgICAgIHN3aXBlci52aXJ0dWFsLnNsaWRlcyA9IHRoaXMuc2xpZGVzO1xuICAgICAgICAgIHN3aXBlci5wYXJhbXMudmlydHVhbC5jYWNoZSA9IGZhbHNlO1xuICAgICAgICAgIHN3aXBlci5wYXJhbXMudmlydHVhbC5yZW5kZXJFeHRlcm5hbCA9IChkYXRhKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZVZpcnR1YWxTbGlkZXMoZGF0YSk7XG4gICAgICAgICAgfTtcbiAgICAgICAgICBzd2lwZXIucGFyYW1zLnZpcnR1YWwucmVuZGVyRXh0ZXJuYWxVcGRhdGUgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9jaGFuZ2VEZXRlY3RvclJlZi5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgICB9LFxuICAgICAgX3NsaWRlQ2xhc3M6IChfLCBlbDogSFRNTEVsZW1lbnQsIGNsYXNzTmFtZXMpID0+IHtcbiAgICAgICAgY29uc3Qgc2xpZGVJbmRleCA9IHBhcnNlSW50KGVsLmRhdGFzZXQuc3dpcGVyU2xpZGVJbmRleCk7XG4gICAgICAgIGlmICh0aGlzLnZpcnR1YWwpIHtcbiAgICAgICAgICBjb25zdCB2aXJ0dWFsU2xpZGUgPSB0aGlzLnNsaWRlcy5maW5kKChpdGVtKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gaXRlbS52aXJ0dWFsSW5kZXggJiYgaXRlbS52aXJ0dWFsSW5kZXggPT09IHNsaWRlSW5kZXg7XG4gICAgICAgICAgfSk7XG4gICAgICAgICAgaWYgKHZpcnR1YWxTbGlkZSkge1xuICAgICAgICAgICAgdmlydHVhbFNsaWRlLmNsYXNzTmFtZXMgPSBjbGFzc05hbWVzO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB0aGlzLnNsaWRlc1tzbGlkZUluZGV4XS5jbGFzc05hbWVzID0gY2xhc3NOYW1lcztcbiAgICAgICAgdGhpcy5fY2hhbmdlRGV0ZWN0b3JSZWYuZGV0ZWN0Q2hhbmdlcygpO1xuICAgICAgfSxcbiAgICB9KTtcbiAgICBuZXcgU3dpcGVyKHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LCBzd2lwZXJQYXJhbXMpO1xuICB9XG5cbiAgc3R5bGU6IGFueSA9IG51bGw7XG4gIGN1cnJlbnRWaXJ0dWFsRGF0YTogVmlydHVhbERhdGE7XG4gIHByaXZhdGUgdXBkYXRlVmlydHVhbFNsaWRlcyh2aXJ0dWFsRGF0YTogVmlydHVhbERhdGEpIHtcbiAgICBpZiAoXG4gICAgICAhdGhpcy5zd2lwZXJSZWYgfHxcbiAgICAgICh0aGlzLmN1cnJlbnRWaXJ0dWFsRGF0YSAmJlxuICAgICAgICB0aGlzLmN1cnJlbnRWaXJ0dWFsRGF0YS5mcm9tID09PSB2aXJ0dWFsRGF0YS5mcm9tICYmXG4gICAgICAgIHRoaXMuY3VycmVudFZpcnR1YWxEYXRhLnRvID09PSB2aXJ0dWFsRGF0YS50byAmJlxuICAgICAgICB0aGlzLmN1cnJlbnRWaXJ0dWFsRGF0YS5vZmZzZXQgPT09IHZpcnR1YWxEYXRhLm9mZnNldClcbiAgICApIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5zdHlsZSA9IHRoaXMuc3dpcGVyUmVmLmlzSG9yaXpvbnRhbCgpXG4gICAgICA/IHtcbiAgICAgICAgICBbdGhpcy5zd2lwZXJSZWYucnRsVHJhbnNsYXRlID8gJ3JpZ2h0JyA6ICdsZWZ0J106IGAke3ZpcnR1YWxEYXRhLm9mZnNldH1weGAsXG4gICAgICAgIH1cbiAgICAgIDoge1xuICAgICAgICAgIHRvcDogYCR7dmlydHVhbERhdGEub2Zmc2V0fXB4YCxcbiAgICAgICAgfTtcbiAgICB0aGlzLmN1cnJlbnRWaXJ0dWFsRGF0YSA9IHZpcnR1YWxEYXRhO1xuICAgIHRoaXMuX2FjdGl2ZVNsaWRlcy5uZXh0KHZpcnR1YWxEYXRhLnNsaWRlcyk7XG4gICAgdGhpcy5fY2hhbmdlRGV0ZWN0b3JSZWYuZGV0ZWN0Q2hhbmdlcygpO1xuICAgIHRoaXMuc3dpcGVyUmVmLnVwZGF0ZVNsaWRlcygpO1xuICAgIHRoaXMuc3dpcGVyUmVmLnVwZGF0ZVByb2dyZXNzKCk7XG4gICAgdGhpcy5zd2lwZXJSZWYudXBkYXRlU2xpZGVzQ2xhc3NlcygpO1xuICAgIGlmICh0aGlzLnN3aXBlclJlZi5sYXp5ICYmIHRoaXMuc3dpcGVyUmVmLnBhcmFtcy5sYXp5WydlbmFibGVkJ10pIHtcbiAgICAgIHRoaXMuc3dpcGVyUmVmLmxhenkubG9hZCgpO1xuICAgIH1cbiAgICB0aGlzLnN3aXBlclJlZi52aXJ0dWFsLnVwZGF0ZSh0cnVlKTtcbiAgICByZXR1cm47XG4gIH1cblxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VkUGFyYW1zOiBTaW1wbGVDaGFuZ2VzKSB7XG4gICAgdGhpcy51cGRhdGVTd2lwZXIoY2hhbmdlZFBhcmFtcyk7XG4gICAgdGhpcy5fY2hhbmdlRGV0ZWN0b3JSZWYuZGV0ZWN0Q2hhbmdlcygpO1xuICB9XG5cbiAgdXBkYXRlSW5pdFN3aXBlcihjaGFuZ2VkUGFyYW1zKSB7XG4gICAgaWYgKCEoY2hhbmdlZFBhcmFtcyAmJiB0aGlzLnN3aXBlclJlZiAmJiAhdGhpcy5zd2lwZXJSZWYuZGVzdHJveWVkKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjb25zdCB7XG4gICAgICBwYXJhbXM6IGN1cnJlbnRQYXJhbXMsXG4gICAgICBwYWdpbmF0aW9uLFxuICAgICAgbmF2aWdhdGlvbixcbiAgICAgIHNjcm9sbGJhcixcbiAgICAgIHZpcnR1YWwsXG4gICAgICB0aHVtYnMsXG4gICAgfSA9IHRoaXMuc3dpcGVyUmVmO1xuXG4gICAgaWYgKGNoYW5nZWRQYXJhbXMucGFnaW5hdGlvbikge1xuICAgICAgaWYgKHRoaXMucGFnaW5hdGlvbiAmJiB0aGlzLnBhZ2luYXRpb24uZWwgJiYgcGFnaW5hdGlvbiAmJiAhcGFnaW5hdGlvbi5lbCkge1xuICAgICAgICB0aGlzLnVwZGF0ZVBhcmFtZXRlcigncGFnaW5hdGlvbicsIHRoaXMucGFnaW5hdGlvbik7XG4gICAgICAgIHBhZ2luYXRpb24uaW5pdCgpO1xuICAgICAgICBwYWdpbmF0aW9uLnJlbmRlcigpO1xuICAgICAgICBwYWdpbmF0aW9uLnVwZGF0ZSgpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcGFnaW5hdGlvbi5kZXN0cm95KCk7XG4gICAgICAgIHBhZ2luYXRpb24uZWwgPSBudWxsO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChjaGFuZ2VkUGFyYW1zLnNjcm9sbGJhcikge1xuICAgICAgaWYgKHRoaXMuc2Nyb2xsYmFyICYmIHRoaXMuc2Nyb2xsYmFyLmVsICYmIHNjcm9sbGJhciAmJiAhc2Nyb2xsYmFyLmVsKSB7XG4gICAgICAgIHRoaXMudXBkYXRlUGFyYW1ldGVyKCdzY3JvbGxiYXInLCB0aGlzLnNjcm9sbGJhcik7XG4gICAgICAgIHNjcm9sbGJhci5pbml0KCk7XG4gICAgICAgIHNjcm9sbGJhci51cGRhdGVTaXplKCk7XG4gICAgICAgIHNjcm9sbGJhci5zZXRUcmFuc2xhdGUoKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHNjcm9sbGJhci5kZXN0cm95KCk7XG4gICAgICAgIHNjcm9sbGJhci5lbCA9IG51bGw7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKGNoYW5nZWRQYXJhbXMubmF2aWdhdGlvbikge1xuICAgICAgaWYgKFxuICAgICAgICB0aGlzLm5hdmlnYXRpb24gJiZcbiAgICAgICAgdGhpcy5uYXZpZ2F0aW9uLnByZXZFbCAmJlxuICAgICAgICB0aGlzLm5hdmlnYXRpb24ubmV4dEVsICYmXG4gICAgICAgIG5hdmlnYXRpb24gJiZcbiAgICAgICAgIW5hdmlnYXRpb24ucHJldkVsICYmXG4gICAgICAgICFuYXZpZ2F0aW9uLm5leHRFbFxuICAgICAgKSB7XG4gICAgICAgIHRoaXMudXBkYXRlUGFyYW1ldGVyKCduYXZpZ2F0aW9uJywgdGhpcy5uYXZpZ2F0aW9uKTtcbiAgICAgICAgbmF2aWdhdGlvbi5pbml0KCk7XG4gICAgICAgIG5hdmlnYXRpb24udXBkYXRlKCk7XG4gICAgICB9IGVsc2UgaWYgKG5hdmlnYXRpb24ucHJldkVsICYmIG5hdmlnYXRpb24ubmV4dEVsKSB7XG4gICAgICAgIG5hdmlnYXRpb24uZGVzdHJveSgpO1xuICAgICAgICBuYXZpZ2F0aW9uLm5leHRFbCA9IG51bGw7XG4gICAgICAgIG5hdmlnYXRpb24ucHJldkVsID0gbnVsbDtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKGNoYW5nZWRQYXJhbXMudGh1bWJzICYmIHRoaXMudGh1bWJzICYmIHRoaXMudGh1bWJzLnN3aXBlcikge1xuICAgICAgdGhpcy51cGRhdGVQYXJhbWV0ZXIoJ3RodW1icycsIHRoaXMudGh1bWJzKTtcbiAgICAgIGNvbnN0IGluaXRpYWxpemVkID0gdGh1bWJzLmluaXQoKTtcbiAgICAgIGlmIChpbml0aWFsaXplZCkgdGh1bWJzLnVwZGF0ZSh0cnVlKTtcbiAgICB9XG5cbiAgICBpZiAoY2hhbmdlZFBhcmFtcy5jb250cm9sbGVyICYmIHRoaXMuY29udHJvbGxlciAmJiB0aGlzLmNvbnRyb2xsZXIuY29udHJvbCkge1xuICAgICAgdGhpcy5zd2lwZXJSZWYuY29udHJvbGxlci5jb250cm9sID0gdGhpcy5jb250cm9sbGVyLmNvbnRyb2w7XG4gICAgfVxuXG4gICAgdGhpcy5zd2lwZXJSZWYudXBkYXRlKCk7XG4gIH1cblxuICB1cGRhdGVTd2lwZXIoY2hhbmdlZFBhcmFtczogU2ltcGxlQ2hhbmdlcykge1xuICAgIGlmICghKGNoYW5nZWRQYXJhbXMgJiYgdGhpcy5zd2lwZXJSZWYgJiYgIXRoaXMuc3dpcGVyUmVmLmRlc3Ryb3llZCkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgZm9yIChjb25zdCBrZXkgaW4gY2hhbmdlZFBhcmFtcykge1xuICAgICAgaWYgKGlnbm9yZU5nT25DaGFuZ2VzLmluZGV4T2Yoa2V5KSA+PSAwKSB7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuICAgICAgdGhpcy51cGRhdGVQYXJhbWV0ZXIoa2V5LCBjaGFuZ2VkUGFyYW1zW2tleV0uY3VycmVudFZhbHVlKTtcbiAgICB9XG5cbiAgICBpZiAoY2hhbmdlZFBhcmFtcy5hbGxvd1NsaWRlTmV4dCkge1xuICAgICAgdGhpcy5zd2lwZXJSZWYuYWxsb3dTbGlkZU5leHQgPSB0aGlzLmFsbG93U2xpZGVOZXh0O1xuICAgIH1cbiAgICBpZiAoY2hhbmdlZFBhcmFtcy5hbGxvd1NsaWRlUHJldikge1xuICAgICAgdGhpcy5zd2lwZXJSZWYuYWxsb3dTbGlkZVByZXYgPSB0aGlzLmFsbG93U2xpZGVQcmV2O1xuICAgIH1cbiAgICBpZiAoY2hhbmdlZFBhcmFtcy5kaXJlY3Rpb24pIHtcbiAgICAgIHRoaXMuc3dpcGVyUmVmLmNoYW5nZURpcmVjdGlvbih0aGlzLmRpcmVjdGlvbiwgZmFsc2UpO1xuICAgIH1cbiAgICBpZiAoY2hhbmdlZFBhcmFtcy5icmVha3BvaW50cykge1xuICAgICAgaWYgKHRoaXMubG9vcCAmJiAhdGhpcy5sb29wZWRTbGlkZXMpIHtcbiAgICAgICAgdGhpcy5jYWxjTG9vcGVkU2xpZGVzKCk7XG4gICAgICB9XG4gICAgICB0aGlzLnN3aXBlclJlZi5jdXJyZW50QnJlYWtwb2ludCA9IG51bGw7XG4gICAgICB0aGlzLnN3aXBlclJlZi5zZXRCcmVha3BvaW50KCk7XG4gICAgfVxuICAgIHRoaXMuc3dpcGVyUmVmLnVwZGF0ZSgpO1xuICB9XG5cbiAgY2FsY0xvb3BlZFNsaWRlcygpIHtcbiAgICBpZiAoIXRoaXMubG9vcCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBsZXQgc2xpZGVzUGVyVmlld1BhcmFtcyA9IHRoaXMuc2xpZGVzUGVyVmlldztcbiAgICBpZiAodGhpcy5icmVha3BvaW50cykge1xuICAgICAgY29uc3QgYnJlYWtwb2ludCA9IFN3aXBlci5wcm90b3R5cGUuZ2V0QnJlYWtwb2ludCh0aGlzLmJyZWFrcG9pbnRzKTtcbiAgICAgIGNvbnN0IGJyZWFrcG9pbnRPbmx5UGFyYW1zID1cbiAgICAgICAgYnJlYWtwb2ludCBpbiB0aGlzLmJyZWFrcG9pbnRzID8gdGhpcy5icmVha3BvaW50c1ticmVha3BvaW50XSA6IHVuZGVmaW5lZDtcbiAgICAgIGlmIChicmVha3BvaW50T25seVBhcmFtcyAmJiBicmVha3BvaW50T25seVBhcmFtcy5zbGlkZXNQZXJWaWV3KSB7XG4gICAgICAgIHNsaWRlc1BlclZpZXdQYXJhbXMgPSBicmVha3BvaW50T25seVBhcmFtcy5zbGlkZXNQZXJWaWV3O1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAoc2xpZGVzUGVyVmlld1BhcmFtcyA9PT0gJ2F1dG8nKSB7XG4gICAgICB0aGlzLmxvb3BlZFNsaWRlcyA9IHRoaXMuc2xpZGVzLmxlbmd0aDtcbiAgICAgIHJldHVybiB0aGlzLnNsaWRlcy5sZW5ndGg7XG4gICAgfVxuICAgIGxldCBsb29wZWRTbGlkZXMgPSB0aGlzLmxvb3BlZFNsaWRlcyB8fCBzbGlkZXNQZXJWaWV3UGFyYW1zO1xuXG4gICAgbG9vcGVkU2xpZGVzICs9IHRoaXMubG9vcEFkZGl0aW9uYWxTbGlkZXM7XG5cbiAgICBpZiAobG9vcGVkU2xpZGVzID4gdGhpcy5zbGlkZXMubGVuZ3RoKSB7XG4gICAgICBsb29wZWRTbGlkZXMgPSB0aGlzLnNsaWRlcy5sZW5ndGg7XG4gICAgfVxuICAgIHRoaXMubG9vcGVkU2xpZGVzID0gbG9vcGVkU2xpZGVzO1xuICAgIHJldHVybiBsb29wZWRTbGlkZXM7XG4gIH1cblxuICB1cGRhdGVQYXJhbWV0ZXIoa2V5LCB2YWx1ZSkge1xuICAgIGlmICghKHRoaXMuc3dpcGVyUmVmICYmICF0aGlzLnN3aXBlclJlZi5kZXN0cm95ZWQpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGNvbnN0IF9rZXkgPSBrZXkucmVwbGFjZSgvXl8vLCAnJyk7XG4gICAgaWYgKE9iamVjdC5rZXlzKHRoaXMuc3dpcGVyUmVmLm1vZHVsZXMpLmluZGV4T2YoX2tleSkgPj0gMCkge1xuICAgICAgZXh0ZW5kKHZhbHVlLCB0aGlzLnN3aXBlclJlZi5tb2R1bGVzW19rZXldLnBhcmFtc1tfa2V5XSk7XG4gICAgfVxuICAgIGlmIChpc09iamVjdCh0aGlzLnN3aXBlclJlZi5wYXJhbXNbX2tleV0pICYmIGlzT2JqZWN0KHZhbHVlKSkge1xuICAgICAgZXh0ZW5kKHRoaXMuc3dpcGVyUmVmLnBhcmFtc1tfa2V5XSwgdmFsdWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnN3aXBlclJlZi5wYXJhbXNbX2tleV0gPSB2YWx1ZTtcbiAgICB9XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLnN3aXBlclJlZi5kZXN0cm95KCk7XG4gIH1cbn1cbiJdfQ==