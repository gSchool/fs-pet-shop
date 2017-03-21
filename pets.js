var fs = require('fs');

if (!process.argv[2]) {
  console.error('Usage: node pets.js [read | create | update | destroy]');
  process.exit(1);

} else if (process.argv[2] === 'read') {
  fs.readFile('./pets.json', 'utf8', function(err, data) {
    if (err) throw err;
    var pets = JSON.parse(data);
    if (process.argv[3]) {
      if (pets[process.argv[3]]) {
        console.log(pets[process.argv[3]]);
      } else {
        console.error('Usage: node pets.js read INDEX');
        process.exit(1);
      }
    } else {
      console.log(pets);
    }
  });

} else if (process.argv[2] === 'create') {
  if (process.argv.length === 6) {
    fs.readFile('./pets.json', 'utf8', function(err, data) {
      var pets = JSON.parse(data);
      var newPet = {
        age: parseInt(process.argv[3], 10),
        kind: process.argv[4],
        name: process.argv[5]
      }
      pets.push(newPet);
      pets = JSON.stringify(pets)
      fs.writeFile('./pets.json', pets, function(innerErr) {
        if (innerErr) throw innerErr;
        console.log(newPet);
      });
    });
  } else {
    console.error('Usage: node pets.js create AGE KIND NAME');
    process.exit(1);
  }
}
