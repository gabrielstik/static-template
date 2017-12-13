const gulp = require('gulp'),
	gulp_rename = require('gulp-rename'),
	gulp_rm = require('gulp-rm'),
	gulp_plumber = require ('gulp-plumber'),
	gulp_sourcemaps = require ('gulp-sourcemaps'),
	gulp_notify = require('gulp-notify'),
	// index 
	gulp_pug = require('gulp-pug'),
	// CSS/SCSS dependencies
	gulp_autoprefixer = require ('gulp-autoprefixer'),
	gulp_sass = require('gulp-sass'),
	gulp_responsive = require('gulp-responsive'),
	// JS/ES6 dependencies
	gulp_uglify = require('gulp-uglify'),
	gulp_concat = require('gulp-concat'),
	gulp_babel = require('gulp-babel'),
	// Images
	gulp_imagemin = require('gulp-imagemin')

const config = {
	dist: 'dist/',
	src : 'src/',
	assets: 'dist/assets/'
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

// Concat, minify & babel
gulp.task('scripts', () => {
	return gulp.src(`${config.src}scripts/app.js`)
		.pipe(gulp_sourcemaps.init())  
		.pipe(gulp_plumber({ errorHandler: gulp_notify.onError('Scripts error: <%= error.message %>') }))  
		.pipe(gulp_concat('main.min.js'))  
		.pipe(gulp_babel({presets: ['babel-preset-es2015'].map(require.resolve)}))
		.pipe(gulp_uglify())  
		.pipe(gulp_sourcemaps.write())  
		.pipe(gulp.dest(`${config.assets}js`))
})

gulp.task('index', () => {
	gulp
		.src(`${config.src}index.pug`)
		.pipe(gulp_plumber({errorHandler: gulp_notify.onError('Pug error:  <%= error.message %>')}))
		.pipe(gulp_pug())
		.pipe(gulp.dest(`${config.dist}`))  
})

gulp.task('views', () => {
	gulp
		.src(`${config.src}views/*.pug`)
		.pipe(gulp_plumber({errorHandler: gulp_notify.onError('Pug error:  <%= error.message %>')}))
		.pipe(gulp_pug())
		.pipe(gulp.dest(`${config.dist}views`))  
})

gulp.task('fonts', () => {
	gulp
		.src(`${config.src}fonts/*`)
		.pipe(gulp_plumber({errorHandler: gulp_notify.onError('Fonts error:  <%= error.message %>')}))
		.pipe(gulp.dest(`${config.assets}fonts`))
})

gulp.task('images', () => {
	gulp
		.src(`${config.src}images/*`)
		.pipe(gulp_plumber({errorHandler: gulp_notify.onError('Image error:  <%= error.message %>')}))
		.pipe(gulp_imagemin([
			gulp_imagemin.gifsicle({interlaced: true}),
			gulp_imagemin.jpegtran({progressive: true}),
			gulp_imagemin.optipng({optimizationLevel: 5}),
			gulp_imagemin.svgo({
				plugins: [
					{removeViewBox: true},
					{cleanupIDs: false}
				]
			})
		], {
			verbose: true
		}))
		.pipe(gulp.dest(`${config.assets}images/src`)) 
})

// Manual function
gulp.task('clean', () => {
	return gulp.src(`${config.dist}**/*`, { read: false })
		.pipe(gulp_rm())
})

gulp.task('srcset', () => {
	return gulp.src(`${config.assets}images/src/*`)
		.pipe(gulp_plumber({errorHandler: gulp_notify.onError('Srcset error:  <%= error.message %>')}))	
		.pipe(gulp_responsive({
			'*': [
				{ width: 340, rename: { suffix: '@340' }, },
				{ width: 560, rename: { suffix: '@560' }, },
				{ width: 720, rename: { suffix: '@72w' }, },
				{ width: 1280, rename: { suffix: '@1280' }, },
				{ width: 1920, rename: { suffix: '@1920' }, },
				{ rename: { suffix: '-full' }, }], 
		}, {
			quality: 70,
			progressive: true,
			withMetadata: false,
		}))
		.pipe(gulp.dest(`${config.assets}images`))
})

// Wath changes
gulp.task('watch', ['index', 'styles', 'scripts', 'images', 'fonts'], () => {
	gulp.watch(`${config.src}index.pug`, ['index'])
	gulp.watch(`${config.src}views/**/*.pug`, ['views'])
	gulp.watch(`${config.src}styles/**/*.scss`, ['styles'])
	gulp.watch(`${config.src}scripts/**/*.js`, ['scripts'])
	gulp.watch(`${config.src}images/**/*`, ['images'])
	gulp.watch(`${config.src}fonts/*`, ['fonts'])
})
