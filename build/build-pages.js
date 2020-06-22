const gulp = require('gulp');
const gulpPug = require('gulp-pug');
const connect = require('gulp-connect');
const pug = require('pug');
const through2 = require('through2');

const codeFilter = require('./utils/code-filter');
const codeInlineFilter = require('./utils/code-inline-filter');
const createInlineCodeTags = require('./utils/create-inline-code-tags');
const createCodeFilter = require('./utils/create-code-filter');

if (!pug.filter && !pug.filters.code) {
  pug.filters = {
    code: codeFilter,
    code_inline: codeInlineFilter,
  };
}

function buildPages(cb, { src = ['**/index.pug'], dest = './public/' } = {}) {
  const time = Date.now();

  const name = src[0] === '**/*.pug' ? 'all' : src.join(', ');

  console.log(`Starting pug: ${name}`);

  gulp.src(src, { cwd: 'src/pug' })
    .pipe(through2.obj((file, _, cbInternal) => {
      if (file.isBuffer()) {
        let content = file.contents.toString();
        content = createCodeFilter(content);
        content = createInlineCodeTags(content);
        file.contents = Buffer.from(content);
      }
      cbInternal(null, file);
    }))
    .pipe(gulpPug({
      pug,
      pretty: false,
    }))
    .pipe(through2.obj((file, _, cbInternal) => {
      if (file.isBuffer()) {
        let content = file.contents.toString();
        content = createInlineCodeTags(content);
        file.contents = Buffer.from(content);
      }
      cbInternal(null, file);
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
