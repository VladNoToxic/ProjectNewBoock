const {DataTypes} = require('sequelize');
const sequelize = global.app.sequelize;

const Book = sequelize.define('Book', {
	// Model attributes are defined here
	art: {
		type: DataTypes.INTEGER.UNSIGNED,
		primaryKey: true,
		unique: true,
		defaultValue: () => {
			let tmp = Math.ceil(Math.random()*1000000);
			while (tmp < 99999) tmp = Math.ceil(Math.random()*1000000);
			return tmp;
		},
	},
	name: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	year: {
		type: DataTypes.INTEGER.UNSIGNED,
		allowNull: false,
	},
	pages: {
		type: DataTypes.INTEGER,
		allowNull: false,
	},
	creators: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	genre: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	amount: {
		type: DataTypes.INTEGER,
		allowNull: false,
	},
	type_front: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	cost: {
		type: DataTypes.INTEGER,
		allowNull: false,
	},
	authorId: {
		type: DataTypes.INTEGER,
		allowNull: false,
	},
});

module.exports = Book;
