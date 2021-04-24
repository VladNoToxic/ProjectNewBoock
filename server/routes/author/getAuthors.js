const options = {
	schema: {
		querystring: {
			type: 'object',
			required: ['name'],
			properties: {
				name: { type: 'string', not: { type: ['null'] } },
			}
		}        
	},
};
module.exports = async function(fastify) {
	fastify.get('/getBooks',options,async function(request, reply) {

		await global.app.Database.book.findByPk(request.query.name).then(async result => {
			if (result == null) return reply.code(400).send();
			let author;
			await global.app.Database.author.findByPk(result.authorId).then(res => author = (res != null) ? res.shortName : 'Неизвестно');
			result.author = author;
			reply.send(result.toJSON());
		}).catch(() => {
			reply.code(500).send('Ошибка сервера');
		});
	});
};