'use strict';

// const bodyParser = require('body-parser');
const express = require('express');
const fs = require('fs');
// const morgan = require('morgan');
const path = require('path');
const petsPATH = path.join(__dirname, 'pets.json');

const app = express();

// app.use(morgan('short'));
// app.use(bodyParser.json());


//TODO get all the pets
app.get('/pets', (req, res) => {
  fs.readFile(petsPATH, 'utf8', (err, petsJSON) => {
    if (err) {
      console.error(err.stack);
      res.status(500);
      res.send(err.message);
    }

    let pets = JSON.parse(petsJSON);
    res.send(pets);
  });

});

//TODO get pets at 0, 1, 2
app.get('/pets/:id', (req, res) => {
  fs.readFile(petsPATH, 'utf8', (err, petsJSON) => {
    if (err) {
      console.error(err);
      res.status(500);
      res.send(err.message);
    }

    let id = Number.parseInt(req.params.id);
    const pets = JSON.parse(petsJSON);
    const pet = pets[id];

    if (id < 0 || id >= pets.length || Number.isNaN(id) ) {
      res.sendStatus(404);
    };

    res.send(pet);
  });
});



//TODO error (404; Not Found) for pets at 2, -1


const port = process.env.port || 8000

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
})


module.exports = app;



// nodemon expressServer.js
// http GET localhost:8000/pets
// npm test test/expressServer.test.js
// http POST localhost:8000/pets age=3 kind=parakeet name=Cornflake
// npm test test/expressServer.bonus.test.js
