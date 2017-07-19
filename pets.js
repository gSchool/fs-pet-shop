/* global console, require, process, __dirname, 'use, */

'use strict';

var fs = require('fs');
var path = require('path');
var petsPath = path.join(__dirname, 'pets.json');

var node = path.basename(process.argv[0]);
var file = path.basename(process.argv[1]);
var cmd = process.argv[2];
var i = process.argv[3];

var create = process.argv[2];
var age = process.argv[3];
var kind = process.argv[4];
var name = process.argv[5];

var update = process.argv[2];
var i = process.argv[3];
var age = process.argv[4];
var kind = process.argv[5];
var name = process.argv[6];

if (cmd === 'read') {
fs.readFile(petsPath, 'utf8', function(readErr, data) {
  if (readErr) {
    throw readErr;
  }
  var pets = JSON.parse(data);

  if (i !== undefined) {
    if ((pets[i]) === undefined) {
      console.error("Usage: node pets.js read INDEX");
      process.exit(1);
    } else {
    console.log(pets[i]);
    process.exit(0);
    }
  }
  console.log(pets);
  });
}

else if (cmd === 'create') {
fs.readFile(petsPath, 'utf8', function(createErr, data) {
  if (createErr) {
    throw createErr;
  }
  var pets = JSON.parse(data);

  if (name !== undefined) {
    age = parseInt(age);
    // console.log(age);
    // console.log(newObject);
    var newObject = {"age": age, "kind": kind, "name": name};
    pets.push(newObject);

    var petsJSON = JSON.stringify(pets);

    fs.writeFile(petsPath, petsJSON, function(writeErr) {
      if (writeErr) {
        throw writeErr;
      }
      console.log(newObject);
      process.exit(0);
    });
  }
     else {
      console.error("Usage: node pets.js create AGE KIND NAME");
      process.exit(1);
      }
    });
  }
//update
  else if (cmd === 'update') {
  fs.readFile(petsPath, 'utf8', function(createErr, data) {
    if (createErr) {
      throw createErr;
    }
    var pets = JSON.parse(data);

    if (name !== undefined) {
      age = parseInt(age);
      // console.log(age);
      // console.log(newObject);
      var newObject = {"age": age, "kind": kind, "name": name};
      pets.splice(i, 1, newObject);

      var petsJSON = JSON.stringify(pets);

      fs.writeFile(petsPath, petsJSON, function(writeErr) {
        if (writeErr) {
          throw writeErr;
        }
        console.log(newObject);
        process.exit(0);
      });
    }
       else {
        console.error("Usage: node pets.js update INDEX AGE KIND NAME");
        process.exit(1);
        }
      });
    }

else {
  console.error(`Usage: ${node} ${file} [read | create | update | destroy]`);
  process.exit(1);
  }
