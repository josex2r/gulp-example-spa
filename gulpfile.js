// Load plugins
const gulp = require('gulp');

// Lint javascript
gulp.task('lint', () => {
  // @TODO
});

// Public assets
gulp.task('public', () => {
  // @TODO
});

// Styles
gulp.task('styles', () => {
  // @TODO
});

// Vendor
gulp.task('vendor', () => {
  // @TODO
});

// Scripts
gulp.task('scripts', ['lint'], () => {
  // @TODO
});

// Images
gulp.task('images', () => {
  // @TODO
});

// Clean
gulp.task('clean', () => {
  // @TODO
});

// Build App
gulp.task('build', ['clean'], (callback) => {
  // @TODO
});

// Default task
gulp.task('default', ['build']);

// Watch
gulp.task('server', ['build'], () => {
  // @TODO
});
