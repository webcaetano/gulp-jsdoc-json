var expect = require('chai').expect;
var jsdocJson = require('./');
var _ = require('lodash');
var gulp = require('gulp');
var fs = require('fs');
var path = require('path');
var through = require('through2');


describe('gulp-jsdoc-json', function() {
	var timeout = 3000;
	var outputFile = 'docs/data.json'

	it('should create data.json file', function(done) {
		this.timeout(timeout);

		return gulp.src('test/*.js')
		.pipe(jsdocJson({
			output:'data.json'
		}))
		.pipe(gulp.dest('./docs'))
		.pipe(through.obj(function (file, enc, callback) {
			expect(fs.readFileSync(outputFile)).to.not.be.null;
			done();
		}));
	});

	it('should have an package on the collection', function(done) {
		this.timeout(timeout);

		var collection = JSON.parse(fs.readFileSync(outputFile));
		var pkg = _.find(collection,function(val,i){
			return val.kind=='package';
		})
		expect(pkg).to.not.be.null;

		fs.unlinkSync(outputFile);
		done();
	});
})
