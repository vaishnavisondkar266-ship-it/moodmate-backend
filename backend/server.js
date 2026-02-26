const express = require("express");
const cors = require("cors");
const sqlite3 = require("sqlite3").verbose();
const path = require("path");

const app = express();

app.use(cors());
app.use(express.json());

/* =========================
   DATABASE SETUP
========================= */

const dbPath = path.join(__dirname, "moodmate.db");

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error("Database connection error:", err.message);
  } else {
    console.log("Connected to SQLite database");
  }
});

/* =========================
   TABLES
========================= */

// Users table
db.run(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    email TEXT UNIQUE,
    password TEXT,
    role TEXT
  )
`);

// Default admin
db.run(
  "INSERT OR IGNORE INTO users (name,email,password,role) VALUES (?,?,?,?)",
  ["Admin", "admin@gmail.com", "1234", "admin"]
);

// Entries table
db.run(`
  CREATE TABLE IF NOT EXISTS entries (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    mood TEXT,
    sleep INTEGER,
    journal TEXT
  )
`);

/* =========================
   ROUTES
========================= */

// Root Route (VERY IMPORTANT)
app.get("/", (req, res) => {
  res.status(200).send("MoodMate Backend Running Successfully 🚀");
});

// Register
app.post("/api/register", (req, res) => {
  const { name, email, password } = req.body;

  db.run(
    "INSERT INTO users (name,email,password,role) VALUES (?,?,?,?)",
    [name, email, password, "user"],
    function (err) {
      if (err) {
        return res.status(400).json({ error: "User already exists" });
      }

      res.json({
        message: "Registration successful",
        userId: this.lastID,
      });
    }
  );
});

// Login
app.post("/api/login", (req, res) => {
  const { email, password } = req.body;

  db.get(
    "SELECT * FROM users WHERE email=? AND password=?",
    [email, password],
    (err, user) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }

      if (!user) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      res.json({
        message: "Login success",
        role: user.role,
        userId: user.id,
      });
    }
  );
});

// Save Entry
app.post("/api/entries", (req, res) => {
  const { mood, sleep, journal } = req.body;

  db.run(
    "INSERT INTO entries (mood,sleep,journal) VALUES (?,?,?)",
    [mood, sleep, journal],
    function (err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }

      res.json({ id: this.lastID });
    }
  );
});

// Get Entries
app.get("/api/entries", (req, res) => {
  db.all("SELECT * FROM entries ORDER BY id DESC", [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    res.json(rows);
  });
});

/* =========================
   SERVER START (Railway Fix)
========================= */

const PORT = process.env.PORT;

app.listen(PORT, "0.0.0.0", () => {
  console.log("Server running on port " + PORT);
});