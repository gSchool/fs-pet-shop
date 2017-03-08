'use strict';
module.exports = {
    "extends": "eslint:recommended"
};
//gets file system to use
var fs = require('fs');
//gets path to use
var path = require('path');
//creates path to pwd
var petPath = path.join(__dirname, 'pets.json');
// console.log(petPath);

var node = path.basename(process.argv[0]);
var file = path.basename(process.argv[1]);
var cmd = process.argv[2];

//reads entire path/err first //data=pet info
if(cmd ==='read'){
  var petIndex = process.argv[3];
  fs.readFile(petPath, 'utf8', function(err, data) {
    if (err) {
      throw err;
    }

    var pets = JSON.parse(data);
    var numPets = pets.length;

    if(petIndex >= 0 && petIndex < numPets){
      console.log(pets[petIndex]);
    }else if(!petIndex){
      console.log(pets);
    }else{
      console.error(`Usage: ${node} ${file} ${cmd} INDEX`);
      process.exit(1);
    }

  });
}
else if (cmd === 'create') {
  fs.readFile(petPath, 'utf8', function(readErr, data) {
    if (readErr) {
      throw readErr;
    }

    //declare argv's
    var pets = JSON.parse(data);
    var pAge = parseInt(process.argv[3]);
    var pKind = process.argv[4];
    var pName = process.argv[5];

    //if has age, kind, and name, create object to push into array
    if(pAge && pKind && pName){
      var newPet = {};
      newPet.age = pAge;
      newPet.kind = pKind;
      newPet.name = pName;

      pets.push(newPet);

      var petJSON = JSON.stringify(pets);

      fs.writeFile(petPath, petJSON, function(writeErr){
        if(writeErr){
          throw writeErr;
        }

          console.log(newPet);

      });

    }else{
      console.error(`Usage: ${node} ${file} ${cmd} AGE KIND NAME`);
      process.exit(1);
    }

  });
}
else if(cmd === 'update'){

  console.log('update');
}
else if(cmd === 'destroy'){
  console.log('destroy');
}

else{
  console.error(`Usage: ${node} ${file} [read | create | update | destroy]`);
  process.exit(1);
}
