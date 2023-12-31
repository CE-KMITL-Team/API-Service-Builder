const express = require('express');
const modelModel = require("./models/modelModel");
const workspaceModel = require("./models/workspaceModel");
const router = express.Router();

router.get('/list', (req, res) => {
  res.send('Model');
});

module.exports = router;
