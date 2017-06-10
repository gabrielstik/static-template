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

gulp.task('default', ['watch'], () => {})

gulp.task('sass', () => {
  return gulp.src(`${config.src}scss/*.scss`)
  .pipe(gulp_plumber({
    errorHandler: gulp_notify.onError('SASS Erro  <%= error.message %>')
  }))
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

gulp.task('styles', () => {
  return gulp.src(`${config.src}styles/*.css`)
  .pipe(gulp_plumber({errorHandler: gulp_notify.onError('STYLES Erro  <%= error.message %>')}))
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

gulp.task('javascript', () => {
  return gulp.src(`${config.src}js/*.js`)
  .pipe(gulp_plumber({
    errorHandler: gulp_notify.onError("JS Error: <%= error.message %>")}))
  .pipe(gulp_sourcemaps.init())
  .pipe(gulp_uglify())
  .pipe(gulp_concat('main.min.js'))
  .pipe(gulp_sourcemaps.write())
  .pipe(gulp_babel({presets: ['es2015']}))
  .pipe(gulp.dest(`${config.assets}js`))
})

gulp.task('watch', ['sass', 'javascript'], () => {
  gulp.watch(`${config.src}scss/**/*.scss`, ["sass"])
  gulp.watch(`${config.src}js/**/*.js`, ["javascript"])
})
