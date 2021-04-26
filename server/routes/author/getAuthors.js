const options = {
	schema: {
		querystring: {
			type: 'object',
			properties: {
				page: {type: 'number', not: { type: ['null'] } },
				perPage: { type: 'number', not: { type: ['null'] } },
			}
		}        
	},
};
module.exports = async function(fastify) {
	fastify.get('/gets',options,async function(request, reply) {

		let limit = parseInt((request.query.perPage || 10), 10);
		var page = parseInt((request.query.page || 1), 10);
		var offset = (page > 1) ? limit*(page-1) : 0;
		var opts = {
			limit: limit,
			offset: offset,
			benchmark: true,
			order: [['createdAt']],
			rejectOnEmpty: true
		};
		let toSend = {};
		await global.app.Database.author.findAndCountAll(opts).then(async result => {
			toSend = { count: result.count, list: [] };
			for (let author of result.rows) {
				toSend.list.push({
					id: author.id,
					firstName: author.firstName,
					lastName: author.lastName,
					otchestvo: author.otchestvo
				});
			}
			reply.send(toSend);
		}).catch(() => {
			reply.code(500).send('Ошибка сервера');
		});
	});
};