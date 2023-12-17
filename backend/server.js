const express = require('express');
const router = express.Router();
const mysql = require("mysql2");

// Your MySQL connection configuration
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "api-service-builder",
});

// Connect to MySQL
db.connect((err) => {
  if (err) {
    console.log("Error connecting to MySQL:", err);
  } else {
    console.log("Connected to MySQL database");
  }
});

// Export the router and db for use in other files
module.exports = router;
