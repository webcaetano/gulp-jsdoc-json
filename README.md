# gulp-jsdoc-json [![npm][npm-img]][npm-url] [![travis][travis-img]][travis-url]

[npm-img]: https://img.shields.io/npm/v/gulp-jsdoc-json.svg?style=flat-square
[npm-url]: https://npmjs.org/package/gulp-jsdoc-json
[travis-img]: https://img.shields.io/travis/webcaetano/gulp-jsdoc-json.svg?style=flat-square
[travis-url]: https://travis-ci.org/webcaetano/gulp-jsdoc-json

Gulp plugin to extract json from jsdoc comments.


## Install

```
npm install gulp-jsdoc-json
```

## Usage 

```javascript
return gulp.src('test/*.js') // get all .js files with jsdoc comments
.pipe(jsdocJson({
	output:'data.json'
}))
.pipe(gulp.dest('./docs')); //output data.json
```

## Special thanks

[@75lb](https://github.com/75lb) for made [jsdoc-api](https://github.com/jsdoc2md/jsdoc-api)
