const express = require("express");
const router = express.Router();
const sequelize = require("./newDatabase");
const workspaceModel = require("./models/workspaceModel");
const modelModel = require("./models/modelModel");
const fieldModel = require("./models/fieldModel");

router.post("/create", async (req, res) => {
  const { workspace_id, model_name, model_desc, field_list, GenerateAPI } =
    req.body;

  try {
    const workspace = await workspaceModel.findByPk(workspace_id);
    if (!workspace) {
      return res
        .status(404)
        .send({ msg: "Workspace not found", status: false });
    }

    const newModel = await modelModel.create({
      name: model_name,
      description: model_desc,
      workspace_id: workspace_id,
    });

    const newFields = await Promise.all(
      field_list.map(async (field) => {
        const newField = await fieldModel.create({
          name: field.name,
          type: field.type,
          length: field.length,
          default_value: field.default_value,
          auto_increment: field.auto_increment,
          model_id: newModel.id,
        });
        return newField;
      })
    );

    return res.status(200).send({
      msg: "Model and fields created successfully",
      status: true,
      model: newModel,
      fields: newFields,
    });
  } catch (err) {
    console.error("Error creating model:", err);
    return res.status(500).send({ msg: "Error creating model", status: false });
  }
});

module.exports = router;
