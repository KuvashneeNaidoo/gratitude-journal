const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

const authRoutes = require("./authRoutes");
const journalRoutes = require("./journalRoutes");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Define a root route to handle GET /
app.get("/", (req, res) => {
  res.send("Welcome! The server is running successfully.");
});

app.use("/api/auth", authRoutes);
app.use("/api/journal", journalRoutes);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`✅ Success! Server is running and listening on port ${port}`);
  console.log(`🌐 You can access the API at http://localhost:${port}`);
});
