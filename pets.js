#!/usr/bin/env node

'use strict';

const fs = require('fs');
const path = require('path');
const petsPath = path.join(__dirname, 'pets.json');

const node = path.basename(process.argv[0]);
const file = path.basename(process.argv[1]);
const cmd = process.argv[2];

if (!cmd) {
  console.error(`Usage: ${node} ${file} [read | create | update | destroy]`);
  process.exit(1);


} else if (cmd === 'read') {
  fs.readFile(petsPath, 'utf8', (err, data) => {
    if (err) {
      throw err;
    }

    const pets = JSON.parse(data);
    const index = process.argv[3];
    const length = pets.length;

    if (index) {
      if (index >= pets.length || index < 0) {
        console.error(`Usage: ${node} ${file} ${cmd} 0 < index < ${length}`);
        process.exit(1);
      } else {
        console.log(pets[index]);
      }
    } else {
      console.log(pets);
    }
  });

} else if (cmd === 'create') {
  fs.readFile(petsPath, 'utf8', (err, data) => {
    if (err) {
      throw err;
    }

    const pets = JSON.parse(data);
    const age = process.argv[3];
    const kind = process.argv[4];
    const name = process.argv[5];

    if (!age || !kind || !name) {
      console.error(`Usage: ${node} ${file} ${cmd} AGE KIND NAME`);
      process.exit(1);
    } else {
      let pet = {
        age: parseInt(age),
        kind: kind,
        name: name
      };
      pets.push(pet);

      const petsJSON = JSON.stringify(pets);

      fs.writeFile(petsPath, petsJSON, function(writeErr) {
        if (writeErr) {
          throw writeErr;
        }

        console.log(pet);
      })
    }
  });
} else if (cmd === 'update') {
  fs.readFile(petsPath, 'utf8', function(err, data) {
    if (err) {
      throw err;
    }

    const pets = JSON.parse(data);
    const index = process.argv[3];
    const age = process.argv[4];
    const kind = process.argv[5];
    const name = process.argv[6]

    if (!index || !age || !kind || !name) {
      console.error(`Usage: ${node} ${file} ${cmd} INDEX AGE KIND NAME`);
      process.exit(1);
    } else {
      pets[index] = {age: parseInt(age), kind: kind, name: name}
      const petsJSON = JSON.stringify(pets);

      fs.writeFile(petsPath, petsJSON, (writeErr) => {
        if (writeErr) {
          throw writeErr;
        }
      })
      console.log(pets[index]);
    }


  });
} else if (cmd === 'destroy') {
  fs.readFile(petsPath, 'utf8', (err, data) => {
    if (err) {
      throw err;
    }

    const pets = JSON.parse(data);
    const index = process.argv[3];
    const deleted = pets[index];

    if (!index) {
      console.error(`Usage: ${node} ${file} ${cmd} INDEX`);
      process.exit(1);

    } else {
      pets.splice(index, 1);
      const petsJSON = JSON.stringify(pets);

      fs.writeFile(petsPath, petsJSON, (writeErr) => {
        if (writeErr) {
          throw writeErr;
        }

        console.log(deleted);
      });
    }
  });
}
