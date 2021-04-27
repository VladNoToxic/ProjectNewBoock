const fs = require('fs');
const glob = require('glob');
const options = {
	schema: {
		body: {
			type: 'object',
			required: ['name','year','pages','creators','amount','type_front','cost','author','genre', 'annotation'],
			properties: {
				name: { properties: { value: { type: 'string', not: { type: ['null'] } } } },
				year: { properties: { value: { type: 'number', not: { type: ['null'] } } } },
				pages: { properties: { value: { type: 'number', not: { type: ['null'] } } } },
				creators: { properties: { value: { type: ['string','object'], not: { type: ['null'] } } } },
				amount: { properties: { value: { type: 'number', not: { type: ['null'] } } } },
				type_front: { properties: { value: { type: 'string', not: { type: ['null'] } } } },
				cost: { properties: { value: { type: 'number', not: { type: ['null'] } } } },
				author: { properties: { value: { type: ['string','object'], not: { type: ['null'], required: ['id']} } } },
				genre: { properties: { value: { type: ['string','object'], not: { type: ['null'] } } } },
				annotation: { properties: { value: { type: 'string', not: {type : ['null']} } } },
			}
		}        
	},
};
module.exports = async function(fastify) {
	fastify.post('/create', options, async function (request, reply) {
		console.log(request.body.art.value);
		let DataCreator = global.app.Database.book.build({
			name: request.body.name.value,
			year: request.body.year.value,
			pages: request.body.pages.value,
			creators: ((request.body.creators.value[0] === '{') ? JSON.parse(request.body.creators.value).label : request.body.creators.value),
			amount: request.body.amount.value,
			type_front: request.body.type_front.value,
			cost: request.body.cost.value,
			genre: ((request.body.genre.value[0] === '{') ? JSON.parse(request.body.genre.value).label : request.body.genre.value),
			authorId: ((request.body.author.value[0] === '{') ? JSON.parse(request.body.author.value).id : request.body.author.id),
			annotation: request.body.annotation.value
		});
		if (request.body.art.value != null || (typeof request.body.art.value == 'number')) DataCreator.art = request.body.art.value;
		global.app.Database.genre.findOrCreate({ where: { name: DataCreator.genre } }).then();
		global.app.Database.creators.findOrCreate({ where: { name: DataCreator.creators } }).then();
		await DataCreator.save().then((res) => {
			if (request.body.image != null) {
				try {
					glob.sync(`./assets/${res.art}.*`).forEach(function (file) {
						fs.unlinkSync(file);
					});
					let extention = [];
					for (let i = request.body.image.filename.length-1; i > 0; i--) {
						if(request.body.image.filename[i] == '.') break;
						extention.unshift(request.body.image.filename[i]);
					}
					extention = extention.join('');
					const str = fs.createWriteStream(`./assets/${res.art}.${extention}`);
					str.write(request.body.image._buf);
					reply.send();
					
				} catch (error) {
					console.log(error);
					reply.code(400).send();
				}
				
			}
		}).catch((error) => { console.log(error); reply.code(400).send('Не сохранен'); } );
	});
	fastify.get('/create', async function (request, reply) {
        
		let toSend = {
			genre: [],
			author: [],
			creators: [],
		};
		let statuscode = 200;
		await global.app.Database.creators.findAll().then(async result => {
			if (result == null) return reply.code(400).send();
			for (const row of result) {
				toSend.creators.push(row.filter);
			}
		}).catch((err) => {
			console.log(err);
			statuscode = 500;
			reply.code(500).send('Ошибка сервера');
		});
		if (statuscode < 300)await global.app.Database.genre.findAll().then(async result => {
			if (result == null) return reply.code(400).send();
			for (const row of result) {
				toSend.genre.push(row.filter);
			}
		}).catch(() => {
			statuscode = 500;
			reply.code(500).send('Ошибка сервера');
		});
		if (statuscode < 300) await global.app.Database.author.findAll().then(async result => {
			if (result == null) return reply.code(400).send();
			for (const row of result) {
				toSend.author.push(row.filter);
			}
		}).catch(() => {
			statuscode = 500;
			reply.code(500).send('Ошибка сервера');
		});
		reply.send(toSend);
	});	
};