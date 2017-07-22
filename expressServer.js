'use strict';

const bodyParser = require('body-parser');
const express = require('express');
let fs = require('fs');
const http = require('http');
const path = require('path');

const petsPath = path.join(__dirname, 'pets.json');
const app = express();

app.use(bodyParser.json());

app.get('/pets', (req, res, next) => {
  fs.readFile(petsPath, 'utf8', (err, data) => {
    if (err) {
      res.status(500);
      return next(err);
    }
    let pets = JSON.parse(data);
    res.send(pets);
  });
});

app.get('/pets/:number', (req, res, next) => {
  fs.readFile(petsPath, 'utf8', (err, data) => {
    if (err) {
      res.status(500);
      return next(err);
    }
    let pets = JSON.parse(data);
    const number = Number(req.params.number);
    if (number < 0 || number >= pets.length || number === NaN) {
      res.status(404);
      return next('err');
    }
    let pet = pets[number];
    res.send(pet);
  });
});

app.post('/pets', (req, res, next) => {
  console.log('hi')
  const age = parseInt(req.body.age);
  const kind = req.body.kind;
  const name = req.body.name;

  if (!kind || !name || !age || isNaN(age)) {
    res.status(400);
    return next('err');
  }

  let newPet = {'age':age, 'kind':kind, 'name':name};
  console.error(newPet);
  fs.readFile(petsPath, 'utf8', (err, data) => {
    if (err) {
      res.status(500);
      return next(err);
    }
    let pets = JSON.parse(data);
    pets.push(newPet);
    pets = JSON.stringify(pets);
    fs.writeFile(petsPath, pets, (err) => {
      if (err) {
        res.status(500);
        return next(err);
      }
      res.send(newPet);
    });
  });
});

app.use((req, res, next) => {
  res.set({'Content-Type' : 'text/plain'});
  res.sendStatus(404);
});

app.use((err, req, res, next) => {
  res.set({'Content-Type':'text/plain'});
  res.sendStatus(res.statusCode);
});

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

module.exports = app;
