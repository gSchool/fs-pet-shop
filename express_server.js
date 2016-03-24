var express = require('express');
var app = express();

var fs = require('fs');
var path = require('path');
var petsPath = path.join(__dirname, 'pets.json');

app.set('view engine', 'ejs');

app.get('/pets', function (req, res){
  fs.readFile(petsPath, 'utf8', function(err, data) {
    var pets = JSON.parse(data);
    res.send(JSON.stringify(pets));
  })
})

app.get('/pets/:index', function (req, res){
  var index = Number.parseInt(req.params.index);

  fs.readFile(petsPath, 'utf8', function(err, data) {
    var pets = JSON.parse(data);
    if (index < pets.length) {
      res.send(JSON.stringify(pets[index]))
    }
  })
});

app.get('*', function (req, res) {
  res.status(404).send('Nope! Nothing here.');
});

app.listen(5000, function() {
  console.log('Listening...');
});
