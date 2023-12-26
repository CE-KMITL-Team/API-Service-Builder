const express = require("express");
const router = express.Router();
const workspaceModel = require("./models/workspaceModel");
const templateModel = require("./models/templateModel");

router.post("/create", async (req, res) => {
  const { user_id, project_name, template_id } = req.body;

  //Error Message
  const error = { msg: "Your project name is already used !", status: false };

  //Query SELECT
  const data = await workspaceModel.findOne({
    where: { owner_id: user_id, name: project_name },
  });

  if (data) {
    return res.status(200).send(error);
  }

  workspaceModel
    .create({
      name: project_name,
      status: 0,
      owner_id: user_id,
    })
    .then((result) => {
      return res.status(200).send({ workspace: result, status: true });
    })
    .catch((err) => {
      return res.status(200).send({ ...error, msg: "Error create workspace" });
    });
});

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
