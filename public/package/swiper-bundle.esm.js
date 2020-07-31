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

import Swiper from './components/core/core-class';
export { default as Swiper, default } from './components/core/core-class';
import Virtual from './components/virtual/virtual';
import Keyboard from './components/keyboard/keyboard';
import Mousewheel from './components/mousewheel/mousewheel';
import Navigation from './components/navigation/navigation';
import Pagination from './components/pagination/pagination';
import Scrollbar from './components/scrollbar/scrollbar';
import Parallax from './components/parallax/parallax';
import Zoom from './components/zoom/zoom';
import Lazy from './components/lazy/lazy';
import Controller from './components/controller/controller';
import A11y from './components/a11y/a11y';
import History from './components/history/history';
import HashNavigation from './components/hash-navigation/hash-navigation';
import Autoplay from './components/autoplay/autoplay';
import EffectFade from './components/effect-fade/effect-fade';
import EffectCube from './components/effect-cube/effect-cube';
import EffectFlip from './components/effect-flip/effect-flip';
import EffectCoverflow from './components/effect-coverflow/effect-coverflow';
import Thumbs from './components/thumbs/thumbs';

// Swiper Class
var components = [Virtual, Keyboard, Mousewheel, Navigation, Pagination, Scrollbar, Parallax, Zoom, Lazy, Controller, A11y, History, HashNavigation, Autoplay, EffectFade, EffectCube, EffectFlip, EffectCoverflow, Thumbs];
Swiper.use(components);
