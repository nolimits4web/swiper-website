const gulp = require('gulp');
const connect = require('gulp-connect');
const open = require('gulp-open');

const buildPages = require('./build/build-pages');
const buildStyles = require('./build/build-styles');
const buildScript = require('./build/build-script');

const paths = {
  root: './',
  css: './css',
  js: './js',
  src: './src',
  pug: './src/pug',
  less: './src/less',
};

/* ==================================================================
Build
================================================================== */
gulp.task('less', buildStyles);
gulp.task('pug', buildPages);
gulp.task('js', buildScript);

gulp.task('build', gulp.series('pug', 'less', 'js'), function (cb) {
  cb();
});

/* =================================
Watch
================================= */
gulp.task('watch', function () {
  gulp.watch(paths.less + '**/*.*', gulp.series([ 'less' ]));
  gulp.watch('./src/pug/**/*.pug', gulp.series([ 'pug' ]));
  gulp.watch('./src/js/*.js', gulp.series([ 'js' ]));
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
