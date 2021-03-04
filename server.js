const express = require("express");
const fs = require("fs");
const path = require("path");
const PORT = 3033;
// const HTMLdir = path.join(__dirname, "public");
// const CSSdir = path.join(HTMLdir, "assets/css")



var app = express();
const savedNotes = require('./db/db.json');
app.use(express.static("public"))
app.use(express.json())

var noteID = 0;



app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/notes.html"));
});

app.get("/api/notes", (req, res) => {
    res.json(savedNotes);
});

app.delete("/api/notes/:id", (req, res) => {
    let returnedID = req.params.id
    console.table(savedNotes)
    for (let i = 0; i < savedNotes.length; i++) {
        if (returnedID == savedNotes[i].id) {
            savedNotes.splice(i, 1);
        }

    }
    console.log(savedNotes)
    fs.writeFile(savedNotes, jsonContent, utf8, function (err) {
        if (err) {
            console.log("error writing to JSON file");
            return console.log(err);
        }
        console.log("JSON updated");
    })
    res.send("ok");
})

app.post('/api/notes', (req, res) => {
    let returnNote = req.body;
    noteID = noteID + 1;
    returnNote.id = noteID;
    savedNotes.push(returnNote);

    console.log(returnNote);
    console.log(savedNotes);

    const jsonSavedNotes = JSON.stringify(savedNotes);
    fs.writeFile("./db/db.json", jsonSavedNotes, 'utf8', function (err) {
        if (err) {
            console.log("error writing to JSON file");
            return console.log(err);
        }
        console.log("JSON updated");
        res.send("ok");
    })
});

app.listen(PORT, function () {
    console.log("App listening on PORT http://localhost:" + PORT);
});