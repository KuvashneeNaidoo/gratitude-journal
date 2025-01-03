const jwt = require("jsonwebtoken");
const db = require("./db");
const dotenv = require("dotenv");
dotenv.config();

const SECRET_KEY = process.env.SECRET_KEY || "your-secret-key";

// Register User
function registerUser(username, password, callback) {
  const stmt = db.prepare(
    "INSERT INTO users (username, password) VALUES (?, ?)"
  );
  stmt.run(username, password, function (err) {
    callback(err, this.lastID);
  });
  stmt.finalize();
}

// Login User
function loginUser(username, password, callback) {
  db.get("SELECT * FROM users WHERE username = ?", [username], (err, row) => {
    if (err || !row) return callback("User not found");
    if (password !== row.password) return callback("Invalid credentials");

    const token = jwt.sign({ userId: row.id }, SECRET_KEY, { expiresIn: "1h" });
    callback(null, token);
  });
}

module.exports = { registerUser, loginUser };
