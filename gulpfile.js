const gulp = require('gulp'),
  gutil = require('gulp-util'),
  sass = require('gulp-ruby-sass'),
  jshint = require('gulp-jshint');

// Create an electron-connect server to enable reloading
const electron = require('electron-connect').server.create();

gulp.task('start', () => {

  electron.start();

  // JavaScript components require a restart
  gulp.watch([
    'main.js',
    'server/*.js'
  ], electron.restart);

  // Other components require a reload
  gulp.watch([
    'client/**/*.js',
    'client/**/*.css',
    'index.html'
  ], electron.reload);

});

gulp.task('sass', function() {
  gutil.log('Some SASS changed!!!');
  return gulp.src('client/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('client'));
});

gulp.task('jshint', function() {
  gutil.log('Some JS changed!!!');
  return gulp.src('client/**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
});

// configure which files to watch and what tasks to use on file changes
gulp.task('watch', function() {
  gulp.watch('client/**/*.js', ['jshint']);
  gulp.watch('client/**/*.scss', ['sass']);
});
