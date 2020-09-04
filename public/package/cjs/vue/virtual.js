"use strict";

exports.__esModule = true;
exports.renderVirtual = renderVirtual;
exports.updateOnVirtualData = updateOnVirtualData;

function updateOnVirtualData(swiper) {
  if (!swiper || swiper.destroyed) return;
  swiper.updateSlides();
  swiper.updateProgress();
  swiper.updateSlidesClasses();

  if (swiper.lazy && swiper.params.lazy.enabled) {
    swiper.lazy.load();
  }
}

function renderVirtual(swiperRef, slides, virtualData) {
  var _ref;

  if (!virtualData) return null;
  var style = swiperRef.value.isHorizontal() ? (_ref = {}, _ref[swiperRef.value.rtlTranslate ? 'right' : 'left'] = virtualData.offset + "px", _ref) : {
    top: virtualData.offset + "px"
  };
  return slides.filter(function (slide, index) {
    return index >= virtualData.from && index <= virtualData.to;
  }).map(function (slide) {
    if (!slide.props) slide.props = {};
    if (!slide.props.style) slide.props.style = {};
    slide.props.swiperRef = swiperRef;
    slide.props.style = style;
    return slide;
  });
}