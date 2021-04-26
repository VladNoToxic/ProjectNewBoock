/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const path = require('path');
const AutoLoad = require('fastify-autoload');
const Sequelize = require('sequelize');
require('dotenv').config();
global.app = {
	sequelize: new Sequelize({
		username: process.env.DB_USER,
		password: process.env.DB_PASS,
		database: process.env.DB_DATABASE,
		dialect: process.env.DB_DIALECT,
		host: process.env.DB_HOST,
	}),
};

module.exports = async function(fastify, opts) {
	require('./database');
	const modules = [
		{Var: 'Database', req: './database'},
	];
	const a = async function() {
		try {
			await app.sequelize.sync();
			for (let i = 0; i < modules.length; i++) {
				console.log(`Запуск ${modules[i].Var}`);
				app[modules[i].Var] = require(modules[i].req);
			}
		} catch (error) {
			console.error(error);
		}
	}();
	fastify.setErrorHandler(function (error, request, reply) {
		if (error.validation) {
			console.log(error);
			const temp = [];
			console.log(request.body.author.value, typeof request.body.author.value);
			error.validation.forEach((elem) => {
				temp.push(elem.message);
			});
			reply.status(400).send(temp);
			return;
		}
		console.log(error);
		reply.code(500).send();
	});
	fastify.register(require('fastify-cors'), {
		origin:'*',
		methods:'*',
		credentials: true,
	});
	fastify.register(require('fastify-multipart'),{attachFieldsToBody: true,sharedSchemaId: '#mySharedSchema'});
	fastify.register(AutoLoad, {
		dir: path.join(__dirname, 'routes'),
		options: Object.assign({}, opts),
	});
};
