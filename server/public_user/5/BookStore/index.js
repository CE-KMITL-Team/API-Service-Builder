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
	database: "5-BookStore",
});

//API List
//Start: addBook
	app.post("/book/addBook", BearerTokenAuth, async (req, res) => {
		try {
const response = req.body
const [queryData] = await db.promise().query(`SELECT * FROM \`book\` WHERE "${response.name}" = book.name ORDER BY id ASC LIMIT 1`)
const count = queryData?.length ?? 0
if (count == 0) {
    await db.promise().query(`INSERT INTO \`book\` (name, price, description) VALUES ('${response.name}', '${response.price}', '${response.description}');`);
    res.status(200).send({
"status": true,
"msg": "เพิ่มข้อมูลสำเร็จ"
});
} else {
    res.status(409).send({
"status": false,
"msg": "เพิ่มข้อมูลไม่สำเร็จ"
});
}
    } catch (error) {
        console.error('Error:', error);
    }
	});
//End: addBook
//Start: getBook
	app.post("/book/get", BearerTokenAuth, async (req, res) => {
		try {
const response = req.body
const [queryData] = await db.promise().query(`SELECT * FROM \`book\` WHERE 1`)
    } catch (error) {
        console.error('Error:', error);
    }
	});
//End: getBook


app.listen(port, () => {
	console.log(`5-BookStore | User: 5 | Running on http://localhost:${port}`);
});