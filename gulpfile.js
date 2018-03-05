// Load plugins
const gulp = require('gulp');
const babel = require('gulp-babel');
const browserify = require('browserify');
const buffer = require('vinyl-buffer');
const babelify = require('babelify');
const connect = require('gulp-connect');
const source = require('vinyl-source-stream');
var autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
    eslint = require('gulp-eslint'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    rename = require('gulp-rename'),
    clean = require('gulp-clean'),
    concat = require('gulp-concat'),
    cache = require('gulp-cache');

// Lint javascript
gulp.task('lint', () => {
  return gulp.src([
      'src/index.js',
      'src/components/**/*.js',
      'src/lib/**/*.js'
    ])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

// Public assets
gulp.task('public', () => {
  return gulp.src([
      'public/**/*'
    ])
    .pipe(connect.reload())
    .pipe(gulp.dest('dist/'));
});

// Styles
gulp.task('styles');


// Vendor
gulp.task('vendor', () => {
  return gulp.src([
      'node_modules/requirejs/require.js'
    ])
    .pipe(concat('vendor.js'))
    .pipe(gulp.dest('dist/scripts'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(uglify())
    .pipe(connect.reload())
    .pipe(gulp.dest('dist/scripts'));
});

// Scripts
gulp.task('scripts', () => {
  return browserify({
      entries: './src/index.js',
      extensions: ['.js'],
      debug: true,
      paths: ['./src/', './node_modules']
    })
    .transform(babelify, {
      presets: ['env', 'react']
    })
    .bundle()
    .pipe(source('app.js'))
    .pipe(buffer())
    .pipe(gulp.dest('dist/scripts'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(uglify())
    .pipe(connect.reload())
    .pipe(gulp.dest('dist/scripts'));
});

// Images
gulp.task('images', () => {
  return gulp.src('src/images/**/*')
    .pipe(cache(imagemin({
        optimizationLevel: 3, 
        progressive: true, 
        interlaced: true
        
    })))
    .pipe(connect.reload())
    .pipe(gulp.dest('dist/images'));
});

// Clean
gulp.task('clean', () => {
  return gulp.src(['dist'], { read: false })
    .pipe(clean());
});

// Default task
gulp.task('default', ['clean'], () => {
    gulp.run('styles', 'scripts', 'images', 'public', 'vendor');
});

// Server task
gulp.task('server', ['default'], () => {
    gulp.run('watch');
});

// Watch
gulp.task('watch', () => {
  connect.server({
    root: 'dist',
    livereload: true
  });

  // Watch .scss files
  gulp.watch('src/styles/**/*.scss', (event) => {
    console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
    gulp.run('styles');
  });

  // Watch .js files
  gulp.watch('src/**/*.js', (event) => {
    console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
    gulp.run('scripts');
  });

  // Watch image files
  gulp.watch('src/images/**/*', (event) => {
    console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
    gulp.run('images');
  });

  // Watch public assets
  gulp.watch('public/**/*', (event) => {
    console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
    gulp.run('public');
  });
});