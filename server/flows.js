const express = require('express');
const router = express.Router();
const flowModel = require('./models/flowModel');

router.get('/get', async (req, res) => {
  const { workspaceid } = req.query;

  const result = await flowModel.findAll({
    attributes: [
      "id",
      "name",
      "description",
      "API",
      "markdown",
      "status"
    ],
    where: {
      workspace_id: workspaceid
    }
  });

  for (let i = 0; i < result.length; i++) {
    const flow = result[i];

    if (flow.dataValues.status === 1) {
      flow.dataValues.isOnline = true;
    } else {
      flow.dataValues.isOnline = false;
    }
    
    delete flow.dataValues.status;
  }

  return res.status(200).send({ status: true, data: result });
});

module.exports = router;