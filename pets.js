'use strict';

var fs = require('fs');
var path = require('path');
var petsPath = path.join(__dirname, 'pets.json');

var node = path.basename(process.argv[0]);
var file = path.basename(process.argv[1]);
var cmd = process.argv[2];


if (cmd === 'read'){
  fs.readFile(petsPath, 'utf8', function(err, data){
    if (err){
      throw err;
    }
    var pets = JSON.parse(data);
    var index = process.argv[3];
    else if (index < pets.length){
      console.log(pets[index]);
    }
    else if{
      console.error(`Usage: ${node} ${file} ${cmd} INDEX`);
      process.exit(1);
    }
  });
}
else if (cmd === 'create'){
  fs.readFile(petsPath, 'utf8', function(readErr, data){
    if (readErr){
      throw readErr;
    }

    var age = process.argv[3];
    var kind = process.argv[4];
    var name = process.argv[5];

    var pets = JSON.parse(data);

    if (!age || !kind || !name) {
      console.log(`Usage: ${node} ${file} ${cmd} AGE KIND NAME`);
      process.exit(1);
    }

    pets.push({age:age, kind:kind, name:name});

    var petsJSON = JSON.stringify(pets);

    fs.writeFile(petsPath, petsJSON, function(writeErr) {
      if (writeErr) {
        throw writeErr;
      }

      console.log(`Usage: ${node} ${file} ${cmd} ${age} ${kind} ${name}`);
      process.exit(1);
    });
  });
}
else {
  console.error(`Usage: ${node} ${file} read`);
  process.exit(1);
}
