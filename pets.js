'use strict';

var fs = require('fs');
var path = require('path')
var petsPath = path.join(__dirname, 'pets.json');

var node = path.basename(process.argv[0]);
var file = path.basename(process.argv[1]);
var cmd = process.argv[2];
var pet = process.argv[3];

if (cmd === 'read') {
  fs.readFile(petsPath, 'utf8', function(err, data){
    if(err){
      throw err;
    }

    var pets = JSON.parse(data);

    if(pets[pet]){
      console.log(pets[pet]);
    }else if (pet === undefined) {
      console.log(pets);
    }else{
      console.error(`Usage: ${node} ${file} ${cmd} INDEX`);
      process.exit(1);
    }
  });
}else if(cmd === 'create'){
  fs.readFile(petsPath, 'utf8', function(readErr, data) {
    if (readErr) {
      throw readErr;
    }

    var pets = JSON.parse(data);
    var age = parseInt(process.argv[3]);
    var kind = process.argv[4];
    var name = process.argv[5];

    if (age && kind && name) {
     var newPet = {age: age, kind: kind, name: name};
     pets.push(newPet);
    }else{
      console.error(`Usage: ${node} ${file} ${cmd} AGE KIND NAME`);
      process.exit(1);
    }

    var petsJSON = JSON.stringify(pets);

    fs.writeFile(petsPath, petsJSON, function(writeErr) {
      if (writeErr) {
        throw writeErr;
      }

      console.log(newPet);
    });
  });
}else{
  console.error(`Usage: ${node} ${file} [read | create | update | destroy]`);
  process.exit(1);
}

//
// ```shell
// $ node pets.js
// Usage: node pets.js [read | create | update | destroy]
// ```
//
// var fs = require('fs');
// var path = require('path');
// var guestsPath = path.join(__dirname, 'guests.json');
//
// var node = path.basename(process.argv[0]);
// var file = path.basename(process.argv[1]);
// var cmd = process.argv[2];
//
// if (cmd === 'read') {
//   fs.readFile(guestsPath, 'utf8', function(err, data) {
//     if (err) {
//       throw err;
//     }
//
//     var guests = JSON.parse(data);
//
//     console.log(guests);
//   });
// }
// else if (cmd === 'create') {
//   fs.readFile(guestsPath, 'utf8', function(readErr, data) {
//     if (readErr) {
//       throw readErr;
//     }
//
//     var guests = JSON.parse(data);
//     var guest = process.argv[3];
//
//     if (!guest) {
//       console.error(`Usage: ${node} ${file} ${cmd} GUEST`);
//       process.exit(1);
//     }
//
//     guests.push(guest);
//
//     var guestsJSON = JSON.stringify(guests);
//
    // fs.writeFile(guestsPath, guestsJSON, function(writeErr) {
    //   if (writeErr) {
    //     throw writeErr;
    //   }
    //
    //   console.log(guest);
    // });
//   });
// }
// else {
//   console.error(`Usage: ${node} ${file} [read | create]`);
//   process.exit(1);
// }
