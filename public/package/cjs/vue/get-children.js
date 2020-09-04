"use strict";

exports.__esModule = true;
exports.getChildren = getChildren;

function getChildren(originalSlots, slidesRef, oldSlidesRef) {
  if (originalSlots === void 0) {
    originalSlots = {};
  }

  var slides = [];
  var slots = {
    'container-start': [],
    'container-end': [],
    'wrapper-start': [],
    'wrapper-end': []
  };
  Object.keys(originalSlots).forEach(function (slotName) {
    var els = originalSlots[slotName]();
    if (slotName === 'default') slotName = 'container-end';
    els.forEach(function (vnode) {
      if (vnode.type && vnode.type.name === 'SwiperSlide') {
        slides.push(vnode);
      } else if (slots[slotName]) {
        slots[slotName].push(vnode);
      }
    });
  });
  oldSlidesRef.value = slidesRef.value;
  slidesRef.value = slides;
  return {
    slides: slides,
    slots: slots
  };
}