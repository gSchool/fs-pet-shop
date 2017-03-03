'use strict';
//moved app.use below the .get, b/c otherwise the get request returned a 404- I take it this is one of those top to bottom things?


var express = require('express');
var app = express();
var fs = require('fs');
var path = require('path');
var petsPath = path.join(__dirname, 'pets.json');


const petsData = 'pets.json';


const PORT = process.env.PORT || 3005;
app.listen( PORT, () => {
  console.log('listening on port', PORT)
})


app.get('/pets', (req, res) => {
  fs.readFile(petsPath, 'utf8', (err, petsJSON) => {
    if (err) {
      console.error('Not Found');
      return res.sendStatus(404);
    }

  var pets = JSON.parse(petsJSON);
  res.send(pets);
  })
})

app.get('/pets/:id', (req,res) => {
  fs.readFile(petsPath, 'utf8', (err, petsJSON) => {
    if (err) {
      console.error(err.stack);
      return res.sendStatus(500);
    }

    var id = Number.parseInt(req.params.id);
    var pets = JSON.parse(petsJSON);

    if (id < 0 || id > pets.length - 1) {
      console.error('Not Found');
      return res.sendStatus(404);
    }
    // res.set('Content-Type','text/plain');
    // res.sendStatus(200).
    res.send(pets[id]);
    // res.sendStatus(200);
  })
})

app.use((req, res) => {
  res.sendStatus(404);
  // sends error, but no string attached, cant send multiple replies ergo line below commented out!
  // res.send('error');

});



module.exports = app;
