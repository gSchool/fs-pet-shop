var express = require('express');
var app = express();
var pets = require('./pets.json');
var fs = require('fs');

app.use(require('morgan')('tiny'));
app.use(require('body-parser').json());

app.post('/pets', function(req, res) {
    var newPet = req.body;
    pets.push(newPet);
    // var newPet = {
    //   age: parseInt(age),
    //   kind: kind,
    //   name: name
    // }
    //data.push(newPet);
    var petData = JSON.stringify(pets);
    fs.writeFile('./pets.json', petData, function(err) {
      if (err) {
        console.log('Write Gooder');
      } else {
        res.status(201).send(req.body);
      }
    });
});




app.listen(3000, function() {
  console.log('hi');
});
