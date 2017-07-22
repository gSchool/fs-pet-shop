"use strict";

const fs = require("fs");
const path = require("path");

const node = path.basename(process.argv[0]);
const file = path.basename(process.argv[1]);

const pathPets = path.join(__dirname, "pets.json");

const cmd = process.argv[2];

if (!cmd) {
  console.error(`Usage: ${node} ${file} [read | create | update | destroy]`);
  process.exit(1);
}



if (cmd === "read") {
  const index = process.argv[3];

  fs.readFile(pathPets, "utf8", function(err, data) {
    if(err) {
      throw err;
    }
    var pets = JSON.parse(data);

    if (index < 0 || index >= pets.length) {
      console.error(`Usage: ${node} ${file} read INDEX`);
      process.exit(1);
    }

    if(!index) {
      console.log(pets);
    } else {
      console.log(pets[index]);
    }
  });
} else if (cmd === "create") {

  const age = parseInt(Number(process.argv[3]));
  const kind = process.argv[4];
  const name = process.argv[5];

  if(!age || !kind || !name) {
    console.error(`Usage: ${node} ${file} create AGE KIND NAME`);
    process.exit(1);
  }

  fs.readFile(pathPets, "utf8", function(err, data) {
    if(err) {
      throw err;
    }

    var pets = JSON.parse(data);

    var newpet = {age: age, kind: kind, name: name};
    pets.push(newpet);

    var petsJSON = JSON.stringify(pets);
    fs.writeFile(pathPets, petsJSON, function(writeErr) {
      // if there is an error writing, throw (exit program)
      if (writeErr) {
        throw writeErr;
      }
      console.log(newpet);
    });
  });

} else if (cmd === "update") {
  fs.readFile(pathPets, "utf8", function(err, data) {
    if(err) {
      throw err;
    }
    console.log("update ok");
  });
}else if (cmd === "destroy") {
  fs.readFile(pathPets, "utf8", function(err, data) {
    if(err) {
      throw err;
    }
    console.log("destroy ok");
  });
}
