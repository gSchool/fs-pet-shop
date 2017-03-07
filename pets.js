#!/usr/bin/env node
const fs = require('fs');

if (process.argv[2] === 'read') {
  fs.readFile('./pets.json', 'utf-8', function(err, data) {
    if (err) {
      return console.log(err);
      process.exitCode = 1;
      return;
    }
    var myFile = JSON.parse(data);
    if (process.argv[3]) {
      var itemIndex = process.argv[3];
      console.log(myFile[itemIndex]);
      process.exitCode = 0;
    }
    else {
      console.log(myFile);
      process.exitCode = 0;
    }
  })
} else if (process.argv[2] === 'create') {
  if (!process.argv[3] || !process.argv[4] || !process.argv[5] ) {
    console.error('Usage: node pets.js create AGE KIND NAME');
    process.exitCode = 1;
  } else {
    fs.readFile('./pets.json', 'utf-8', function(err, data) {
      if (err) {
        return console.log(err);
        process.exitCode = 1;
        return;
      }
      var myFile = JSON.parse(data);
      var petObject = {};
      petObject.age = parseInt(process.argv[3]);
      petObject.kind = process.argv[4];
      petObject.name = process.argv[5];
      myFile.push(petObject);
      fs.writeFile('./pets.json', JSON.stringify(myFile), (err) => {
        if (err) throw err;
        console.log(petObject);
      })
    })
  }

} else if (process.argv[2] === 'update') {
  if (!process.argv[3] || !process.argv[4] || !process.argv[5] || !process.argv[6]) {
    console.error('Usage: node pets.js update INDEX AGE KIND NAME');
    process.exitCode = 1;
  } else {
    fs.readFile('./pets.json', 'utf-8', function(err, data) {
      if (err) {
        return console.log(err);
        process.exitCode = 1;
        return;
      }
      var myFile = JSON.parse(data);
      var petObject = {};
      var editIndex = parseInt(process.argv[3]);
      petObject.age = parseInt(process.argv[4]);
      petObject.kind = process.argv[5];
      petObject.name = process.argv[6];
      myFile[editIndex] = petObject;
      fs.writeFile('./pets.json', JSON.stringify(myFile), (err) => {
        if (err) throw err;
        console.log(petObject);
      })
    })
  }
} else if (process.argv[2] === 'destroy') {
  if (!process.argv[3]) {
    console.error('Usage: node pets.js destroy INDEX');
    process.exitCode = 1;
  } else {
    fs.readFile('./pets.json', 'utf-8', function(err, data) {
      if (err) {
        return console.log(err);
        process.exitCode = 1;
        return;
      }
      var myFile = JSON.parse(data);
      var destroyIndex = parseInt(process.argv[3]);
      petObject = myFile[destroyIndex];
      myFile.splice(destroyIndex, 1);
      fs.writeFile('./pets.json', JSON.stringify(myFile), (err) => {
        if (err) throw err;
        console.log(petObject);
      })
    })
  }
}
  else {
  console.error('Usage: node pets.js [read | create | update | destroy]');
  process.exitCode = 1;
}
