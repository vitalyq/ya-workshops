const gulp = require('gulp');
const babel = require('gulp-babel');
const postcss = require('gulp-postcss');
const eslint = require('gulp-eslint');
const stylelint = require('gulp-stylelint');
const inject = require('gulp-inject');

const onFilesChange = (event) => {
  // eslint-disable-next-line no-console
  console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
};

gulp.task('js', () => {
  return gulp.src('src/*.js')
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError())
    .pipe(babel())
    .pipe(gulp.dest('dist'));
});

gulp.task('css', () => {
  return gulp.src('src/*.css')
    .pipe(stylelint({
      reporters: [
        { formatter: 'string', console: true }
      ]
    }))
    .pipe(postcss())
    .pipe(gulp.dest('dist'));
});

// Use as the last build step
gulp.task('index', ['js', 'css'], () => {
  const target = gulp.src('./src/index.html');
  const sources = gulp.src(['./dist/**/*.js', './dist/**/*.css'], { read: false });
  const options = {
    ignorePath: 'dist',
    addRootSlash: false
  };

  return target.pipe(inject(sources, options))
    .pipe(gulp.dest('dist'));
});

gulp.task('watch', () => {
  gulp.watch('src/*.js', ['js']).on('change', (event) => onFilesChange(event));
  gulp.watch('src/*.css', ['css']).on('change', (event) => onFilesChange(event));
  gulp.watch('src/index.html', ['index']).on('change', (event) => onFilesChange(event));
});

gulp.task('default', ['js', 'css', 'index', 'watch']);
