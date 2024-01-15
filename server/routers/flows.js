const express = require("express");
const router = express.Router();
const flowModel = require("../models/flowModel");
// const workspaceModel = require("../../models/workspaceModel");

// Get Flow from workspace_id
try {
  router.get("/get", async (req, res) => {
    const { workspaceid } = req.query;
    const result = await flowModel.findAll({
      attributes: ["id", "name", "description", "API", "markdown", "status"],
      where: { workspace_id: workspaceid },
    });
    return res.status(200).send({ status: true, data: result });
  });
} catch (err) {
  console.error("Error get Flow:", err);
  return res.status(500).send({ msg: "Error get Flow", status: false });
}

// Add Table Flow
try {
  router.post("/add", async (req, res) => {
    const { name, description, API, markdown, status, workspace_id } = req.body;
    const check = await flowModel.findOne({ where: { name, API } });
    if (check) {
      return res
        .status(200)
        .send({ status: false, msg: "Flow name or path is already used !" });
    }
    const newFlow = await flowModel.create({
      name: name,
      description: description,
      API: API,
      markdown: markdown,
      status: status,
      workspace_id: workspace_id,
    });
    const FlowID = newFlow.id;
    console.log("Create Flow with ID : ", FlowID);
    return res.status(200).send({ status: true, flow_id: FlowID });
  });
} catch (err) {
  console.error("Error creating Flow:", err);
  return res.status(500).send({ msg: "Error creating Flow", status: false });
}

// Check Flows name and path is exists
try {
  router.post("/check-detail", async (req, res) => {
    const { flow_name, flow_path } = req.body;
    const checkname = await flowModel.findOne({ where: { name: flow_name } });
    const checkpath = await flowModel.findOne({ where: { API: flow_path } });
    if (checkname && checkpath) {
      return res
        .status(200)
        .send({ status: false, errorName: true, errorPath: true });
    } else if (checkname) {
      return res
        .status(200)
        .send({ status: false, errorName: true, errorPath: false });
    } else if (checkpath) {
      return res
        .status(200)
        .send({ status: false, errorName: false, errorPath: true });
    }
    return res.status(200).send({ status: true });
  });
} catch (error) {
  console.error("Error:", error);
  return res.status(500).send("Internal Server Error");
}

// Delete Flow from workspace_id and flow_id
router.delete("/delete", async (req, res) => {
  const { workspace_id, flow_id } = req.body;
  const flow_name = await flowModel.findOne({
    attributes: ["name"],
    where: {
      id: flow_id,
    },
  });
  const deleteFlow = await flowModel.destroy({
    where: {
      workspace_id: workspace_id,
      id: flow_id,
    },
  });

  if (deleteFlow === 0) {
    return res.status(200).send({ status: false, msg: "Flow not found" });
  }

  return res.status(200).send({ status: true, flow_name: flow_name.name });
});

/* Edit Flows */
router.put("/edit", async (req, res) => {
  const {
    id,
    columns: { name, description, API, markdown, status, workspace_id },
  } = req.body;

  try {
    const check = await flowModel.findOne({
      where: {
        id: id,
      },
    });

    if (!check) {
      return res
        .status(200)
        .send({ status: false, msg: "Flow id is already used !" });
    }

    if (check.name == name || check.API == API) {
      return res
        .status(200)
        .send({
          status: false,
          msg: "Flow name or API-Path is already used !",
        });
    }

    await flowModel
      .update(
        {
          name: name,
          description: description,
          API: API,
          markdown: markdown,
          status: status,
        },
        {
          where: {
            id: id,
            workspace_id: workspace_id,
          },
        }
      )

      .then(async (result) => {
        const selectedData = await flowModel.findAll({
          attributes: [
            "id",
            "name",
            "description",
            "API",
            "markdown",
            "status",
          ],
          where: {
            id: id,
            workspace_id: workspace_id,
          },
        });

        return res
          .status(200)
          .send({ status: true, flow_data: selectedData[0] });
      })
      .catch((err) => {
        console.error("Internal Server Error:", err);
        return res.status(500).send("Internal Server Error");
      });
  } catch (err) {
    console.error("Internal Server Error:", err);
    return res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
