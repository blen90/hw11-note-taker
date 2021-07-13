// Dependencies
const express = require('express');
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const existingNote = require('./db/db.json');


const app = express();
const PORT = process.env.PORT || 3000;


app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static('./public'));

// ROUTES GET METHOD

//Route to index.html file
app.get('/', (req, res) => { 
    res.sendFile(path.join(__dirname, './public/index.html'));
});

 //Route to notes.html file
app.get('/notes', (req, res) => { 
    res.sendFile(path.join(__dirname, './public/notes.html'));
});

//Route to db file
app.get('api/notes', (req, res) => { 
    res.sendFile(path.join(__dirname, "./db/db.json"));
});

//Route to Html file
app.get('*', (req, res) => { 
    res.sendFile(path.join(__dirname, "./public/index.html"));
});


//POST MEHTHOD
app.post('/api/notes', (req, res) => {

    const existingNote = JSON.parse(fs.readFileSync ("./db/db.json"));
    const newEntry = req.body;
    newEntry.id = uuidv4();
    
    console.log(newEntry);
    console.log(newEntry.id);

  
    // PUSH newEntry to existingNote
    existingNote.push(newEntry);

    
    fs.writeFileSync("./db/db.json", JSON.stringify(existingNote));
    res.json(existingNote);
});

app.delete('/api/notes/:id', (req,res) => {
    const { id } = req.params.id;
 
    const delNote = existingNote.find(existingNote => existingNote.id === id)
    if(delNote) {
         existingNote = existingNote.filter(existingNote => existingNote.id =! id)
    }else {
 
    }
    res.status(404).json({message: "Note doesn't exist"});
 
    fs.writeFileSync("./db/db.json", JSON.stringify(delNote));
     res.json(delNote);
 });
 





app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));
