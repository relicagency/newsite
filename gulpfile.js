const gulp = require('gulp')
  , sourcemaps = require('gulp-sourcemaps')
  , sass = require('gulp-sass')
  , concat = require('gulp-concat')
  , CacheBuster = require('gulp-cachebust')
  , print = require('gulp-print')
  , babel = require('gulp-babel')

const cachebust = new CacheBuster();

const paths = {
  app_JS: ['public/**/*.js'],
  app_CSS: ['public/styles/*.*css'],
  app_FONTS: ['public/styles/webfonts/*.*'],
  app_HTML: ['public/**/*.html'],
  images: ['public/images/**/*.*']
};

gulp.task('build-js', () => {
  gulp.src(paths.app_JS)
    .pipe(sourcemaps.init())
    .pipe(print())
    .pipe(babel({ presets: ['es2015'] }))
    .pipe(concat('bundle.js'))
    .pipe(sourcemaps.write('./maps'))
    .pipe(gulp.dest('./dist'));
});

gulp.task('build-css', () => {
  gulp.src(paths.app_CSS)
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(cachebust.resources())
    .pipe(concat('styles.css'))
    .pipe(sourcemaps.write('./maps'))
    .pipe(gulp.dest('./dist'));
});

gulp.task('build-fonts', () => {
    gulp.src(paths.app_FONTS)
        .pipe(gulp.dest('./dist/webfonts'));
});

gulp.task('build-html', () => {
  gulp.src(paths.app_HTML)
    .pipe(cachebust.references())
    .pipe(gulp.dest('./dist'));
});

gulp.task('copy-images', () => {
  gulp.src(paths.images)
    .pipe(gulp.dest('./dist/images'));
});

gulp.task('watch', () => {
  gulp.watch(paths.app_JS, ['build-js']);
  gulp.watch(paths.app_CSS, ['build-css']);
  gulp.watch(paths.app_HTML, ['build-html']);
  gulp.watch(paths.images, ['copy-images']);
  gulp.watch(paths.app_FONTS, ['build-fonts']);
});

gulp.task('default', [
  'build-css',
  'build-js',
  'build-html',
  'copy-images',
  'build-fonts',
  'watch'
]);