const express = require('express');
const router = express.Router();

router.get('/list', (req, res) => {
  res.send('Model');
});

module.exports = router;
