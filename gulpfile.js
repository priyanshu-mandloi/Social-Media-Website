const gulp = require('gulp');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const rename = require('gulp-rename');

// Define the CSS processing task
gulp.task('css', () => {
  // Source path for your main CSS file
  const sourcePath = './assets/css/**/*.css';

  // Destination path for processed CSS
  const destPath = './public/assets/css';

  return gulp
    .src(sourcePath)
    .pipe(sourcemaps.init())
    .pipe(postcss([autoprefixer()]))
    .pipe(sourcemaps.write('.'))
    // .pipe(rename('style.css')) // Optionally, you can rename the output file
    .pipe(gulp.dest(destPath));
});

// Watch task to automatically process CSS whenever changes are made
gulp.task('watch', () => {
  gulp.watch('./assets/css/**/*.css', gulp.series('css'));
});

// Default task to run all tasks
gulp.task('default', gulp.series('css', 'watch'));





