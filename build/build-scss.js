const path = require('path');
const gulp = require('gulp');
const gulpSass = require('gulp-sass');
const connect = require('gulp-connect');
const cleanCss = require('gulp-clean-css');

function buildSCSS(cb) {
  gulp.src(['./src/scss/main.scss'])
    .pipe(gulpSass({
      paths: [path.join(__dirname, 'scss', 'includes')],
    }))
    .pipe(cleanCss({ compatibility: '*,-properties.zeroUnits', level: 2 }))
    .pipe(gulp.dest('./public/css/'))
    .pipe(connect.reload())
    .on('end', () => {
      if (cb) cb();
    });
}

module.exports = buildSCSS;
