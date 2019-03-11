const gulp = require('gulp');
const less = require('gulp-less');
const minifyCSS = require('gulp-minify-css');
const concat = require('gulp-concat');
const browserSync = require('browser-sync').create();
const reload = browserSync.reload;

gulp.task('compile-less', function () {
    gulp.src('./src/main.less')
        .pipe(less())
        .pipe(minifyCSS({}))
        .pipe(concat("framework.min.css"))
        .pipe(gulp.dest('./dist/'));
});

gulp.task('watch-stuff', function () {
    gulp.watch('./src/**/*.less', ['compile-less']);
    gulp.watch("./src/*.less").on("change", reload);
    gulp.watch("./*.html").on("change", reload);
});

gulp.task('serve', function () {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
});

gulp.task('default', ['compile-less', 'watch-stuff', 'serve']);