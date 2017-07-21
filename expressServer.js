"use strict";


const express = require('express');
const bodyParser = require("body-parser");
const fs = require('fs');
const path = require('path');
const app = express();

const pathPets = path.join(__dirname, "pets.json");

app.use(bodyParser.json());

app.get("/pets", (req, res) => {
  fs.readFile(pathPets, "utf8", (err,data) => {
    if(err) {
      console.error(err.stack);
      res.status(500);
      res.send(err.message);
    }

    const pets = JSON.parse(data);

    res.send(pets);
  })
});



app.get("/pets/:id", (req, res) => {
  const id = req.params.id;
  console.log("id: ", id);

  fs.readFile (pathPets, "utf8", (err, petsJSON) => {
    if(err) {
      console.error(err.stack);
      res.status(500);
      res.send(err.message);
    }

    const pets = JSON.parse(petsJSON);

    if(id < 0 || id >= pets.length) {
      res.statusCode=404;
      res.setHeader("Content-Type","text/plain");
      res.send("Not Found");
    }

    const pet = pets[id];

    res.send(pet);
  })
});

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});

module.exports = app;
