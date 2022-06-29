const express = require("express");
const fs = require("fs");
const path = require("path");
const uniqid = require('uniqid');
const savedNotes = require("./db/db.json");

const PORT = process.env.PORT || 3001;
const app = express();

// middleware and api routes
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/api/notes", (req, res) => {
  res.json(savedNotes);
});

function createNewNote(body, notesArray) {
    const note = body;
    notesArray.push(note);
    fs.writeFileSync(
      path.join(__dirname, "./db/db.json"),
      JSON.stringify({ notes: notesArray }, null, 2)
    );
  
    return note;
  }
  
  app.post("/api/notes", (req, res) => {
    // set unique id
    req.body.id = uniqid();
    // add note to json file and notes array
    const note = createNewNote(req.body, savedNotes);
    res.json(note);
  });
  
app.listen(PORT, () => {
  console.log(`API server now on ${PORT}!`);
});