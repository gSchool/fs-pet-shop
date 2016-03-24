var fs = require('fs');
var path = require('path');
var express = require('express');

var app = express();
var petsPath = path.join(__dirname, 'pets.json');


app.get("/pets/:idx", function(req, res){
  fs.readFile(petsPath, 'utf8', function(err, data){
    if (err) {
      throw err;
    }
    var pets = JSON.parse(data);
    if (req.params.idx) {
      var idx = parseInt(req.params.idx);
      console.log(pets[idx]);
      if (pets[idx]) {
        res.send(JSON.stringify(pets[idx]));

      } else if(!pets[idx]) {
        res.statusCode = 404;
        res.send("404 no such pet")
      }
    }
  })
})
app.get("/pets", function(req, res){
  fs.readFile(petsPath, 'utf8', function(err, data){
    if (err) {
      throw err;
    }
    var pets = JSON.parse(data);
    res.statusCode = 200;
    res.send(pets);
  })
})
app.get("/*", function(req, res){
  console.log(req.params)
  res.statusCode = 404;
  res.send("404 not found")
});

app.post("/pets",function(req, res){

  var body = [];
  req.on('data', function(chunk) {
    body.push(chunk);
  }).on('end', function() {
    body = Buffer.concat(body).toString();
    // at this point, `body` has the entire request body stored in it as a string
    body = JSON.parse(body);


  console.log(body);
  var age = body.age;
  var kind = body.kind;
  var name = body.name;

  fs.readFile(petsPath, 'utf8', function(err, data){
    if (err) {
      throw err;
    }
    if (!age || !kind || !name || isNaN(parseInt(age)) || parseInt(age) < 0) {
      res.send("404 bad query");
    } else{
    var pets = JSON.parse(data);
    var newPet = {};
    newPet.age = parseInt(age);
    newPet.kind = kind;
    newPet.name = name;
    console.log(newPet);
    pets.push(newPet);

    var petsJSON = JSON.stringify(pets);

    fs.writeFile(petsPath, petsJSON, function(writeErr){
      if (writeErr) {
        throw writeErr;
      }
      console.log(newPet);
      res.send(newPet + " added to list");
    })
    }
  })
  })
})

app.listen(3000, function(){
  console.log("starting server on localhost:3000")
})
