const express = require("express");
const router = express.Router();
const sequelize = require("./newDatabase");
const workspaceModel = require("./models/workspaceModel");
const templateModel = require("./models/templateModel");

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
    const [exitstingDatabase] = await sequelize.query(
      `SHOW DATABASES LIKE '${project_name}'`
    );

    if (exitstingDatabase.length > 0) {
      return res.status(200).send({ ...error, msg: "Database already exists" });
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
      status: true,
      workspace_id: newWorkSpace.id,
    });
  } catch (err) {
    console.error("Error creating database:", err);
    return res.status(500).send({ ...error, msg: "Error creating workspace" });
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

module.exports = router;
