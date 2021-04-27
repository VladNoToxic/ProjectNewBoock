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
<<<<<<< HEAD
		if (request.query.sortBy && request.query.sortBy.length > 0) opts.order = [[request.query.sortBy]];
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
=======
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
>>>>>>> 59dd25b596694e08a6bad2c01b7af8617752dce8
				});
			}
			reply.send(toSend);
		}).catch(() => {
			reply.code(500).send('Ошибка сервера');
		});
	});
};