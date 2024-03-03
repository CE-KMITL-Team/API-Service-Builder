const mysql = require("mysql2");
const config = require("../../../config/database.json");

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = 3205;
app.use(cors());

//Setting Json Body
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Check Bearer Key 
const BearerTokenAuth = (req, res, next) => {
	const authHeader = req.headers["authorization"];

	if (!authHeader || !authHeader.startsWith("Bearer ")) {
		return res
			.status(401)
			.json({ error: "Invalid or missing bearer token" });
	}

	const token = authHeader.split(" ")[1];

	console.log(token);

	if (token !== "554eed7ee061afe8e4f54eced94ea366") {
		return res.status(401).json({ error: "Invalid token" });
	}

	next();
};

//Connect Database
const db = mysql.createPool({
	host: config.host,
	user: config.username,
	password: config.password,
	database: "5-test",
});

//Test API
app.post("/Test", BearerTokenAuth, async (req, res) => {
    console.log("Test 5 | 5-test");
    res.status(200).send({data: "Test 5 | 5-test"});
});

app.listen(port, () => {
	console.log(`5-test | User: 5 | Running on http://localhost:${port}`);
});