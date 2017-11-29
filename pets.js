#!/usr/local/Cellar/node/8.8.0/bin/node

const fs = require('fs');
let petObj = {};

if (!process.argv[2]) {
  console.error('Usage: node pets.js [read | create | update | destroy]');
  process.exit(1);
}

switch (process.argv[2].toUpperCase()) {
  case 'READ':
    fs.readFile('./pets.json', 'utf8', (err, data) => {
      if (err) throw err;
      petArr = JSON.parse(data);
      if (!process.argv[3]) {
        console.log(petArr);
      } else {
        if ((!isNaN(process.argv[3])) && (process.argv[3] >= 0) && (process.argv[3] < petArr.length)) {
          console.log(petArr[(process.argv[3])]);
        } else {
          console.error('Usage: node pets.js read INDEX');
          process.exit(1);
        }
      }
    });
    break;

  case 'CREATE':
    fs.readFile('./pets.json', 'utf8', (err, data) => {
      if (err) throw err;
      petArr = JSON.parse(data);
      if ((!process.argv[3]) || (!process.argv[4]) || (!process.argv[5])) {
        console.error('Usage: node pets.js create AGE KIND NAME');
        process.exit(1);
      } else {
        let petObj = {};
        petObj.age = parseInt(process.argv[3]);
        petObj.kind = process.argv[4];
        petObj.name = process.argv[5];
        petArr.push(petObj);
        output = JSON.stringify(petArr);
        fs.writeFile('./pets.json', output, (err) => {
          if (err) throw err;
          console.log(petObj);
        });
      }
    });
    break;

  case 'UPDATE':
    fs.readFile('./pets.json', 'utf8', (err, data) => {
      if (err) throw err;
      petArr = JSON.parse(data);
      if ((!process.argv[3]) || (!process.argv[4]) || (!process.argv[5]) || (!process.argv[6])) {
        console.error('Usage: node pets.js update INDEX AGE KIND NAME');
        process.exit(1);
      } else {
        petArr[process.argv[3]].age = parseInt(process.argv[4]);
        petArr[process.argv[3]].kind = process.argv[5];
        petArr[process.argv[3]].name = process.argv[6];
        output = JSON.stringify(petArr);
        fs.writeFile('./pets.json', output, (err) => {
          if (err) throw err;
          console.log(petArr[process.argv[3]]);
        });
      }
    });
    break;

  case 'DESTROY':
    fs.readFile('./pets.json', 'utf8', (err, data) => {
      if (err) throw err;
      petArr = JSON.parse(data);
      let destroyedPet;
      if (!process.argv[3]) {
        console.error('Usage: node pets.js destroy INDEX');
        process.exit(1);
      } else {
        let indexSpot = parseInt(process.argv[3]);
        if ((indexSpot >= 0) && (indexSpot < petArr.length)) {
          destroyedPet = petArr[indexSpot];
          petArr.splice(indexSpot, 1);
        } else {
          console.error('Usage: node pets.js destroy INDEX');
          process.exit(1);
        }
        output = JSON.stringify(petArr);
        fs.writeFile('./pets.json', output, (err) => {
          if (err) throw err;
          console.log(destroyedPet);
        });
      }
    });
    break;
}
