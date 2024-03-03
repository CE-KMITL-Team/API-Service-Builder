const mysql = require("mysql2");
const config = require("../../config/database.json");

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

//Test
app.post("/Test", async (req, res) => {
	try {
		let sql = "";

		//request node_0: $response
		const response = req.body;

		//count node_17091090180002: $response.name, $count
		const count = response.name.length;

		//encode-base64 node_17091090190843: type Encode, $response.description, $encodeDescription
		const encodeDescription = btoa(response.description);

		//database node_17091090467394: model: Book, method query, $queryData, NoLimit: true, queryDirection: ASC, quertOrderBy: id, queryCondition: have
		sql = "SELECT * FROM `Book` WHERE `Book`.name = ? ORDER BY id ASC";
		const [queryData] = await db.promise().query(sql, [response.name]);

		//count node_17091090664835: $queryCount,$queryData
		const queryCount = queryData.length;

		//condition node_17091090158231: have 3 conditions
		if (queryCount >= 1 && queryCount != 0 || queryCount > 0) {
			//ReactFlow Way 1

			//count node_17091090818438: $response.author, $countAuthor
			const countAuthor = response.author.length;

			//return-response node_17091090783086: statusCode: 200 OK
			res.status(200).send({
				response: response,
				count: count,
				encodeDesc: encodeDescription,
				bookFirstQuery: queryData,
				CountFirstQuery: queryCount,
				CountAuthor: countAuthor,
			});
		} else {
			//ReactFlow Way 2

			//encode-base64 node_17091133216399: type Decode, $encodeDescription, $decodeDescription
			const decodeDescription = atob(encodeDescription);

			//database node_170911389105810: model: Book, method insert, $insertResult
			sql =
				"INSERT INTO `Book` (name, description, price, author) VALUES (?, ?, ?, ?)";
			const [insertResult] = await db
				.promise()
				.query(sql, [
					response.name,
					response.description,
					response.price,
					response.author,
				]);

			//return-response node_17091090793867: statusCode: 200 OK
			res.status(200).send({
				response: response,
				count: count,
				encodeDesc: encodeDescription,
				bookFirstQuery: queryData,
				CountFirstQuery: queryCount,
				decodeDescription: decodeDescription,
				insertResult: insertResult,
			});
		}
	} catch (err) {
		console.error("Error:", err);
		res.status(500).send("Internal Server Error");
	}
});

app.listen(port, () => {
	console.log(`Server is running on http://localhost:${port}`);
});
