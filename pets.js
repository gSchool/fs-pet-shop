'use strict';

var fs = require('fs');
var path = require('path');
var petsPath = path.join(__dirname, 'pets.json');

fs.readFile(petsPath, 'utf8', function(err, data){
  if (err){
    throw err;
  }

  var pets = JSON.parse(data);

  console.log(pets);
});
