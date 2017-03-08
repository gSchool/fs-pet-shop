var express = require('express');
var app = express();
var pets = require('./pets.json');

app.get('/pets', function(req, res, next) {
  res.status(200).send(pets);
});

app.get('/pets/:index', function(req, res, next) {
  var index = parseInt(req.params.index)
  if (pets.length < index  || index < 0) {
    res.status(404).send('Not Found');
  } else {
    res.status(200).send(pets[index]);
  }
});

app.listen(3000, function() {
  console.log('hi');
});
