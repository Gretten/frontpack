const { src, dest, watch, series, parallel } = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const notify = require('gulp-notify');
const clean = require('gulp-clean-css');
const brSync = require('browser-sync').create();


const sassTask = () => {
    return src('src/scss/*.scss')
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(clean({
            level: 2
        }))
        .on("error", notify.onError("Error: <%= error.message %>"))
        .pipe(dest('dest/css'))
        .pipe(brSync.stream());
}

const htmlTask = () => {
    return src('src/*.html')
        .on("error", notify.onError("Error: <%= error.message %>"))
        .pipe(dest('dest'))
        .pipe(brSync.stream());
}

const sync = () => {
    brSync.init({
        server: {
            baseDir: 'dest/'
        }
    })

    watch('src/**/*.scss', sassTask);
    watch('src/*.html', htmlTask)
}

exports.default = series(
    sassTask, sync
)

//npm i --save-dev gulp-clean-css