const slugify = require('@sindresorhus/slugify');
export function packageName(title, lib) {
  return slugify(`Swiper ${lib} - ${title}`);
}
export const commonFiles = {
  'sandbox.config.json': {
    infiniteLoopProtection: true,
    hardReloadOnChange: false,
    view: 'browser',
    template: 'node',
    container: {
      node: '14',
    },
  },
};
