const express = require('express');
const { db } = require('./server');
const router = express.Router();

router.get('/workspace', (req, res) => {
  res.send('workspace');
});

module.exports = router;
