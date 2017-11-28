#!/usr/local/bin/node

switch(process.argv[2]) {
  case 'read' : read(); break;
  case 'create' : create(); break;
  case 'update' : update(); break;
  case 'destroy' : destroy(); break;
  default :
    console.error('Usage: node pets.js [read | create | update | destroy]');
    process.exit(1);
}

function read() {
  require('fs').readFile('./pets.json', (err, data) => {
    if (err) {
      console.error(err);
      process.exit(1);
    } else {
      data = JSON.parse(data);
      if (process.argv[3]) {
        if (process.argv[3] < data.length && process.argv[3] >= 0) {
          console.log(data[process.argv[3]]);
        } else {
          console.error('Usage: node pets.js read INDEX');
          process.exit(1);
        }
      } else {
        console.log(data);
      }
    }
  });
}

function create() {
  if (process.argv.length === 6) {
    require('fs').readFile('./pets.json', (err, data) => {
      if (err) {
        console.error(err);
        process.exit(1);
      } else {
        let pet = {
          age: Number.parseInt(process.argv[3]),
          kind: process.argv[4],
          name: process.argv[5]
        };
        let list = JSON.parse(data);
        list.push(pet);
        require('fs').writeFile('./pets.json', JSON.stringify(list), (err) => {
          if (err) {
            console.error(err);
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
    require('fs').readFile('./pets.json', (err, data) => {
      if (err) {
        console.error(err);
        process.exit(1);
      } else {
        let pet = {
          age: Number.parseInt(process.argv[4]),
          kind: process.argv[5],
          name: process.argv[6]
        };
        let list = JSON.parse(data);
        list[process.argv[3]] = pet;
        require('fs').writeFile('./pets.json', JSON.stringify(list), (err) => {
          if (err) {
            console.error(err);
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
    require('fs').readFile('./pets.json', (err, data) => {
      if (err) {
        console.error(err);
        process.exit(1);
      } else {
        let list = JSON.parse(data);
        let pet = list.splice(process.argv[3], 1)[0];
        require('fs').writeFile('./pets.json', JSON.stringify(list), (err) => {
          if (err) {
            console.error(err);
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
