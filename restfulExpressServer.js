'use strict';

const bodyParser = require('body-parser');
const express = require('express');
const fs = require('fs');
const http = require('http');
const path = require('path');
const morgan = require('morgan');

const petsPath = path.join(__dirname, 'pets.json');
const app = express();

app.use(bodyParser.json());
app.use(morgan('dev'));

app.get('/pets', (req, res, next) => {
  fs.readFile(petsPath, 'utf8', (err, data) => {
    if (err) {
      res.status(500);
      return next(err);
    }
    const pets = JSON.parse(data);
    res.send(pets);
  });
});

app.get('/pets/:number', (req, res, next) => {
  fs.readFile(petsPath, 'utf8', (err, data) => {
    if (err) {
      res.status(500);
      return next(err);
    }
    const pets = JSON.parse(data);
    const number = Number(req.params.number);
    if (number < 0 || number >= pets.length || number === NaN) {
      res.status(404);
      return next('err');
    }
    const pet = pets[number];
    res.send(pet);
  });
});

app.post('/pets', (req, res, next) => {
  const age = parseInt(req.body.age);
  const kind = req.body.kind;
  const name = req.body.name;

  if (!kind || !name || !age || isNaN(age)) {
    res.status(400);
    return next('err');
  }

  let newPet = {'age':age, 'kind':kind, 'name':name};
  fs.readFile(petsPath, 'utf8', (err, data) => {
    if (err) {
      res.status(500);
      return next(err);
    }
    const pets = JSON.parse(data);
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

app.patch('/pets/:index', (req, res, next) => {
  const age = parseInt(req.body.age);
  const kind = req.body.kind;
  const name = req.body.name;

  if (!kind && !name && !age) {
    res.status(400);
    return next(err);
  }
  if (age && isNaN(age)) {
    res.status(400);
    return next(err);
  }

  fs.readFile(petsPath, 'utf8', (err, data) => {
    if (err) {
      res.status(500);
      return next(err);
    }

    const number = parseInt(req.params.index);
    const pets = JSON.parse(data);

    if (number < 0 || number >= pets.length) {
      res.status(400);
      return next(err);
    }

    if (kind && name && age && !isNaN(age)) {
      //complete patch
    }

    const pet = pets[number];
    console.log(pet);
    if (kind) {
      pet['kind'] = kind;
    }
    if (age) {
      pet['age'] = age;
    }
    if (name) {
      pet['name'] = name;
    }
    fs.writeFile(petsPath, JSON.stringify(pets), (err) => {
      if (err) {
        res.status(500);
        return next(err);
      }
      return res.send(pet);
    });
  });
});

app.delete('/pets/:index', (req, res, next) => {
  const number = parseInt(req.params.index);
  fs.readFile(petsPath, 'utf8', (err, data) => {
    if (err) {
      res.status(500);
      return next(err);
    }
    const pets = JSON.parse(data);
    if (number < 0 || number >= pets.length) {
      res.status(400);
      return next(err);
    }
    const deleted = pets.splice(number, 1);
    fs.writeFile(petsPath, JSON.stringify(pets), (err) => {
      if (err) {
        res.status(500);
        return next(err);
      }
      return res.send(deleted);
    });
  });
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
