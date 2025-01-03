const express = require("express");
const router = express.Router();
const db = require("./db");
const jwt = require("jsonwebtoken");

function verifyToken(req, res, next) {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(403).send("No token provided");

  jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
    if (err) return res.status(500).send("Failed to authenticate token");
    req.userId = decoded.userId;
    next();
  });
}

router.get("/entries", verifyToken, (req, res) => {
  db.all(
    "SELECT * FROM journal_entries WHERE user_id = ? ORDER BY date DESC",
    [req.userId],
    (err, rows) => {
      if (err) return res.status(500).send("Error fetching entries");
      res.send(rows);
    }
  );
});

router.post("/entries", verifyToken, (req, res) => {
  const { content } = req.body;
  const date = new Date().toISOString();
  db.run(
    "INSERT INTO journal_entries (user_id, content, date) VALUES (?, ?, ?)",
    [req.userId, content, date],
    function (err) {
      if (err) return res.status(500).send("Error adding entry");
      res.status(201).send({ id: this.lastID, content, date });
    }
  );
});

router.put("/entries/:id", verifyToken, (req, res) => {
  const { content } = req.body;
  const { id } = req.params;
  db.run(
    "UPDATE journal_entries SET content = ? WHERE id = ? AND user_id = ?",
    [content, id, req.userId],
    function (err) {
      if (err) return res.status(500).send("Error updating entry");
      res.send({ id, content, date: new Date().toISOString() });
    }
  );
});

router.delete("/entries/:id", verifyToken, (req, res) => {
  const { id } = req.params;
  db.run(
    "DELETE FROM journal_entries WHERE id = ? AND user_id = ?",
    [id, req.userId],
    function (err) {
      if (err) return res.status(500).send("Error deleting entry");
      res.send({ id });
    }
  );
});

module.exports = router;
