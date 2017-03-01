const fs = require('fs');

// var buf = fs.readFileSync('/path/to/file')

// console.log(process.argv);
var myArgs = process.argv.slice(2);

var petsData = 'pets.json';
///read it , then JSON.parse JSON.stringify

var ourPetData =fs.readFileSync(petsData);

var scrubbedData = JSON.parse(ourPetData);


fs.readFile(PetsData, 'utf8', function (err, contents) {
  if ( myArgs[0] === 'read') {
    console.log(contents);
    console.log(scrubbedData);
  }
  else if ( myArgs[0] === 'write' ) {
    console.log('something happened');
    console.log(myArgs);
  }
  else if (err) {
    return console.log('Command produced a zero status code');
  }
}


//process.exit

//google process.argv/.exit
