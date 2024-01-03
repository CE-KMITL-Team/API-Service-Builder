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
    allowNull: true,
  },
  default_value: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  auto_increment: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
});

module.exports = Field;