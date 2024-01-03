const { DataTypes } = require("sequelize");
// const sequelize = require("../database");
const sequelize = require("../newDatabase");
const workspaceModel = require("./workspaceModel");
const Field = require("./fieldModel");

const modelModel = sequelize.define("model", {
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

// const modelModel = sequelize.define("model", {
//   id: {
//     type: DataTypes.INTEGER,
//     primaryKey: true,
//     autoIncrement: true,
//   },
//   name: {
//     type: DataTypes.STRING(255),
//     allowNull: false,
//   },
//   description: {
//     type: DataTypes.STRING(255),
//     defaultValue: null,
//   },
//   table_name: {
//     type: DataTypes.STRING(255),
//     allowNull: false,
//   },
// });

modelModel.hasMany(Field, { as: "fields", foreignKey: "model_id" });
modelModel.belongsTo(workspaceModel, { foreignKey: "workspace_id" });

module.exports = modelModel;
