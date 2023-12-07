const express = require("express");
const mysql = require("mysql2");
const bcrypt = require("bcrypt");
const bodyParser = require("body-parser");

const app = express();
const port = 3000;
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "api-service-builder",
});

connection.connect((err) => {
  if (err) {
    console.log("Error connecting to MySQL = ", err);
    return;
  }
  console.log("Connected to MySQL");
});

//หน้า Register
app.post("/register", async (req, res) => {
  const { firstname, lastname, email, password } = req.body;

  const emailExists = await new Promise((resolve) => {
    connection.query(
      "SELECT * FROM user WHERE email = ?",
      [email],
      (err, results) => {
        if (err) throw err;
        resolve(results.length > 0);
      }
    );
  });
  if (emailExists) {
    return res.status(400).send("Email is already exists");
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  connection.query(
    "INSERT INTO user (firstname, lastname, email, password) VALUES (?,?,?,?)",
    [firstname, lastname, email, hashedPassword],
    (err, results) => {
      if (err) throw err;
      return res.status(200).res.send("User registered successfully");
    }
  );
});

//หน้า login
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await new Promise((resolve) => {
    connection.query(
      "SELECT * FROM user WHERE email = ?",
      [email],
      (err, results) => {
        if (err) throw err;
        resolve(results[0]);
      }
    );
  });
  if (!user) {
    return res.status(401), send("Invalid email or password");
  }
  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) {
    return res.status(401).send("Invalid email or password");
  }
  return res.status(200).send("Login Successfully");
});

app.listen(3000, () => console.log(`Server is running on port ${port}`));
