const express = require("express");
const fs = require("fs");
const path = require("path");
const PORT = 3033;
// const HTMLdir = path.join(__dirname, "public");
// const CSSdir = path.join(HTMLdir, "assets/css")



var app = express();
const notes = require('./db/db.json');
var noteID = 0;


app.use(express.static("public"))
app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/notes.html"));
});

app.get("/api/notes", (req, res) => {
    res.json(notes);
});

app.delete("/api/notes/:id", (req, res) => {
 let returnedID = req.params.id
 console.table(notes)
 for (let i = 0; i < notes.length; i++) {
     if (returnedID == notes[i].id){
         notes[i] = {}
     }
     
 }
 console.log(notes)
     //write call to make a delete
})

app.post('/api/notes', (req, res) => {
    notes.push(req.notes)
})

app.listen(PORT, function () {
    console.log("App listening on PORT http://localhost:" + PORT);
});