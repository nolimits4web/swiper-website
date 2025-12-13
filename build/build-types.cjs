const fs = require('fs-extra');
const { promise: exec } = require('exec-sh');

const dir = './public/types';

(async () => {
  const { patchSwiperVue } = await import('./patch-swiper-vue.mjs');
  const originalTsconfig = fs.readFileSync('./tsconfig.json', 'utf-8');

  fs.removeSync(dir);
  fs.ensureDirSync(dir);
  fs.writeFileSync(
    './tsconfig.json',
    fs.readFileSync('./tsconfig.json.typedoc', 'utf-8')
  );

  // Temporarily patch swiper-vue.d.ts to work around TypeDoc bug
  const restoreSwiperVue = patchSwiperVue();

  try {
    await exec('npx typedoc');
  } catch (error) {
    if (error.code === 5 || error.code === 1) {
      console.warn('TypeDoc encountered some errors but continuing...');
      // Check if output directory was created (partial success)
      if (fs.existsSync(dir) && fs.readdirSync(dir).length > 0) {
        console.log('TypeDoc generated partial documentation, continuing...');
      } else {
        console.error('TypeDoc failed completely, no output generated');
        throw error;
      }
    } else {
      console.error(error);
      throw error;
    }
  } finally {
    // Restore original files
    fs.writeFileSync('./tsconfig.json', originalTsconfig);
    restoreSwiperVue();
  }
})();
