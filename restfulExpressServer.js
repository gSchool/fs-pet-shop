'use strict';

let fs = require('fs');
const path = require('path');
const petsPath = path.join(__dirname, 'pets.json');

const express = require('express');
const app = express();
const port = process.env.PORT || 8000;

const basicAuth = require('basic-auth');
const bodyParser = require('body-parser');
const morgan = require('morgan');

app.disable('x-powered-by');
app.use(morgan('short'));

app.use((req, res, next) => {
  const creds = basicAuth(req);
  if (creds && creds.name === 'admin' && creds.pass === 'meowmix') {
    return next();
  }
  res.set('WWW-Authenticate', 'Basic realm="Required"');
  res.sendStatus(401);
});
app.use(bodyParser.json());

app.get('/pets', (_req, res, next) => {
  fs.readFile(petsPath, 'utf8', (err, petsJSON) => {
    if (err) {
      return next(err);
    }
    const pets = JSON.parse(petsJSON);
    res.send(pets);
  });
});

app.get('/pets/:id', (req, res, next) => {
  fs.readFile(petsPath, 'utf8', (err, petsJSON) => {
    if (err) {
      return next(err);
    }
    const id = Number.parseInt(req.params.id);
    const pets = JSON.parse(petsJSON);

    if (id < 0 || id >= pets.length || Number.isNaN(id)) {
      return res.sendStatus(404);
    }
    res.send(pets[id]);
  });
});

app.post('/pets', (req, res, next) => {
  fs.readFile(petsPath, 'utf8', (readErr, petsJSON) => {
    if (readErr) {
      return next(readErr);
    }
    const pets = JSON.parse(petsJSON);
    const age = Number.parseInt(req.body.age);
    const kind = req.body.kind;
    const name = req.body.name;

    if (Number.isNaN(age) || !kind || !name) {
      return res.sendStatus(400);
    }
    const pet = { age, kind, name };
    pets.push(pet);
    const newPetsJSON = JSON.stringify(pets);

    fs.writeFile(petsPath, newPetsJSON, (writeErr) => {
      if (writeErr) {
        return next(writeErr);
      }
      res.send(pet);
    });
  });
});

app.patch('/pets/:id', (req, res, next) => {
  // eslint-disable-next-line max-statements
  fs.readFile(petsPath, 'utf8', (readErr, petsJSON) => {
    if (readErr) {
      return next(readErr);
    }
    const id = Number.parseInt(req.params.id);
    const pets = JSON.parse(petsJSON);

    if (id < 0 || id >= pets.length || Number.isNaN(id)) {
      return res.sendStatus(404);
    }
    const age = Number.parseInt(req.body.age);
    const { kind, name } = req.body;

    if (!Number.isNaN(age)) {pets[id].age = age;}
    if (kind) {pets[id].kind = kind;}
    if (name) {pets[id].name = name;}

    const newPetsJSON = JSON.stringify(pets);

    fs.writeFile(petsPath, newPetsJSON, (writeErr) => {
      if (writeErr) {
        return next(writeErr);
      }
      res.send(pets[id]);
    });
  });
});

app.patch('/pets/:id', (req, res, next) => {
  fs.readFile(petsPath, 'utf8', (readErr, petsJSON) => {
    if (readErr) {
      return next(readErr);
    }
    const id = Number.parseInt(req.params.id);
    const pets = JSON.parse(petsJSON);

    if (id < 0 || id >= pets.length || Number.isNaN(id)) {
      return res.sendStatus(404);
    }
    const pet = pets[id];
    const age = Number.parseInt(req.body.age);
    const kind = req.body.kind;
    const name = req.body.name;

    if (!Number.isNaN(age)) {pet.age = age;}
    if (kind) {pet.kind = kind;}
    if (name) {pet.name = name;}

    const newPetsJSON = JSON.stringify(pets);

    fs.writeFile(petsPath, newPetsJSON, (writeErr) => {
      if (writeErr) {
        return next(writeErr);
      }
      res.send(pet);
    });
  });
});

app.delete('/pets/:id', (req, res, next) => {
  fs.readFile(petsPath, 'utf8', (readErr, petsJSON) => {
    if (readErr) {
      return next(readErr);
    }
    const id = Number.parseInt(req.params.id);
    const pets = JSON.parse(petsJSON);

    if (id < 0 || id >= pets.length || Number.isNaN(id)) {
      return res.sendStatus(404);
    }
    const pet = pets.splice(id, 1)[0];
    const newPetsJSON = JSON.stringify(pets);

    fs.writeFile(petsPath, newPetsJSON, (writeErr) => {
      if (writeErr) {
        return next(writeErr);
      }
      res.send(pet);
    });
  });
});

app.get('/boom', (_req, _res, next) => {
  next(new Error('BOOM!'));
});

app.use((_req, res) => {
  res.sendStatus(404);
});

app.use((err, _req, res, _next) => {
  console.error(err.stack);
  res.sendStatus(500);
});

app.listen(port, () => {
  console.log('Listening on port', port);
});

module.exports = app;
