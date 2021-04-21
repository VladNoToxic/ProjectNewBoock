const { DataTypes } = require('sequelize');
const sequelize = global.app.sequelize;

const Author = sequelize.define('Author', {
	// Model attributes are defined here
	id: {
		type: DataTypes.INTEGER.UNSIGNED,
		primaryKey: true,
		unique: true,
		autoIncrement: true,
	},
	name: {
		type: DataTypes.STRING,
		allowNull: false
	},
});

module.exports = Author;