"use strict";

var express = require('express');
var app = express();

var morgan = require('morgan');
app.use(morgan('short'));

var bodyParser = require('body-parser');
app.use(bodyParser.json());

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
  }
});

app.listen('3001', function(){
  console.log('Server 3001 started');
});

module.exports = app;
