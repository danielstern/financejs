const gulp = require(`gulp`);
const babelify = require('babelify');
const browserify = require('browserify');
const source = require('vinyl-source-stream');


gulp.task('bundle',function(){
	return browserify({
		entries:'./src/finance.js',
		debug:true,
	})
	.transform(babelify.configure({
		// sourceMaps:true,
    global:true,
		presets: ['es2015']
	}))
	.bundle()
	.pipe(source('finance.js'))
	.pipe(gulp.dest('./'));
});
