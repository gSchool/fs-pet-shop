"use strict";

var express = require('express');
var app = express();

var pets = require('./pets.json');

// app.use(express.static('public'));

app.get('/pets', function(req, res){
  res.send(pets);
});

app.get('/pets/:id', function(req, res){
  var petIndex = req.params.id;
  var numPets = pets.length;

  if(petIndex >=0 && petIndex<numPets){
    res.send(pets[petIndex]);
  }
  else{
    return res.sendStatus(404);
    res.send('Not Found');
  }
});

app.listen('3000', function(){
  console.log('Server 3000 started');
});

module.exports = app;
