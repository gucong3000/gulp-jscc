"use strict";
const describe = require("mocha").describe;
const it = require("mocha").it;
const assert = require("assert");
const vfs = require("vinyl-fs");
const jscc = require("../");

describe("base", () => {
	it("custom-vars.js", (done) => {
		return vfs.src("test/fixtures/custom-vars.js", {
			sourcemaps: true,
		})
			.pipe(jscc({
				values: {
					_ZERO: 0,
					_MYBOOL: false,
					_MYSTRING: "foo",
					_INFINITY: 1 / 0,
					_NAN: parseInt("@", 10),
					_NULL: null,
					_UNDEF: undefined,
				},
			})).on("data", (file) => {
				assert.strictEqual(String(file.contents).trim(), `// this will be print 0
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
	it("example.js", (done) => {
		return vfs.src("test/fixtures/example.js", {
			buffer: false,
		})
			.pipe(jscc()).on("data", (file) => {
				file.contents.on("data", (contents) => {
					assert.strictEqual(String(contents).trim(), `/* eslint-disable no-console */
console.log('Debug mode on.');`.trim());
					done();
				}).on("error", done);
			}).on("error", done);
	});
	it("error.js", (done) => {
		return vfs.src("test/fixtures/error.js")
			.pipe(jscc()).on("data", (file) => {
				assert.ifError(file);
			}).on("error", (error) => {
				assert.strictEqual(error.plugin, "gulp-jscc");
				done();
			});
	});
	it("error.js in stream", (done) => {
		return vfs.src("test/fixtures/error.js", {
			buffer: false,
		})
			.pipe(jscc()).on("data", (file) => {
				file.contents.on("error", (error) => {
					assert.strictEqual(error.plugin, "gulp-jscc");
					done();
				});
			}).on("error", done);
	});
	it("should skip dir", (done) => {
		return vfs.src("test", {
			buffer: false,
		})
			.pipe(jscc()).on("data", (file) => {
				done();
			}).on("error", done);
	});
});
