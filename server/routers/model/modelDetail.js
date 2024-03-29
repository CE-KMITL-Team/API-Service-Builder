const workspaceModel = require("../../models/workspaceModel");
const modelModel = require("../../models/modelModel");

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

module.exports = { getDBName_From_ModelID };
