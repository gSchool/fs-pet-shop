const fs = require('fs');

if (process.argv[2] === 'read') {
    fs.readFile('./pets.json', 'utf8', (err, data) => {
        if (err) {
            console.error(`Usage: node pets.js [read | create | update | destroy]`);
            process.exitCode = 1;    
        } else {
            if (process.argv[3]) {
                let recordNumber = Number(process.argv[3]);
                let recordData = JSON.parse(data);
                let recordSelect = recordData[recordNumber];
                if (recordSelect === undefined) {
                    console.error('Usage: node pets.js read INDEX')
                    process.exitCode = 1;
                } else {
                    console.log(recordSelect);
                };
            } else {
                let recordData = JSON.parse(data);
                console.log(recordData);
            };
        };
    });
} else if (process.argv[2] === 'create') {
    fs.readFile('./pets.json', 'utf8', (err, data) => {
        
        let recordData = JSON.parse(data);
        let recordAge = Math.floor(Number(process.argv[3]));
        // console.log(recordAge);
        let recordKind = process.argv[4];
        // console.log(recordKind);
        let recordName = process.argv[5];
        // console.log(recordName);
        if (recordAge && recordKind && recordName) {
            let recordNew = new Object();
            recordNew.age = recordAge;
            recordNew.kind = `${recordKind}`;
            recordNew.name = `${recordName}`;
            recordData.push(recordNew);
            fs.writeFile('pets.json', JSON.stringify(recordData), (err) => {
                if (err) {
                    console.error('Usage: node pets.js create AGE KIND NAME');
                };
                console.log(recordNew);
            });
        } else {
            console.error('Usage: node pets.js create AGE KIND NAME');
            process.exitCode = 1;
        };
    });
} else if (process.argv[2] === 'destroy') {
    fs.readFile('./pets.json', 'utf8', (err, data) => {
        
        let recordData = JSON.parse(data);
        let recordDestroy = Math.floor(Number(process.argv[3]));
        console.log(recordDestroy);
        if (recordDestroy) {
            recordData.splice(recordDestroy, 1);
            fs.writeFile('pets.json', JSON.stringify(recordData), (err) => {
                if (err) {
                    console.error('Usage: node pets.js destroy INDEX');
                    process.exitCode = 1;
                };
            });
        } else {
            console.error('Usage: node pets.js destroy INDEX');
            process.exitCode = 1;
        };
    });
} else if (process.argv[2] === 'update') {
    fs.readFile('./pets.json', 'utf8', (err, data) => {
        
        let recordData = JSON.parse(data);
        let recordNumber = Math.floor(Number(process.argv[3]));
        console.log(recordNumber);
        let recordAge = Math.floor(Number(process.argv[4]));
        console.log(recordAge);
        let recordKind = process.argv[5];
        console.log(recordKind);
        let recordName = process.argv[6];
        console.log(recordName);
        if (recordNumber && recordAge && recordKind && recordName) {
            let recordNew = new Object();
            recordNew.age = recordAge;
            recordNew.kind = `${recordKind}`;
            recordNew.name = `${recordName}`;
            recordData.splice(recordNumber, 1, recordNew);
            fs.writeFile('pets.json', JSON.stringify(recordData), (err) => {
                if (err) {
                    console.error('Usage: node pets.js update INDEX AGE KIND NAME');
                    process.exitCode = 1;
                };
                console.log(recordNew);
            });
        } else {
            console.error('Usage: node pets.js updtae AGE KIND NAME');
            process.exitCode = 1;
        };
    });
};