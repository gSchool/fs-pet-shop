const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
const port = process.env.PORT || 8000;

app.get('/pets', (req, res) => {
  fs.readFile('./pets.json', (err, data) => {
    if (err) {
      res.sendStatus(500);
    }
    try {
      res.send(JSON.parse(data));
    } catch (e) {
      res.sendStatus(500);
    }
  });
});

app.get('/pets/:id', (req, res) => {
  fs.readFile('./pets.json', (err, data) => {
    if (err) {
      res.sendStatus(500);
    }
    const id = Number.parseInt(req.params.id);
    let pets;
    try {
      pets = JSON.parse(data);
    } catch (e) {
      res.sendStatus(500);
    }
    if (id >= 0 && id < pets.length) {
      res.send(pets[id]);
    } else {
      res.sendStatus(404);
    }
  });
});

app.use(bodyParser.json());

app.post('/pets', (req, res) => {
  fs.readFile('./pets.json', (err, data) => {
    if (err) {
      res.sendStatus(500);
    }
    let pets;
    try {
      pets = JSON.parse(data);
    } catch (e) {
      res.sendStatus(500);
    }
    const pet = req.body;
    if (!Number.isNaN(pet.age) && pet.name && pet.kind) {
      pets.push(pet);
      fs.writeFile('./pets.json', JSON.stringify(pets), (error) => {
        if (error) {
          res.sendStatus(500);
        } else {
          res.send(req.body);
        }
      });
    } else {
      res.sendStatus(400);
    }
  });
});

app.use((req, res) => {
  res.sendStatus(404);
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});

module.exports = app;
