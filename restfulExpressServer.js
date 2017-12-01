'use strict';

let fs = require('fs');
let express = require('express');
let app = express();
let bodyParser = require('body-parser');
let petsRoute = require('./routes/pets.js');
let port = process.env.PORT || 8888;

app.use(bodyParser.json());

app.use('/pets', petsRoute);

app.use((req, res) => {
  res.sendStatus(404);
});

app.listen(port, () => {
  console.log('Listening on port', port);
});

module.exports = app;
