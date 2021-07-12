// Dependencies
const path = require("path");
const express = require('express');
const fs = require('fs');
const db = require('./db/db.json');
const { v4: uuidv4 } = require('uuid');
const { stringify } = require("querystring");
uuidv4();


const app = express();
const PORT = 3000;


app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static('public'));

//Routes

// Routes

//Route to index.html file
app.get('/', (req, res) => res.sendFile(path.join(__dirname, './public/index.html')));

//Route to notes.html file
app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, './public/notes.html')));

//Route to db file

app.get('api/notes', (req, res) => res.sendFile(path.join(__dirname, './db/db.json')));

//Route * to index.html

app.get('*', (req, res) => res.sendFile(path.join(__dirname, './public/index.html')));

//Get note from db file

