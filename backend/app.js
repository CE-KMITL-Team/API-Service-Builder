const express = require('express');
const server = require('./server');
const flows = require('./flows');
const model = require('./models');
const authorize = require('./authorize');

const app = express();
const port = 3000;

// Routes
app.use('/flows', flows);
app.use('/models', model);
app.use('/auth', authorize);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

module.exports = app;
