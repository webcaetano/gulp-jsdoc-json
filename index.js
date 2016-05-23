var through = require('through2');
var fs = require('fs');
var jsdoc = require("jsdoc-api");
var gutil = require('gulp-util');
var path = require('path');
var File = require('vinyl');

var utils = {
	extend:function(destObj) {
		for (var i = 1; i < arguments.length; i++) for (var key in arguments[i]) destObj[key] = arguments[i][key];
		return destObj;
	}
};

var defaults = {
	output:'data.json'
}

var self = function(options){
	options = utils.extend({},defaults,options);


	var fileList = [];

	return through.obj(function (file, enc, callback) {
		// get all Files list
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
		var file = new File({
			path:options.output,
			contents: new Buffer(JSON.stringify(jsdoc.explainSync({ files: fileList }),null,2))
		});

		this.push(file);

		callback();
	});
}

module.exports = self;
