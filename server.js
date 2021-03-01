const express = require("express");
const path = require("path");
const PORT = 3033;
const HTMLdir = path.join(__dirname, "/public/");
var app = express();
var notes = [];
var noteID = 0;

app.get("/", function(req, res) {
    res.sendFile(path.join(HTMLdir, "index.html"));
});

app.get("/notes", (req, res) => {
    res.sendFile(path.join(HTMLdir, "notes.html"));
});

app.get("/api/notes", (req, res) => {

});

app.delete("/api/notes/id/:id", (req, res) => {

})

app.post('/api/notes', (req, res) =>{

})

app.listen(PORT, function() {
    console.log("App listening on PORT http://localhost:" + PORT);
  });