'use strict';
const describe = require('mocha').describe;
const it = require('mocha').it;
const assert = require('assert');
const vfs = require('vinyl-fs');
const jscc = require('../');

describe('base', function() {
	it('custom-vars.js', function(done) {
		return vfs.src('test/fixtures/custom-vars.js')
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
			});
	});
	it('example.js', function(done) {
		return vfs.src('test/fixtures/example.js')
			.pipe(jscc({

			})).on('data', function(file) {
				// console.log(String(file.contents));
				assert.equal(String(file.contents).trim(), `/* eslint-disable no-console */
console.log('Debug mode on.');`.trim());
				done();
			});
	});

});
