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
		if (request.query.id < 0) return reply.code(400).send();
		await global.app.Database.book.findByPk(request.query.id).then(async result => {
			if (result == null) return reply.code(400).send();
			let author;
			await global.app.Database.author.findByPk(result.authorId).then(res => author = (res != null) ? {id:res.id, label:res.shortName} : {id:0, label:'Неизвестно'});
			let toSend = result.toJSON();
			toSend.author = author;
			reply.send(toSend);
		}).catch(() => {
			reply.code(500).send('Ошибка сервера');
		});
	});
};