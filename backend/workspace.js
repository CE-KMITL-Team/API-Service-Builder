const express = require("express");
const router = express.Router();
const sequelize = require("./dataBase");
const workspaceModel = require("./models/workspaceModel");
const templateModel = require("./models/templateModel");

//Build new database in MySQL
router.post("/create", async (req, res) => {
  const { databaseName, userId } = req.body;
  const error = { msg: "Error creating database: ", status: false };

  if (!databaseName || !userId) {
    return res.status(400).send({ msg: "Please provide a database name" });
  }

  const isValidDatabaseName = /^[a-zA-Z0-9_-]+$/.test(databaseName);

  if (!isValidDatabaseName) {
    return res
      .status(400)
      .send({ msg: "Invalid characters in the database name" });
  }

  try {
    const [exitstingDatabase] = await sequelize.query(
      `SHOW DATABASES LIKE '${databaseName}'`
    );

    if (exitstingDatabase.length > 0) {
      return res
        .status(400)
        .send({ msg: "Database already exists", status: false });
    }

    await sequelize.query(`CREATE DATABASE IF NOT EXISTS \`${databaseName}\``);

    const isValidUserId = await workspaceModel.findOne({
      where: { name: databaseName, owner_id: userId },
    });

    if (isValidUserId) {
      return res.status(400).send({
        msg: "You have already created a database with this name",
        status: false,
      });
    }

    const newWorkSpace = await workspaceModel.create({
      name: databaseName,
      status: 0,
      owner_id: userId,
    });

    return res.status(200).send({
      msg: `Database '${databaseName}' Create By user ${userId}`,
      status: true,
      workspace: newWorkSpace,
    });
  } catch (err) {
    console.error("Error creating database:", err);
    return res.status(500).send({ ...error, msg: "Error creating workspace" });
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
