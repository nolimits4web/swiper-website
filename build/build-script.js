const fs = require('fs');
const rollup = require('rollup');
const buble = require('rollup-plugin-buble');
const resolve = require('rollup-plugin-node-resolve');
const Terser = require('terser');

module.exports = async(cb) =>  {
  try{
    const bundle = await rollup.rollup({
      input: './src/js/main.js',
      plugins: [
        resolve(),
        buble(),
      ],
    });

    const { output } = await bundle.write({
      strict: true,
      file: './public/js/main.js',
      format: 'umd',
      name: 'app',
      sourcemap: true,
      sourcemapFile: './public/js/main.js.map',
    });
    const result = output[0];

    const minified = await Terser.minify(result.code, {
      sourceMap: {
        content: result.map,
        url: 'main.js.map',
      },
    });

    fs.writeFileSync('./public/js/main.js', minified.code);
    fs.writeFileSync('./public/js/main.js.map', minified.map);

    cb();
  }catch(err){
    console.log(err);
    cb();
  }
}
