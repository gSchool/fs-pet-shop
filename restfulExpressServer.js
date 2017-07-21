'use strict';

const express = require('express');
const fs = require('fs');
const path = require('path');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const app = express();
const petsPATH = path.join(__dirname, 'pets.json');

app.use(morgan('short'));
app.use(bodyParser.json());


app.get('/pets', (req, res) => {
  fs.readFile(petsPATH, 'utf8', (err, data) => {
      if (err) {
        console.error(err.stack);
        res.sendStatus(500);
      }

      const pets = JSON.parse(data);

      res.send(pets);
  });
});

app.get('/pets/:id', (req, res) => {
  const id = parseInt(req.params.id);

  fs.readFile(petsPATH, 'utf8', (err, data) => {
    if (err) {
      console.error(err.stack);
      res.sendStatus(500);
    }

    const pets = JSON.parse(data);
    if (id < 0 || id >= pets.length || isNaN(id)) {
      res.sendStatus(404);
    }

    const singlePet = pets[id];


    res.send(singlePet);
  });
});

app.post('/pets', (req, res) => {

  fs.readFile(petsPATH, 'utf8', (err, data) =>{
    if (err) {
      res.sendStatus(500);
    }

    let pets = JSON.parse(data);
    const age = parseInt(req.body.age);
    const kind = req.body.kind;
    const name = req.body.name;

    if (!age || !kind || !name || isNaN(age) ) {
      res.sendStatus(400);
    }

    const newPet = {
      age: age,
      kind: kind,
      name: name
    }

    pets.push(newPet);
    pets = JSON.stringify(pets);

    fs.writeFile(petsPATH, pets, (err) => {
      if (err) {
        res.sendStatus(500);
      }
      res.send(newPet);
    });
  });
});

app.patch('/pets/:id', (req, res) => {
  const id = parseInt(req.params.id);

  fs.readFile(petsPATH, 'utf8', (err, data) => {
    if (err) {
      res.sendStatus(500);
    }

    const pets = JSON.parse(data);
    if (id < 0 || id >= pets.length || isNaN(id)) {
      res.sendStatus(404);
    }

    const age = req.body.age;
    const kind = req.body.kind;
    const name = req.body.name;


    if (!age && !kind && !name) {
      res.sendStatus(404);
    }

    if (age && isNaN( parseInt(age) ) ) {
      res.sendStatus(400);
    }

    let updatingPet = pets[id];

    if (age) {
      updatingPet.age = age;
    }

    if (kind) {
      updatingPet.kind = kind;
    }

    if (name) {
      updatingPet.name = name;
    }

    pets[id] = updatingPet;

    const newPetsJSON = JSON.stringify(pets);

    fs.writeFile(petsPATH, newPetsJSON, (writeErr) => {
      if (writeErr) {
        console.error(writeErr.stack);
        res.sendStatus(500);
      }

      res.send(updatingPet);
    });
  });
});

app.delete('/pets/:id', (req, res) => {
  fs.readFile(petsPATH, 'utf8', (err, data) => {
    if (err) {
      res.sendStatus(500);
    }

    const id = parseInt(req.params.id);
    const pets = JSON.parse(data);

    if (id < 0 || id >= pets.length || isNaN(id) ) {
      res.sendStatus(404);
    }

    const pet = pets.splice(id, 1)[0];
    const newPetsJSON = JSON.stringify(pets);

    fs.writeFile(petsPATH, newPetsJSON, (writeErr) => {
      if(writeErr) {
        console.error(writeErr.stack);
        res.sendStatus(500);
      }

      res.send(pet);
    });  
  });
});



const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

module.exports = app;
