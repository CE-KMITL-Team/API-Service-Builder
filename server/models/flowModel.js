const { DataTypes } = require("sequelize");
const sequelize = require("../database");
const workspaceModel = require("./workspaceModel");

const flowModel = sequelize.define("Flow", {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
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
  API: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  markdown: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  status: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  workspaceId: {
    type: DataTypes.INTEGER,
    references: {
      model: "Workspace",
      key: "id",
    },
  },
});

flowModel.belongsTo(workspaceModel, { foreignKey: "workspace_id" });

module.exports = flowModel;
