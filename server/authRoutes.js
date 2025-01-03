const express = require("express");
const router = express.Router();
const { registerUser, loginUser } = require("./auth");

router.post("/register", (req, res) => {
  const { username, password } = req.body;

  if (!username || !password)
    return res.status(400).send("Username and password required");

  registerUser(username, password, (err) => {
    if (err) return res.status(500).send("Error registering user");
    res.status(201).send({ message: "User registered successfully" });
  });
});

router.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (!username || !password)
    return res.status(400).send("Username and password required");

  loginUser(username, password, (err, token) => {
    if (err) return res.status(400).send(err);
    res.status(200).send({ token });
  });
});

module.exports = router;
