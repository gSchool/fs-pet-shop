const fs = require('fs')
var database = require('./pets.json')







if (process.argv[2] === 'read' && process.argv[3] != undefined) {
    if (process.argv[3] > process.argv.length - 1 || process.argv[3] < 0) {
        console.error('Usage: node pets.js read INDEX');
        process.exit(1)
    } else {
        console.log(database[process.argv[3]]);
    }
} else if (process.argv[2] === undefined) {
    console.error('Usage: node pets.js [read | create | update | destroy]');
    process.exit(1)
} else if (process.argv[2] === "read") {
    console.log(database);
}


if (process.argv[2] === 'create' && process.argv[5] === undefined) {
    console.error('Usage: node pets.js create AGE KIND NAME');
    process.exit(1)
} else if (process.argv[2] === 'create' && process.argv[5] != undefined) {
    var addPet = {
        age: parseInt(process.argv[3]),
        kind: process.argv[4],
        name: process.argv[5]
    }
    database.push(addPet)
    var newPetsArray = JSON.stringify(database)
    fs.writeFileSync('./pets.json', newPetsArray)
    console.log(database[database.length-1]);
}
