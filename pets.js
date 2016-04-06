'use strict';

const fs = require('fs');
const path = require('path');
const petsPath = path.join(__dirname, 'pets.json');

const node = path.basename(process.argv[0]);
const file = path.basename(process.argv[1]);
const cmd = process.argv[2];

if (cmd === 'read') {
  fs.readFile(petsPath, 'utf8', function(err, data) {
    if (err) {
      throw err;
    }
    const pets = JSON.parse(data);
    const index = process.argv[3];
    if (index < pets.length){
      console.log(pets[index]);
    }
    else {
      console.error(`Usage: ${node} ${file} ${cmd} INDEX`);
      process.exit(1);
    }
  });
}
else if (cmd === 'create') {
  fs.readFile(petsPath, 'utf8', function(readErr, data) {
    if (readErr) {
      throw readErr;
    }

    const age = process.argv[3];
    const kind = process.argv[4];
    const name = process.argv[5];

    const pets = JSON.parse(data);

    if (!age || !kind || !name) {
      console.log(`Usage: ${node} ${file} ${cmd} AGE KIND NAME`);
      process.exit(1);
    }

    pets.push({ age:age, kind:kind, name:name });

    const petsJSON = JSON.stringify(pets);

    fs.writeFile(petsPath, petsJSON, function(writeErr) {
      if (writeErr) {
        throw writeErr;
      }

      console.log(`Usage: ${node} ${file} ${cmd} ${age} ${kind} ${name}`);
      process.exit(1);
    });
  });
}
else {
  console.error(`Usage: ${node} ${file} read`);
  process.exit(1);
}
