var gulp = require('gulp');

module.exports = function(options){
	gulp.task('bake', function (done) {
		setTimeout(function(){
			done();
		},options.delay);
	});

	gulp.task('cream', function (done) {
		setTimeout(function(){
			done();
		},options.delay);
	});
}
