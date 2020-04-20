var gulp = require('gulp')
var sass = require('gulp-sass');
var concatCSS = require('gulp-concat-css');
gulp.task('sass', function () {
    const autoprefixer = require('autoprefixer')
    const sourcemaps = require('gulp-sourcemaps')
    const postcss = require('gulp-postcss')

    return gulp.src([
    './src/app/sass/*.sass'])
    .pipe(sass()).on('error', sass.logError)
    .pipe(concatCSS('main.css'))
    .pipe(sourcemaps.init())
    .pipe(postcss([ autoprefixer() ]))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./public/'))

});

gulp.task('watch', gulp.series(function() {    
    var css = gulp.watch('./src/app/sass/*.sass', gulp.parallel('sass'));
    css.on('change', (path, stats) => {
        console.log(`${path}/*.sass changed`)
    })
}));

gulp.task('default', gulp.parallel('watch'));

