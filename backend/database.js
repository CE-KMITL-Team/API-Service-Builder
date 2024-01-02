const express = require("express");
const { Sequelize } = require("sequelize");
const config = require("./config/database.json");

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  {
    host: config.host,
    dialect: config.dialect,
    define: {
      timestamps: false,
      freezeTableName: true,
    },
  }
);

sequelize.sync().then(() => {
  console.log("Connected to MySQL database and synchronized Sequelize");
});

module.exports = sequelize;
