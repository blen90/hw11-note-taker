// Dependencies
const express = require('express');
const fs = require('fs');
const dbNote = require('./db/db.json');
const path = require('path');
const { v4: uuidv4 } = require('uuid');


const app = express();
const PORT = 3000;


app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static('public'));


// Routes

//Route to index.html file
app.get('/', (req, res) => res.sendFile(path.join(__dirname, './public/index.html')));



 //Route to notes.html file
app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, './public/notes.html')));

//Route to db file

app.get('api/notes', (req, res) => res.sendFile(path.join(__dirname, './db/db.json')));



//Get note from db file

app.post('/api/notes', (req, res) => {
    const dbNote = JSON.parse(fs.readFileSync ("./db/db.json"));
    const newEntry = req.body;
    req.body.id = uuidv4();
    console.log(newEntry);
    // console.log(newEntry.body);
    // console.log(newEntry.id);


    dbNote.push(newEntry);


    fs.writeFileSync("./db/db.json", JSON.stringify(dbNote));
    res.json(dbNote);
});

app.delete('/api/notes/:id', (req,res) => {
   const { id } = req.params.id;

   const deletedNote = dbNote.find(dbNote => dbNote.id === id)
   if(deletedNote) {
        dbNote = dbNote.filter(dbNote => dbNote.id =! id)
   }else {

   }
   res.status(404).json({message: "Deleted note doesn't exist"});

   fs.writeFileSync("./db/db.json", JSON.stringify(deletedNote));
    res.json(deletedNote);
})

app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));