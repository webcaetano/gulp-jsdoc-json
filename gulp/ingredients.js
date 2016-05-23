var gulp = require('gulp');

module.exports = function(options){
	gulp.task('egg', function (done) {
		setTimeout(function(){
			done();
		},options.delay);
	});

	gulp.task('milk', function (done) {
		setTimeout(function(){
			done();
		},options.delay);
	});
}
