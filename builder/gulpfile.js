const gulp = require('gulp'),
  gulp_rename = require('gulp-rename'),
  gulp_plumber = require ('gulp-plumber'),
  gulp_sourcemaps = require ('gulp-sourcemaps'),
  gulp_notify = require('gulp-notify'),
  // CSS/SCSS dependencies
  gulp_cssnano = require('gulp-cssnano'),
  gulp_autoprefixer = require ('gulp-autoprefixer'),
  gulp_sass = require('gulp-sass'),
  // JS/ES6 dependencies
  gulp_uglify = require('gulp-uglify'),
  gulp_concat = require('gulp-concat'),
  gulp_babel = require('gulp-babel')

const config = {
  dist: '../dist/',
  src : '../src/',
  assets: '../dist/assets/'
}

// Watch by default
gulp.task('default', ['watch'], () => {})

// SASS to SCSS, compress & prefix styles
gulp.task('styles', () => {
  return gulp.src(`${config.src}styles/*.scss`)
  .pipe(gulp_plumber({errorHandler: gulp_notify.onError('Styles error:  <%= error.message %>')}))
  .pipe(gulp_sourcemaps.init())
  .pipe(gulp_sass({
    outputStyle: 'compressed'}).on('error', gulp_sass.logError))
  .pipe(gulp_sourcemaps.write())
  .pipe(gulp_autoprefixer({
    browsers: ['last 2 versions'],
    cascade: false
  }))
  .pipe(gulp_rename('style.min.css'))
  .pipe(gulp.dest(`${config.assets}css`))
})

// Concat, minify & babel (ES6 to ES5)
gulp.task('scripts', () => {
  return gulp.src(`${config.src}scripts/*.js`)
  .pipe(gulp_plumber({errorHandler: gulp_notify.onError("Scripts error: <%= error.message %>")}))
  .pipe(gulp_sourcemaps.init())
  .pipe(gulp_concat('main.min.js'))
  .pipe(gulp_sourcemaps.write())
  .pipe(gulp_babel({presets: ['es2015']}))
  .pipe(gulp_uglify())
  .pipe(gulp.dest(`${config.assets}js`))
})

// Minify css libraries
gulp.task('libraries', () => {
  return gulp.src(`${config.src}styles/libraries/*.css`)
  .pipe(gulp_plumber({errorHandler: gulp_notify.onError('Libraries error  <%= error.message %>')}))
  .pipe(gulp_sourcemaps.init())
  .pipe(gulp_cssnano())
  .pipe(gulp_sourcemaps.write())
  .pipe(gulp_autoprefixer({
    browsers: ['last 2 versions'],
    cascade: false
  }))
  .pipe(gulp_rename('library.min.css'))
  .pipe(gulp.dest(`${config.assets}css`))
})

// Wath changes
gulp.task('watch', ['styles', 'scripts', 'libraries'], () => {
  gulp.watch(`${config.src}styles/**/*.scss`, ["styles"])
  gulp.watch(`${config.src}scripts/**/*.js`, ["scripts"])
})
