const fs = require('fs');
const glob = require('glob');
const options = {
	schema: {
		body: {
			type: 'object',
			required: ['art','name','year','pages','creators','amount','type_front','cost','author','genre', 'annotation'],
			properties: {
				art: { properties: { value: { type: 'number', not: { type: ['null'] } } } },
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
	fastify.post('/update', options, async function (request, reply) {
		
		let DataCreator = {
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
		};
		global.app.Database.genre.findOrCreate({ where: { name: DataCreator.genre } }).then();
		global.app.Database.creators.findOrCreate({ where: { name: DataCreator.creators } }).then();
		await global.app.Database.book.update(DataCreator, { where: { art: request.body.art.value } }).then(() => {
			if (request.body.image != null) {
			
				glob.sync(`./assets/${request.body.art.value}.*`).forEach(function (file) {
					fs.unlinkSync(file);
				});
				let extention = [];
				for (let i = request.body.image.filename.length-1; i > 0; i--) {
					if(request.body.image.filename[i] == '.') break;
					extention.unshift(request.body.image.filename[i]);
				}
				extention = extention.join('');
				const str = fs.createWriteStream(`./assets/${request.body.art.value}.${extention}`);
				str.write(request.body.image._buf);
				reply.send();
			}
		}).catch((err) => console.log(err));
	});	
};