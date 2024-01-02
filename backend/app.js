const express = require("express");
const bodyParser = require("body-parser");

const server = require("./database");
const flows = require("./flows");
const model = require("./models");
const authorize = require("./authorize");
const workspace = require("./workspace");

const cors = require("cors");
const app = express();
const port = 3200;
app.use(cors());

//Setting Json Body
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use("/flows", flows);
app.use("/models", model);
app.use("/auth", authorize);
app.use("/workspace", workspace);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

module.exports = app;
