const gulp = require('gulp');
const gulpPug = require('gulp-pug');
const connect = require('gulp-connect');
const pug = require('pug');

const codeFilter = require('./utils/code-filter');
const codeInlineFilter = require('./utils/code-inline-filter');

if (!pug.filter && !pug.filters.code) {
  pug.filters = {
    code: codeFilter,
    code_inline: codeInlineFilter,
  };
}

function buildPages(cb, { src = ['**/*.pug', '!**/_*.pug', '!_*.pug'], dest = './' } = {}) {
  const cdn = process.argv.slice(3) ? process.argv.slice(3).toString().replace('-', '') !== 'local' : true;
  const time = Date.now();

  const name = src[0] === '**/*.pug' ? 'all' : src.join(', ');

  console.log(`Starting pug: ${name}`);

  gulp.src(src, { cwd: 'src/pug' })
    .pipe(gulpPug({
      pug,
      pretty: false,
    }))
    .on('error', (err) => {
      console.log(err);
    })
    .pipe(gulp.dest(dest))
    .pipe(connect.reload())
    .on('end', () => {
      console.log(`Finished pug ${name} in ${Date.now() - time}ms`);
      if (cb) cb();
    });
}

module.exports = buildPages;
