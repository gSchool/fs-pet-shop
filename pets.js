const fs = require('fs');
//file system, to interact with this file with node
const express = require('express');
const cmd = process.argv[2];
// process.argv property returns an array containing the command line arguments passed when the Node.js process was launched
const path = require('path');
// The path module provides utilities for working with file and directory paths.
const petsPath = path.join(__dirname, 'pets.json');
// method joins all given path segments together using the platform specific separator as a delimiter, then normalizes the resulting path
const node = path.basename(process.argv[0]);
const file = path.basename(process.argv[1]);
const index = Number.parseInt(process.argv[3]);
// path.basename() methods returns the last portion of a path
const buffer = fs.readFileSync(petsPath);
const pets = JSON.parse(buffer);


// npm test ./test/pets.test.js



if (cmd === 'read' && process.argv[3] !== undefined) {
    if (process.argv[3] < 0 || process.argv[3] > pets.length - 1) {
        console.error('Usage: node pets.js [read]  [number]')
        process.exit()
    } else {
        console.log(pets[index]);
    }
} else if (cmd === undefined) {
    console.error('Usage: node pets.js [read | create | update | destroy]');
    process.exit(1)

} else if (cmd === 'read') {
    console.log(pets);
} else if (cmd === 'create') {
    if (process.argv[3] === null || process.argv[4] === undefined || process.argv[5] === undefined) {
        console.error('Usage: node pets.js create AGE KIND NAME')
        process.exit(1)
    } else {
        const newPet = {}
        var agePet = Number.parseInt(process.argv[3])
        newPet.age = agePet
        newPet.kind = process.argv[4]
        newPet.name = process.argv[5]
        pets.push(newPet)
        var createPet = JSON.stringify(pets)
        fs.writeFile('./pets.json', createPet, (err) => {
            if (err) throw err;
            console.log(newPet);
        });
    }

}
