const express = require("express");
const router = express.Router();

const bcrypt = require("bcrypt");

const userModel = require("../models/userModel");

/* Login */
router.post("/login", async (req, res) => {
	const { email, password } = req.body;

	//Error Message
	const error = { msg: "Incorrect user !", status: false };

	try {
		//Query SELECT
		const data = await userModel.findOne({ where: { email } });

		if (!data) {
			return res.status(200).send(error);
		}

		//Check Password
		const passwordMatch = await bcrypt.compare(password, data.password);

		if (!passwordMatch) {
			return res.status(200).send(error);
		}

		delete data.dataValues.password;

		return res.status(200).send({ userData: data, status: true });
	} catch (error) {
		console.error("Error:", error);
		return res.status(500).send("Internal Server Error");
	}
});

/*Register*/
router.post("/register", async (req, res) => {
	const { firstname, lastname, email, password } = req.body;

	//Error Message
	const error = { msg: "Email is already exists", status: false };

	//Query SELECT
	const data = await userModel.findOne({ where: { email } });

	if (data) {
		return res.status(200).send(error);
	}
	const hashedPassword = await bcrypt.hash(password, 10);

	userModel
		.create({
			firstname: firstname,
			lastname: lastname,
			email: email,
			password: hashedPassword,
		})
		.then((result) => {
			delete result.dataValues.password;
			return res.status(200).send({ userData: result, status: true });
		})
		.catch((err) => {
			return res
				.status(200)
				.send({ ...error, msg: "Error registering user" });
		});
});

/* Check if email exists */
router.post("/check-email", async (req, res) => {
	const { email } = req.body;

	try {
		// Query SELECT
		const data = await userModel.findOne({ where: { email } });

		if (data) {
			return res
				.status(200)
				.send({ msg: "Email already exists", status: false });
		}

		return res.status(200).send({ status: true });
	} catch (error) {
		console.error("Error:", error);
		return res.status(500).send("Internal Server Error");
	}
});

module.exports = router;
