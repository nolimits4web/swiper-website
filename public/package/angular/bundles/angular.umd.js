(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common'), require('swiper/core'), require('rxjs')) :
    typeof define === 'function' && define.amd ? define('angular', ['exports', '@angular/core', '@angular/common', 'swiper/core', 'rxjs'], factory) :
    (global = global || self, factory(global.angular = {}, global.ng.core, global.ng.common, global.Swiper, global.rxjs));
}(this, (function (exports, core, common, Swiper, rxjs) { 'use strict';

    Swiper = Swiper && Object.prototype.hasOwnProperty.call(Swiper, 'default') ? Swiper['default'] : Swiper;

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */
    /* global Reflect, Promise */
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b)
                if (Object.prototype.hasOwnProperty.call(b, p))
                    d[p] = b[p]; };
        return extendStatics(d, b);
    };
    function __extends(d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }
    var __assign = function () {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s)
                    if (Object.prototype.hasOwnProperty.call(s, p))
                        t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };
    function __rest(s, e) {
        var t = {};
        for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
                t[p] = s[p];
        if (s != null && typeof Object.getOwnPropertySymbols === "function")
            for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
                if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                    t[p[i]] = s[p[i]];
            }
        return t;
    }
    function __decorate(decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
            r = Reflect.decorate(decorators, target, key, desc);
        else
            for (var i = decorators.length - 1; i >= 0; i--)
                if (d = decorators[i])
                    r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    }
    function __param(paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); };
    }
    function __metadata(metadataKey, metadataValue) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
            return Reflect.metadata(metadataKey, metadataValue);
    }
    function __awaiter(thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try {
                step(generator.next(value));
            }
            catch (e) {
                reject(e);
            } }
            function rejected(value) { try {
                step(generator["throw"](value));
            }
            catch (e) {
                reject(e);
            } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }
    function __generator(thisArg, body) {
        var _ = { label: 0, sent: function () { if (t[0] & 1)
                throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function () { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f)
                throw new TypeError("Generator is already executing.");
            while (_)
                try {
                    if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done)
                        return t;
                    if (y = 0, t)
                        op = [op[0] & 2, t.value];
                    switch (op[0]) {
                        case 0:
                        case 1:
                            t = op;
                            break;
                        case 4:
                            _.label++;
                            return { value: op[1], done: false };
                        case 5:
                            _.label++;
                            y = op[1];
                            op = [0];
                            continue;
                        case 7:
                            op = _.ops.pop();
                            _.trys.pop();
                            continue;
                        default:
                            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                                _ = 0;
                                continue;
                            }
                            if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                                _.label = op[1];
                                break;
                            }
                            if (op[0] === 6 && _.label < t[1]) {
                                _.label = t[1];
                                t = op;
                                break;
                            }
                            if (t && _.label < t[2]) {
                                _.label = t[2];
                                _.ops.push(op);
                                break;
                            }
                            if (t[2])
                                _.ops.pop();
                            _.trys.pop();
                            continue;
                    }
                    op = body.call(thisArg, _);
                }
                catch (e) {
                    op = [6, e];
                    y = 0;
                }
                finally {
                    f = t = 0;
                }
            if (op[0] & 5)
                throw op[1];
            return { value: op[0] ? op[1] : void 0, done: true };
        }
    }
    var __createBinding = Object.create ? (function (o, m, k, k2) {
        if (k2 === undefined)
            k2 = k;
        Object.defineProperty(o, k2, { enumerable: true, get: function () { return m[k]; } });
    }) : (function (o, m, k, k2) {
        if (k2 === undefined)
            k2 = k;
        o[k2] = m[k];
    });
    function __exportStar(m, o) {
        for (var p in m)
            if (p !== "default" && !Object.prototype.hasOwnProperty.call(o, p))
                __createBinding(o, m, p);
    }
    function __values(o) {
        var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
        if (m)
            return m.call(o);
        if (o && typeof o.length === "number")
            return {
                next: function () {
                    if (o && i >= o.length)
                        o = void 0;
                    return { value: o && o[i++], done: !o };
                }
            };
        throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
    }
    function __read(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m)
            return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done)
                ar.push(r.value);
        }
        catch (error) {
            e = { error: error };
        }
        finally {
            try {
                if (r && !r.done && (m = i["return"]))
                    m.call(i);
            }
            finally {
                if (e)
                    throw e.error;
            }
        }
        return ar;
    }
    function __spread() {
        for (var ar = [], i = 0; i < arguments.length; i++)
            ar = ar.concat(__read(arguments[i]));
        return ar;
    }
    function __spreadArrays() {
        for (var s = 0, i = 0, il = arguments.length; i < il; i++)
            s += arguments[i].length;
        for (var r = Array(s), k = 0, i = 0; i < il; i++)
            for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
                r[k] = a[j];
        return r;
    }
    ;
    function __await(v) {
        return this instanceof __await ? (this.v = v, this) : new __await(v);
    }
    function __asyncGenerator(thisArg, _arguments, generator) {
        if (!Symbol.asyncIterator)
            throw new TypeError("Symbol.asyncIterator is not defined.");
        var g = generator.apply(thisArg, _arguments || []), i, q = [];
        return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
        function verb(n) { if (g[n])
            i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
        function resume(n, v) { try {
            step(g[n](v));
        }
        catch (e) {
            settle(q[0][3], e);
        } }
        function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
        function fulfill(value) { resume("next", value); }
        function reject(value) { resume("throw", value); }
        function settle(f, v) { if (f(v), q.shift(), q.length)
            resume(q[0][0], q[0][1]); }
    }
    function __asyncDelegator(o) {
        var i, p;
        return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
        function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
    }
    function __asyncValues(o) {
        if (!Symbol.asyncIterator)
            throw new TypeError("Symbol.asyncIterator is not defined.");
        var m = o[Symbol.asyncIterator], i;
        return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
        function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
        function settle(resolve, reject, d, v) { Promise.resolve(v).then(function (v) { resolve({ value: v, done: d }); }, reject); }
    }
    function __makeTemplateObject(cooked, raw) {
        if (Object.defineProperty) {
            Object.defineProperty(cooked, "raw", { value: raw });
        }
        else {
            cooked.raw = raw;
        }
        return cooked;
    }
    ;
    var __setModuleDefault = Object.create ? (function (o, v) {
        Object.defineProperty(o, "default", { enumerable: true, value: v });
    }) : function (o, v) {
        o["default"] = v;
    };
    function __importStar(mod) {
        if (mod && mod.__esModule)
            return mod;
        var result = {};
        if (mod != null)
            for (var k in mod)
                if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k))
                    __createBinding(result, mod, k);
        __setModuleDefault(result, mod);
        return result;
    }
    function __importDefault(mod) {
        return (mod && mod.__esModule) ? mod : { default: mod };
    }
    function __classPrivateFieldGet(receiver, privateMap) {
        if (!privateMap.has(receiver)) {
            throw new TypeError("attempted to get private field on non-instance");
        }
        return privateMap.get(receiver);
    }
    function __classPrivateFieldSet(receiver, privateMap, value) {
        if (!privateMap.has(receiver)) {
            throw new TypeError("attempted to set private field on non-instance");
        }
        privateMap.set(receiver, value);
        return value;
    }

    function isObject(o) {
        return typeof o === 'object' && o !== null && o.constructor && o.constructor === Object;
    }
    function extend(target, src) {
        Object.keys(src).forEach(function (key) {
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
    function uniqueClasses(classNames) {
        if (classNames === void 0) { classNames = ''; }
        var classes = classNames
            .split(' ')
            .map(function (c) { return c.trim(); })
            .filter(function (c) { return !!c; });
        var unique = [];
        classes.forEach(function (c) {
            if (unique.indexOf(c) < 0)
                unique.push(c);
        });
        return unique.join(' ');
    }
    function coerceBooleanProperty(value) {
        return value != null && "" + value !== 'false';
    }
    var ignoreNgOnChanges = ['pagination', 'navigation', 'scrollbar', 'virtual'];
    function setProperty(val, obj) {
        if (obj === void 0) { obj = {}; }
        if (isObject(val)) {
            return val;
        }
        var newValue = coerceBooleanProperty(val);
        if (newValue === true) {
            return obj;
        }
        return newValue;
    }

    /* underscore in name -> watch for changes */
    var paramsList = [
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
    var ɵ0 = function (key) { return key.replace(/_/, ''); };
    var allowedParams = paramsList.map(ɵ0);
    function getParams(obj) {
        if (obj === void 0) { obj = {}; }
        var params = {
            on: {},
        };
        var passedParams = {};
        extend(params, Swiper.defaults);
        extend(params, Swiper.extendedDefaults);
        params._emitClasses = true;
        var rest = {};
        Object.keys(obj).forEach(function (key) {
            var _key = key.replace(/^_/, '');
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
        return { params: params, passedParams: passedParams, rest: rest };
    }

    var SwiperSlideDirective = /** @class */ (function () {
        function SwiperSlideDirective(template) {
            this.template = template;
            this.slideData = {
                isActive: false,
                isPrev: false,
                isNext: false,
                isVisible: false,
                isDuplicate: false,
            };
        }
        Object.defineProperty(SwiperSlideDirective.prototype, "classNames", {
            get: function () {
                return this._classNames;
            },
            set: function (val) {
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
            },
            enumerable: false,
            configurable: true
        });
        SwiperSlideDirective.prototype._hasClass = function (classNames) {
            var _this = this;
            return classNames.some(function (className) { return _this._classNames.indexOf(className) >= 0; });
        };
        return SwiperSlideDirective;
    }());
    SwiperSlideDirective.decorators = [
        { type: core.Directive, args: [{
                    selector: '[swiperSlide]',
                },] }
    ];
    SwiperSlideDirective.ctorParameters = function () { return [
        { type: core.TemplateRef }
    ]; };
    SwiperSlideDirective.propDecorators = {
        virtualIndex: [{ type: core.Input }]
    };

    var SwiperComponent = /** @class */ (function () {
        function SwiperComponent(elementRef, _changeDetectorRef) {
            this.elementRef = elementRef;
            this._changeDetectorRef = _changeDetectorRef;
            this.init = true;
            this.slideClass = 'swiper-slide';
            this.wrapperClass = 'swiper-wrapper';
            // prettier-ignore
            this.s__beforeBreakpoint = new core.EventEmitter();
            // prettier-ignore
            this.s__containerClasses = new core.EventEmitter();
            // prettier-ignore
            this.s__slideClass = new core.EventEmitter();
            // prettier-ignore
            this.s__swiper = new core.EventEmitter();
            // prettier-ignore
            this.s_activeIndexChange = new core.EventEmitter();
            // prettier-ignore
            this.s_afterInit = new core.EventEmitter();
            // prettier-ignore
            this.s_autoplay = new core.EventEmitter();
            // prettier-ignore
            this.s_autoplayStart = new core.EventEmitter();
            // prettier-ignore
            this.s_autoplayStop = new core.EventEmitter();
            // prettier-ignore
            this.s_beforeDestroy = new core.EventEmitter();
            // prettier-ignore
            this.s_beforeInit = new core.EventEmitter();
            // prettier-ignore
            this.s_beforeLoopFix = new core.EventEmitter();
            // prettier-ignore
            this.s_beforeResize = new core.EventEmitter();
            // prettier-ignore
            this.s_beforeSlideChangeStart = new core.EventEmitter();
            // prettier-ignore
            this.s_beforeTransitionStart = new core.EventEmitter();
            // prettier-ignore
            this.s_breakpoint = new core.EventEmitter();
            // prettier-ignore
            this.s_changeDirection = new core.EventEmitter();
            // prettier-ignore
            this.s_click = new core.EventEmitter();
            // prettier-ignore
            this.s_doubleTap = new core.EventEmitter();
            // prettier-ignore
            this.s_doubleClick = new core.EventEmitter();
            // prettier-ignore
            this.s_destroy = new core.EventEmitter();
            // prettier-ignore
            this.s_fromEdge = new core.EventEmitter();
            // prettier-ignore
            this.s_hashChange = new core.EventEmitter();
            // prettier-ignore
            this.s_hashSet = new core.EventEmitter();
            // prettier-ignore
            this.s_imagesReady = new core.EventEmitter();
            // prettier-ignore
            this.s_init = new core.EventEmitter();
            // prettier-ignore
            this.s_keyPress = new core.EventEmitter();
            // prettier-ignore
            this.s_lazyImageLoad = new core.EventEmitter();
            // prettier-ignore
            this.s_lazyImageReady = new core.EventEmitter();
            // prettier-ignore
            this.s_loopFix = new core.EventEmitter();
            // prettier-ignore
            this.s_momentumBounce = new core.EventEmitter();
            // prettier-ignore
            this.s_navigationHide = new core.EventEmitter();
            // prettier-ignore
            this.s_navigationShow = new core.EventEmitter();
            // prettier-ignore
            this.s_observerUpdate = new core.EventEmitter();
            // prettier-ignore
            this.s_orientationchange = new core.EventEmitter();
            // prettier-ignore
            this.s_paginationHide = new core.EventEmitter();
            // prettier-ignore
            this.s_paginationRender = new core.EventEmitter();
            // prettier-ignore
            this.s_paginationShow = new core.EventEmitter();
            // prettier-ignore
            this.s_paginationUpdate = new core.EventEmitter();
            // prettier-ignore
            this.s_progress = new core.EventEmitter();
            // prettier-ignore
            this.s_reachBeginning = new core.EventEmitter();
            // prettier-ignore
            this.s_reachEnd = new core.EventEmitter();
            // prettier-ignore
            this.s_realIndexChange = new core.EventEmitter();
            // prettier-ignore
            this.s_resize = new core.EventEmitter();
            // prettier-ignore
            this.s_scroll = new core.EventEmitter();
            // prettier-ignore
            this.s_scrollbarDragEnd = new core.EventEmitter();
            // prettier-ignore
            this.s_scrollbarDragMove = new core.EventEmitter();
            // prettier-ignore
            this.s_scrollbarDragStart = new core.EventEmitter();
            // prettier-ignore
            this.s_setTransition = new core.EventEmitter();
            // prettier-ignore
            this.s_setTranslate = new core.EventEmitter();
            // prettier-ignore
            this.s_slideChange = new core.EventEmitter();
            // prettier-ignore
            this.s_slideChangeTransitionEnd = new core.EventEmitter();
            // prettier-ignore
            this.s_slideChangeTransitionStart = new core.EventEmitter();
            // prettier-ignore
            this.s_slideNextTransitionEnd = new core.EventEmitter();
            // prettier-ignore
            this.s_slideNextTransitionStart = new core.EventEmitter();
            // prettier-ignore
            this.s_slidePrevTransitionEnd = new core.EventEmitter();
            // prettier-ignore
            this.s_slidePrevTransitionStart = new core.EventEmitter();
            // prettier-ignore
            this.s_slideResetTransitionStart = new core.EventEmitter();
            // prettier-ignore
            this.s_slideResetTransitionEnd = new core.EventEmitter();
            // prettier-ignore
            this.s_sliderMove = new core.EventEmitter();
            // prettier-ignore
            this.s_sliderFirstMove = new core.EventEmitter();
            // prettier-ignore
            this.s_slidesLengthChange = new core.EventEmitter();
            // prettier-ignore
            this.s_slidesGridLengthChange = new core.EventEmitter();
            // prettier-ignore
            this.s_snapGridLengthChange = new core.EventEmitter();
            // prettier-ignore
            this.s_snapIndexChange = new core.EventEmitter();
            // prettier-ignore
            this.s_tap = new core.EventEmitter();
            // prettier-ignore
            this.s_toEdge = new core.EventEmitter();
            // prettier-ignore
            this.s_touchEnd = new core.EventEmitter();
            // prettier-ignore
            this.s_touchMove = new core.EventEmitter();
            // prettier-ignore
            this.s_touchMoveOpposite = new core.EventEmitter();
            // prettier-ignore
            this.s_touchStart = new core.EventEmitter();
            // prettier-ignore
            this.s_transitionEnd = new core.EventEmitter();
            // prettier-ignore
            this.s_transitionStart = new core.EventEmitter();
            // prettier-ignore
            this.s_update = new core.EventEmitter();
            // prettier-ignore
            this.s_zoomChange = new core.EventEmitter();
            // prettier-ignore
            this.s_swiper = new core.EventEmitter();
            this._activeSlides = new rxjs.Subject();
            this.containerClasses = 'swiper-container';
            this.style = null;
        }
        Object.defineProperty(SwiperComponent.prototype, "navigation", {
            get: function () {
                return this._navigation;
            },
            set: function (val) {
                this._navigation = setProperty(val, {
                    nextEl: null,
                    prevEl: null,
                });
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(SwiperComponent.prototype, "pagination", {
            get: function () {
                return this._pagination;
            },
            set: function (val) {
                this._pagination = setProperty(val, {
                    el: null,
                });
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(SwiperComponent.prototype, "scrollbar", {
            get: function () {
                return this._scrollbar;
            },
            set: function (val) {
                this._scrollbar = setProperty(val, {
                    el: null,
                });
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(SwiperComponent.prototype, "virtual", {
            get: function () {
                return this._virtual;
            },
            set: function (val) {
                this._virtual = setProperty(val);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(SwiperComponent.prototype, "prevElRef", {
            set: function (el) {
                this._setElement(el, this.navigation, 'navigation', 'prevEl');
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(SwiperComponent.prototype, "nextElRef", {
            set: function (el) {
                this._setElement(el, this.navigation, 'navigation', 'nextEl');
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(SwiperComponent.prototype, "scrollbarElRef", {
            set: function (el) {
                this._setElement(el, this.scrollbar, 'scrollbar');
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(SwiperComponent.prototype, "paginationElRef", {
            set: function (el) {
                this._setElement(el, this.pagination, 'pagination');
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(SwiperComponent.prototype, "slidesEl", {
            set: function (val) {
                var _this = this;
                this.slides = val.map(function (slide, index) {
                    slide.slideIndex = index;
                    slide.classNames = _this.slideClass;
                    return slide;
                });
                if (this.loop && !this.loopedSlides) {
                    this.calcLoopedSlides();
                }
                if (!this.virtual) {
                    this.prependSlides = rxjs.of(this.slides.slice(this.slides.length - this.loopedSlides));
                    this.appendSlides = rxjs.of(this.slides.slice(0, this.loopedSlides));
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(SwiperComponent.prototype, "activeSlides", {
            get: function () {
                if (this.virtual) {
                    return this._activeSlides;
                }
                return rxjs.of(this.slides);
            },
            enumerable: false,
            configurable: true
        });
        SwiperComponent.prototype._setElement = function (el, ref, update, key) {
            if (key === void 0) { key = 'el'; }
            if (!el && !ref) {
                return;
            }
            if (ref) {
                if (ref[key] === el.nativeElement) {
                    return;
                }
                ref[key] = el.nativeElement;
            }
            var updateObj = {};
            updateObj[update] = true;
            this.updateInitSwiper(updateObj);
        };
        SwiperComponent.prototype.ngOnInit = function () {
            var params = getParams(this).params;
            Object.assign(this, params);
        };
        SwiperComponent.prototype.ngAfterViewInit = function () {
            if (this.init) {
                this.initSwiper();
                this._changeDetectorRef.detectChanges();
            }
        };
        SwiperComponent.prototype.initSwiper = function () {
            var _this = this;
            var _a = getParams(this), swiperParams = _a.params, passedParams = _a.passedParams;
            Object.assign(this, swiperParams);
            swiperParams.onAny = function (event) {
                var args = [];
                for (var _i = 1; _i < arguments.length; _i++) {
                    args[_i - 1] = arguments[_i];
                }
                var emitter = _this["s_" + event];
                if (emitter) {
                    emitter.emit.apply(emitter, __spread(args));
                }
            };
            Object.assign(swiperParams.on, {
                _containerClasses: function (swiper, classes) {
                    this.containerClasses = classes;
                },
                _swiper: function (swiper) {
                    _this.swiperRef = swiper;
                    _this.s_swiper.emit(_this.swiperRef);
                    swiper.loopCreate = function () { };
                    swiper.loopDestroy = function () { };
                    if (swiperParams.loop) {
                        swiper.loopedSlides = _this.loopedSlides;
                    }
                    if (swiper.virtual && swiper.params.virtual.enabled) {
                        swiper.virtual.slides = _this.slides;
                        swiper.params.virtual.cache = false;
                        swiper.params.virtual.renderExternal = function (data) {
                            _this.updateVirtualSlides(data);
                        };
                        swiper.params.virtual.renderExternalUpdate = false;
                    }
                    _this._changeDetectorRef.detectChanges();
                },
                _slideClass: function (_, el, classNames) {
                    var slideIndex = parseInt(el.dataset.swiperSlideIndex);
                    if (_this.virtual) {
                        var virtualSlide = _this.slides.find(function (item) {
                            return item.virtualIndex && item.virtualIndex === slideIndex;
                        });
                        if (virtualSlide) {
                            virtualSlide.classNames = classNames;
                            return;
                        }
                    }
                    _this.slides[slideIndex].classNames = classNames;
                    _this._changeDetectorRef.detectChanges();
                },
            });
            new Swiper(this.elementRef.nativeElement, swiperParams);
        };
        SwiperComponent.prototype.updateVirtualSlides = function (virtualData) {
            var _a;
            if (!this.swiperRef ||
                (this.currentVirtualData &&
                    this.currentVirtualData.from === virtualData.from &&
                    this.currentVirtualData.to === virtualData.to &&
                    this.currentVirtualData.offset === virtualData.offset)) {
                return;
            }
            this.style = this.swiperRef.isHorizontal()
                ? (_a = {},
                    _a[this.swiperRef.rtlTranslate ? 'right' : 'left'] = virtualData.offset + "px",
                    _a) : {
                top: virtualData.offset + "px",
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
        };
        SwiperComponent.prototype.ngOnChanges = function (changedParams) {
            this.updateSwiper(changedParams);
            this._changeDetectorRef.detectChanges();
        };
        SwiperComponent.prototype.updateInitSwiper = function (changedParams) {
            if (!(changedParams && this.swiperRef && !this.swiperRef.destroyed)) {
                return;
            }
            var _a = this.swiperRef, currentParams = _a.params, pagination = _a.pagination, navigation = _a.navigation, scrollbar = _a.scrollbar, virtual = _a.virtual, thumbs = _a.thumbs;
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
                var initialized = thumbs.init();
                if (initialized)
                    thumbs.update(true);
            }
            if (changedParams.controller && this.controller && this.controller.control) {
                this.swiperRef.controller.control = this.controller.control;
            }
            this.swiperRef.update();
        };
        SwiperComponent.prototype.updateSwiper = function (changedParams) {
            if (!(changedParams && this.swiperRef && !this.swiperRef.destroyed)) {
                return;
            }
            for (var key in changedParams) {
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
        };
        SwiperComponent.prototype.calcLoopedSlides = function () {
            if (!this.loop) {
                return;
            }
            var slidesPerViewParams = this.slidesPerView;
            if (this.breakpoints) {
                var breakpoint = Swiper.prototype.getBreakpoint(this.breakpoints);
                var breakpointOnlyParams = breakpoint in this.breakpoints ? this.breakpoints[breakpoint] : undefined;
                if (breakpointOnlyParams && breakpointOnlyParams.slidesPerView) {
                    slidesPerViewParams = breakpointOnlyParams.slidesPerView;
                }
            }
            if (slidesPerViewParams === 'auto') {
                this.loopedSlides = this.slides.length;
                return this.slides.length;
            }
            var loopedSlides = this.loopedSlides || slidesPerViewParams;
            loopedSlides += this.loopAdditionalSlides;
            if (loopedSlides > this.slides.length) {
                loopedSlides = this.slides.length;
            }
            this.loopedSlides = loopedSlides;
            return loopedSlides;
        };
        SwiperComponent.prototype.updateParameter = function (key, value) {
            if (!(this.swiperRef && !this.swiperRef.destroyed)) {
                return;
            }
            var _key = key.replace(/^_/, '');
            if (Object.keys(this.swiperRef.modules).indexOf(_key) >= 0) {
                extend(value, this.swiperRef.modules[_key].params[_key]);
            }
            if (isObject(this.swiperRef.params[_key]) && isObject(value)) {
                extend(this.swiperRef.params[_key], value);
            }
            else {
                this.swiperRef.params[_key] = value;
            }
        };
        SwiperComponent.prototype.ngOnDestroy = function () {
            this.swiperRef.destroy();
        };
        return SwiperComponent;
    }());
    SwiperComponent.decorators = [
        { type: core.Component, args: [{
                    selector: 'swiper, [swiper]',
                    template: "<ng-content select=\"[slot=container-start]\"></ng-content>\n<ng-container *ngIf=\"navigation\">\n  <div class=\"swiper-button-prev\" #prevElRef></div>\n  <div class=\"swiper-button-next\" #nextElRef></div>\n</ng-container>\n<div *ngIf=\"scrollbar\" class=\"swiper-scrollbar\" #scrollbarElRef></div>\n<div *ngIf=\"pagination\" class=\"swiper-pagination\" #paginationElRef></div>\n<div [ngClass]=\"wrapperClass\">\n  <ng-content select=\"[slot=wrapper-start]\"></ng-content>\n  <ng-template\n    *ngTemplateOutlet=\"\n      slidesTemplate;\n      context: {\n        loopSlides: prependSlides,\n        key: 'prepend'\n      }\n    \"\n  ></ng-template>\n  <ng-template\n    *ngTemplateOutlet=\"\n      slidesTemplate;\n      context: {\n        loopSlides: activeSlides,\n        key: ''\n      }\n    \"\n  ></ng-template>\n  <ng-template\n    *ngTemplateOutlet=\"\n      slidesTemplate;\n      context: {\n        loopSlides: appendSlides,\n        key: 'append'\n      }\n    \"\n  ></ng-template>\n  <ng-content select=\"[slot=wrapper-end]\"></ng-content>\n</div>\n<ng-content select=\"[slow=container-end]\"></ng-content>\n\n<ng-template #slidesTemplate let-loopSlides=\"loopSlides\" let-slideKey=\"key\">\n  <div\n    *ngFor=\"let slide of loopSlides | async\"\n    [ngClass]=\"slide.classNames + ' ' + (slideKey !== '' ? slideDuplicateClass : '')\"\n    [attr.data-swiper-slide-index]=\"slide.virtualIndex ? slide.virtualIndex : slide.slideIndex\"\n    [style]=\"style\"\n  >\n    <ng-template\n      [ngTemplateOutlet]=\"slide.template\"\n      [ngTemplateOutletContext]=\"{\n        $implicit: slide.slideData\n      }\"\n    ></ng-template>\n  </div>\n</ng-template>\n",
                    changeDetection: core.ChangeDetectionStrategy.OnPush,
                    encapsulation: core.ViewEncapsulation.None,
                    styles: ["\n      swiper {\n        display: block;\n      }\n    "]
                },] }
    ];
    SwiperComponent.ctorParameters = function () { return [
        { type: core.ElementRef },
        { type: core.ChangeDetectorRef }
    ]; };
    SwiperComponent.propDecorators = {
        init: [{ type: core.Input }],
        direction: [{ type: core.Input }],
        touchEventsTarget: [{ type: core.Input }],
        initialSlide: [{ type: core.Input }],
        speed: [{ type: core.Input }],
        cssMode: [{ type: core.Input }],
        updateOnWindowResize: [{ type: core.Input }],
        nested: [{ type: core.Input }],
        width: [{ type: core.Input }],
        height: [{ type: core.Input }],
        preventInteractionOnTransition: [{ type: core.Input }],
        userAgent: [{ type: core.Input }],
        url: [{ type: core.Input }],
        edgeSwipeDetection: [{ type: core.Input }],
        edgeSwipeThreshold: [{ type: core.Input }],
        freeMode: [{ type: core.Input }],
        freeModeMomentum: [{ type: core.Input }],
        freeModeMomentumRatio: [{ type: core.Input }],
        freeModeMomentumBounce: [{ type: core.Input }],
        freeModeMomentumBounceRatio: [{ type: core.Input }],
        freeModeMomentumVelocityRatio: [{ type: core.Input }],
        freeModeSticky: [{ type: core.Input }],
        freeModeMinimumVelocity: [{ type: core.Input }],
        autoHeight: [{ type: core.Input }],
        setWrapperSize: [{ type: core.Input }],
        virtualTranslate: [{ type: core.Input }],
        effect: [{ type: core.Input }],
        breakpoints: [{ type: core.Input }],
        spaceBetween: [{ type: core.Input }],
        slidesPerView: [{ type: core.Input }],
        slidesPerColumn: [{ type: core.Input }],
        slidesPerColumnFill: [{ type: core.Input }],
        slidesPerGroup: [{ type: core.Input }],
        slidesPerGroupSkip: [{ type: core.Input }],
        centeredSlides: [{ type: core.Input }],
        centeredSlidesBounds: [{ type: core.Input }],
        slidesOffsetBefore: [{ type: core.Input }],
        slidesOffsetAfter: [{ type: core.Input }],
        normalizeSlideIndex: [{ type: core.Input }],
        centerInsufficientSlides: [{ type: core.Input }],
        watchOverflow: [{ type: core.Input }],
        roundLengths: [{ type: core.Input }],
        touchRatio: [{ type: core.Input }],
        touchAngle: [{ type: core.Input }],
        simulateTouch: [{ type: core.Input }],
        shortSwipes: [{ type: core.Input }],
        longSwipes: [{ type: core.Input }],
        longSwipesRatio: [{ type: core.Input }],
        longSwipesMs: [{ type: core.Input }],
        followFinger: [{ type: core.Input }],
        allowTouchMove: [{ type: core.Input }],
        threshold: [{ type: core.Input }],
        touchMoveStopPropagation: [{ type: core.Input }],
        touchStartPreventDefault: [{ type: core.Input }],
        touchStartForcePreventDefault: [{ type: core.Input }],
        touchReleaseOnEdges: [{ type: core.Input }],
        uniqueNavElements: [{ type: core.Input }],
        resistance: [{ type: core.Input }],
        resistanceRatio: [{ type: core.Input }],
        watchSlidesProgress: [{ type: core.Input }],
        watchSlidesVisibility: [{ type: core.Input }],
        grabCursor: [{ type: core.Input }],
        preventClicks: [{ type: core.Input }],
        preventClicksPropagation: [{ type: core.Input }],
        slideToClickedSlide: [{ type: core.Input }],
        preloadImages: [{ type: core.Input }],
        updateOnImagesReady: [{ type: core.Input }],
        loop: [{ type: core.Input }],
        loopAdditionalSlides: [{ type: core.Input }],
        loopedSlides: [{ type: core.Input }],
        loopFillGroupWithBlank: [{ type: core.Input }],
        loopPreventsSlide: [{ type: core.Input }],
        allowSlidePrev: [{ type: core.Input }],
        allowSlideNext: [{ type: core.Input }],
        swipeHandler: [{ type: core.Input }],
        noSwiping: [{ type: core.Input }],
        noSwipingClass: [{ type: core.Input }],
        noSwipingSelector: [{ type: core.Input }],
        passiveListeners: [{ type: core.Input }],
        containerModifierClass: [{ type: core.Input }],
        slideClass: [{ type: core.Input }],
        slideBlankClass: [{ type: core.Input }],
        slideActiveClass: [{ type: core.Input }],
        slideDuplicateActiveClass: [{ type: core.Input }],
        slideVisibleClass: [{ type: core.Input }],
        slideDuplicateClass: [{ type: core.Input }],
        slideNextClass: [{ type: core.Input }],
        slideDuplicateNextClass: [{ type: core.Input }],
        slidePrevClass: [{ type: core.Input }],
        slideDuplicatePrevClass: [{ type: core.Input }],
        wrapperClass: [{ type: core.Input }],
        runCallbacksOnInit: [{ type: core.Input }],
        a11y: [{ type: core.Input }],
        autoplay: [{ type: core.Input }],
        controller: [{ type: core.Input }],
        coverflowEffect: [{ type: core.Input }],
        cubeEffect: [{ type: core.Input }],
        fadeEffect: [{ type: core.Input }],
        flipEffect: [{ type: core.Input }],
        hashNavigation: [{ type: core.Input }],
        history: [{ type: core.Input }],
        keyboard: [{ type: core.Input }],
        lazy: [{ type: core.Input }],
        mousewheel: [{ type: core.Input }],
        navigation: [{ type: core.Input }],
        pagination: [{ type: core.Input }],
        parallax: [{ type: core.Input }],
        scrollbar: [{ type: core.Input }],
        virtual: [{ type: core.Input }],
        thumbs: [{ type: core.Input }],
        zoom: [{ type: core.Input }],
        s__beforeBreakpoint: [{ type: core.Output, args: ['_beforeBreakpoint',] }],
        s__containerClasses: [{ type: core.Output, args: ['_containerClasses',] }],
        s__slideClass: [{ type: core.Output, args: ['_slideClass',] }],
        s__swiper: [{ type: core.Output, args: ['_swiper',] }],
        s_activeIndexChange: [{ type: core.Output, args: ['activeIndexChange',] }],
        s_afterInit: [{ type: core.Output, args: ['afterInit',] }],
        s_autoplay: [{ type: core.Output, args: ['autoplay',] }],
        s_autoplayStart: [{ type: core.Output, args: ['autoplayStart',] }],
        s_autoplayStop: [{ type: core.Output, args: ['autoplayStop',] }],
        s_beforeDestroy: [{ type: core.Output, args: ['beforeDestroy',] }],
        s_beforeInit: [{ type: core.Output, args: ['beforeInit',] }],
        s_beforeLoopFix: [{ type: core.Output, args: ['beforeLoopFix',] }],
        s_beforeResize: [{ type: core.Output, args: ['beforeResize',] }],
        s_beforeSlideChangeStart: [{ type: core.Output, args: ['beforeSlideChangeStart',] }],
        s_beforeTransitionStart: [{ type: core.Output, args: ['beforeTransitionStart',] }],
        s_breakpoint: [{ type: core.Output, args: ['breakpoint',] }],
        s_changeDirection: [{ type: core.Output, args: ['changeDirection',] }],
        s_click: [{ type: core.Output, args: ['click',] }],
        s_doubleTap: [{ type: core.Output, args: ['doubleTap',] }],
        s_doubleClick: [{ type: core.Output, args: ['doubleClick',] }],
        s_destroy: [{ type: core.Output, args: ['destroy',] }],
        s_fromEdge: [{ type: core.Output, args: ['fromEdge',] }],
        s_hashChange: [{ type: core.Output, args: ['hashChange',] }],
        s_hashSet: [{ type: core.Output, args: ['hashSet',] }],
        s_imagesReady: [{ type: core.Output, args: ['imagesReady',] }],
        s_init: [{ type: core.Output, args: ['init',] }],
        s_keyPress: [{ type: core.Output, args: ['keyPress',] }],
        s_lazyImageLoad: [{ type: core.Output, args: ['lazyImageLoad',] }],
        s_lazyImageReady: [{ type: core.Output, args: ['lazyImageReady',] }],
        s_loopFix: [{ type: core.Output, args: ['loopFix',] }],
        s_momentumBounce: [{ type: core.Output, args: ['momentumBounce',] }],
        s_navigationHide: [{ type: core.Output, args: ['navigationHide',] }],
        s_navigationShow: [{ type: core.Output, args: ['navigationShow',] }],
        s_observerUpdate: [{ type: core.Output, args: ['observerUpdate',] }],
        s_orientationchange: [{ type: core.Output, args: ['orientationchange',] }],
        s_paginationHide: [{ type: core.Output, args: ['paginationHide',] }],
        s_paginationRender: [{ type: core.Output, args: ['paginationRender',] }],
        s_paginationShow: [{ type: core.Output, args: ['paginationShow',] }],
        s_paginationUpdate: [{ type: core.Output, args: ['paginationUpdate',] }],
        s_progress: [{ type: core.Output, args: ['progress',] }],
        s_reachBeginning: [{ type: core.Output, args: ['reachBeginning',] }],
        s_reachEnd: [{ type: core.Output, args: ['reachEnd',] }],
        s_realIndexChange: [{ type: core.Output, args: ['realIndexChange',] }],
        s_resize: [{ type: core.Output, args: ['resize',] }],
        s_scroll: [{ type: core.Output, args: ['scroll',] }],
        s_scrollbarDragEnd: [{ type: core.Output, args: ['scrollbarDragEnd',] }],
        s_scrollbarDragMove: [{ type: core.Output, args: ['scrollbarDragMove',] }],
        s_scrollbarDragStart: [{ type: core.Output, args: ['scrollbarDragStart',] }],
        s_setTransition: [{ type: core.Output, args: ['setTransition',] }],
        s_setTranslate: [{ type: core.Output, args: ['setTranslate',] }],
        s_slideChange: [{ type: core.Output, args: ['slideChange',] }],
        s_slideChangeTransitionEnd: [{ type: core.Output, args: ['slideChangeTransitionEnd',] }],
        s_slideChangeTransitionStart: [{ type: core.Output, args: ['slideChangeTransitionStart',] }],
        s_slideNextTransitionEnd: [{ type: core.Output, args: ['slideNextTransitionEnd',] }],
        s_slideNextTransitionStart: [{ type: core.Output, args: ['slideNextTransitionStart',] }],
        s_slidePrevTransitionEnd: [{ type: core.Output, args: ['slidePrevTransitionEnd',] }],
        s_slidePrevTransitionStart: [{ type: core.Output, args: ['slidePrevTransitionStart',] }],
        s_slideResetTransitionStart: [{ type: core.Output, args: ['slideResetTransitionStart',] }],
        s_slideResetTransitionEnd: [{ type: core.Output, args: ['slideResetTransitionEnd',] }],
        s_sliderMove: [{ type: core.Output, args: ['sliderMove',] }],
        s_sliderFirstMove: [{ type: core.Output, args: ['sliderFirstMove',] }],
        s_slidesLengthChange: [{ type: core.Output, args: ['slidesLengthChange',] }],
        s_slidesGridLengthChange: [{ type: core.Output, args: ['slidesGridLengthChange',] }],
        s_snapGridLengthChange: [{ type: core.Output, args: ['snapGridLengthChange',] }],
        s_snapIndexChange: [{ type: core.Output, args: ['snapIndexChange',] }],
        s_tap: [{ type: core.Output, args: ['tap',] }],
        s_toEdge: [{ type: core.Output, args: ['toEdge',] }],
        s_touchEnd: [{ type: core.Output, args: ['touchEnd',] }],
        s_touchMove: [{ type: core.Output, args: ['touchMove',] }],
        s_touchMoveOpposite: [{ type: core.Output, args: ['touchMoveOpposite',] }],
        s_touchStart: [{ type: core.Output, args: ['touchStart',] }],
        s_transitionEnd: [{ type: core.Output, args: ['transitionEnd',] }],
        s_transitionStart: [{ type: core.Output, args: ['transitionStart',] }],
        s_update: [{ type: core.Output, args: ['update',] }],
        s_zoomChange: [{ type: core.Output, args: ['zoomChange',] }],
        s_swiper: [{ type: core.Output, args: ['swiper',] }],
        prevElRef: [{ type: core.ViewChild, args: ['prevElRef', { static: false },] }],
        nextElRef: [{ type: core.ViewChild, args: ['nextElRef', { static: false },] }],
        scrollbarElRef: [{ type: core.ViewChild, args: ['scrollbarElRef', { static: false },] }],
        paginationElRef: [{ type: core.ViewChild, args: ['paginationElRef', { static: false },] }],
        slidesEl: [{ type: core.ContentChildren, args: [SwiperSlideDirective, { descendants: true },] }],
        containerClasses: [{ type: core.HostBinding, args: ['class',] }]
    };

    var SwiperModule = /** @class */ (function () {
        function SwiperModule() {
        }
        return SwiperModule;
    }());
    SwiperModule.decorators = [
        { type: core.NgModule, args: [{
                    declarations: [SwiperComponent, SwiperSlideDirective],
                    exports: [SwiperComponent, SwiperSlideDirective],
                    imports: [common.CommonModule],
                },] }
    ];

    /*
     * Public API Surface of angular
     */

    /**
     * Generated bundle index. Do not edit.
     */

    exports.SwiperComponent = SwiperComponent;
    exports.SwiperModule = SwiperModule;
    exports.SwiperSlideDirective = SwiperSlideDirective;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=angular.umd.js.map
