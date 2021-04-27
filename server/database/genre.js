const { DataTypes } = require('sequelize');
const sequelize = global.app.sequelize;

const Genre = sequelize.define('Genre', {
	name: {
		type: DataTypes.STRING,
		allowNull: false,
		primaryKey: true,
		unique: true,
		get() {
			const tmp = this.getDataValue('name');
			return tmp.charAt(0).toUpperCase() +  tmp.slice(1);
		},
		set(value) {
			this.setDataValue('name', value.charAt(0).toUpperCase() + value.slice(1));
		}
	},
}, {
	getterMethods: {
		filter() {
			return {label: this.name};
		}
	}
});

module.exports = Genre;