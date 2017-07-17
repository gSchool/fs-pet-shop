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
    console.log(pets);
  });
}


else {
  console.error(`Usage: ${node} ${file} [read | create | update | destroy]`);
  process.exit(1);
}
