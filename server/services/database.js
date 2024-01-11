const express = require("express");
const { Sequelize } = require("sequelize");
const config = require("../config/database.json");

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

const customSequelize = (dbName = null) => {
	const configOptions = {
		username: config.username,
		password: config.password,
		host: config.host,
		dialect: config.dialect,
		define: {
			timestamps: false,
			freezeTableName: true,
		},
	};

	if (dbName) {
		configOptions.database = dbName;
	}

	return new Sequelize(configOptions);
};

sequelize.sync().then(() => {
	console.log("Connected to MySQL database and synchronized Sequelize");
});

module.exports = {
	sequelize,
	customSequelize,
};
