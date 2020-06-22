"use strict";

exports.__esModule = true;
exports.updateSwiper = updateSwiper;

var _utils = require("./utils");

function updateSwiper(swiper, slides, passedParams, changedParams) {
  var updateParams = changedParams.filter(function (key) {
    return key !== 'children' && key !== 'direction';
  });
  var needThumbsInit;
  var needControllerInit;

  if (changedParams.includes('thumbs') && passedParams.thumbs && passedParams.thumbs.swiper && swiper.params.thumbs && !swiper.params.thumbs.swiper) {
    needThumbsInit = true;
  }

  if (changedParams.includes('controller') && passedParams.controller && passedParams.controller.control && swiper.params.controller && !swiper.params.controller.control) {
    needControllerInit = true;
  }

  updateParams.forEach(function (key) {
    if ((0, _utils.isObject)(swiper.params[key]) && (0, _utils.isObject)(passedParams[key])) {
      (0, _utils.extend)(swiper.params[key], passedParams[key]);
    } else {
      swiper.params[key] = passedParams[key];
    }
  });

  if (changedParams.includes('children') && swiper.virtual && swiper.params.virtual.enabled) {
    swiper.virtual.slides = slides;
    swiper.virtual.update(true);
  }

  if (needThumbsInit) {
    var initialized = swiper.thumbs.init();
    if (initialized) swiper.thumbs.update(true);
  }

  if (needControllerInit) {
    swiper.controller.control = swiper.params.controller.control;
  }

  if (changedParams.includes('allowSlideNext')) {
    swiper.allowSlideNext = passedParams.allowSlideNext;
  }

  if (changedParams.includes('allowSlidePrev')) {
    swiper.allowSlidePrev = passedParams.allowSlidePrev;
  }

  if (changedParams.includes('direction')) {
    swiper.changeDirection(passedParams.direction, false);
  }

  swiper.update();
}