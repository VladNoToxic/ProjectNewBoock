/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const path = require('path');
const AutoLoad = require('fastify-autoload');
const Sequelize = require('sequelize');

global.app = {
	sequelize: new Sequelize({
		username: '',
		password: '',
		database: '',
		dialect: 'mssql',
		host: '',
	}),
	Database: {},
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
				app.modules[modules[i].Var] = require(modules[i].req);
			}
		} catch (error) {
			console.error(error);
		}
	}();
	fastify.setErrorHandler(function(error, request, reply) {
		if (error.validation) {
			const temp = [];
			error.validation.forEach((elem) => {
				temp.push(elem.message);
			});
			reply.status(400).send(temp);
			return;
		}
		console.log(error);
		reply.code(500).send();
	});
	fastify.register(AutoLoad, {
		dir: path.join(__dirname, 'plugins'),
		options: Object.assign({}, opts),
	});

	fastify.register(AutoLoad, {
		dir: path.join(__dirname, 'routes'),
		options: Object.assign({}, opts),
	});
};
