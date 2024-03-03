function getUserIndexFileContent(userID, dbName, apiKey) {
	return `const mysql = require("mysql2");
const config = require("../../../config/database.json");

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = ${3200 + userID};
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

	if (token !== "${apiKey}") {
		return res.status(401).json({ error: "Invalid token" });
	}

	next();
};

//Connect Database
const db = mysql.createPool({
	host: config.host,
	user: config.username,
	password: config.password,
	database: "${dbName}",
});

//Test API
app.post("/Test", BearerTokenAuth, async (req, res) => {
    console.log("Test ${userID} | ${dbName}");
    res.status(200).send({data: "Test ${userID} | ${dbName}"});
});

app.listen(port, () => {
	console.log(\`${dbName} | User: ${userID} | Running on http://localhost:\${port}\`);
});`;
}

module.exports = { getUserIndexFileContent };
