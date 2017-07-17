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

    if (index) {

      if (0 > index || index >= pets.length) {
        console.error(`Usage: ${node} ${file} ${cmd} INDEX`);
        process.exit(1);
      }

      console.log(pets[index]);

    }
    else {
      console.log(pets);
    }
  })
}

else if (cmd === 'create') {
    fs.readFile(petsPath, 'utf8', function(readErr, data) {
      if (readErr) {
        throw readErr;
      }

      const pets = JSON.parse(data);
      const age = parseInt(process.argv[3]);
      const kind = process.argv[4];
      const name = process.argv[5];

      if (!name) {
        console.error(`Usage: ${node} ${file} ${cmd} AGE KIND NAME`);
        process.exit(1);
      }
      else {
        const pet = {
          'age': age,
          'kind': kind,
          'name': name
        };
        pets.push(pet);

        const petsJSON = JSON.stringify(pets);

        fs.writeFile(petsPath, petsJSON, function(writeErr) {
          if (writeErr) {
            throw writeErr;
          }

          console.log(pet);
      });

    };
  });
}

else {
  console.error(`Usage: ${node} ${file} [read | create | update | destroy]`);
  process.exit(1);
}
