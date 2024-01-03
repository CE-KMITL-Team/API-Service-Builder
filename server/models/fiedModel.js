// fieldModel.js
const { DataTypes } = require('sequelize');
const sequelize = require('../newDatabase');

const Field = sequelize.define('Field', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  type: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  length: {
    type: DataTypes.INTEGER,
  },
  auto_increment: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  default_value: {
    type: DataTypes.STRING,
  },
});

module.exports = Field;
