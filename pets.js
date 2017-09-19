#!/usr/bin/env node

const fs = require('fs');

if (process.argv.length === 2) {
  console.error('Usage: node pets.js [read | create | update | destroy]');
  process.exit(1);
}

if (process.argv[2] === 'read') {
  fs.readFile('./pets.json', (err, data) => {
    if (err) throw err;
    let pets = JSON.parse(data);
    if (process.argv[3]) {
      let readOption = process.argv[3];
      if (pets[readOption]) {
        console.log(pets[readOption]);
      } else {
        console.error("Usage: node pets.js read INDEX");
        process.exit(1);
      }
    } else {
      console.log(pets);
    }
  })
}

if (process.argv[2] === 'create') {
  if (process.argv.length !== 6) {
    console.error("Usage: node pets.js create AGE KIND NAME");
    process.exit(1);
  } else {
    fs.readFile('./pets.json', (err, data) => {
      if (err) throw err;
      let pets = JSON.parse(data);
      let newPet = {
        age: parseInt(process.argv[3]),
        kind: process.argv[4],
        name: process.argv[5]};
        pets.push(newPet);
        fs.writeFile('./pets.json', JSON.stringify(pets), (err) => {
          if (err) throw err;
        });
        console.log(newPet);
    })
  }
}

if (process.argv[2] === 'update') {
  if (process.argv.length !== 7) {
    console.error("Usage: node pets.js update INDEX AGE KIND NAME");
    process.exit(1);
  } else {
    fs.readFile('./pets.json', (err, data) => {
      if (err) throw err;
      let pets = JSON.parse(data);

      pets[process.argv[3]] = {
        age: parseInt(process.argv[4]),
        kind: process.argv[5],
        name: process.argv[6]
      };

      fs.writeFile('./pets.json', JSON.stringify(pets), (err) => {
        if (err) throw err;
      });
      console.log(pets[process.argv[3]]);
    })
  }
}

if (process.argv[2] === 'destroy') {
  if (process.argv.length !== 4) {
    console.error("Usage: node pets.js destroy INDEX");
    process.exit(1);
  } else {
    fs.readFile('./pets.json', (err, data) => {
      if (err) throw err;
      let pets = JSON.parse(data);

      let petToDestroy = pets.splice(process.argv[3], 1)[0];

      fs.writeFile('./pets.json', JSON.stringify(pets), (err) => {
        if (err) throw err;
      });

      console.log(petToDestroy);
    })
  }
}
