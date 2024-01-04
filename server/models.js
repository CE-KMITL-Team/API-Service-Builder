const express = require("express");
const router = express.Router();
const workspaceModel = require("./models/workspaceModel");
const { DataTypes } = require("sequelize");
const { sequelize, customSequelize } = require("./database");

const modelModel = require("./models/modelModel");

//Generate Table Logic
const generateModel = (schemaName, modelName, fieldList) => {
	const attributes = {};
	fieldList.forEach((field) => {
		const { name, type, length, default_value, auto_increment } = field;

		attributes[name] = {
			type:
				type === "number"
					? DataTypes.INTEGER
					: length
					? DataTypes[type.toUpperCase()](length)
					: DataTypes[type.toUpperCase()],
			allowNull: !auto_increment,
			...(auto_increment && { primaryKey: auto_increment }),
			...(auto_increment && { autoIncrement: auto_increment }),
			...(default_value && { defaultValue: default_value }),
		};
	});

	return customSequelize(schemaName).define(modelName, attributes);
};

//Create Table
router.post("/create", async (req, res) => {
	const { workspace_id, model_name, model_desc, field_list, GenerateAPI } =
		req.body;

	try {
		//Check Workspace exist
		const workspace = await workspaceModel.findByPk(workspace_id);
		if (!workspace) {
			return res
				.status(200)
				.send({ msg: "Workspace not found", status: false });
		}

		//Init Database name
		const schemaName = `${
			workspace.owner_id
		}-${workspace.name.toLowerCase()}`;

		//Check Table is not already exists
		const modelExists = await customSequelize(schemaName)
			.getQueryInterface()
			.showAllTables();
		if (modelExists.includes(model_name.toLowerCase())) {
			return res
				.status(200)
				.send({ msg: "Model/table already exists", status: false });
		}

		//Add Model Detail To Database
		await modelModel
			.create({
				name: model_name,
				description: model_desc,
				workspace_id: workspace_id,
			})
			.then(async (result) => {
				//Create Table
				const dynamicModel = generateModel(
					schemaName,
					model_name,
					field_list
				);
				await dynamicModel.sync();

				return res.status(200).send({ status: true });
			})
			.catch((err) => {
				console.log(err);
				return res
					.status(200)
					.send({ status: false, msg: "Error can't add model" });
			});
	} catch (err) {
		console.error("Error creating model:", err);
		return res
			.status(500)
			.send({ msg: "Error creating model", status: false });
	}
});

module.exports = router;
