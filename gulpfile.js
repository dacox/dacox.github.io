/* include gulp */
var gulp = require('gulp');

/* include plugins */
var cp = require('child_process'),
  concat = require('gulp-concat'),
  connect = require('gulp-connect'),
  gzip = require('gulp-gzip'),
  //minifycss = require('gulp-minify-css'),
  //injectreload = require('gulp-inject-reload'),
  //inlinesource = require('gulp-inline-source'),
  //jshint = require('gulp-jshint'),
  //less = require('gulp-less'),
  //livereload = require('gulp-livereload'),
  //minifyhtml = require('gulp-minify-html'),
  os = require('os'),
  rename = require('gulp-rename'),
  //sass = require('gulp-sass'),
  uglify = require('gulp-uglify');
  //uncss = require('gulp-uncss'),
  //zopfli = require('gulp-zopfli'),
  //es = require('event-stream');

gulp.task('connect', function() {
  connect.server({
  root: '_site',
  port: 8000
  });
});

gulp.task('jekyll', function(done) {
  return cp.spawn('bundle', ['exec', 'jekyll', 'build', '-q', '--config=_config.yml'], { stdio: 'inherit' })
    .on('close', done);
});

gulp.task('js', function() {
  return gulp.src(['bower_components/jquery/dist/jquery.js',
            'bower_components/jquery.fitvids/jquery.fitvids.js',
            'bower_components/modernizr/modernizr.js'])
    .pipe(concat('all.js'))
    .pipe(gulp.dest('_site/js'))
    .pipe(rename('all.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('_site/js'))
    .pipe(gzip({append:true,threshold:false,gzipOptions:{level:9,memLevel:1}}))
    .pipe(rename('all.min.jsz'))
    .pipe(gulp.dest('_site/js'));
});

gulp.task('default', ['jekyll', 'js']);

