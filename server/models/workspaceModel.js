const { DataTypes } = require("sequelize");
const { sequelize } = require("../services/database");
const userModel = require("./userModel");

const workspaceModel = sequelize.define("workspace", {
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true,
	},
	name: {
		type: DataTypes.STRING(255),
		allowNull: false,
	},
	status: {
		type: DataTypes.INTEGER,
		allowNull: false,
	},
});

workspaceModel.belongsTo(userModel, { foreignKey: "owner_id" });

module.exports = workspaceModel;
