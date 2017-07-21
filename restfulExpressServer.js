'use strict';

const express = require('express');
const fs = require('fs');
const morgan = require('morgan');
const path = require('path');
const bodyParser = require('body-parser');
const http = require('http');

const app = express();
const petsPATH = path.join(__dirname, 'pets.json');

app.disable('x-powered-by');
app.use(morgan('short'));
app.use(function(req,res,next){
  req.rawBody = '';
  req.setEncoding('utf8');

  req.on('data', function(chunk) {
    req.rawBody += chunk;
  });

  req.on('end', function() {
    if(req.rawBody.length > 0 ) req.body = JSON.parse(req.rawBody)
    else req.body = {}
    next();
  });
})

// Create a new HTTP server
app.get('/pets', (req, res) => {
  fs.readFile(petsPATH, 'utf8', (err, petsJSON) => {
    if (err) {
      res.status(500);
      next(err);
    }
    const pets = JSON.parse(petsJSON);

    return res.send(pets);
  });
});

app.get('/pets/:id', (req, res) => {
  const id = Number.parseInt(req.params.id);


  fs.readFile(petsPATH, 'utf8', (err, petsJSON) => {
    if (err) {
      res.status(500);
      next(err);
    }

    const pets = JSON.parse(petsJSON);

    if (id < 0 || id >= pets.length || Number.isNaN(id) || !pets[id]) {
      res.sendStatus(404);
    }
    const pet = pets[id];
    res.set('Content-Type', 'application/json');
    return res.send(pet);
  });
});

app.post('/pets', (req, res) => {
  const name = req.body.name;
  const age = req.body.age;
  const kind = req.body.kind;

  if (!name || !age || !kind) {
    res.sendStatus(400);
  }

  fs.readFile(petsPATH, 'utf8', (err, petsJSON) => {
    if (err) {
      res.sendStatus(500);
    }

    const pets = JSON.parse(petsJSON);
    const newPet = {
      name: name,
      age: age,
      kind: kind
    };

    pets.push(newPet);

    const newPetsJSON = JSON.stringify(pets);

    fs.writeFile(petsPATH, newPetsJSON, (err) => {
      if (err) {
        res.sendStatus(500);
      }

      res.send(newPet);
    })
  });
});

app.patch('/pets/:id', (req, res) => {
  const id = Number.parseInt(req.params.id);
  const name = req.body.name;
  const age = req.body.age;
  const kind = req.body.kind;

  if (!name && !age && !kind) {
    res.sendStatus(400);
  }

  fs.readFile(petsPATH, 'utf8', (err, petsJSON) => {
    if (err) {
      res.sendStatus(500);
    }

    if (id < 0 || id >= pets.length || Number.isNaN(id)) {
      res.sendStatus(404);
    }
    const patchedPet = pets[id];

    const pets = JSON.parse(petsJSON);
    patchedPet = {
      name: name,
      age: age,
      kind: kind
    };

    pets.push(patchedPet);

    const patchedPetsJSON = JSON.stringify(pets);

    fs.writeFile(petsPATH, patchedPetsJSON, (err) => {
      if (err) {
        res.sendStatus(500);
      }

      res.send(patchedPet);
    })
  });
});

app.delete('/pets/:id', (req, res) => {
  const id = Number.parseInt(req.params.id);

  fs.readFile(petsPATH, 'utf8', (err, petsJSON) => {
    if (err) {
      res.status(500);
      next(err);
    }

    const pets = JSON.parse(petsJSON);

    if (id < 0 || id >= pets.length || Number.isNaN(id) || !pets[id]) {
      res.sendStatus(404);
    }
    const removePet =pets.filter((index) => {
      return index !== pets[id]
    })


    res.set('Content-Type', 'application/json');
    return res.send(removePet);
  });
});

const port =process.env.PORT || 8000;

// Tells node to start server loop listening for incoming HTTP requests
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

module.exports = app;
