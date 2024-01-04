const { DataTypes } = require("sequelize");
const { sequelize } = require("../database");
const workspaceModel = require("./workspaceModel");

const modelModel = sequelize.define("model", {
	id:{
		type: DataTypes.INTEGER,
		allowNull: false,
		primaryKey: true,
		autoIncrement: true,
	},
	name: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	description: {
		type: DataTypes.STRING,
		allowNull: true,
	},
	workspace_id: {
		type: DataTypes.INTEGER,
		allowNull: false,
	},
});

modelModel.belongsTo(workspaceModel, { foreignKey: "workspace_id" });

module.exports = modelModel;
