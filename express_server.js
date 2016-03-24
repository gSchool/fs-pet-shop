var express = require('express');
var app = express();

var fs = require('fs');
var path = require('path');
var petsPath = path.join(__dirname, 'pets.json');

app.set('view engine', 'ejs');

app.get('/pets/:index', function (req, res){
  var index = req.params.index;

  fs.readFile(petsPath, 'utf8', function(err, data) {
    var pets = JSON.parse(data);
    if (index < pets.length){
      res.send(JSON.stringify(pets[index]))
    }
    else if (index === '5')(
      res.send(JSON.stringify(pets))
    )
  })
});

// app.get('*', function (req, res) {
//   res.status(404).send('Nope! Nothing here.');
// });

app.listen(5000, function() {
  console.log('Listening...');
});
