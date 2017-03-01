const fs = require('fs');
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 8000;
const petsPath = path.join(__dirname, 'pets.json');

app.use(bodyParser.json());

app.get('/pets', (req, res) => {
  fs.readFile(petsPath, 'utf8', (err, petsJSON) => {
    if (err) {
      throw err;
    }
    res.send(JSON.parse(petsJSON));
  });
});

app.get('/pets/:id', (req, res) => {
  fs.readFile(petsPath, 'utf8', (err, petsJSON) => {
    if (err) {
      throw err;
    }
    const pets = JSON.parse(petsJSON);
    const index = req.params.id;
    if (Number.isNaN(index) || index < 0 || index > pets.length - 1) {
      res.header('Content-Type', 'text/plain');
      res.status(404);
      res.send('Not Found');
    }
    res.send(pets[index]);
  });
});

app.post('/pets', (req, res) => {
  fs.readFile(petsPath, 'utf8', (err, petsJSON) => {
    if (err) {
      throw err;
    }
    const pets = JSON.parse(petsJSON);
    const pet = req.body;

    if (!pet.age || !pet.kind || !pet.name) {
      res.header('Content-Type', 'text/plain');
      res.status(400);
      res.send('Invalid Data');
    } else {
      pets.push(pet);
      const dataJSON = JSON.stringify(pets);
      fs.writeFile(petsPath, dataJSON, (writeErr) => {
        if (writeErr) {
          throw writeErr;
        }
        res.header('Content-Type', 'application/json');
        res.status(200);
        res.send();
        console.log(pet);
      });
    }
  });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

module.exports = app;
