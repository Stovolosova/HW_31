const { src, dest, watch, series, parallel } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const sourcemaps = require('gulp-sourcemaps');
const rename = require('gulp-rename');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
const browserSync = require('browser-sync').create();

function stylesTask() {
    return src('src/sass/**/*.scss')
           .pipe(sourcemaps.init())
           .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
           .pipe(rename({suffix: '.min'}))
           .pipe(sourcemaps.write('.'))
           .pipe(dest('dist/css/'));
}

function JSTask() {
    return src('src/js/*.js')
        .pipe(uglify())
        .pipe(concat('main.js'))
        .pipe(rename({suffix: '.min'}))
        .pipe(dest('dist/js/'));
}

function watchTask() {
    watch('src/**/*.scss', series(stylesTask, browserSyncReload));
    watch('src/**/*.js', series(JSTask, browserSyncReload));
}

function browserSyncReload(cb) {
    browserSync.reload();
    cb();
}

exports.watchTask = watchTask;
exports.JSTask = JSTask;
exports.stylesTask = stylesTask;