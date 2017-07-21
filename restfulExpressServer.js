'use strict';

const express = require('express');
let fs = require('fs');
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
      return res.status(500);
    }
    const pets = JSON.parse(petsJSON);

    return res.send(pets);
  });
});

app.get('/pets/:id', (req, res) => {
  const id = Number.parseInt(req.params.id);


  fs.readFile(petsPATH, 'utf8', (err, petsJSON) => {
    if (err) {
      return res.status(500);
    }

    const pets = JSON.parse(petsJSON);

    if (id < 0 || id >= pets.length || Number.isNaN(id) || !pets[id]) {
      return res.sendStatus(404);
    }
    const pet = pets[id];

    return res.send(pet);
  });
});

app.post('/pets', (req, res) => {
  const name = req.body.name;
  const age = req.body.age;
  const kind = req.body.kind;

  if (!name || !age || !kind) {
    return res.sendStatus(400);
  }

  fs.readFile(petsPATH, 'utf8', (err, petsJSON) => {
    if (err) {
      return res.sendStatus(500);
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
        return res.sendStatus(500);
      }

      return res.send(newPet);
    })
  });
});

app.patch('/pets/:id', (req, res) => {
  const id = Number.parseInt(req.params.id);
  const name = req.body.name;
  const age = req.body.age;
  const kind = req.body.kind;

  if (!name && !age && !kind) {
    return res.sendStatus(400);
  }

  fs.readFile(petsPATH, 'utf8', (err, petsJSON) => {
    if (err) {
      return res.sendStatus(500);
    }

    const pets = JSON.parse(petsJSON);

    if (id < 0 || id >= pets.length || Number.isNaN(id)) {
      return res.sendStatus(404);
    }
    var patchedPet = pets[id];

    if(age){
      patchedPet.age = age;
    }
    if(kind){
      patchedPet.kind = kind;
    }
    if(name){
      patchedPet.name = name;
    }

    pets.push(patchedPet);

    const patchedPetsJSON = JSON.stringify(pets);

    fs.writeFile(petsPATH, patchedPetsJSON, (err) => {
      if (err) {
        return res.sendStatus(500);
      }

      return res.send(patchedPet);
    })
  });
});

app.delete('/pets/:id', (req, res) => {
  const id = Number.parseInt(req.params.id);

  fs.readFile(petsPATH, 'utf8', (err, petsJSON) => {
    if (err) {
      return res.status(500);
    }

    const pets = JSON.parse(petsJSON);

    if (id < 0 || id >= pets.length || Number.isNaN(id) || !pets[id]) {
      return res.sendStatus(404);
    }
    const removedPets = pets.filter((index) => {
      return index !== pets[id]
    })
    console.log(pets[id]);

    const removedPetsJSON = JSON.stringify(removedPets);

    fs.writeFile(petsPATH, removedPetsJSON, (err) => {
      if (err) {
        return res.sendStatus(500);
      }

      return res.send(pets[id]);

    })
  });
});

const port =process.env.PORT || 8000;

// Tells node to start server loop listening for incoming HTTP requests
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

module.exports = app;
