var bodyParser = require('body-parser')
const param = process.argv.slice(2, process.argv.length)
const fs = require('fs');
var petStoreData =
    JSON.parse(fs.readFileSync('pets.json', 'utf8'));



// <--initial start-->
if (param < 1) {
    console.error('node pets.js [read | create | update | destroy]')
}

// <!//commands//>
if (process.argv[2]>=0) {
console.log(petStoreData);
  }
//READ//
switch (process.argv[2]) {
    case 'read':
        if (process.argv[2] === 'read' && process.argv[3] === undefined) {
            console.log(petStoreData);
            break;
          }else if (process.argv[2] === 'read' && process.argv[3] !== undefined) {
            console.log(petStoreData[process.argv[3]]);
            break;
          }else{
            console.log(console.error('node pets.js read) INDEX'))
          }
        }
