var glob = require('glob');
var basePath = './sample-data/base';
var comparePath = './sample-data/compare';

var globOptions = {
	nodir: true
};

glob(basePath + '/**', globOptions, function(err, files) {
	if (err) {
		console.log('glob error: ' + err);
		return;
	}
	console.log('glob results: ' + (files || []).join(', '));
});
