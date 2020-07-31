/**
 * Swiper 6.1.0
 * Most modern mobile touch slider and framework with hardware accelerated transitions
 * http://swiperjs.com
 *
 * Copyright 2014-2020 Vladimir Kharlampidi
 *
 * Released under the MIT License
 *
 * Released on: July 31, 2020
 */

'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var Swiper = _interopDefault(require('./components/core/core-class'));
var Virtual = _interopDefault(require('./components/virtual/virtual'));
var Keyboard = _interopDefault(require('./components/keyboard/keyboard'));
var Mousewheel = _interopDefault(require('./components/mousewheel/mousewheel'));
var Navigation = _interopDefault(require('./components/navigation/navigation'));
var Pagination = _interopDefault(require('./components/pagination/pagination'));
var Scrollbar = _interopDefault(require('./components/scrollbar/scrollbar'));
var Parallax = _interopDefault(require('./components/parallax/parallax'));
var Zoom = _interopDefault(require('./components/zoom/zoom'));
var Lazy = _interopDefault(require('./components/lazy/lazy'));
var Controller = _interopDefault(require('./components/controller/controller'));
var A11y = _interopDefault(require('./components/a11y/a11y'));
var History = _interopDefault(require('./components/history/history'));
var HashNavigation = _interopDefault(require('./components/hash-navigation/hash-navigation'));
var Autoplay = _interopDefault(require('./components/autoplay/autoplay'));
var EffectFade = _interopDefault(require('./components/effect-fade/effect-fade'));
var EffectCube = _interopDefault(require('./components/effect-cube/effect-cube'));
var EffectFlip = _interopDefault(require('./components/effect-flip/effect-flip'));
var EffectCoverflow = _interopDefault(require('./components/effect-coverflow/effect-coverflow'));
var Thumbs = _interopDefault(require('./components/thumbs/thumbs'));

// Swiper Class
var components = [Virtual, Keyboard, Mousewheel, Navigation, Pagination, Scrollbar, Parallax, Zoom, Lazy, Controller, A11y, History, HashNavigation, Autoplay, EffectFade, EffectCube, EffectFlip, EffectCoverflow, Thumbs];
Swiper.use(components);

exports.Swiper = Swiper;
exports.default = Swiper;
