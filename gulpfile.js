const gulp = require('gulp');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const uglify = require('gulp-uglify');
const imagemin = require('gulp-imagemin');
const clean = require('gulp-clean');
const revHash = require('gulp-rev-hash'); // New: import gulp-rev-hash

gulp.task('css', () => {
  console.log("compressing css..");
  // Source path for your main CSS file
  const sourcePath = './assets/css/**/*.css';
  // Destination path for processed CSS 
  const destPath = './public/assets/css';

  return gulp.src(sourcePath)
    .pipe(sourcemaps.init())
    .pipe(postcss([autoprefixer()]))
    .pipe(sourcemaps.write('.'))
    .pipe(revHash()) // Append revision hashes to CSS file references
    .pipe(gulp.dest(destPath));
});

// For js we use
gulp.task('js', () => {
  console.log("compressing Js .. ");
  const sourcePath = './assets/js/**/*.js';
  const destPath = './public/assets/js';
  return gulp
    .src(sourcePath)
    .pipe(uglify())
    .pipe(revHash()) // Append revision hashes to JS file references
    .pipe(gulp.dest(destPath));
});

// For images we use
gulp.task('images', () => {
  console.log('Compressing images..');
  const sourcePath = './assets/images/**/*.+(png|jpg|zip|svg|jpeg)';
  const destPath = './public/assets/images';
  return gulp
    .src(sourcePath)
    .pipe(imagemin())
    .pipe(revHash()) // Append revision hashes to image file references
    .pipe(gulp.dest(destPath));
});

gulp.task('clean:assets', function () {
  console.log('Cleaning assets folder...');
  return gulp.src('./public/assets', { read: false, allowEmpty: true })
    .pipe(clean());
});

// Watch task to automatically process CSS whenever changes are made
gulp.task('watch', () => {
  gulp.watch('./assets/css/**/*.css', gulp.series('css'));
  gulp.watch('./assets/js/**/*.js', gulp.series('js'));
  gulp.watch('./assets/images/**/*.+(png|jpg|zip|svg|jpeg)', gulp.series('images'));
});

// Default task to run all tasks
gulp.task('default', gulp.series('clean:assets', gulp.parallel('css', 'js', 'images', 'watch')));
