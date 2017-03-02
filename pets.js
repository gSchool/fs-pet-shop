#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const command = process.argv[2];
const dbPath = path.join(__dirname, '/pets.json');

switch (command) {
  case 'read':
    fs.readFile(dbPath, 'utf8', (err, data) => {
      if (err) throw err;
      const pets = JSON.parse(data);
      const index = Number.parseInt(process.argv[3], 10);

      if (Number.isNaN(index)) {
        console.log(pets);
        process.exit();
      }
      console.log(pets[index]);
    });
    break;

  case 'create':
    fs.readFile(dbPath, 'utf8', (err, data) => {
      if (err) throw err;
      const pets = JSON.parse(data);
      const age = Number.parseInt(process.argv[3], 10);
      const kind = process.argv[4];
      const name = process.argv[5];

      if (Number.isNaN(age) || !kind || !name) {
        console.error('Usage: node pets.js create AGE KIND NAME');
        process.exit(1);
      }

      const pet = { age, kind, name };
      pets.push(pet);
      const petsJSON = JSON.stringify(pets);

      fs.writeFile(dbPath, petsJSON, (writeErr) => {
        if (writeErr) throw writeErr;
        console.log(pet);
      });
    });

    break;
  case 'update':
    fs.readFile(dbPath, 'utf8', (err, data) => {
      if (err) throw err;
      const pets = JSON.parse(data);
      const index = Number.parseInt(process.argv[3], 10);
      const age = Number.parseInt(process.argv[4], 10);
      const kind = process.argv[5];
      const name = process.argv[6];

      if (Number.isNaN(index) || Number.isNaN(age) || !kind || !name) {
        console.error('Usage: node pets.js update INDEX AGE KIND NAME');
        process.exit(1);
      }

      const pet = { age, kind, name };
      pets[index] = pet;
      const petsJSON = JSON.stringify(pets);

      fs.writeFile(dbPath, petsJSON, (writeErr) => {
        if (writeErr) throw writeErr;
        console.log(pet);
      });
    });

    break;
  case 'destroy':
    fs.readFile(dbPath, 'utf8', (err, data) => {
      if (err) throw err;
      const pets = JSON.parse(data);
      const index = Number.parseInt(process.argv[3], 10);

      if (Number.isNaN(index)) {
        console.error('Usage: node pets.js destroy INDEX');
        process.exit(1);
      }

      const pet = pets.splice(index, 1)[0];
      const petsJSON = JSON.stringify(pets);

      fs.writeFile(dbPath, petsJSON, (writeErr) => {
        if (writeErr) throw writeErr;
        console.log(pet);
      });
    });

    break;
  default:
    console.error('Usage: node pets.js [read | create | update | destroy]');
    process.exit(1);
}
