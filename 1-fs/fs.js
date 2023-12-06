#!/usr/bin/env node

const { exit, argv } = require('process');
var fs = require('fs');


if(!argv[2]) {
    console.error('Usage: node fs.js [read | create | update | destroy]');
    exit(1);
}


if(argv[2] == "read") {
    fs.readFile('../pets.json', 'utf8', (error, data) => {
        if(error){
            console.error(error);
        } else {
            if(!argv[3]) {
                console.log(JSON.parse(data))
            } else {
                if(JSON.parse(data)[argv[3]] === undefined) {
                    console.error(`Usage: node fs.js read INDEX`);
                    exit(1);
                } else { 
                    console.log(JSON.parse(data)[argv[3]]); 
                }
            }
        }
    })
}


if(argv[2] == "create") {
    if(!argv[3] || !argv[4] || !argv[5]) {
        console.error('Usage: node fs.js create AGE KIND NAME');
        exit(1);
    } else {
        fs.readFile('../pets.json', 'utf8', (error, data) => {
            var dataArr = JSON.parse(data);
            var newAnimal = { age: Number(argv[3]), kind: argv[4], name: argv[5] };
            dataArr.push(newAnimal);

            fs.writeFile('../pets.json', JSON.stringify(dataArr), (error) => {
                if(error) {
                    console.error(error);
                    exit(1);
                }
            })                
        })

    }
}


if(argv[2] == "update") {
    if(!argv[3] || !argv[4] || !argv[5] || !argv[6]) {
        console.error('Usage: node fs.js update INDEX AGE KIND NAME');
        exit(1);
    } else {
        fs.readFile('../pets.json', 'utf8', (error, data) => {
            var dataArr = JSON.parse(data);
            var updatedAnimal = { age: Number(argv[4]), kind: argv[5], name: argv[6] };

            if(dataArr[argv[3]] === undefined) {
                console.error('Record not found, did you mean to create?')
                exit(1);
            }

            dataArr[argv[3]] = updatedAnimal;

            fs.writeFile('../pets.json', JSON.stringify(dataArr), (error) => {
                if(error) {
                    console.error(error)
                    exit(1);
                }
            })                
        })
    }
}


if(argv[2] == "destroy") {
    if(!argv[3]) {
        console.error('Usage: node fs.js destroy INDEX');
        exit(1);
    } else {
        fs.readFile('../pets.json', 'utf8', (error, data) => {
            var dataArr = JSON.parse(data);

            if(dataArr[argv[3]] === undefined) {
                console.error('Record not found')
                exit(1);
            }

            dataArr.splice(argv[3], 1);
            
            fs.writeFile('../pets.json', JSON.stringify(dataArr), (error) => {
                if(error) {
                    console.error(error)
                    exit(1);
                }
            })      
        })
    }
}