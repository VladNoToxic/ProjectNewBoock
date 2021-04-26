const options = {
	schema: {
		querystring: {
			type: 'object',
			required: ['id'],
			properties: {
				id: { type: 'number', not: { type: ['null'] } },
			}
		}        
	},
};
module.exports = async function(fastify) {
	fastify.get('/get',options,async function(request, reply) {

		await global.app.Database.author.findByPk(request.query.id).then(async result => {
			if (result == null) return reply.code(400).send();
			reply.send(result.toJSON());
		}).catch(() => {
			reply.code(500).send('Ошибка сервера');
		});
	});
};