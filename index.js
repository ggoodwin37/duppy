var glob = require('glob');
var manyFileHashes = require('many-file-hashes');
var async = require('async');

// TODO: from command line.
var basePath = './sample-data/base';
var comparePath = './sample-data/compare';

var globOptions = {
	nodir: true
};

var baseHashes = {};

async.series({
	getBaseHashes: function(cb) {
		glob(basePath + '/**', globOptions, function(globErr, files) {
			if (globErr) {
				console.log('globErr: ' + globErr);
				return cb();
			}
			manyFileHashes(files, function(hashErr, hashes) {
				if (hashErr) {
					console.log('hashErr: ' + hashErr);
					return cb();
				}
				hashes = (hashes || []).map(function(thisHash) {
					return thisHash.hash;
				});
				hashes.forEach(function(thisHash) {
					baseHashes[thisHash] = true;
				});
				cb();
			});
		});
	},
	getCompareHashes: function(cb) {
		glob(comparePath + '/**', globOptions, function(globErr, files) {
			if (globErr) {
				console.log('globErr: ' + globErr);
				return cb();
			}
			manyFileHashes(files, function(hashErr, hashes) {
				if (hashErr) {
					console.log('hashErr: ' + hashErr);
					return cb();
				}
				hashes.forEach(function(thisHashResult) {
					if (baseHashes[thisHashResult.hash]) {
						console.log('compare file is dupe: ' + thisHashResult.original);
					} else {
						console.log('compare file is NOT dupe: ' + thisHashResult.original);
					}
				});
				cb();
			});
		});
	}
}, function() {
	console.log('all done');
});
