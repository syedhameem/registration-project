const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// MySQL connection
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

// Connect to MySQL
db.connect((err) => {
  if (err) {
    console.error("MySQL connection failed:", err);
    return;
  }

  console.log("MySQL connected successfully!");
});

// Registration API
app.post("/api/register", (req, res) => {

  console.log("Received data:", req.body);

  const {
    name,
    email,
    mobile,
    age,
    date_of_birth,
    gender
  } = req.body;

  const sql = `
    INSERT INTO users
    (name, email, mobile, age, date_of_birth, gender)
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  const values = [
    name,
    email,
    mobile,
    age,
    date_of_birth,
    gender
  ];

  db.query(sql, values, (err, result) => {

    if (err) {
      console.error("Database error:", err);

      return res.status(500).json({
        message: "Registration failed"
      });
    }

    console.log("User inserted:", result.insertId);

    res.status(201).json({
      message: "Registration successful!",
      userId: result.insertId
    });
  });
});

// Start server
const PORT = process.env.PORT || 3000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});