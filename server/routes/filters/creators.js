const options = {
};
module.exports = async function(fastify) {
	fastify.get('/creators',options,async function(_, reply) {

		await global.app.Database.creators.findAndCountAll().then(async result => {
			if (result == null) return reply.code(400).send();
			let toSend = {list: [],count:result.count};
			for (const creator of result.rows) {
				toSend.list.push(creator.filter);
			}
			reply.send(toSend);
		}).catch(() => {
			reply.code(500).send('Ошибка сервера');
		});
	});
};