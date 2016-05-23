'use strict';

var gulp = require('gulp');
var _ = require('lodash');
var fs = require('fs');
var jsdoc = require("jsdoc-api");
var gutil = require('gulp-util');
var through = require('through2');
var path = require('path');
var File = require('vinyl');

var wrench = require('wrench');

var options = {
	src: 'src',
	dist: 'dist',
	delay: 500,
	tmp: '.tmp'
};

wrench.readdirSyncRecursive('./gulp').filter(function(file) {
	return (/\.(js|coffee)$/i).test(file);
}).map(function(file) {
	require('./gulp/' + file)(options);
});

var eat = function eat(a,done,c,d){
	console.log(a,done,c,d)
	setTimeout(function(){
		done();
	},1000)
}

var testFunc = function(arg){
	console.log(arg);
	return function testFunc(done){
		setTimeout(function(){
			done();
		},1000);
	}
}

gulp.task('doc', function (done) {
	// console.log(jsdoc.explainSync({
	// 	files:[
	// 		'index.js',
	// 		'minus.js'
	// 	]
	// }))
	//

	// options = options || {};

  	var fileList = [];

	var openStreams = [];
	return gulp.src([
		'index.js',
		'minus.js'
	])
	.pipe(through.obj(function (file, enc, callback) {

    	console.log(jsdoc.explainSync({source:String(file.contents)}))
		if (file.isNull()) {
			cb(null, file);
			return;
		}

		if (file.isStream()) {
			cb(new gutil.PluginError(pkg.name, 'Streams not supported'));
			return;
		}

		var filePath;
		if (options.absolute) {
			filePath = path.normalize(file.path);
		} else if (options.flatten) {
			filePath = path.basename(file.path);
		} else {
			filePath = path.relative(file.cwd, file.path);
		}

		if (options.removeExtensions) {
			var extension = path.extname(filePath);
			if (extension.length) {
				filePath = filePath.slice(0, -extension.length);
			}
		}

		filePath = filePath.replace(/\\/g, '/');
		fileList.push(filePath);

    	callback();
    },function(callback){
    	console.log(fileList)
    	console.log(jsdoc.explainSync({ files: fileList }))
    	var file = new File({
    		path:'data.json',
			contents: new Buffer(JSON.stringify(jsdoc.explainSync({ files: fileList }),null,2))
		});

		this.push(file);

    	callback();
    }))
    .pipe(through.obj(function (file, enc, callback) {
    	callback(null,file);
    }))
    .pipe(gulp.dest('docs/'));
});


gulp.task('default', gulp.series('egg','milk',gulp.parallel('bake','cream'),eat,testFunc('lol')), function (done) {
	console.log('gulp')
	done();
});


var a = function(x=3){
	return x;
}

console.log(`test: `+a(12))
