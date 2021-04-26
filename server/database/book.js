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
		get() {
			const tmp = this.getDataValue('name');
			return tmp.charAt(0).toUpperCase() +  tmp.slice(1);
		},
		set(value) {
			this.setDataValue('name', value.charAt(0).toUpperCase() + value.slice(1));
		}
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
		get() {
			const tmp = this.getDataValue('creators');
			return tmp.charAt(0).toUpperCase() +  tmp.slice(1);
		},
		set(value) {
			this.setDataValue('creators', value.charAt(0).toUpperCase() + value.slice(1));
		}
	},
	genre: {
		type: DataTypes.STRING,
		allowNull: false,
		get() {
			const tmp = this.getDataValue('genre');
			return tmp.charAt(0).toUpperCase() +  tmp.slice(1);
		},
		set(value) {
			this.setDataValue('genre', value.charAt(0).toUpperCase() + value.slice(1));
		}
	},
	amount: {
		type: DataTypes.INTEGER,
		allowNull: false,
	},
	type_front: {
		type: DataTypes.STRING,
		allowNull: false,
		get() {
			const tmp = this.getDataValue('type_front');
			return tmp.charAt(0).toUpperCase() +  tmp.slice(1);
		},
		set(value) {
			this.setDataValue('type_front', value.charAt(0).toUpperCase() + value.slice(1));
		}
	},
	cost: {
		type: DataTypes.INTEGER,
		allowNull: false,
	},
	authorId: {
		type: DataTypes.INTEGER,
		allowNull: false,
	},
	annotation: {
		type: DataTypes.TEXT,
		allowNull: false,
	}
});

module.exports = Book;
