const express = require("express");
const router = express.Router();
const sequelize = require("./newDatabase");
const workspaceModel = require("./models/workspaceModel");
const templateModel = require("./models/templateModel");

//Build new database in MySQL
router.post("/create", async (req, res) => {
	const { project_name, user_id, template_id } = req.body;
	const error = { msg: "Error creating database", status: false };

	if (!project_name || !user_id) {
		return res
			.status(200)
			.send({ ...error, msg: "Please provide a database name" });
	}

	const isValidproject_name = /^[a-zA-Z0-9_-]+$/.test(project_name);

	if (!isValidproject_name) {
		return res
			.status(200)
			.send({ ...error, msg: "Invalid characters in the database name" });
	}

	try {
		const [exitstingDatabase] = await sequelize.query(
			`SHOW DATABASES LIKE '${project_name}'`
		);

		if (exitstingDatabase.length > 0) {
			return res
				.status(200)
				.send({ ...error, msg: "Database already exists" });
		}

		await sequelize.query(
			`CREATE DATABASE IF NOT EXISTS \`${user_id}-${project_name}\``
		);

		const isValiduser_id = await workspaceModel.findOne({
			where: { name: project_name, owner_id: user_id },
		});

		if (isValiduser_id) {
			return res.status(200).send({
				...error,
				msg: "You have already created a database with this name",
			});
		}

		const newWorkSpace = await workspaceModel.create({
			name: `${project_name}`,
			status: 0,
			owner_id: user_id,
		});

		return res.status(200).send({
			msg: `Database '${project_name}' Create By user ${user_id}`,
			status: true,
			workspace: newWorkSpace,
		});
	} catch (err) {
		console.error("Error creating database:", err);
		return res
			.status(500)
			.send({ ...error, msg: "Error creating workspace" });
	}
});

// router.post("/create", async (req, res) => {
//   const { user_id, project_name, template_id } = req.body;

//   //Error Message
//   const error = { msg: "Your project name is already used !", status: false };

//   //Query SELECT
//   try {
//     const existingWorkspace = await workspaceModel.findOne({
//       where: { owner_id: user_id, name: project_name },
//     });

//     if (existingWorkspace) {
//       return res.status(200).send(error);
//     }

//     // Create a new workspace
//     const newWorkspace = await workspaceModel.create({
//       name: project_name,
//       status: 0,
//       owner_id: user_id,
//       // Add other fields as needed based on your model definition
//     });

//     return res.status(200).send({ workspace: newWorkspace, status: true });
//   } catch (err) {
//     console.error("Error creating workspace:", err);
//     return res.status(500).send({ ...error, msg: "Error creating workspace" });
//   }
// });

router.get("/get/workspaces", async (req, res) => {
	const { userid } = req.query;

	const data = await workspaceModel.findAll({
		where: { owner_id: userid },
	});

	return res.status(200).send({ workspace: data });
});

router.get("/get/templates", async (req, res) => {
	const data = await templateModel.findAll();

	return res.status(200).send({ templates: data });
});

module.exports = router;
