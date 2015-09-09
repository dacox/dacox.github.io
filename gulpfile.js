/* include gulp */
var gulp = require('gulp');

/* include plugins */
var cp = require('child_process');

gulp.task('jekyll', function(done) {
	return cp.spawn('bundle', ['exec', 'jekyll', 'build', '-q', '--source=.', '--destination=_build', '--config=_config.yml'], { stdio: 'inherit' })
		.on('close', done);
});
