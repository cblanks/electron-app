const gulp = require('gulp');

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
