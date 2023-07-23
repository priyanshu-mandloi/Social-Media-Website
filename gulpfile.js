const gulp = require('gulp');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const uglify = require('gulp-uglify');
// const rename = require('gulp-rename');
const imagemin = require('gulp-imagemin');
const clean = require('gulp-clean');
// const rev = require('gulp-rev');
// const revRewrite = require('gulp-rev-rewrite'); 
// const revDelete = require('gulp-rev-delete-original');

gulp.task('css', () => {
  console.log("compressing css..");
  // Source path for your main CSS file
  const sourcePath = './assets/css/**/*.css';
  // Destination path for processed CSS 
  const destPath = './public/assets';
  return gulp
    .src(sourcePath)
    .pipe(sourcemaps.init())
    .pipe(postcss([autoprefixer()]))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(destPath))
    .pipe(gulp.dest(destPath));
});

// For js we use
gulp.task('js',()=>{
  console.log("compressing Js .. ");
  const sourcePath = './assets/js/**/*.js';
  const destPath = './public/assets/js';
  return gulp
  .src(sourcePath)
  .pipe(uglify())
  .pipe(gulp.dest(destPath));
});

// For images we use
gulp.task('images',()=>{
  console.log('Compressing images..');
  const sourcePath = './assets/images/**/*.+(png|jpg|zip|svg|jpeg)';
  const destPath = './public/assets/images';
  return gulp
  .src(sourcePath)
  .pipe(imagemin())
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









