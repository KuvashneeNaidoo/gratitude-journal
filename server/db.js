// db.js
const fs = require("fs");
const sqlite3 = require("sqlite3").verbose();
const path = require("path");

// Define the database path
const dbPath = path.resolve(__dirname, "db", "gratitude_journal.db");

// Check if the 'db' directory exists, if not, create it
const dbDir = path.resolve(__dirname, "db");
if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true });
  console.log("Created 'db' directory.");
}

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error("Database opening error: ", err);
    return;
  }
  console.log("Connected to the SQLite database");
});

// Ensure the tables are created on first run
db.serialize(() => {
  db.run(
    `CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL
    )`
  );

  db.run(
    `CREATE TABLE IF NOT EXISTS journal_entries (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER,
      content TEXT,
      date TEXT,
      FOREIGN KEY (user_id) REFERENCES users(id)
    )`
  );
});

module.exports = db;
