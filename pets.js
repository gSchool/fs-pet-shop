let fs = require('fs');

let runningArg = process.argv
// console.log(runningArg);
if (runningArg[2] ==='read') {
    runRead();
} else if (runningArg[2] === 'create') {
    runCreate();
} else if (runningArg[2] === 'update') {
    runUpdate();
} else if (!runningArg[2]) {
    console.error(new Error('Missing input, need subcommand.'))
    runError();
}

function runError() {
    process.exit(1);
}

function runCreate() {
    let info;
    let newPet = {};
    if (!runningArg[5]) {
        console.error(new Error('Incorrect input. Need Age, Kind, and Name of pet.'));
        runError();
    }
    fs.readFile('pets.json', 'utf8', function(error, data){
        info = JSON.parse(data);
        newPet.age = Number.parseInt(runningArg[3]);
        newPet.kind = runningArg[4];
        newPet.name = runningArg[5];
        console.log(newPet);
        info.push(newPet);
        fs.writeFile('pets.json', JSON.stringify(info), function(error) {
            if (error) {
                console.log(error);
            } else {
                console.log('New pet added!');
                console.log(info);
            }
        })
    }); 
}

function runUpdate() {
    let info;
    if (!runningArg[6]) {
        console.error(new Error('Incorrect input. Need Index, Age, Kind, and Name of pet.'));
        runError();
    }
    fs.readFile('pets.json', 'utf8', function(error, data){
        info = JSON.parse(data);
        info[runningArg[3]].age = Number.parseInt(runningArg[4]);
        info[runningArg[3]].kind = runningArg[5];
        info[runningArg[3]].name = runningArg[6];
        console.log(info[runningArg[3]]);
        fs.writeFile('pets.json', JSON.stringify(info), function(error) {
            if (error) {
                console.log(error);
            } else {
                console.log('Updated pet info!');
            }
        })
    }); 
}

function runRead() {
    fs.readFile('pets.json', 'utf8', function(error, data){
        const info = JSON.parse(data);
        let num = Number.parseInt(runningArg[3]);
        if (!runningArg[3]) {
            console.log(info);
        } else if (!info[num]) {
            console.error(new Error('No information found at that index.'))
            runError();
        } else {
            console.log(info[num]);
        }
    })
}

