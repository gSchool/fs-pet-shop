#!/usr/local/bin/node

const fs = require('fs');

function read() {
  fs.readFile('./pets.json', (err, data) => {
    if (err) {
      console.error(err);
      process.exit(1);
    } else {
      const pets = JSON.parse(data);
      if (process.argv[3]) {
        if (process.argv[3] < pets.length && process.argv[3] >= 0) {
          console.log(pets[process.argv[3]]);
        } else {
          console.error('Usage: node pets.js read INDEX');
          process.exit(1);
        }
      } else {
        console.log(pets);
      }
    }
  });
}

function create() {
  if (process.argv.length === 6) {
    fs.readFile('./pets.json', (err, data) => {
      if (err) {
        console.error(err);
        process.exit(1);
      } else {
        const pet = {
          age: Number.parseInt(process.argv[3]),
          kind: process.argv[4],
          name: process.argv[5],
        };
        const list = JSON.parse(data);
        list.push(pet);
        fs.writeFile('./pets.json', JSON.stringify(list), (error) => {
          if (error) {
            console.error(error);
            process.exit(1);
          } else {
            console.log(pet);
          }
        });
      }
    });
  } else {
    console.error('Usage: node pets.js create AGE KIND NAME');
    process.exit(1);
  }
}

function update() {
  if (process.argv.length === 7) {
    fs.readFile('./pets.json', (err, data) => {
      if (err) {
        console.error(err);
        process.exit(1);
      } else {
        const pet = {
          age: Number.parseInt(process.argv[4]),
          kind: process.argv[5],
          name: process.argv[6],
        };
        const list = JSON.parse(data);
        list[process.argv[3]] = pet;
        fs.writeFile('./pets.json', JSON.stringify(list), (error) => {
          if (error) {
            console.error(error);
            process.exit(1);
          } else {
            console.log(pet);
          }
        });
      }
    });
  } else {
    console.error('Usage: node pets.js update INDEX AGE KIND NAME');
    process.exit(1);
  }
}

function destroy() {
  if (process.argv.length === 4) {
    fs.readFile('./pets.json', (err, data) => {
      if (err) {
        console.error(err);
        process.exit(1);
      } else {
        const list = JSON.parse(data);
        const pet = list.splice(process.argv[3], 1)[0];
        fs.writeFile('./pets.json', JSON.stringify(list), (error) => {
          if (error) {
            console.error(error);
            process.exit(1);
          } else {
            console.log(pet);
          }
        });
      }
    });
  } else {
    console.error('Usage: node pets.js destroy INDEX');
    process.exit(1);
  }
}

switch (process.argv[2]) {
  case 'read': read(); break;
  case 'create': create(); break;
  case 'update': update(); break;
  case 'destroy': destroy(); break;
  default:
    console.error('Usage: node pets.js [read | create | update | destroy]');
    process.exit(1);
}
