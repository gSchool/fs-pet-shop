'use strict';

var express = require('express');
var app = express();
var fs = require('fs');
var path = require('path');
var petsPath = path.join(__dirname, 'pets.json');

var morgan = require('morgan');
app.use(morgan('short'));

const bodyParser = require('body-parser');
app.use(bodyParser.json());
// const petsData = 'pets.json';

const PORT = process.env.PORT || 3010;

app.listen( PORT, () => {
  console.log('spinning it out on port', PORT)
})

app.get('/pets', (req,res) => {
  // console.log("herro!");
  fs.readFile(petsPath, 'utf8', (err, petsJSON) => {
    if (err) {
      return next(err);
    }
    // console.log(petsJSON);
    var pets = JSON.parse(petsJSON);
    // console.log(pets);
    res.send(JSON.parse(petsJSON));
  });
});

app.get('/pets/:id', (req, res) => {
  fs.readFile(petsPath, 'utf8', (err,petsJSON) =>{
    if (err) {
      return next(err);
  }

  var id = Number.parseInt(req.params.id);
  // console.log(id);

  const pets = JSON.parse(petsJSON);

  if (Number.isNaN(id) || id < 0 || id > pets.length - 1) {
    console.error('Not Found');
    return res.sendStatus(404);
  }
  res.send(pets[id]);
  })
})

app.post('/pets', (req, res ) => {
  fs.readFile(petsPath, 'utf8', (err,petsJSON) =>{
    if (err) {
      return next(err);
  }
  // console.log(req.body.age);

  var age = req.body.age;
  // console.log(Number.isNaN(age));
  var kind = req.body.kind;
  // console.log(kind === '');
  var name = req.body.name;
  // console.log(name === '');


// test works!
  if (Number.isNaN(age) || kind  === '' || name === '') {
      // console.error('Usage: node pets.js create AGE KIND NAME');
      return res.sendStatus(400);
  }
//almost done! adding the object but:1 not properly formatted(age becomes a string after json stringify) 2 not sending the proper response...sending back the right code but not the
  var newPet = {};
  newPet.age = age;
  newPet.kind = kind;
  newPet.name = name;
  var petsArray = JSON.parse(petsJSON);
  petsArray.push(newPet);
  // console.log(petsArray);
  fs.writeFile(petsPath, JSON.stringify(petsArray), (err) => {
   if (err) throw err;
  });
  // console.log(JSON.stringify(petsArray[2]));
  // console.log(typeof JSON.stringify(petsArray[2]));
  // res.sendStatus(200, JSON.stringify(petsArray[2]));
  res.send(newPet);
  });
})

app.patch('/pets/:id', (req, res ) => {
  fs.readFile(petsPath, 'utf8', (err,petsJSON) =>{
      if (err) {
        return next(err);
    }
    var pets = JSON.parse(petsJSON);
    var id = Number.parseInt(req.params.id);
    // console.log(id);
    if (Number.isNaN(id) || id < 0 || id >= pets.length) {
      return res.sendStatus(404);
    }
    console.log(req.body);

    var newAge = Number.parseInt(req.body.age);
    if (newAge) {
      pets[id]["age"] = newAge;
    }
    var newKind = req.body.kind;
    if (newKind) {
      pets[id]["kind"] = newKind;
    }
    var newName = req.body.name;
    if (newName) {
      pets[id]["name"] = newName;
    }


    var updatedPets = JSON.stringify(pets)

    fs.writeFile(petsPath, updatedPets, (err) => {
     if (err) throw err;
    });


    // console.log(Number.isNaN(age));
    // var kind = req.body.kind;
    // if (kind) {
    //   pets
    // }
    // // console.log(kind === '');
    // var name = req.body.name;
    // // console.log(name === '');






    res.send(pets[id]);
  });
})

app.delete('/pets/:id', (req,res) => {
  fs.readFile(petsPath, 'utf8', (err,petsJSON) =>{
    if (err) {
      return next(err);
    };
    var pets = JSON.parse(petsJSON);
    console.log(pets);
    var id = Number.parseInt(req.params.id);
    console.log(id);
    if (Number.isNaN(id) || id < 0 || id >= pets.length) {
      return res.sendStatus(404);
    }
    var removedPet = pets.splice(id, 1);
    console.log(removedPet);
    var updatedPetsJSON = JSON.stringify(pets);
    var removedPetJSON = JSON.stringify(removedPet);
    console.log(removedPetJSON);
    console.log(updatedPetsJSON);
    fs.writeFile(petsPath, updatedPetsJSON, (err) => {
     if (err) throw err;
    })
    res.send(removedPet[0]);
  })

})


module.exports = app;
