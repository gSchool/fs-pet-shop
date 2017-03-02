const fs = require('fs');
const path = require('path');

// var buf = fs.readFileSync('/path/to/file')

// console.log(process.argv); command is better

var node = path.basename(process.argv[0]);
var file = path.basename(process.argv[1]);
var command = process.argv[2];
var index = process.argv[3];
var age = parseInt(process.argv[3]);

var petsData = 'pets.json';

if (command === 'read') {
    fs.readFile(petsData, 'utf8', (err, data) => {

        if (err) {
            throw err
        };

        var scrubbedData = JSON.parse(data);
        if (index) {
            if (index <= scrubbedData.length - 1 && index > -1) {
                console.log(scrubbedData[index]);
            } else {
                console.error(`Usage: ${node} ${file} ${command} INDEX`);
                process.exit(5);
            }
        } else {
            console.log(scrubbedData);
        }
    })
} else if (command === 'create') {
    fs.readFile(petsData, 'utf8', (err, data) => {
        if (err) {
            throw err
        }
        var petsDB = JSON.parse(data);
        // console.log(petsDB);
        var age = parseInt(process.argv[3]);
        var kind = process.argv[4];
        var name = process.argv[5];
        var newPetInfo = { "age": age, "kind": kind, "name": name};
        //  console.log(newPetInfo);


        if (Number.isNaN(age) || process.argv.length < 6) {
            console.error('Usage: node pets.js create AGE KIND NAME');
            process.exit(5);
        } else {

            //  var newPetAddedToDB =
            petsDB.push(newPetInfo);
            // console.log(petsDB);

            // console.log(petsDB);

            fs.writeFile(petsData, JSON.stringify(petsDB), (err) => {
             if (err) throw err;
           });
            console.log(petsDB[2]);
        };

    })
} else {
    console.error(`Usage: ${node} ${file} [read | create | update | destroy]`);
    process.exit(5);

}


// fs.readFile(PetsData, 'utf8', function (err, contents) {
//   if ( myArgs[0] === 'read') {
//     console.log(contents);
//     console.log(scrubbedData);
//   }
//   else if ( myArgs[0] === 'write' ) {
//     console.log('something happened');
//     console.log(myArgs);
//   }
//   else if (err) {
//     return console.log('Command produced a zero status code');
//   }
// });


//process.exit

//google process.argv/.exit
