const express = require("express");
const router = express.Router();
const { Sequelize } = require("sequelize");
const workspaceModel = require("../../models/workspaceModel");
const modelModel = require("../../models/modelModel");
const { customSequelize } = require("../../services/database");

async function getDBName_From_ModelID(modelID) {
	try {
		const modelDetails = await modelModel.findByPk(modelID, {
			include: [{ model: workspaceModel, as: "workspace" }],
		});

		if (!modelDetails) {
			return null;
		}

		const { workspace } = modelDetails;

		if (!workspace || !workspace.owner_id) {
			return null;
		}

		return {
			modelDetails,
			schemaName: `${workspace.owner_id}-${workspace.name.toLowerCase()}`,
		};
	} catch (err) {
		console.error("Internal server error", err);
		return null;
	}
}

//Get data in user model
router.get("/:modelID/get", async (req, res) => {
	const { modelID } = req.params;
	//Check Model Exists
	const modelDetailsResult = await getDBName_From_ModelID(modelID);

	if (!modelDetailsResult) {
		return res.status(200).json({
			msg: "Model not found or invalid workspace details",
			status: false,
		});
	}

	const { modelDetails, schemaName } = modelDetailsResult;

	//Query Insert Data
	const sqlQuery = `SELECT * FROM ${modelDetails.name}`;

	customSequelize(schemaName)
		.query(sqlQuery, { type: Sequelize.QueryTypes.SELECT })
		.then((result) => {
			return res.status(200).json({ status: true, data: result });
		})
		.catch((err) => {
			console.error("Internal server error", err);
			return res
				.status(200)
				.json({ msg: "Can't edit data", status: false });
		});
});

//Add data in user model
router.post("/:modelID/add", async (req, res) => {
	const { modelID } = req.params;
	const { columns } = req.body;

	//Check Model Exists
	const modelDetailsResult = await getDBName_From_ModelID(modelID);

	if (!modelDetailsResult) {
		return res.status(200).json({
			msg: "Model not found or invalid workspace details",
			status: false,
		});
	}

	const { modelDetails, schemaName } = modelDetailsResult;

	//Query Insert Data
	const sqlQuery = `INSERT INTO ${modelDetails.name} (${Object.keys(
		columns
	).join(", ")}) VALUES (${Object.values(columns)
		.map((value) => `'${value}'`)
		.join(", ")})`;

	customSequelize(schemaName)
		.query(sqlQuery, { type: Sequelize.QueryTypes.INSERT })
		.then(async (result) => {
			//Get data for return
			const sqlSelectQuery = `SELECT * FROM ${modelDetails.name} WHERE id = ${result[0]}`;
			const selectedData = await customSequelize(schemaName).query(
				sqlSelectQuery,
				{
					type: Sequelize.QueryTypes.SELECT,
				}
			);

			return res
				.status(200)
				.json({ status: true, data: selectedData[0] });
		})
		.catch((err) => {
			console.error("Internal server error", err);
			return res
				.status(200)
				.json({ msg: "Can't insert data", status: false });
		});
});

//Delete data in user model
router.delete("/:modelID/delete", async (req, res) => {
	const { modelID } = req.params;
	const { columns } = req.body;

	//Check Model Exists
	const modelDetailsResult = await getDBName_From_ModelID(modelID);

	if (!modelDetailsResult) {
		return res.status(200).json({
			msg: "Model not found or invalid workspace details",
			status: false,
		});
	}

	const { modelDetails, schemaName } = modelDetailsResult;

	//Query Delete Data
	const sqlQuery = `DELETE FROM ${modelDetails.name} WHERE id = '${columns.id}'`;

	customSequelize(schemaName)
		.query(sqlQuery, { type: Sequelize.QueryTypes.DELETE })
		.then((result) => {
			return res.status(200).json({ status: true, data: result });
		})
		.catch((err) => {
			console.error("Internal server error", err);
			return res
				.status(200)
				.json({ msg: "Can't delete data", status: false });
		});
});

//Edit data in user model
router.put("/:modelID/edit", async (req, res) => {
	const { modelID } = req.params;
	const { columns } = req.body;

	//Check Model Exists
	const modelDetailsResult = await getDBName_From_ModelID(modelID);

	if (!modelDetailsResult) {
		return res.status(200).json({
			msg: "Model not found or invalid workspace details",
			status: false,
		});
	}

	const { modelDetails, schemaName } = modelDetailsResult;

	//Query Update Data
	const sqlQuery = `UPDATE ${modelDetails.name} SET ${Object.entries(columns)
		.map(([key, value]) => `${key} = '${value}'`)
		.join(", ")} WHERE id = '${columns.id}'`;

	customSequelize(schemaName)
		.query(sqlQuery, { type: Sequelize.QueryTypes.UPDATE })
		.then(async (result) => {
			//Get data for return
			const sqlSelectQuery = `SELECT * FROM ${modelDetails.name} WHERE id = ${columns.id}`;

			const selectedData = await customSequelize(schemaName).query(
				sqlSelectQuery,
				{
					type: Sequelize.QueryTypes.SELECT,
				}
			);
			if (selectedData[0]) {
				return res
					.status(200)
					.json({ status: true, data: selectedData[0] });
			} else {
				return res
					.status(200)
					.json({ msg: "Don't have data to edit", status: false });
			}
		})
		.catch((err) => {
			console.error("Internal server error", err);
			return res
				.status(500)
				.json({ msg: "Internal server error", status: false });
		});
});

module.exports = router;