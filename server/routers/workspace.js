const fs = require("fs");
const path = require("path");

const express = require("express");
const nodemon = require("nodemon");
const router = express.Router();
const { customSequelize } = require("../services/database");
const workspaceModel = require("../models/workspaceModel");
const templateModel = require("../models/templateModel");
const { getUserIndexFileContent } = require("../utils/workspace_utils");
const userModel = require("../models/userModel");

/* Build new database in MySQL */
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
		const [exitstingDatabase] = await customSequelize().query(
			`SHOW DATABASES LIKE '${user_id}-${project_name}'`
		);

		if (exitstingDatabase.length > 0) {
			return res
				.status(200)
				.send({ ...error, msg: "Database already exists" });
		}

		await customSequelize().query(
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

		const userData = await userModel.findOne({ where: { id: user_id } });

		const baseDirectory = "./public_user";
		const folderStructure = `${user_id}/${project_name}`;
		const fileName = "index.js";
		const fileContent = getUserIndexFileContent(
			parseInt(user_id),
			`${user_id}-${project_name}`,
			userData.dataValues.api_key
		);

		// Create folder structure
		const fullFolderPath = path.join(baseDirectory, folderStructure);
		fs.mkdir(fullFolderPath, { recursive: true }, (err) => {
			if (err) {
				console.error("Error creating folder structure:", err);
			} else {
				console.log(
					`Folder structure '${fullFolderPath}' created successfully.`
				);

				// Create file inside the folder structure
				const filePath = path.join(fullFolderPath, fileName);

				fs.writeFile(filePath, fileContent, (err) => {
					if (err) {
						console.error("Error creating file:", err);
					} else {
						console.log(
							`File '${fileName}' created inside folder structure '${fullFolderPath}' with content: ${fileContent}`
						);
					}
				});
			}
		});

		return res.status(200).send({
			status: true,
			workspace_id: newWorkSpace.id,
		});
	} catch (err) {
		console.error("Error creating database:", err);
		return res
			.status(500)
			.send({ ...error, msg: "Error creating workspace" });
	}
});

/* Get Woekspaces */
router.get("/get/workspaces", async (req, res) => {
	const { userid } = req.query;

	if (!userid) {
		return res
			.status(400)
			.send({ error: "userid parameter is missing in the request." });
	}

	try {
		const data = await workspaceModel.findAll({
			where: { owner_id: userid },
		});

		const modifiedData = data.map((workspace) => ({
			id: workspace.id,
			name: workspace.name,
			isOnline: workspace.status === 1,
		}));

		return res.status(200).send({ workspaces: modifiedData });
	} catch (error) {
		console.error("Error fetching workspaces:", error);
		return res.status(500).send({ error: "Internal Server Error" });
	}
});

/* Get Templates */
router.get("/get/templates", async (req, res) => {
	try {
		const data = await templateModel.findAll();
		return res.status(200).send({ templates: data });
	} catch (err) {
		console.error("Error fetching templates:", error);
		return res.status(500).send({ error: "Internal Server Error" });
	}
});

/* Get Woekspace Detail By Name */
router.get("/get/workspaceDetailByName", async (req, res) => {
	const { name, userid } = req.query;

	if (!userid) {
		return res
			.status(400)
			.send({ error: "userid parameter is missing in the request." });
	}

	if (!name) {
		return res
			.status(400)
			.send({ error: "name parameter is missing in the request." });
	}

	try {
		let data = await workspaceModel.findOne({
			where: { owner_id: userid, name: name },
		});

		if (data) {
			data.status = data.status === 1;
			delete data.dataValues.owner_id;

			return res.status(200).send({ status: true, data: data });
		}

		return res
			.status(200)
			.send({ status: false, msg: "Not have workspace you finding." });
	} catch (error) {
		console.error("Error fetching workspaces:", error);
		return res.status(500).send({ error: "Internal Server Error" });
	}
});

/* Get Woekspace Detail By ID */
router.get("/get/workspaceDetailByID", async (req, res) => {
	const { id } = req.query;

	if (!id) {
		return res
			.status(400)
			.send({ error: "id parameter is missing in the request." });
	}

	try {
		let data = await workspaceModel.findOne({
			where: { id: id },
		});

		if (data) {
			data.status = data.status === 1;
			delete data.dataValues.owner_id;

			return res.status(200).send({ status: true, data: data });
		}

		return res
			.status(200)
			.send({ status: false, msg: "Not have workspace you finding." });
	} catch (error) {
		console.error("Error fetching workspaces:", error);
		return res.status(500).send({ error: "Internal Server Error" });
	}
});

//Online: status = 1
//Offline: status = 0
//Make Project Online
let nodemonInstance = null;
router.post("/toggleOnline", async (req, res) => {
	const { projectID, projectName, userID, status } = req.body;
	workspaceModel.update({ status: status }, { where: { id: projectID } });

	const projectPath = `./public_user/${userID}/${projectName}`;
	const entryFile = "index.js";

	if (status === 0) {
		// If nodemon process is running, stop it
		if (nodemonInstance) {
			nodemonInstance.emit("quit");
			nodemonInstance = null;
		}
		res.status(200).json({
			status: true,
			message: "Stopping the project...",
		});
	} else if (status === 1) {
		// If nodemon process is not running, start it
		if (nodemonInstance === null) {
			const options = {
				script: `${projectPath}/${entryFile}`,
				watch: [projectPath],
			};

			nodemonInstance = nodemon(options);

			nodemonInstance.on("start", () => {
				console.log("Nodemon started");
			});

			nodemonInstance.on("restart", (files) => {
				console.log(`Nodemon restarted due to: ${files}`);
			});

			nodemonInstance.on("quit", () => {
				console.log("Nodemon quit");
			});

			nodemonInstance.on("error", (err) => {
				console.error(`Error in nodemon: ${err}`);
			});
		}

		res.status(200).json({
			status: true,
			message: "Starting the project...",
		});
	}
});

module.exports = router;
