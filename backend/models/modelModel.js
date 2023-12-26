const { DataTypes } = require("sequelize");
const sequelize = require("../database");
const workspaceModel = require("./workspaceModel");

const modelModel = sequelize.define("model", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING(255),
    defaultValue: null,
  },
  table_name: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
});

modelModel.belongsTo(workspaceModel, { foreignKey: "workspace_id" });

module.exports = modelModel;
