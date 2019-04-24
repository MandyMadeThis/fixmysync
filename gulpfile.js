var gulp = require('gulp'),
    plumber = require('gulp-plumber'),
    rename = require('gulp-rename'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync');

gulp.task('browser-sync', function() {
    browserSync.init({
        proxy: "http://fixmysync.test"
    });
});

gulp.task('bs-reload', function () {
  browserSync.reload();
});


gulp.task('styles', function(){
  gulp.src(['./scss/style.scss'])
    .pipe(plumber({
      errorHandler: function (error) {
        console.log(error.message);
        this.emit('end');
    }}))
    .pipe(sass())
    .pipe(autoprefixer('last 4 versions'))
    .pipe(gulp.dest('./css/'))
    .pipe(rename({suffix: '.min'}))
    .pipe(minifycss())
    .pipe(gulp.dest('./css/'))
    .pipe(browserSync.reload({stream:true}))
});


gulp.task('default', ['browser-sync'], function(){
  gulp.watch("./scss/**/*.scss", ['styles']);
  gulp.watch("./js/**/*.js", ['bs-reload']);
  gulp.watch("./*.html", ['bs-reload']);
});