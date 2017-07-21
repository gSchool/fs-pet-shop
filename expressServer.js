var express = require('express');
var app = express();
var port = process.env.PORT || 8000;

const fs = require('fs');
// const path = require('path');

app.get('/pets', function(req, res) {
  fs.readFile('./pets.json', 'utf8', function(err, petsJSON) {
    if (err) {
      console.error(err.stack);
      return res.sendStatus(500);
    }
    var pets = JSON.parse(petsJSON);
    res.send(pets);
  });
});

app.get('/pets/:id', function(req, res) {
  fs.readFile('./pets.json', 'utf8', function(err, petsJSON){
    if (err) {
      console.error(err.stack);
      return res.sendStatus(500);
    }

    var id = Number.parseInt(req.params.id);
    var pets = JSON.parse(petsJSON);

    if (id < 0 || id >= pets.length || Number.isNaN(id)) {
      return res.sendStatus(404);
    }

    res.send(pets[id]);
  });
});

app.listen(port, function() {
  console.log('Listening on port', port);
});

module.exports = app;
