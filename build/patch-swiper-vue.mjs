import fs from 'fs-extra';

const swiperVuePath = './node_modules/swiper/swiper-vue.d.ts';

/**
 * Temporarily patches swiper-vue.d.ts to work around TypeDoc bug
 * where it fails to parse `() => JSX.Element` in a generic type parameter.
 *
 * @returns {Function} A restore function that should be called to restore the original file
 */
export function patchSwiperVue() {
  let swiperVueOriginal = null;
  let swiperVuePatched = false;

  if (fs.existsSync(swiperVuePath)) {
    swiperVueOriginal = fs.readFileSync(swiperVuePath, 'utf-8');
    // Replace the problematic function type with a type alias that TypeDoc can handle
    const patched = swiperVueOriginal.replace(
      /,\s*\(\) => JSX\.Element,/g,
      ', any,'
    );
    if (patched !== swiperVueOriginal) {
      fs.writeFileSync(swiperVuePath, patched);
      swiperVuePatched = true;
    }
  }

  // Return restore function
  return () => {
    if (swiperVuePatched && swiperVueOriginal) {
      fs.writeFileSync(swiperVuePath, swiperVueOriginal);
    }
  };
}
