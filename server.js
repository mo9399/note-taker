const express = require("express");
const savedNotes = require("./db/db.json");

const app = express();
const PORT = process.env.PORT || 3001;

app.get("/api/notes", (req, res) => {
  res.json(savedNotes);
});

app.listen(PORT, () => {
  console.log(`API server now on ${PORT}!`);
});