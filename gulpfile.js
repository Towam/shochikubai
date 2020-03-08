'use strict'

const gulp = require('gulp');
const sass = require('gulp-sass');
const cleanCSS = require('gulp-clean-css');
const sourceMaps = require('gulp-sourcemaps');
const browserSync = require('browser-sync').create();

function style() {
    return gulp.src('app/src/scss/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(cleanCSS({ debug: true }, (details) => {
            console.log(`${details.name}: ${details.stats.originalSize}`);
            console.log(`${details.name}: ${details.stats.minifiedSize}`);
        }))
        .pipe(sourceMaps.write())
        .pipe(gulp.dest('app/dist/css'))
        .pipe(browserSync.stream())
};

function watch() {
    browserSync.init({
        server: {
            baseDir: "./app",
            index: "/index.html"
        }
    });
    gulp.watch('./app/src/**/*.scss', style)
    gulp.watch('./app/*.html').on('change', browserSync.reload);
    gulp.watch('./app/src/**/*.js').on('change', browserSync.reload);
}

exports.style = style;
exports.watch = watch;