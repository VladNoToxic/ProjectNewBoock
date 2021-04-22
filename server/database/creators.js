const { DataTypes } = require('sequelize');
const sequelize = global.app.sequelize;

const Creator = sequelize.define('Creator', {
	name: {
		type: DataTypes.STRING,
		allowNull: false,
		primaryKey: true,
		unique: true,
		get() {
			// eslint-disable-next-line no-undef
			return this.getDataValue(name).toLowerCase();
		},
		set(value) {
			return value.toLowerCase();
		}
	},
}, {
	getterMethods: {
		Name() {
			return  this.name.charAt(0).toUpperCase() +  this.name.slice(1);
		}
	},
});

module.exports = Creator;