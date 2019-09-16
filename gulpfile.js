const gulp = require('gulp');
const connect = require('gulp-connect');
const open = require('gulp-open');
const less = require('gulp-less');
const pug = require('gulp-pug');
const path = require('path');

const buildPages = require('./build/build-pages');
const buildStyles = require('./build/build-styles');

const paths = {
  root: './',
  css: './css',
  js: './js',
  src: './src',
  pug: './src/pug',
  less: './src/less',
};
const pages = [
  {
    src: './src/pug/index/index.pug',
    dest: './'
  },
  {
    src: './src/pug/api/index.pug',
    dest: './api/'
  },
  {
    src: './src/pug/demos/index.pug',
    dest: './demos/'
  },
  {
    src: './src/pug/get-started/index.pug',
    dest: './get-started/'
  },
];

// pug Filter
// var pugNative = require('pug');
// pugNative.filters['code'] = function (text) {
//   return text
//   .replace( /</g, '&lt;'   )
//   .replace( />/g, '&gt;'   )
// }
/* ==================================================================
Build
================================================================== */
gulp.task('less', buildStyles);
gulp.task('pug', buildPages);

// gulp.task('pug', function (cb) {
//   var cbs = 0;
//   pages.forEach(function (page) {
//     gulp.src([page.src])
//     .pipe(pug({
//       pug: pugNative,
//       pretty: true,
//     }))
//     .pipe(gulp.dest(page.dest))
//     .pipe(connect.reload())
//     .on('end', function () {
//       cbs ++;
//       if (cbs === pages.length) cb();
//     });
//   });
// });

gulp.task('build', gulp.series('pug', 'less'), function (cb) {
  cb();
});

/* =================================
Watch
================================= */
gulp.task('watch', function () {
  gulp.watch(paths.less + '**/*.*', gulp.series([ 'less' ]));
  gulp.watch('./src/pug/**/*.pug', gulp.series([ 'pug' ]));
});

gulp.task('connect', function () {
  return connect.server({
    root: [ paths.root ],
    livereload: true,
    port:'3000'
  });
});
gulp.task('open', function () {
  return gulp.src('./index.html').pipe(open({ uri: 'http://localhost:3000/index.html'}));
});

gulp.task('server', gulp.parallel([ 'watch', 'connect', 'open' ]));

gulp.task('default', gulp.series([ 'server' ]));

gulp.task('test', gulp.series([ 'build' ]));
