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



//       case 'write':
//       if(process.argv[2] === 'write' && process.argv[3]!==undefined) {
//
//       }
//       }
//
//
//
//
//
//
// if (process.argv[2] === 'create' && process.argv[3] === undefined) {
//     console.log('Usage: node pets.js create AGE KIND NAME');
//     process.exit(1)
// }
//
// if (process.argv[2] === 'create' && process.argv[3] !== undefined) {
//     var myNewPet = {
//         age: parseInt(process.argv[3]),
//         type: process.argv[4],
//         name: process.argv[5]
//     };
//     process.exit(1)
//
//     fs.writeFile('pets.json', JSON.stringify(myNewPet), 'utf8', function(err) {
//         if (err) {
//             return console.log(err);
//         }
//         petStoreData.push(myNewPet)
//         console.log(petStoreData)
//
//     });
// }
