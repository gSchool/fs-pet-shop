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

app.disable('x-powered-by');
app.set('port', process.env.PORT || 5000);

var morgan = require('morgan');
app.use(morgan('short'));

var bodyParser = require('body-parser');
app.use(bodyParser.json());

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

  if(!pet) {
    return res.sendStatus(400);
  }

  pets.push(pet);
  console.log(pet + 'this is pet');
  res.send(pet);

  fs.writeFile(petsPath, JSON.stringify(pets));
});

app.put('/pets/:index', function(req, res) {
  const index = Number.parseInt(req.params.index);

  const pet = req.body;

  if (!pet) {
    return res.sendStatus(400);
  }

  pets[index]= pet;

  res.send(pet);

  fs.writeFile(petsPath, JSON.stringify(pets));
});

app.delete('/pets/:index', function(req, res) {
  var index = Number.parseInt(req.params.index);

  var pet = pets.splice(index, 1)[0];

  res.send(pet);

  fs.writeFile(petsPath, JSON.stringify(pets));
});

app.listen(5000, function() {
  console.log('Listening...');
});
