const gulp = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();



gulp.task('sass', function() {
	return gulp.src('sass/**/*.scss')
		.pipe(sass({
			outputstyle: 'compressed'
		})
		.on('error', sass.logError))
		.pipe(gulp.dest('./'))
});

gulp.task('watch', function(){
	browserSync.init({ 
		open: 'external',
		proxy: 'localhost/wordpress/final-word',
		port: 8080
	});
	gulp.watch('sass/**/*.scss', ['sass']).on('change', browserSync.reload);
});

gulp.task('default', ['watch','sass'])