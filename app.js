'use strict';

const fs = require('fs');
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const app = express();
const petsPath = path.join(__dirname, 'pets.json');

app.use(morgan('short'));
app.use(bodyParser.json());

app.get('/pets/:idx', (req, res) => {
  fs.readFile(petsPath, 'utf8', (err, data) => {
    if (err) {
      throw err;
    }
    const pets = JSON.parse(data);

    if (req.params.idx) {
      const idx = parseInt(req.params.idx);

      if (pets[idx]) {
        res.send(JSON.stringify(pets[idx]));
      }
      else if (!pets[idx]) {
        res.statusCode = 404;
        res.send('404 no such pet');
      }
    }
  });
});
app.get('/pets', (req, res) => {
  fs.readFile(petsPath, 'utf8', (err, data) => {
    if (err) {
      throw err;
    }
    const pets = JSON.parse(data);

    res.statusCode = 200;
    res.send(pets);
  });
});
app.get('/*', (req, res) => {
  res.statusCode = 404;
  res.send('404 not found');
});
app.post('/pets', (req, res) => {
  const body = req.body;

  const age = body.age;
  const kind = body.kind;
  const name = body.name;

  fs.readFile(petsPath, 'utf8', (err, data) => {
    if (err) {
      throw err;
    }
    if (!age || !kind || !name || isNaN(parseInt(age)) || parseInt(age) < 0) {
      res.send('404 bad query');
    }
    else {
      const pets = JSON.parse(data);
      const newPet = {};

      newPet.age = parseInt(age);
      newPet.kind = kind;
      newPet.name = name;
      pets.push(newPet);

      const petsJSON = JSON.stringify(pets);

      fs.writeFile(petsPath, petsJSON, (writeErr) => {
        if (writeErr) {
          throw writeErr;
        }
        res.send(newPet);
      });
    }
  });
});
app.put('/pets/:idx', (req, res) => {
  const index = Number.parseInt(req.params.idx);
  const body = req.body;
  const age = parseInt(body.age);
  const kind = body.kind;
  const name = body.name;

  fs.readFile(petsPath, 'utf8', (err, data) => {
    if (err) {
      throw err;
    }
    const pets = JSON.parse(data);

    if (!age || !kind || !name || isNaN(parseInt(age)) ||
    parseInt(age) < 0 || !pets[index]) {
      return res.sendStatus(404);
    }
    const newPet = req.body;

    newPet.age = age;
    pets[index] = newPet;
    const petsJSON = JSON.stringify(pets);

    fs.writeFile(petsPath, petsJSON, (writeErr) => {
      if (writeErr) {
        throw writeErr;
      }
      res.send(newPet);
    });
  });
});
app.delete('/pets/:idx', (req, res) => {
  const index = Number.parseInt(req.params.idx);

  fs.readFile(petsPath, 'utf8', (err, data) => {
    if (err) {
      throw err;
    }
    const pets = JSON.parse(data);

    if (Number.isNaN(index) || index < 0 || index >= pets.length) {
      return res.sendStatus(404);
    }
    const pet = pets.splice(index, 1)[0];
    const petsJSON = JSON.stringify(pets);

    fs.writeFile(petsPath, petsJSON, (writeErr) => {
      if (writeErr) {
        throw writeErr;
      }
      res.send(pet);
    });
  });
});

app.patch('/pets/:idx', (req, res) => {
  const index = parseInt(req.params.idx);
  const body = req.body;
  const age = body.age;
  const kind = body.kind;
  const name = body.name;

  fs.readFile(petsPath, 'utf8', (err, data) => {
    if (err) {
      throw err;
    }
    const pets = JSON.parse(data);

    if ((!age && !kind && !name) || (age && (isNaN(parseInt(age)) ||
     (parseInt(age) < 0))) || Number.isNaN(index) || index < 0 ||
    index >= pets.length) {
      return res.sendStatus(404);
    }
    const newPet = pets[index];

    if (age) {
      newPet.age = parseInt(age);
    }
    if (kind) {
      newPet.kind = kind;
    }
    if (name) {
      newPet.name = name;
    }
    pets.splice(index, 1, newPet);

    const petsJSON = JSON.stringify(pets);

    fs.writeFile(petsPath, petsJSON, (writeErr) => {
      if (writeErr) {
        throw writeErr;
      }
      res.send(newPet);
    });
  });
});

app.listen(3000, () => {
  console.log('starting server on localhost:3000');
});
