var gulp = require('gulp'),
	sass = require('gulp-sass'),
	autoprefixer = require('gulp-autoprefixer'),
	minifyCss = require('gulp-minify-css'),
	plumber = require('gulp-plumber'),
	browserSync = require('browser-sync').create(),
	reload = browserSync.reload;

gulp.task('browser-sync', ['compile-scss'], function(){
	browserSync.init({
		server: './'
	});

	gulp.watch('./css/scss/*.scss', ['compile-scss']);
	gulp.watch('./**/*.html').on('change', reload);
	gulp.watch('./**/*.js').on('change', reload);
});

gulp.task('compile-scss', function(){
	gulp.src('./css/scss/*.scss')
	.pipe(plumber())
	.pipe(sass({
		errLogToConsole: true
	}))
	.pipe(autoprefixer({
		browsers: ['last 2 versions']
	}))
	//.pipe(minifyCss())
	.pipe(gulp.dest('./css'))
	.pipe(reload({
		stream: true
	}));
});

gulp.task('default', ['browser-sync']);
