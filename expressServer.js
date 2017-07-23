'use strict';
const bodyParser = require("body-parser");
let fs = require("fs");
const express = require("express");
const morgan = require("morgan");
const path = require("path");

const app = express();
app.disable("x-powered-by");
app.use(morgan("short"));
app.use(bodyParser.json());

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

app.post("/guests", (req, res) => {
  const name = req.body.name;
  const kind = req.body.kind;
  const age = req.body.age;
  if (!name || !kind || !age){
    return res.sendStatus(400);
  }
  fs.readFile(petsPath, "utf8", (err, petsJSON) => {
    if (err) {
      console.error(err.stack);
      return res.sendStatus(500);
    }
    const pets = JSON.parse(petsJSON);
    newPet = {
      "name": name,
      "kind": kind,
      "age": age};
    pets.push(newPet);
    const newPetsJSON = JSON.stringify(pets);
    fs.writeFile(petsPath, newPetsJSON, (err) => {
      if (err) {
        console.error(err.stack);
        return res.sendStatus(500);
      }


    });
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
