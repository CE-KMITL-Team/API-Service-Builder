
	//Start: Test
	app.post("/Test", BearerTokenAuth, async (req, res) => {
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
    const decodeDescription = atob(encodeDescription)
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
	//End: Test