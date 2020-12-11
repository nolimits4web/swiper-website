import { Directive, TemplateRef, Input, EventEmitter, Component, ChangeDetectionStrategy, ViewEncapsulation, ElementRef, ChangeDetectorRef, Output, ViewChild, ContentChildren, HostBinding, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import Swiper from 'swiper/core';
import { Subject, of } from 'rxjs';

function isObject(o) {
    return typeof o === 'object' && o !== null && o.constructor && o.constructor === Object;
}
function extend(target, src) {
    Object.keys(src).forEach((key) => {
        if (typeof target[key] === 'undefined') {
            target[key] = src[key];
            return;
        }
        if (target[key] && !src[key]) {
            return;
        }
        if (isObject(src[key]) && isObject(target[key]) && Object.keys(src[key]).length > 0) {
            extend(target[key], src[key]);
        }
        else {
            target[key] = src[key];
        }
    });
}
function uniqueClasses(classNames = '') {
    const classes = classNames
        .split(' ')
        .map((c) => c.trim())
        .filter((c) => !!c);
    const unique = [];
    classes.forEach((c) => {
        if (unique.indexOf(c) < 0)
            unique.push(c);
    });
    return unique.join(' ');
}
function coerceBooleanProperty(value) {
    return value != null && `${value}` !== 'false';
}
const ignoreNgOnChanges = ['pagination', 'navigation', 'scrollbar', 'virtual'];
function setProperty(val, obj = {}) {
    if (isObject(val)) {
        return val;
    }
    const newValue = coerceBooleanProperty(val);
    if (newValue === true) {
        return obj;
    }
    return newValue;
}

/* underscore in name -> watch for changes */
const paramsList = [
    'init',
    '_direction',
    'touchEventsTarget',
    'initialSlide',
    '_speed',
    'cssMode',
    'updateOnWindowResize',
    'nested',
    '_width',
    '_height',
    'preventInteractionOnTransition',
    'userAgent',
    'url',
    '_edgeSwipeDetection',
    '_edgeSwipeThreshold',
    '_freeMode',
    '_freeModeMomentum',
    '_freeModeMomentumRatio',
    '_freeModeMomentumBounce',
    '_freeModeMomentumBounceRatio',
    '_freeModeMomentumVelocityRatio',
    '_freeModeSticky',
    '_freeModeMinimumVelocity',
    '_autoHeight',
    'setWrapperSize',
    'virtualTranslate',
    '_effect',
    'breakpoints',
    '_spaceBetween',
    '_slidesPerView',
    '_slidesPerColumn',
    '_slidesPerColumnFill',
    '_slidesPerGroup',
    '_slidesPerGroupSkip',
    '_centeredSlides',
    '_centeredSlidesBounds',
    '_slidesOffsetBefore',
    '_slidesOffsetAfter',
    'normalizeSlideIndex',
    '_centerInsufficientSlides',
    '_watchOverflow',
    'roundLengths',
    'touchRatio',
    'touchAngle',
    'simulateTouch',
    '_shortSwipes',
    '_longSwipes',
    'longSwipesRatio',
    'longSwipesMs',
    '_followFinger',
    'allowTouchMove',
    '_threshold',
    'touchMoveStopPropagation',
    'touchStartPreventDefault',
    'touchStartForcePreventDefault',
    'touchReleaseOnEdges',
    'uniqueNavElements',
    '_resistance',
    '_resistanceRatio',
    '_watchSlidesProgress',
    '_watchSlidesVisibility',
    '_grabCursor',
    'preventClicks',
    'preventClicksPropagation',
    '_slideToClickedSlide',
    '_preloadImages',
    'updateOnImagesReady',
    '_loop',
    '_loopAdditionalSlides',
    '_loopedSlides',
    '_loopFillGroupWithBlank',
    'loopPreventsSlide',
    '_allowSlidePrev',
    '_allowSlideNext',
    '_swipeHandler',
    '_noSwiping',
    'noSwipingClass',
    'noSwipingSelector',
    'passiveListeners',
    'containerModifierClass',
    'slideClass',
    'slideBlankClass',
    'slideActiveClass',
    'slideDuplicateActiveClass',
    'slideVisibleClass',
    'slideDuplicateClass',
    'slideNextClass',
    'slideDuplicateNextClass',
    'slidePrevClass',
    'slideDuplicatePrevClass',
    'wrapperClass',
    'runCallbacksOnInit',
    // modules
    'a11y',
    'autoplay',
    '_controller',
    'coverflowEffect',
    'cubeEffect',
    'fadeEffect',
    'flipEffect',
    'hashNavigation',
    'history',
    'keyboard',
    'lazy',
    'mousewheel',
    '_navigation',
    '_pagination',
    'parallax',
    '_scrollbar',
    '_thumbs',
    'virtual',
    'zoom',
];

// eslint-disable-next-line
const ɵ0 = (key) => key.replace(/_/, '');
const allowedParams = paramsList.map(ɵ0);
function getParams(obj = {}) {
    const params = {
        on: {},
    };
    const passedParams = {};
    extend(params, Swiper.defaults);
    extend(params, Swiper.extendedDefaults);
    params._emitClasses = true;
    const rest = {};
    Object.keys(obj).forEach((key) => {
        const _key = key.replace(/^_/, '');
        if (typeof obj[_key] === 'undefined')
            return;
        if (allowedParams.indexOf(_key) >= 0) {
            if (isObject(obj[_key])) {
                params[_key] = {};
                passedParams[_key] = {};
                extend(params[_key], obj[_key]);
                extend(passedParams[_key], obj[_key]);
            }
            else {
                params[_key] = obj[_key];
                passedParams[_key] = obj[_key];
            }
        }
        else {
            rest[_key] = obj[_key];
        }
    });
    return { params, passedParams, rest };
}

class SwiperSlideDirective {
    constructor(template) {
        this.template = template;
        this.slideData = {
            isActive: false,
            isPrev: false,
            isNext: false,
            isVisible: false,
            isDuplicate: false,
        };
    }
    get classNames() {
        return this._classNames;
    }
    set classNames(val) {
        if (this._classNames === val) {
            return;
        }
        this._classNames = val;
        this.slideData = {
            isActive: this._hasClass(['swiper-slide-active', 'swiper-slide-duplicate-active']),
            isVisible: this._hasClass(['swiper-slide-visible']),
            isDuplicate: this._hasClass(['swiper-slide-duplicate']),
            isPrev: this._hasClass(['swiper-slide-prev', 'swiper-slide-duplicate-prev']),
            isNext: this._hasClass(['swiper-slide-next', 'swiper-slide-duplicate-next']),
        };
    }
    _hasClass(classNames) {
        return classNames.some((className) => this._classNames.indexOf(className) >= 0);
    }
}
SwiperSlideDirective.decorators = [
    { type: Directive, args: [{
                selector: '[swiperSlide]',
            },] }
];
SwiperSlideDirective.ctorParameters = () => [
    { type: TemplateRef }
];
SwiperSlideDirective.propDecorators = {
    virtualIndex: [{ type: Input }]
};

class SwiperComponent {
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

class SwiperModule {
}
SwiperModule.decorators = [
    { type: NgModule, args: [{
                declarations: [SwiperComponent, SwiperSlideDirective],
                exports: [SwiperComponent, SwiperSlideDirective],
                imports: [CommonModule],
            },] }
];

/*
 * Public API Surface of angular
 */

/**
 * Generated bundle index. Do not edit.
 */

export { SwiperComponent, SwiperModule, SwiperSlideDirective };
//# sourceMappingURL=angular.js.map
