// Load plugins
const gulp = require('gulp');
const babel = require('gulp-babel');
const browserify = require('browserify');
const buffer = require('vinyl-buffer');
const babelify = require('babelify');
const connect = require('gulp-connect');
const source = require('vinyl-source-stream');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const cleanCss = require('gulp-clean-css');
const eslint = require('gulp-eslint');
const uglify = require('gulp-uglify');
const imagemin = require('gulp-imagemin');
const rename = require('gulp-rename');
const clean = require('gulp-clean');
const cache = require('gulp-cache');
const concat = require('gulp-concat');
const runSequence = require('run-sequence');
const open = require('open');

// Lint javascript
gulp.task('lint', () => {
  return gulp.src([
      'src/**/*.js'
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
gulp.task('styles', () => {
  return gulp.src([
    'src/styles/index.scss'
    ])
    .pipe(sass().on('error', sass.logError))
    .pipe(rename({
      basename: 'app'
    }))
    .pipe(autoprefixer({
      browsers: ['last 10 versions'],
      cascade: false
    }))
    .pipe(cleanCss({
      compatibility: 'ie8'
    }))
    .pipe(gulp.dest('dist/styles'))
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(connect.reload())
    .pipe(gulp.dest('dist/styles'))
});

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
gulp.task('scripts', ['lint'], () => {
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
    .pipe(rename({
      suffix: '.min'
    }))
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

// Build App
gulp.task('build', ['clean'], (callback) => {
  runSequence(
    ['public', 'vendor', 'images'],
    'styles',
    'scripts',
    callback
  );
});

// Default task
gulp.task('default', ['build']);

// Watch
gulp.task('server', ['build'], () => {
  // Watch .scss files
  gulp.watch('src/styles/**/*.scss', (event) => {
    console.log(`File ${event.path} was ${event.type}, running tasks...`);
    gulp.run('styles');
  });

  // Watch .js files
  gulp.watch('src/**/*.js', (event) => {
    console.log(`File ${event.path} was ${event.type}, running tasks...`);
    gulp.run('scripts');
  });

  // Watch image files
  gulp.watch('src/images/**/*', (event) => {
    console.log(`File ${event.path} was ${event.type}, running tasks...`);
    gulp.run('images');
  });

  // Watch public assets
  gulp.watch('public/**/*', (event) => {
    console.log(`File ${event.path} was ${event.type}, running tasks...`);
    gulp.run('public');
  });

  connect.server({
    root: 'dist',
    livereload: true
  });

  open('http://localhost:8080');
});
