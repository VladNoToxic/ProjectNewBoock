const { DataTypes } = require('sequelize');
const sequelize = global.app.sequelize;

const Author = sequelize.define('Author', {
	// Model attributes are defined here
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		unique: true,
		autoIncrement: true,
	},
	firstName: {
		type: DataTypes.STRING,
		allowNull: false
	},
	lastName: {
		type: DataTypes.STRING,
		allowNull: false
	},
	otchestvo: {
		type: DataTypes.STRING,
		allowNull: true
	},
	shortName: {
		type: DataTypes.VIRTUAL,
		get() {
			return (this.otchestvo != null)? `${this.lastName} ${this.firstName.charAt(0).toUpperCase()}.${this.otchestvo.charAt(0).toUpperCase()}` :`${this.lastName} ${this.firstName.charAt(0).toUpperCase()}`;
		},
		set() {
			throw new Error('Do not try to set the `shortName` value!');
		}
	}
});

module.exports = Author;