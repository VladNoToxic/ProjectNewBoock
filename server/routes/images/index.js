const glob = require('glob');
const sharp = require('sharp');

module.exports = async function (fastify) {
	fastify.get('/:file', async function (request, reply) {
		//if (request.params.file == null) reply.code(404).send();
		let size = request.params.file.match(/(.*)?-(\d*)?\.png/)[1];
		let id = request.params.file.match(/(.*)?-(\d*)?\.png/)[2];
		let image = 'assets/book-preloader.svg';
		glob.sync(`./assets/${id}.*`).forEach(function (file) {
			image = file;
		});
		//fs.createReadStream(image);
		const stream = sharp(image).resize({ height: (size == 'full') ? 700 : 200 }).toBuffer().then(result => reply.type('image/png').send(result));
		console.log(stream);
	});
};