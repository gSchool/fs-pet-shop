var fs = require('fs');
var input = process.argv;
var [nodePath, filePath, command, ...options] = input;
var age = input[3];
var kind = input[4];
var name = input[5];

//reading in pets.json
fs.readFile('pets.json', 'utf8', function (err, data) {
  //JSON.parse changes from a string into array (javascript readable)
  data = JSON.parse(data)
  //if no third argument present log usage statement
  if (!input[2]) {
    console.log('Usage: node pet.js [read | create | update | destroy]');
    //if argument is higher than number of pets, or negative, log usage
  } else if ((parseInt(input[3]) > data.length || parseInt(input[3] < 0)) && input[2] === 'read') {
    console.log('Usage: node pets.js read INDEX');
    //statement to handle read command with in bound index
  } else if (input.length > 1 && input[2] === 'read' && input[3]) {
    console.log(data[input[3]]);
    //statment that returns the pets.json contents
  } else if (input.length > 1 && input[2] === 'read') {
    console.log(data);
  } else {
    //set up create command and prepare new pet object for data array
    if (command === 'create' && options.length === 3) {
      var newPet = {
        age: parseInt(age),
        kind: kind,
        name: name
    }
      data.push(newPet);
      var newPets = JSON.stringify(data);
      fs.writeFile('pets.json', newPets, function(err, data) {
        if (err) {
          console.log('node pets.js create AGE KIND NAME');
        } else {
          console.log(newPet);
        }
      });
    };
  };
});
