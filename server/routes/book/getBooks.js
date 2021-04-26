const options = {
	schema: {
		querystring: {
			type: 'object',
			properties: {
				author: { type: 'string', not: { type: ['null'] } },
				page: {type: 'number', not: { type: ['null'] } },
				perpage: { type: 'number', not: { type: ['null'] } },
			}
		}        
	},
};
module.exports = async function(fastify) {
	fastify.get('/gets',options,async function(request, reply) {

		let limit = parseInt((request.query.perpage || 10), 10);
		var page = parseInt((request.query.page || 1), 10);
		var offset = (page > 1) ? limit*(page-1) : 0;
		var opts = {
			limit: limit,
			offset: offset,
			order: [['createdAt','DESC']],
			benchmark: true,
			rejectOnEmpty: true
		};
		let toSend = {};
		await global.app.Database.book.findAndCountAll(opts).then(async result => {
			toSend = { count: result.count, list: [] };
			for (let book of result.rows) {
				let author = null;
				await global.app.Database.author.findByPk(book.authorId).then(res => author = (res != null) ? res.shortName : 'Неизвестно');
				toSend.list.push({
					id: book.art,
					name: book.name,
					cost: book.cost,
					author: author
				});
			}
			reply.send(toSend);
		}).catch(() => {
			reply.code(500).send('Ошибка сервера');
		});
	});
};