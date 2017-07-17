'use strict';

const bodyParser = require('body-parser');
const express = require('express');
const fs = require('fs');
const morgan = require('morgan');
const path = require('path');
const petsPATH = path.join(__dirname, 'pets.json');

const app = express();

app.use(morgan('short'));
app.use(bodyParser.json());

app.get('/pets', (req, res, next) => {
  fs.readFile(petsPATH, 'utf8', (err, petsJSON) => {
    if (err) {
      res.status(500);
      return next(err);
    }

    let pets = JSON.parse(petsJSON);
    res.send(pets);
  });
});

app.get('/pets/:id', (req, res, next) => {
  fs.readFile(petsPATH, 'utf8', (err, petsJSON) => {
    if (err) {
      res.status(500);
      return next(err);
    }

    const id = Number.parseInt(req.params.id);
    const pets = JSON.parse(petsJSON);
    const pet = pets[id];

    if (!id || id < 0 || id >= pets.length || Number.isNaN(id) ) {
      res.status(404);
      return next(err);
    };

    res.send(pet);
  });
});

app.post('/pets', (req, res, next) => {
  const age = req.body.age;
  const name = req.body.name;
  const kind = req.body.kind;

  console.log(age, name, kind);

  if (!age || !name || !kind || Number.isNaN(age)) {
    res.status(404);
    return next('Bad request: body');
  }

  fs.readFile(petsPATH, 'utf8', (err, petsJSON) => {
    if (err) {
      res.status(500);
      return next(err);
    }

    let pets = JSON.parse(petsJSON);
    const newPet = {
      age: age,
      name: name,
      kind: kind
    };
    pets.push(newPet);
    pets = JSON.stringify(pets);

    fs.writeFile(petsPATH, pets, (err) => {
      if (err) {
        res.status(500);
        return next(err);
      };
      res.send(newPet);
    });

  });
});

app.patch('/pets/:id', (req, res, next) => {
  fs.readFile(petsPATH, 'utf8', (readErr, petsJSON) => {
    if (readErr) {
      res.status(500);
      return next(err);
    };

    console.log("in patch readFile");
    const id = Number.parseInt(req.params.id);
    let pets = JSON.parse(petsJSON);

    if (id < 0 || id >= pets.length || Number.isNaN(id)) {
      res.status(404);
      return next(readErr)
    }

    const age = Number.parseInt(req.body.age);
    const name = req.body.name;
    const kind = req.body.kind;
    const petToChange = pets[id];

    console.log(age, name, kind);
    console.log(Number.isNaN('tricky'));

    if (age && Number.isNaN(age)) {
      res.status(404);
      return next(readErr);
    }

    if (!name && !age && !kind) {
      res.status(400);
      return next(readErr)
    }

    if (name) {
      petToChange.name = name;
    }
    if (age) {
      petToChange.age = age;
    }
    if (kind) {
      petToChange.kind = kind;
    }

    const newPetsJSON = JSON.stringify(pets);

    fs.writeFile(petsPATH, newPetsJSON, (writeErr) => {
      if (writeErr) {
        res.status(500);
        return next(writeErr)
      };

      res.send(petToChange);
    });
  });
});

app.delete('/pets/:id', (req, res, next) => {
  fs.readFile(petsPATH, 'utf8', (readErr, petsJSON) => {
    if (readErr) {
      res.status(500);
      return next(err);
    }

    const id = Number.parseInt(req.params.id);
    const pets = JSON.parse(petsJSON);

    if (id < 0 || id >= pets.length || Number.isNaN(id)) {
      res.status(404);
      return next(readErr)
    }

    const deletedPet = pets.splice(id, 1);
    console.log(id, deletedPet)
    const newPetsJSON = JSON.stringify(pets);

    fs.writeFile(petsPATH, newPetsJSON, (writeErr) => {
      if (writeErr) {
        res.status(500);
        return next(writeErr)
      }

      res.send(deletedPet);
    })


  })
})

app.use((req, res, next) => {
  res.status(404);
  let err = {message: "Not Found"};
  next(err);
})

app.use((err, req, res, next) => {
  console.log(err);
  res.send(err)
});

const port = process.env.port || 8000;

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

module.exports = app;
