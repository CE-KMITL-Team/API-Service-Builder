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

//API List




//Start: Moth
	app.post("/M/MMAO", BearerTokenAuth, async (req, res) => {
		const response = req.body
const count = response.name.length
const encodeDescription = btoa(response.description)
const [queryData] = await db.promise().query(`SELECT * FROM \`book\` WHERE ${db.Book.name} = ${response.name}`)
const queryCount = queryData.length
if ($queryCount >= 1 && $queryCount != 0 || $queryCount > 0) {
    const countAuthor = response.author.length
    if (true) {
        const count = response.name.length
        const imageBase64 = btoa()
        res.status(200).send(response);
    } else {
        res.status(200).send({
"response": response,
"count": count,
"encodeDesc": encodeDescription,
"bookFirstQuery": queryData,
"CountFirstQuery": queryCount,
"CountAuthor": countAuthor
});
    }
} else {
    const decodeDescription = atob(encodeDescripsafasfasfafstion)
    await db.promise().query(`INSERT INTO \`book\` (name, description, price, author) VALUES ('${response.name}', '${response.description}', '${response.price}', '${response.author}');`);
    const [queryData] = await db.promise().query(`DELETE FROM \`user\` WHERE ${a} = ${b} or ${c} = ${d}`);
    res.status(200).send({
"response": response,
"count": count,
"encodeDesc": encodeDescription,
"bookFirstQuery": queryData,
"CountFirstQuery": queryCount,
"decodeDescription": decodeDescription,
"insertResult": insertResult
});
}
	});
//End: Moth


app.listen(port, () => {
	console.log(`Server is running on http://localhost:${port}`);
});
