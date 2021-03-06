const themename = 'humescores';

const gulp = require('gulp');
	// Prepare and optimize code etc
const	autoprefixer = require('autoprefixer');
const	browserSync = require('browser-sync').create();
const	image = require('gulp-image');
const	jshint = require('gulp-jshint');
const	postcss = require('gulp-postcss');
const	sass = require('gulp-sass');
const	sourcemaps = require('gulp-sourcemaps');

	// Only work with new or updated files
const	newer = require('gulp-newer');
	
		// Name of working theme folder
const root = '../' + themename + '/';
const		scss = root + 'sass/';
const		js = root + 'js/';
const		img = root + 'images/';




// CSS via Sass and Autoprefixer
gulp.task('css', function() {
	return gulp.src( scss + '{style.scss,rtl.scss}')
	.pipe(sourcemaps.init())
	.pipe(sass({
		outputStyle: 'expanded', 
		indentType: 'tab',
		indentWidth: '1'
	}).on('error', sass.logError))
	.pipe(postcss([
		autoprefixer('last 2 versions', '> 1%')
	]))
	.pipe(sourcemaps.write( scss + 'maps'))
	.pipe(gulp.dest(root));
});

//Optimize images through gulp-image
gulp.task('images', function() {
	return gulp.src(img + 'RAW/**/*.{jpg,JPG,png}')
	.pipe(newer(img))
	.pipe(image())
	.pipe(gulp.dest(img));
});

// JavaScript
gulp.task('javascript', function() {
	return gulp.src([js + '*.js'])
	.pipe(jshint())
	.pipe(jshint.reporter('default'))
	.pipe(gulp.dest(js));
});


// Watch everything
gulp.task('watch', function() {
	browserSync.init({ 
		open: 'external',
		proxy: 'localhost/wordpress'
		// port: 8080
		
	});
	gulp.watch([root + '**/*.css', root + '**/*.scss' ], ['css']).on('change', browserSync.reload);
	gulp.watch(js + '**/*.js', ['javascript']).on('change', browserSync.reload);
	gulp.watch(img + 'RAW/**/*.{jpg,JPG,png}', ['images']).on('change', browserSync.reload);

});



// Default task (runs at initiation: gulp --verbose)
gulp.task('default', ['css','javascript','images','watch']);
