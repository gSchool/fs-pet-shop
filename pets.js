'use strict';
module.exports = {
    "extends": "eslint:recommended"
};
//gets file system to use
var fs = require('fs');
//gets path to use
var path = require('path');
//creates path to pwd
var petPath = path.join(__dirname, 'pets.json');

var node = path.basename(process.argv[0]);
var file = path.basename(process.argv[1]);
var cmd = process.argv[2];
var petIndex = parseInt(process.argv[3]);

//reads entire path/err first //data=pet info
if(cmd ==='read'){
  fs.readFile(petPath, 'utf8', function(err, data) {
    if (err) {
      throw err;
    }

    var pets = JSON.parse(data);
 //pets=typeof=array
    var index;
    for(var i = 0; i < pets.length; i++){
      if(petIndex === i){
        console.log(pets[i]);
      }else{
        console.log('pet not found');
      }
    }
    // console.log(pets);
  });
}
else if(cmd === 'create'){
  console.log('create');
}
else if(cmd === 'update'){
  console.log('update');
}
else if(cmd === 'destroy'){
  console.log('destroy');
}

else{
  console.error(`Usage: ${node} ${file} [ read | create | update | destroy ]`);
  process.exit(1);
}
// var pets = JSON.parse(data); //pets=typeof=array
// for(var i = 0; i < pets.length; i++){
//   if(pets[i].name === petName){
//     console.log(pets[i], 'pet found');
//   }else{
//     console.log('pet not found');
//   }
// }
// console.log(pets);
