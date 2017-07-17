'use strict';

const fs = require('fs');
const path = require('path');
const pets = path.join(__dirname, "pets.json");
const node = path.basename(process.argv[0]);
const file = path.basename(process.argv[1]);
const command = process.argv[2];

if (command === "read") {
  fs.readFile(pets, 'utf8', function(err, data){
    if (err) {
      throw err;
    }
    let pets = JSON.parse(data);
    let index = process.argv[3];
    if (index){
      if (!pets[index]){
        console.error(`Usage: ${node} ${file} read INDEX`);
      }
      else {
      console.log(pets[process.argv[3]]);
    }
    }
    else {
      console.log(pets);
    }
  });
}

else if (command === "create") {
  let newPet = {};
  let age = parseInt(process.argv[3]);
  // console.log(age, !age);
  let kind = process.argv[4];
  // console.log(kind, !kind);
  let name = process.argv[5];
  // console.log(name, !name);
  if (!age || !kind || !name) {
    console.error(`Usage: ${node} ${file} create AGE KIND NAME`);
    process.exit(1);
  }
  else {
    fs.readFile(pets, 'utf8', function(err, data){
      if (err) {
        throw err;
      }
      let petsData = JSON.parse(data);
      let newPet = {
        "age": age,
        "kind": kind,
        "name": name
      }
      petsData.push(newPet);
      let petsJSON = JSON.stringify(petsData);
      fs.writeFile(pets, petsJSON, function(writeErr) {
        if (writeErr) {
          throw writeErr;
        }
        console.log(newPet);
      });
    });
  }
}

else {
  console.error(`Usage: ${node} ${file} [read | create | update | destroy]`);
  process.exit(1);
}
