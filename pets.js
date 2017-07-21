const fs = require('fs');

var node = process.argv[0];
var file = process.argv[1];
var cmd = process.argv[2];

if (cmd === 'read') {
  var petIndex = process.argv[3];
  fs.readFile('./pets.json', 'utf8', function(err, data) {
    if (err) {
      throw err;
    }
    var pets = JSON.parse(data);
      if (!petIndex){
        console.log(pets);
      } else if (petIndex > pets.length - 1) {
        console.error(`Usage: node pets.js read ${pets}`);
        process.exit(2);
      } else {
        console.log(pets[petIndex]);
      }
  });
} else if (cmd === 'create'){
  var age = process.argv[3];
  var kind = process.argv[4];
  var name = process.argv[5];
  fs.readFile('./pets.json', 'utf8', function(readErr, data) {
    if (readErr) {
      throw readErr;
    }
    var pets = JSON.parse(data);
      if (!age || !kind || !name){
        console.error(`Usage: node pets.js create AGE KIND NAME`);
        process.exit(3);
      }
      var newPet = {};
      newPet.age = parseInt(age);
      newPet.kind = kind;
      newPet.name = name;

      pets.push(newPet);

      var petsJSON = JSON.stringify(pets);

      fs.writeFile('./pets.json', petsJSON, function (writeErr){
        if (writeErr){
          throw writeErr;
        }
        console.log(newPet);
      });
  });
}
else {
  console.error(`Usage: node pets.js [read | create | update | destroy]`);
  process.exit(1);
}
