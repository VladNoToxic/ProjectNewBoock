const options = {
};
module.exports = async function(fastify) {
	fastify.get('/genre',options,async function(_, reply) {

		await global.app.Database.genre.findAndCountAll().then(async result => {
			if (result == null) return reply.code(400).send();
			let toSend = {list: [],count:result.count};
			for (const genre of result.rows) {
				toSend.list.push(genre.filter);
			}
			reply.send(toSend);
		}).catch((err) => {
			console.log(err);
			reply.code(500).send('Ошибка сервера');
		});
	});
};