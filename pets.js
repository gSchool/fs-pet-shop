'use strict';

const fs = require('fs');
const path = require('path');
const petsPath = path.join(__dirname, 'pets.json');

const node = path.basename(process.argv[0]);
const file = path.basename(process.argv[1]);
const cmd = process.argv[2];

if (cmd === 'read') {
  const index = process.argv[3];
  fs.readFile(petsPath, 'utf-8', function(err, data) {
    if (err) {
      throw err;
    }
    var pets = JSON.parse(data);
    if (index !== undefined) {
      if (index < 0 || index > pets.length) {
        let length = pets.length;
        console.error(`Usage: ${node} ${file} read INDEX`);
        process.exit(1);
      } else {
        console.log(pets[index]);
        process.exit(0);
      }
    }
    console.log(pets);
  });
}

  else if (cmd === 'create') {

    const age = Number(process.argv[3]);
    const kind = process.argv[4];
    const name = process.argv[5];

    if (age === undefined || kind === undefined || name === undefined) {
          console.error(`Usage: ${node} ${file} create AGE KIND NAME`);
          process.exit(1);
    }

    fs.readFile(petsPath, 'utf-8', function(readErr, data) {
      if (readErr) {
        throw readErr;
      }
      var pets = JSON.parse(data);
      var buildPet = {};
      buildPet['age'] = age;
      buildPet['kind'] = kind;
      buildPet['name'] = name;
      pets.push(buildPet);
      var JSONpets = JSON.stringify(pets);
      fs.writeFile(petsPath, JSONpets, function(writeErr) {
        if (writeErr) {
          throw writeErr;
        }
        console.log(buildPet);
      });
    });
}
  else if (cmd === 'update') {
    const index = Number(process.argv[3]);
    const age = Number(process.argv[4]);
    const kind = process.argv[5];
    const name = process.argv[6];

    if (!index || !age || !kind || !name) {
      console.error(`Usage: ${node} ${file} update INDEX AGE KIND NAME`);
      process.exit(1);
    }

    fs.readFile(petsPath, 'utf-8', function(readErr, data) {
      if (readErr) {
        throw readErr;
      }
      var pets = JSON.parse(data);
      if (index < 0 || index > pets.length) {
        console.error(`Usage: ${node} ${file} update INDEX AGE KIND NAME`);
        process.exit(1);
      }
      let buildPet = {};
      buildPet['age'] = age;
      buildPet['kind'] = kind;
      buildPet['name'] = name;
      pets.splice(index, 0, buildPet);
      var JSONpets = JSON.stringify(pets);
      fs.writeFile(petsPath, JSONpets, function(writeErr) {
        if (writeErr) {
          throw writeErr;
        }
        console.log(buildPet);
      });
    });
} else if (cmd === 'destroy') {
  const index = process.argv[3];
  if (!index) {
    console.error(`Usage: ${node} ${file} destroy INDEX`);
    process.exit(1);
  }
  fs.readFile(petsPath, 'utf-8', function(readErr, data) {
    var pets = JSON.parse(data);
    if (index < 0 || index > pets.length) {
      console.error(`Usage: ${node} ${file} destroy INDEX`);
      process.exit(1);
    }
    var deadPet = pets[index];
    pets.splice(index, index-1);
    var JSONpets = JSON.stringify(pets);
    fs.writeFile(petsPath, JSONpets, function(writeErr) {
      if (writeErr) {
        throw writeErr;
      }
      console.log(deadPet);
    });
  });

}
  else {
    console.error(`Usage: ${node} ${file} [read | create | update | destroy]`);
    process.exit(1);
}
