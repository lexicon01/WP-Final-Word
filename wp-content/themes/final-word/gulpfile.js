const gulp = require('gulp');
const sass = require('gulp-sass');


gulp.task('sass', function() {
	return gulp.src('sass/**/*.scss')
		.pipe(sass({
			outputstyle: 'compressed'
		})
		.on('error', sass.logError))
		.pipe(gulp.dest('./'))
});

gulp.task('watch', function(){
	gulp.watch('sass/**/*.scss', ['sass']);
});

gulp.task('default', ['watch'])