const express = require('express');
const { router: serverRouter, db } = require('./server');
const router = express.Router();

router.get('/list', (req, res) => {
  res.send('Flow');
});

module.exports = router;
