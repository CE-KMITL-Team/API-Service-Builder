const { DataTypes } = require("sequelize");
const {sequelize} = require("../services/database");

const templateModel = sequelize.define("template", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  blueprint: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
});

module.exports = templateModel;
