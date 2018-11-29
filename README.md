gulp-jscc
======

[![NPM version](https://img.shields.io/npm/v/gulp-jscc.svg?style=flat-square)](https://www.npmjs.com/package/gulp-jscc)
[![Travis](https://img.shields.io/travis/gucong3000/gulp-jscc.svg?&label=Linux)](https://travis-ci.org/gucong3000/gulp-jscc)
[![AppVeyor](https://img.shields.io/appveyor/ci/gucong3000/gulp-jscc.svg?&label=Windows)](https://ci.appveyor.com/project/gucong3000/gulp-jscc)
[![Codecov](https://img.shields.io/codecov/c/github/gucong3000/gulp-jscc.svg)](https://codecov.io/gh/gucong3000/gulp-jscc)

A [gulp](http://gulpjs.com/) plugin for [jscc](https://github.com/aMarCruz/jscc).

## Install

```bash
npm i gulp-jscc --save
```

## Usage

```js
gulp.src('test/fixtures/example.js')
  .pipe(jscc(options))
  .pipe(gulp.dest('dist'));
```

## Documentation

You can read in the Wiki about:

- [Options](https://github.com/aMarCruz/jscc/wiki/Options)
- [Basic Syntax](https://github.com/aMarCruz/jscc/wiki/Syntax)
- [Keywords](https://github.com/aMarCruz/jscc/wiki/Keywords)
- [Examples & Tricks](https://github.com/aMarCruz/jscc/wiki/Examples)
