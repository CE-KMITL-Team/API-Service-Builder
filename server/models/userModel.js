const { DataTypes } = require("sequelize");
const { sequelize } = require("../services/database");

const userModel = sequelize.define("user", {
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true,
	},
	firstname: {
		type: DataTypes.STRING(255),
		allowNull: false,
	},
	lastname: {
		type: DataTypes.STRING(255),
		allowNull: false,
	},
	email: {
		type: DataTypes.STRING(255),
		allowNull: false,
	},
	password: {
		type: DataTypes.STRING(255),
		allowNull: false,
	},
	api_key: {
		type: DataTypes.TEXT,
		allowNull: true,
	},
});

module.exports = userModel;
