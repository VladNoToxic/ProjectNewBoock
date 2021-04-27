const options = {
	schema: {
		body: {
			type: 'object',
			required: ['firstName','lastName'],
			properties: {
				firstName: { properties: { value: { type: 'string', not: { type: ['null'] } } } },
				lastName: { properties: { value: { type: 'string', not: { type: ['null'] } } } },
				otchestvo: { properties: { value: { type: 'string', } } }
			}
		}        
	},
};
module.exports = async function(fastify) {
	fastify.post('/create', options, async function (request, reply) {
		let DataCreator = {
			firstName: request.body.firstName.value,
			lastName: request.body.lastName.value,
		};
		if (request.body.otchestvo.value != 'null') DataCreator.otchestvo = request.body.otchestvo.value;
		DataCreator = global.app.Database.author.build(DataCreator);
		await DataCreator.save().then(() => reply.send()).catch(() => reply.code(400).send('Не сохранен'));
	});	
};