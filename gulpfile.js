(function(){
  'use strict';
  var gulp = require('gulp'),
  connect = require('gulp-connect'),
  open = require('gulp-open'),
  less = require('gulp-less'),
  pug = require('gulp-pug'),
  path = require('path'),
  paths = {
    root: './',
    css: './css',
    js: './js',
    src: './src',
    pug: './src/pug',
    less: './src/less',
  },
  pages = [
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
  ],
  styles = [
    {
      src: './src/less/main.less',
      dest: './css/'
    }
  ];
  // pug Filter
  var pugNative = require('pug');
  pugNative.filters['code'] = function (text) {
    return text
    .replace( /</g, '&lt;'   )
    .replace( />/g, '&gt;'   )
  }
  /* ==================================================================
  Build
  ================================================================== */
  gulp.task('less', function (cb) {
    var cbs = 0;
    return styles.forEach(function (style) {
      gulp.src([style.src])
      .pipe(less({
        paths: [ path.join(__dirname, 'less', 'includes') ]
      }))
      .pipe(gulp.dest(style.dest))
      .pipe(connect.reload())
      .on('error', (err) => {
        console.log(err);
      })
      .on('end', function () {
        cbs ++;
        if (cbs === styles.length) cb();
      });
    });
  });
  gulp.task('pug', function (cb) {
    var cbs = 0;
    pages.forEach(function (page) {
      gulp.src([page.src])
      .pipe(pug({
        pug: pugNative,
        pretty: true,
      }))
      .pipe(gulp.dest(page.dest))
      .pipe(connect.reload())
      .on('end', function () {
        cbs ++;
        if (cbs === pages.length) cb();
      });
    });
  });

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
})();
