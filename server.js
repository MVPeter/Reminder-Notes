const express = require("express");
const fs = require("fs");
const path = require("path");
const PORT = 3033;

const app = express();
const savedNotes = require('./db/db.json');
app.use(express.static("public"))
app.use(express.json())

var noteID = 0;

//root GET route
app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "./public/index.html"));
});

//Notes GET route
app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/notes.html"));
});

//Notes API GET route
app.get("/api/notes", (req, res) => {
    res.json(savedNotes);
});

//Delet API route
app.delete("/api/notes/:id", (req, res) => {
    let returnedID = req.params.id
    console.table(savedNotes)

    for (let i = 0; i < savedNotes.length; i++) {
        if (returnedID == savedNotes[i].id) {
            savedNotes.splice(i, 1);
        }
    }
    console.table(savedNotes)

    const jsonSavedNotes = JSON.stringify(savedNotes);
    fs.writeFile("./db/db.json", jsonSavedNotes, function (err) {
        if (err) {
            console.log("error writing to JSON file");
            return console.log(err);
        }
        console.log("JSON updated");

    });
    res.send("ok");
})

//POST API route
app.post('/api/notes', (req, res) => {
    let returnNote = req.body;
    for (let i = 0; i < savedNotes.length; i++) {
        if (savedNotes[i].id != i) {
            noteID = i
        }
    };
    returnNote.id = noteID;
    savedNotes.push(returnNote);

    // console.log(returnNote);
    console.table(savedNotes);

    const jsonSavedNotes = JSON.stringify(savedNotes);
    fs.writeFile("./db/db.json", jsonSavedNotes, function (err) {
        if (err) {
            console.log("error writing to JSON file");
            return console.log(err);
        }
        console.log("JSON updated");
        res.send("ok");
    });
});

app.listen(PORT, function () {
    console.log("App listening on PORT http://localhost:" + PORT);
});