import { h, ref, onUpdated, onBeforeUpdate } from 'vue';
import { uniqueClasses } from './utils';
var SwiperSlide = {
  name: 'SwiperSlide',
  props: {
    tag: {
      type: String,
      default: 'div'
    },
    swiperRef: Object,
    zoom: {
      type: Boolean,
      default: undefined
    }
  },
  setup: function setup(props, _ref) {
    var slots = _ref.slots;
    var Tag = props.tag,
        _props$class = props.class,
        className = _props$class === void 0 ? '' : _props$class,
        swiperRef = props.swiperRef,
        zoom = props.zoom;
    var slideElRef = ref(null);
    var slideClasses = ref('swiper-slide');

    function updateClasses(swiper, el, classNames) {
      if (el === slideElRef.value) {
        slideClasses.value = classNames;
      }
    }

    onUpdated(function () {
      if (!slideElRef.value || !swiperRef.value) return;

      if (swiperRef.value.destroyed) {
        if (slideClasses.value !== 'swiper-slide') {
          slideClasses.value = 'swiper-slide';
        }

        return;
      }

      swiperRef.value.on('_slideClass', updateClasses);
    });
    onBeforeUpdate(function () {
      if (!swiperRef.value) return;
      swiperRef.value.off('_slideClass', updateClasses);
    });

    var slideData = function slideData() {
      return {
        isActive: slideClasses.value.indexOf('swiper-slide-active') >= 0 || slideClasses.value.indexOf('swiper-slide-duplicate-active') >= 0,
        isVisible: slideClasses.value.indexOf('swiper-slide-visible') >= 0,
        isDuplicate: slideClasses.value.indexOf('swiper-slide-duplicate') >= 0,
        isPrev: slideClasses.value.indexOf('swiper-slide-prev') >= 0 || slideClasses.value.indexOf('swiper-slide-duplicate-prev') >= 0,
        isNext: slideClasses.value.indexOf('swiper-slide-next') >= 0 || slideClasses.value.indexOf('swiper-slide-duplicate next') >= 0
      };
    };

    return function () {
      return h(Tag, {
        class: uniqueClasses("" + slideClasses.value + (className ? " " + className : '')),
        ref: slideElRef
      }, zoom ? h('div', {
        class: 'swiper-zoom-container',
        'data-swiper-zoom': typeof zoom === 'number' ? zoom : undefined
      }, slots.default(slideData())) : slots.default(slideData()));
    };
  }
};
export { SwiperSlide };