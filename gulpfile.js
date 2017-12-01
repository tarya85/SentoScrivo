var gulp   = require('gulp'),
concat = require('gulp-concat'),
minifyCSS = require('gulp-minify-css'),
sourcemaps = require('gulp-sourcemaps'),
gutil = require('gulp-util'),
browserSync = require('browser-sync').create(),
uglify = require('gulp-uglify'),
imagemin = require('gulp-imagemin'),
cache = require('gulp-cache'),
del = require('del'),
runSequence = require('run-sequence'),
sass   = require('gulp-sass'),
babel = require('gulp-babel'),
rename = require('gulp-rename');


gulp.task('default', ['watch']);


gulp.task('build-js', function() {
return gulp.src(['source/js/visible.js','source/js/jquery.scrollme.min.js','source/js/custom.js'])
  .pipe(sourcemaps.init())
  .pipe(babel({
        presets: ['env']
    }))
    /*.pipe(concat('bundle.min.js'))
    .pipe(config.production === 'production' ? uglify() : gutil.noop())
  .pipe(sourcemaps.write('/'))
  .pipe(gulp.dest('public/js'));*/

  .pipe(concat('bundle.js'))
  .pipe(gulp.dest('public/js'))
  .pipe(rename('bundle.min.js'))
  .pipe(uglify())
  .pipe(sourcemaps.write('/'))
  .pipe(gulp.dest('public/js'));
});


gulp.task('copy-html', function() {
return gulp.src('source/*.html')
.pipe(gulp.dest('public'))
.pipe(browserSync.stream());
});



gulp.task('ie-styles', function() {
return gulp.src('source/scss/ie.scss')
.pipe(sass({outputStyle: 'compressed'}))
.pipe(gulp.dest('public/css/'))
.pipe(browserSync.stream());
});


gulp.task('copy-favicon', function() {
gulp.src('source/favicon.ico').pipe(gulp.dest('public'));
});

gulp.task('images', function(){
return gulp.src('source/images/**/*.+(png|jpg|gif|svg)')
.pipe(cache(imagemin({
    interlaced: true
  })))
.pipe(gulp.dest('public/images'))
});

gulp.task('fonts', function() {
return gulp.src('source/fonts/**/*')
.pipe(gulp.dest('public/fonts'))
})



gulp.task('run-sass', function(){
return gulp.src(['source/scss/**/*.scss','!source/scss/ie.scss'])
  .pipe(sourcemaps.init())
  /*.pipe(config.production === 'production' ? sass({outputStyle: 'compressed'}) : sass({outputStyle: 'compact'}))
  .pipe(sourcemaps.write('/'))
  .pipe(gulp.dest('public/css'))
  .pipe(browserSync.reload({
    stream: true
  }))*/
  .pipe(sass({outputStyle: 'compact'}))
  .pipe(gulp.dest('public/css'))
  .pipe(rename('main.min.css'))
  .pipe(sass({outputStyle: 'compressed'}))
  .pipe(sourcemaps.write('/'))
  .pipe(gulp.dest('public/css'))
  .pipe(browserSync.stream());
});


gulp.task('browserSync', function() {
browserSync.init({
  server: {
    baseDir: 'public'
  },
})
})

gulp.task('clean', function() {
return del.sync('public');
})


gulp.task('build', function () {
runSequence('clean',
  ['run-sass','build-js', 'images', 'fonts','copy-html','copy-favicon','ie-styles']
)
})

gulp.task('watch', ['run-sass','build-js','browserSync'], function() {
  gulp.watch(['source/scss/**/*.scss','!source/scss/ie.scss'], ['run-sass']);
  gulp.watch('source/scss/ie.scss', ['ie-styles']);
  gulp.watch('source/js/*.js', ['build-js']);
  gulp.watch('source/*.html', ['copy-html']);
  gulp.watch('source/js/**/*.js',browserSync.reload);
});