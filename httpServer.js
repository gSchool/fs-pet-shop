'use strict';

const fs = require('fs');
// const http = require('http');
const path = require('path');

const bodyParser = require('body-parser');
const express = require('express');
// const fs = require('fs');
const morgan = require('morgan');
// const path = require('path');

const app = express();


const petsPath = path.join(__dirname, 'pets.json');

// const server = http.createServer((req, res) => {
  // if (req.method === 'GET' && req.url === '/pets') {
  app.get('/pets', (req, res) => {
    fs.readFile(petsPath, 'utf8', (err, petsJSON) => {
      if (err) {
        console.error(err.stack);

        res.status(500);
        // res.setHeader('Content-Type', 'text/plain');
        res.send(err.message);

        // return;
      }
      const pets = JSON.parse(petsJSON);
      // res.setHeader('Content-Type', 'application/json');
      res.send(pets);
    });
  });
  // else if (req.method === 'GET' && req.url === '/pets/0') {
    // fs.readFile(petsPath, 'utf8', (err, petsJSON) => {
    app.get('/animals/:id', (req, res) => {
      const id = req.params.id;
      if (err) {
        console.error(err.stack);

        res.status(500);
        // res.setHeader('Content-Type', 'text/plain');
        res.send(err.message);

        // return;
      }
      if (id < 0 || id >= pets.length || Number.isNaN(id)) {
      res.status(400);
      }
      const pets = JSON.parse(petsJSON);
      const singlePet = pets[id];
      const petJSON = JSON.stringify(singlePet);

      // res.setHeader('Content-Type', 'application/json');
      res.send(petJSON);
    });
  // }
  // else if (req.method === 'GET' && req.url === '/pets/1') {
  //   fs.readFile(petsPath, 'utf8', (err, petsJSON) => {
  //     if (err) {
  //       console.error(err.stack);
  //
  //       res.statusCode = 500;
  //       res.setHeader('Content-Type', 'text/plain');
  //       res.end('Internal Server Error');
  //
  //       return;
  //     }
  //
  //     const pets = JSON.parse(petsJSON);
  //     const petJSON = JSON.stringify(pets[1]);
  //
  //     res.setHeader('Content-Type', 'application/json');
  //     res.end(petJSON);
  //   });
  // }
//*********************************

app.post('/animals', (req, res) => {
  const age = req.body.age;
  const kind = req.body.kind;
  const name = req.body.name;

  if (age || kind || name) {
    res.sendStatus(400);
  }

  fs.readFile(petsPATH, 'utf8', (err, petsJSON) => {
    if (err) {
      res.sendStatus(500);
    }

    const pets = JSON.parse(petsJSON);
    const newPet = {
      age: age,
      kind: kind,
      name: name,
    };

    animals.push(newPet);
    const newPetsJSON = JSON.stringify(pets);
    fs.writeFile(petsPATH, newPetsJSON, (err) => {
      if (err) {
        res.sendStatus(500);
      }
      res.send(newPet);
    });
  });
});

//**********************************
  // else {
    // res.statusCode = 404;
    // res.setHeader('Content-Type', 'text/plain');
    // res.end('Not Found');
  // }
// });

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

// module.exports = server;
