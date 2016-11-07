'use strict';

var gulp = require('gulp');
var browserSync = require('browser-sync');
var sass = require('gulp-sass');
var inject = require('gulp-inject');
var naturalSort = require('gulp-natural-sort');
var angularFilesort = require('gulp-angular-filesort');
var wiredep = require('wiredep').stream;

var paths = {
  components: ['./src/**/*.js', '!./src/components/app.*.js',],
  js: ['./src/**/*.js'],
  html: ['./src/**/*.html'],
  css: ['./src/css/sass/**/*.sass']
};

gulp.task('browser-sync', function() {
  browserSync.init({
    server: {
      baseDir: "./src",
      routes: {
        "/bower_components": "bower_components"
      }
    }
  });
});

gulp.task('sass', function () {
  return gulp.src(paths.css)
    .pipe(sass())
    .pipe(gulp.dest('./src/css'))
    .pipe(browserSync.reload({stream: true}));
});

gulp.task('watch', ['browser-sync'], function () {
  gulp.watch(paths.css, ['sass']);
  gulp.watch(paths.js).on('change', browserSync.reload);
  gulp.watch(paths.html).on('change', browserSync.reload);
});

// Hieu Pham: auto inject JS files to index.html. Set yourself freeeeee
gulp.task('inject', ['inject-vendor'], function(){
  return gulp.src('./src/index.html')
    .pipe(inject(gulp.src(paths.components, {read: true}).pipe(angularFilesort()), {relative: true}))
    .pipe(naturalSort())
    .pipe(gulp.dest('./src'))
});

gulp.task('inject-vendor', function() {
  return gulp.src('./src/index.html')
    .pipe(wiredep({}))
    .pipe(gulp.dest('./src'));
});

gulp.task('default', ['inject', 'sass', 'browser-sync', 'watch']);
