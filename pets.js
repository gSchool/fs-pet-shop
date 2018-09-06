#!/usr/bin/env node
const fs = require('fs');
// READ THE .JSON FILE
fs.readFile('./pets.json', 'utf8', (err, data) => {
    const recordData = JSON.parse(data);
    // READ RECORD(S)
    if (process.argv[2] === 'read') {
        // if there is an index specified, get that array element
        if (process.argv[3]) {
            const recordNumber = Number(process.argv[3]);
            const recordSelect = recordData[recordNumber];
            // handle error if index out of range
            if (recordSelect === undefined) {
                console.error('Usage: node pets.js read INDEX')
                process.exitCode = 1;
            } else {
                // show the data
                console.log(recordSelect);
            };
        } else {
            // no index specified so show all data
            console.log(recordData);
        };
    // CREATE A NEW RECORD
    } else if (process.argv[2] === 'create') {
        // assign argv items to variables
        let recordAge = Math.floor(Number(process.argv[3]));
        let recordKind = process.argv[4];
        let recordName = process.argv[5];
        // if all arguments are there, write the new record
        if (recordAge && recordKind && recordName) {
            let recordNew = new Object();
            recordNew.age = recordAge;
            recordNew.kind = `${recordKind}`;
            recordNew.name = `${recordName}`;
            recordData.push(recordNew);
            fs.writeFile('pets.json', JSON.stringify(recordData), (err) => {
                // print the created data
                console.log(recordNew);
            });
        } else {
            console.error('Usage: node pets.js create AGE KIND NAME');
            process.exitCode = 1;
        };
    // DESTROY RECORD
    } else if (process.argv[2] === 'destroy') {
        if (process.argv[3]) {
            let recordNumber = Number(process.argv[3]);
            let recordSelect = recordData[recordNumber];
            // handle error if index out of range
            if (recordSelect === undefined) {
                console.error('Usage: node pets.js destroy INDEX')
                process.exitCode = 1;
            } else {
                // show the data
                console.log(recordSelect);
                let recordDestroy = Math.floor(Number(process.argv[3]));
                // if the index is there, remove the record
                if (recordDestroy) {
                    recordData.splice(recordDestroy, 1);
                    fs.writeFile('pets.json', JSON.stringify(recordData), (err) => {
                    });
                } else {
                    console.error('Usage: node pets.js destroy INDEX');
                    process.exitCode = 1;
                };
            };
        } else {
            console.error('Usage: node pets.js destroy INDEX');
            process.exitCode = 1;
        }; 
    // UPDATE RECORD
    } else if (process.argv[2] === 'update') {
        // assign argv to variables
        let recordNumber = Math.floor(Number(process.argv[3]));
        let recordAge = Math.floor(Number(process.argv[4]));
        let recordKind = process.argv[5];
        let recordName = process.argv[6];
        // if all argv variables are accounted for
        if (recordNumber && recordAge && recordKind && recordName) {
            let recordNew = new Object();
            recordNew.age = recordAge;
            recordNew.kind = `${recordKind}`;
            recordNew.name = `${recordName}`;
            recordData.splice(recordNumber, 1, recordNew);
            fs.writeFile('pets.json', JSON.stringify(recordData), (err) => {
                console.log(recordNew);
            });
        } else {
            console.error('Usage: node pets.js update INDEX AGE KIND NAME');
            process.exitCode = 1;
        };
    } else {
        console.error(`Usage: node pets.js [read | create | update | destroy]`);
        process.exitCode = 1;
    };
});