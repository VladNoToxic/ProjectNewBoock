const glob = require('glob');
const path = require('path');

const folder = 'database';
const regex = new RegExp(`${folder}\\/(.*)?.js`);
glob.sync(`./${folder}/*.js`).forEach(function(file) {
	if (file.match(regex)[1] != 'index') {
		module.exports[file.match(regex)[1]] = require(path.resolve(file));
	}
});
