const options = {
};
module.exports = async function(fastify) {
	fastify.get('/authors',options,async function(request, reply) {

		await global.app.Database.author.findAndCountAll().then(async result => {
			if (result == null) return reply.code(400).send();
			let toSend = {list: [],count:result.count};
			for (const author of result.rows) {
				toSend.list.push(author.filter);
			}
			reply.send(toSend);
		}).catch(() => {
			reply.code(500).send('Ошибка сервера');
		});
	});
};