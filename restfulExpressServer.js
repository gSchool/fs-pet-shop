require('dotenv').config();
const fs = require('fs');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const auth = require('basic-auth');
const express = require('express');

const app = express();
const port = process.env.PORT || 8000;
const path = './pets.json';

// Basic Authorization
app.use((req, res, next) => {
  const creds = auth(req);

  if (!creds || creds.name !== 'admin' || creds.pass !== 'meowmix') {
    // console.log('ACCESS DENIED');
    res.header('WWW-Authenticate', 'Basic realm="Required"');
    res.header('Content-Type', 'text/plain');
    res.status(401).send('Unauthorized');
  } else {
    // console.log('ACCESS GRANTED');
    next();
  }
});

app.use(morgan('short'));
app.use(bodyParser.json());

app.get('/pets', (req, res) => {
  fs.readFile(path, (err, petsJSON) => {
    if (err) throw err;
    res.header('Content-Type', 'application/json');
    res.status(200).send(JSON.parse(petsJSON));
  });
});

app.get('/pets/:id', (req, res) => {
  fs.readFile(path, 'utf8', (err, petsJSON) => {
    if (err) throw err;
    const pets = JSON.parse(petsJSON);
    const petId = req.params.id;

    if (Number.isNaN(petId) || petId < 0 || petId > pets.length - 1) {
      res.header('Content-Type', 'text/plain');
      res.status(404).send('Not Found');
    } else {
      res.header('Content-Type', 'application/json');
      res.status(200).send(pets[petId]);
    }
  });
});

app.post('/pets', (req, res) => {
  fs.readFile(path, (err, petsJSON) => {
    if (err) throw err;
    const pets = JSON.parse(petsJSON);
    const pet = req.body;

    if (!pet.age || !pet.kind || !pet.name) {
      res.header('Content-Type', 'text/plain');
      res.status(400).send('Bad Request');
    } else {
      pets.push(pet);
      fs.writeFile(path, JSON.stringify(pets), (writeErr) => {
        if (writeErr) throw writeErr;
        res.header('Content-Type', 'application/json');
        res.status(200).send(pet);
      });
    }
  });
});

app.patch('/pets/:id', (req, res) => {
  fs.readFile(path, (err, petsJSON) => {
    if (err) throw err;
    const pets = JSON.parse(petsJSON);
    const petId = req.params.id;
    const pet = pets[petId];
    const updatedPet = req.body;

    if (updatedPet.age) {
      pet.age = updatedPet.age;
    }
    if (updatedPet.kind) {
      pet.kind = updatedPet.kind;
    }
    if (updatedPet.name) {
      pet.name = updatedPet.name;
    }

    fs.writeFile(path, JSON.stringify(pets), (writeErr) => {
      if (writeErr) throw writeErr;
      res.header('Content-Type', 'application/json');
      res.send(pets[petId]);
    });
  });
});

app.delete('/pets/:id', (req, res) => {
  fs.readFile(path, (err, petsJSON) => {
    if (err) throw err;
    const pets = JSON.parse(petsJSON);
    const petId = req.params.id;

    const deletedPet = pets.splice(petId, 1)[0];
    const updatedPets = JSON.stringify(pets);
    fs.writeFile(path, updatedPets, (writeErr) => {
      if (writeErr) throw writeErr;
      res.header('Content-Type', 'application/json');
      res.status(200).send(deletedPet);
    });
  });
});

app.all('/*', (req, res) => {
  res.header('Content-Type', 'text/plain');
  res.status(404).send('Not Found');
});

app.listen(port, () => {
  console.log(`Listening on port: ${port}`);
});

module.exports = app;
