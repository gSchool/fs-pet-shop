
const express= require('express');
const app = express();
const bodyParser= require('body-parser');
const morgan = require('morgan');
const fs = require('fs');
const port = process.env.PORT || 8000;

app.use(bodyParser.json());
app.use(morgan('short'));

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

app.post('/pets', function(req, res){
  var age = req.body.age;
  var kind = req.body.kind;
  var name = req.body.name;

  fs.readFile('./pets.json', 'utf8', function(readErr, data) {
    if (readErr) {
      throw readErr;
    }
    var pets = JSON.parse(data);
      if (!age || !kind || !name){
        console.error(`Usage: node pets.js create AGE KIND NAME`);
        return res.sendStatus(400);
      }
      var newPet = {};
      newPet.age = Number(age);
      newPet.kind = kind;
      newPet.name = name;

      pets.push(newPet);

      var petsJSON = JSON.stringify(pets);

      fs.writeFile('./pets.json', petsJSON, function (writeErr){
        if (writeErr){
          throw writeErr;
        }

        res.send(newPet);
      });
  });
});

app.patch('/pets/:id', function(req, res) {

  var age = req.body.age;
  var kind = req.body.kind;
  var name = req.body.name;

  fs.readFile('./pets.json', 'utf8', function(err, data){
    if (err) {
      console.error(err.stack);
      return res.sendStatus(500);
    }

    var id = Number.parseInt(req.params.id);
    var pets = JSON.parse(data);

    if (id < 0 || id >= pets.length || Number.isNaN(id)) {
      res.set('Content-Type', 'text/plain');
      return res.sendStatus(404);
    }

    for(var key in req.body) {
      pets[id][key] = req.body[key];
    }

    var petsJSON = JSON.stringify(pets);

    fs.writeFile('./pets.json', petsJSON, function(writeErr){
      if(writeErr){
        throw writeErr;
      }
      res.send(pets[id]);
    });
  });
});

app.delete('/pets/:id', function(req, res){
  fs.readFile('./pets.json', 'utf8', function(err, data){
    if (err) {
      console.error(err.stack);
      return res.sendStatus(500);
    }
    var id = Number.parseInt(req.params.id);
    var pets = JSON.parse(data);

    if (id < 0 || id >= pets.length || Number.isNaN(id)) {
      return res.sendStatus(404);
    }

    var pet = pets.splice(id, 1)[0];
    var newPetsJSON = JSON.stringify(pets);


    fs.writeFile('./pets.json', newPetsJSON, function(writeErr) {
      console.log(writeErr);
      if (writeErr) {
        throw (writeErr);
      }
      res.send(pet);
    });
  });
});


app.listen(port, function(){
  console.log("Listening on port ", port);
});

module.exports = app;
