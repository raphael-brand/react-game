var gulp = require('gulp')
var sass = require('gulp-sass');

gulp.task('sass', function () {
  return gulp.src([
    './src/app/sass/*.sass'])
    .pipe(sass()).on('error', sass.logError)
    .pipe(gulp.dest('./public'))
});

gulp.task('watch', gulp.series(function() {    
    var css = gulp.watch('./src/app/sass/*.sass', gulp.parallel('sass'));
    css.on('change', (path, stats) => {
        console.log(`${path}/*.sass changed`)
    })
}));

gulp.task('default', gulp.parallel('watch'));

