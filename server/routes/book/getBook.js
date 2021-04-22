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

		let limit = parseInt((request.query.perPage || 10), 10);
		var page = parseInt((request.query.page || 1), 10);
		var offset = (page > 1) ? limit*(page-1) : 0;
		var opts = {
			limit: limit,
			offset: offset,
			order: [['name']],
			benchmark: true,
			rejectOnEmpty: true
		};
		if (request.query.sortBy.length > 0) opts.order = [[request.query.sortBy]];
		if (request.query.sortDesc == 'true') opts.order[0].push('DESC');

		await global.app.Database.book.findAndCountAll(opts).then(result => {
			var toSend = [[], result.count];
			Object.entries(result.rows).forEach(async val => {
				let author;
				await global.app.Database.author.findByPk(val[1].authorId).then(res => author = (res != null) ? res.shortName : 'Неизвестно');
				toSend[0].push({
					name: val[1].name,
					cost: val[1].cost,
					author: author,
				});
			});
			reply.send(toSend);
		}).catch(() => {
			reply.code(500).send('Ошибка сервера');
		});
	});
};