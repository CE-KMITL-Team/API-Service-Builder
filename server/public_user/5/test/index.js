const mysql = require("mysql2");
const config = require("../../../config/database.json");

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = 3202;
app.use(cors());

//Setting Json Body
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

const db = mysql.createPool({
	host: config.host,
	user: config.username,
	password: config.password,
	database: "2-book-store",
});

//API List
//Start: Test
	app.post("/TestAPI", BearerTokenAuth, async (req, res) => {
		try {
const response = req.body
const [bookData] = await db.promise().query(`SELECT * FROM \`book\` WHERE 1`)
res.status(200).send({
book: bookData
});
    } catch (error) {
        console.error('Error:', error);
    }
	});
//End: Test


app.listen(port, () => {
	console.log(`Server is running on http://localhost:${port}`);
});
