const options = {
	schema: {
		body: {
			type: 'object',
			required: ['id'],
			properties: {
				id: { type: 'number', not: { type: ['null'] } },
			}
		}        
	},
};
module.exports = async function(fastify) {
	fastify.post('/delete', options, async function (request, reply) {
        
		if (request.body.id < 0 && request.body.id > 1000000) return reply.code(400).send();
		await global.app.Database.book.destroy({ where: {art:request.body.id }}).then(() => reply.send()).catch(() => reply.code(400).send('Не удален'));
	});	
};