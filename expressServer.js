'use strict';
const bodyParser = require("body-parser");
const fs = require("fs");
const express = require("express");
const morgan = require("morgan");
const path = require("path");

const app = express();
app.disable("x-powered-by");

const petsPath = path.join(__dirname, "pets.json");

app.get("/pets", (req, res) => {
  fs.readFile(petsPath, "utf8", (err, petsJSON) => {
    if(err){
      console.error(err.stack);
      return res.sendStatus(500);
    }
    const pets = JSON.parse(petsJSON);
    res.send(pets);
  });
});

app.get("/pets/:id", (req, res) => {
  fs.readFile(petsPath, "utf8", (err, petsJSON) =>{
    if(err){
      console.error(err.stack);
      return res.sendStatus(500);
    }
    const id = Number.parseInt(req.params.id);
    const pets = JSON.parse(petsJSON);

    if (id < 0 || id >= pets.length || Number.isNaN(id)){
      return res.sendStatus(404);
    }
    res.send(pets[id]);
  });
});

app.use((req, res) => {
  res.sendStatus(404);
});





const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

module.exports = app;
