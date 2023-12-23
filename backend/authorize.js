const express = require("express");
const { db } = require("./server");
const router = express.Router();

const bcrypt = require("bcrypt");
const bodyParser = require("body-parser");

router.use(express.json());
router.use(bodyParser.urlencoded({ extended: true }));

/*Login*/
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await new Promise((resolve) => {
      db.query(
        "SELECT * FROM user WHERE email = ?",
        [email],
        (err, results) => {
          if (err) throw err;
          resolve(results[0]);
        }
      );
    });

    if (!user) {
      return res.status(401).send("Invalid email or password");
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).send("Invalid email or password");
    } else {
      console.log("Login Successful");
    }

    return res.status(200).send("Login Successfully");
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).send("Internal Server Error");
  }
});

/*Register*/
router.post("/register", async (req, res) => {
  const { firstname, lastname, email, password } = req.body;

  const emailExists = await new Promise((resolve) => {
    db.query("SELECT * FROM user WHERE email = ?", [email], (err, results) => {
      if (err) throw err;
      resolve(results.length > 0);
    });
  });
  if (emailExists) {
    return res.status(400).send("Email is already exists");
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  db.query(
    "INSERT INTO user (firstname, lastname, email, password) VALUES (?,?,?,?)",
    [firstname, lastname, email, hashedPassword],
    (err, results) => {
      if (err) throw err;
      return res.status(200).send("User registered successfully");
    }
  );
});

module.exports = router;
