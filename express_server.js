var express = require('express');
var app = express();

var fs = require('fs');
var path = require('path');
var petsPath = path.join(__dirname, 'pets.json');

var pets;

fs.readFile(petsPath, 'utf-8', function(err, data) {
  pets = JSON.parse(data);
});

app.set('view engine', 'ejs');

app.get('/pets', function (req, res){
    res.send(pets);
  });

app.get('/pets/:index', function (req, res){
  var index = Number.parseInt(req.params.index);

  if (Number.isNan(index) || index < 0 || index >= pets.length) {
    return res.sendStatus(404);
  }

  res.send(pets[index]);
});

app.post('/pets', function(req, res) {
  const pet = req.body;

  pets.push(pet);
  res.send(pet);

  // fs.writeFile(petsPath, JSON.stringify(pets));
});


app.listen(5000, function() {
  console.log('Listening...');
});
