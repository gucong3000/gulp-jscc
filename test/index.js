'use strict';
const describe = require('mocha').describe;
const it = require('mocha').it;
const assert = require('assert');
const vfs = require('vinyl-fs');
const jscc = require('../');

describe('base', function() {
	it('custom-vars.js', function(done) {
		return vfs.src('test/fixtures/custom-vars.js', {
			sourcemaps: true,
		})
			.pipe(jscc({
				values: {
					_ZERO: 0,
					_MYBOOL: false,
					_MYSTRING: 'foo',
					_INFINITY: 1 / 0,
					_NAN: parseInt('@', 10),
					_NULL: null,
					_UNDEF: undefined
				}
			})).on('data', function(file) {

				assert.equal(String(file.contents).trim(), `// this will be print 0
var x
x = 0        // 0
x = false      // false
x = 'foo'  // 'foo'
x = Infinity    // Infinity
x = NaN         // NaN
x = null        // null
// next is not defined
x = $_NOT_DEFINED
// next has the undefined value
x = undefined`.trim());

				done();
			}).on("error", done);
	});
	it('example.js', function(done) {
		return vfs.src('test/fixtures/example.js', {
			buffer: false
		})
			.pipe(jscc()).on('data', function(file) {
				file.contents.on('data', function(contents) {
					assert.equal(String(contents).trim(), `/* eslint-disable no-console */
console.log('Debug mode on.');`.trim());
					done();
				}).on("error", done);
			}).on("error", done);
	});
	it('error.js', function(done) {
		return vfs.src('test/fixtures/error.js')
			.pipe(jscc()).on('data', function(file) {
				assert.ifError(file);
			}).on('error', function(error) {
				assert.equal(error.plugin, 'gulp-jscc')
				done();
			});
	});
	it('error.js in stream', function(done) {
		return vfs.src('test/fixtures/error.js', {
			buffer: false
		})
			.pipe(jscc()).on('data', function(file) {
				file.contents.on('error', function(error) {
					assert.equal(error.plugin, 'gulp-jscc')
					done();
				})
			});
	});
});
