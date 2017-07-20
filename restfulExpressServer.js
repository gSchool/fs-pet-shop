'use strict';
const bodyParser = require("body-parser");
const fs = require("fs");
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

app.post("/pets", (req, res) => {
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
    const newPet = {
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
      res.set("Content-Type", "text/plain");
      res.send(newPet);
    });
  });
});

app.patch("/pets/:id", (req, res) => {
  fs.readFile(petsPath, "utf8", (err, petsJSON) => {
    if(err) {
      console.error(err.stack);
      return res.sendStatus(500);
    }
    const id = Number.parseInt(req.params.id);
    const pets = JSON.parse(petsJSON);
    if (id < 0 || id >= pets.length || Number.isNaN(id)){
      return res.sendStatus(404);
    }
    let pet = pets[id]

    const name = req.body.name;
    const age = req.body.age;
    const kind = req.body.kind;

    if (!name && !age && !kind){
      return res.sendStatus(400);
    }
    if (age && Number.isNaN(age)){
      return res.sendStatus(400);
    }
    if (name){
      pet.name = name;
    }
    if (age){
      pet.age = age;
    }
    if (kind){
      pet.kind = kind;
    }
    pets[id] = pet;
    const newPetsJSON = JSON.stringify(pets);

    fs.writeFile(petsPath, newPetsJSON, (err) =>{
      if (err) {
        console.error(err.stack);
        return res.sendStatus(500);
      }
      res.set("Content-Type", "text/plain");
      res.send(pet);
    });
  });
});

app.delete("/pets/:id", (req, res) => {
  fs.readFile(petsPath, "utf8", (err, petsJSON) => {
    if (err) {
      console.error(err.stack);
      return res.sendStatus(500);
    }
    const id = Number.parseInt(req.params.id);
    const pets = JSON.parse(petsJSON);

    if (id < 0 || id >= pets.length || Number.isNaN(id)) {
      return res.sendStatus(404);
    }
    const pet = pets.splice(id, 1);
    const newPetsJSON = JSON.stringify(pets);

    fs.writeFile(petsPath, newPetsJSON, (err) => {
      if (err){
        console.error(err.stack);
        return res.sendStatus(500);
      }
      res.set("Content-Type", "text/plain");
      res.send(pet);
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
