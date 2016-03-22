'use strict';

var fs = require('fs');
var path = require('path');
var petsPath = path.join(__dirname, 'pets.json');

var node = path.basename(process.argv[0]);
var file = path.basename(process.argv[1]);
var cmd = process.argv[2];

if (cmd === 'read') {
  var index = process.argv[3];
  fs.readFile(petsPath, 'utf8', function(err, data){
    if (err) {
      throw err;
    }

    if (index) {
      console.log(parseInt(index));
      var pets = JSON.parse(data)[index];
      if (!pets) {
        console.error(`Usage: ${node} ${file} ${cmd} INDEX`);
      process.exit(1);
      }
    }
    else {
    var pets = JSON.parse(data);
    }
    console.log(pets);
  });
}
else if (cmd === 'create') {
  var age = process.argv[3];
  var kind = process.argv[4];
  var name = process.argv[5];
  fs.readFile(petsPath, 'utf8', function(err, data){
    if (err) {
      throw err;
    }
    if (!age || !kind || !name || isNaN(parseInt(age)) || parseInt(age) < 0) {
      console.error(`Usage: ${node} ${file} ${cmd} AGE KIND NAME`);
      process.exit(1);
    }
    var pets = JSON.parse(data);
    var newPet = {};
    newPet.age = parseInt(age);
    newPet.kind = kind;
    newPet.name = name;
    pets.push(newPet);

    var petsJSON = JSON.stringify(pets);

    fs.writeFile(petsPath, petsJSON, function(writeErr){
      if (writeErr) {
        throw writeErr;
      }
      console.log(newPet);
    })
  });
}
else if (cmd === 'update') {
  var index = process.argv[3];
  var age = process.argv[4];
  var kind = process.argv[5];
  var name = process.argv[6];
  fs.readFile(petsPath, 'utf8', function(err, data){
    if (err) {
      throw err;
    }
    var pets = JSON.parse(data);

    if (!index || !age || !kind || !name || isNaN(parseInt(age)) || parseInt(age) < 0 ||isNaN(parseInt(index)) || parseInt(index) < 0 || parseInt(index) >= pets.length ) {
      console.error(`Usage: ${node} ${file} ${cmd} INDEX AGE KIND NAME`);
    process.exit(1);
    }
    var newPet = {};
    newPet.age = parseInt(age);
    newPet.kind = kind;
    newPet.name = name;
    pets.splice(index, 1, newPet);

    var petsJSON = JSON.stringify(pets);

    fs.writeFile(petsPath, petsJSON, function(writeErr){
      if (writeErr) {
        throw writeErr;
      }
      console.log(newPet);
    })
  });
}
else if (cmd === 'destroy') {
  fs.readFile(petsPath, 'utf8', function(err, data){
    if (err) {
      throw err;
    }
    var index = parseInt(process.argv[3]);
    var pets = JSON.parse(data);

    if (!index || isNaN(parseInt(index)) || parseInt(index) < 0 || parseInt(index) >= pets.length ) {
      console.error(`Usage: ${node} ${file} ${cmd} INDEX`);
      process.exit(1);
    }
    var oldPet = pets.splice(index, 1);
    var petsJSON = JSON.stringify(pets);

    fs.writeFile(petsPath, petsJSON, function(writeErr){
      if (writeErr) {
        throw writeErr;
      }
      console.log(oldPet);
    })
  });
}
else {
  console.error(`Usage: ${node} ${file} [read | create | update | destroy]`);
  process.exit(1);
}
