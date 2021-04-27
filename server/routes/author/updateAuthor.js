const options = {
	schema: {
		body: {
			type: 'object',
			required: ['id','firstName','lastName'],
			properties: {
				id: { properties: { value: { type: 'number', not: { type: ['null'] } } } },
				firstName: { properties: { value: { type: 'string', not: { type: ['null'] } } } },
				lastName: { properties: { value: { type: 'string', not: { type: ['null'] } } } },
				otchestvo: { properties: { value: { type: 'string', } } }
			}
		}        
	},
};
module.exports = async function (fastify) {
	fastify.post('/update', options, async function (request, reply) {
        
		let DataCreator = {
			firstName: request.body.firstName.value,
			lastName: request.body.lastName.value,
		};
		if (request.body.otchestvo.value != 'null') DataCreator.otchestvo = request.body.otchestvo.value;
		await global.app.Database.author.update(DataCreator,{where: {id: request.body.id.value}}).then(() => reply.send()).catch((err) => console.log(err));
	});	
};