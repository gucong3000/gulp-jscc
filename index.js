'use strict';
const Transform = require('stream').Transform;
const BufferStreams = require('bufferstreams');
var applySourceMap = require('vinyl-sourcemaps-apply');
var path = require('path');
const jscc = require('jscc');

function transformBuffer(buffer, file, options) {
	options = Object.assign({
		sourceMap: Boolean(file.sourceMap),
	}, options);
	let result = jscc(buffer.toString(), file.path, options);
	if (result && result.code) {
		buffer = new Buffer(result.code);
		if (file.sourceMap && options.sourceMap) {
			applySourceMap(file, result.map);
		}
	}
	return buffer;
}

module.exports = function(options) {
	function transform(file, encoding, done) {
		if (file.isBuffer()) {
			try {
				file.contents = transformBuffer(file.contents, file, options);
			} catch (ex) {
				done(ex, file);
				return;
			}
		} else if (file.isStream()) {
			file.contents = file.contents.pipe(new BufferStreams(function(err, buf, cb) {
				if (buf) {
					buf = transformBuffer(buf, file, options);
				}
				cb(err, buf);
			}));
		}
		done(null, file);
	}

	return new Transform({
		objectMode: true,
		transform,
	});
};
