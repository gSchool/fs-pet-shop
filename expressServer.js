'use strict';

const express = require('express');
const fs = require('fs');
const path = require('path');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const app = express();
const petsPATH = path.join(__dirname, 'pets.json');

app.use(morgan('short'));
app.use(bodyParser.json());


app.get('/pets', (req, res) => {
  fs.readFile(petsPATH, 'utf8', (err, data) => {
      if (err) {
        console.error(err.stack);
        res.sendStatus(500);
      }

      const pets = JSON.parse(data);

      res.send(pets);
  });
});

app.get('/pets/:id', (req, res) => {
  const id = parseInt(req.params.id);

  fs.readFile(petsPATH, 'utf8', (err, data) => {
    if (err) {
      console.error(err.stack);
      res.sendStatus(500);
    }

    const pets = JSON.parse(data);
    if (id < 0 || id >= pets.length || isNaN(id)) {
      res.sendStatus(404);
    }

    const singlePet = pets[id];


    res.send(singlePet);
  })
})





const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

module.exports = app;
