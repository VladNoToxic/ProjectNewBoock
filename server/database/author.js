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
		allowNull: false,
		get() {
			const tmp = this.getDataValue('firstName');
			if (tmp != null) return tmp.charAt(0).toUpperCase() +  tmp.slice(1);
		},
		set(value) {
			this.setDataValue('firstName', value.charAt(0).toUpperCase() + value.slice(1));
		}
	},
	lastName: {
		type: DataTypes.STRING,
		allowNull: false,
		get() {
			const tmp = this.getDataValue('lastName');
			if (tmp != null)return tmp.charAt(0).toUpperCase() +  tmp.slice(1);
		},
		set(value) {
			if (value != null) this.setDataValue('lastName', value.charAt(0).toUpperCase() + value.slice(1));
		}
	},
	otchestvo: {
		type: DataTypes.STRING,
		allowNull: true,
		get() {
			const tmp = this.getDataValue('otchestvo');
			if (tmp != null) return tmp.charAt(0).toUpperCase() +  tmp.slice(1);
		},
		set(value) {
			if (value != null)  this.setDataValue('otchestvo', value.charAt(0).toUpperCase() + value.slice(1));
		}
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
}, {
	getterMethods: {
		filter() {
			return { id: this.id ,label : this.shortName };
		}
	}
});

module.exports = Author;