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

//POST (create)
app.post("/pets", (req, res) => {
  fs.readFile (pathPets, "utf8", (err, petsJSON) => {
    if(err) {
      console.error(err.stack);
      res.status(500);
      res.send(err.message);
    }
    var pets = JSON.parse(petsJSON);

    const age = req.body.age;
    const kind = req.body.kind;
    const name = req.body.name;

    if( Number.isNaN(parseInt(age)) || !kind || !name) {
      res.statusCode=400;
      res.setHeader("Content-Type","text/plain");
      res.send("Bad Request");
    }

    const newPet = {name: name, age: age, kind: kind};

    pets.push(newPet);

    const updatedPets = JSON.stringify(pets);

    fs.writeFile(pathPets, updatedPets, (writeErr) => {
      if (writeErr) {
        console.error(writeErr.stack);
        return res.sendStatus(500);
      }
        res.set('Content-Type', 'text/plain');
        res.send(newPet);
    });
  });
});

//PATCH (update)
app.patch("/pets/:id", (req, res) => {
  fs.readFile (pathPets, "utf8", (err, petsJSON) => {
    if(err) {
      console.error(err.stack);
      res.status(500);
      res.send(err.message);
    }
    var pets = JSON.parse(petsJSON);

    const id = req.params.id;

    const age = req.body.age;
    const kind = req.body.kind;
    const name = req.body.name;
    console.log(age,kind,name);
    if(id < 0 || id >= pets.length) {
      res.statusCode=404;
      res.setHeader("Content-Type","text/plain");
      res.send("Not Found");
    }

    if( Number.isNaN(parseInt(age)) || !kind || !name) {
      res.statusCode=400;
      res.setHeader("Content-Type","text/plain");
      res.send("Bad Request");
    }

    const updatedPet = {name: name, age: age, kind: kind};

    pets[id] = updatedPet;

    const updatedPets = JSON.stringify(pets);

    fs.writeFile(pathPets, updatedPets, (writeErr) => {
      if (writeErr) {
        console.error(writeErr.stack);
        return res.sendStatus(500);
      }
        res.set('Content-Type', 'text/plain');
        res.send(updatedPet);
    });
  });
});

//delete
app.delete("/pets/:id", (req, res) => {
  fs.readFile (pathPets, "utf8", (err, petsJSON) => {
    if(err) {
      console.error(err.stack);
      res.status(500);
      res.send(err.message);
    }
    var pets = JSON.parse(petsJSON);

    const id = req.params.id;

    if(id < 0 || id >= pets.length) {
      res.statusCode=404;
      res.setHeader("Content-Type","text/plain");
      res.send("Not Found");
    }

    const deletedPet = pets.splice(id, 1)[0];

    const updatedPets = JSON.stringify(pets);

    fs.writeFile(pathPets, updatedPets, (writeErr) => {
      if (writeErr) {
        console.error(writeErr.stack);
        return res.sendStatus(500);
      }
        res.set('Content-Type', 'text/plain');
        res.send(deletedPet);
    });
  });
});


const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});

module.exports = app;
