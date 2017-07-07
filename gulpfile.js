const gulp = require('gulp'),
  gutil = require('gulp-util'),
  sass = require('gulp-ruby-sass');

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

gulp.task('sass', () => {

  gulp.watch('client/**/*.scss', () => {
    gutil.log('Something changed!!!');

  	sass('client/index.scss')
  		.on('error', sass.logError)
  		.pipe(gulp.dest('client'));

  });
});
