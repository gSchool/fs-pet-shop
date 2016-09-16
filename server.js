var fs = require('fs');
var path = require('path');
var petsPath = path.join(__dirname, 'pets.json');
var express = require('express');
var app = express();
var port = process.env.PORT || 8000;



app.get('/pets', function(req, res) {
    fs.readFile(petsPath, 'utf8', function(err, petsJSON) {

        var pets = JSON.parse(petsJSON);

        res.send(pets);
    });
});

app.get('/pets/0', function(req, res) {
    fs.readFile(petsPath, 'utf8', function(err, petsJSON) {

        var pets = JSON.parse(petsJSON);

        res.send(pets[0]);
    });
});

app.get('/pets/1', function(req, res) {
    fs.readFile(petsPath, 'utf8', function(err, petsJSON) {

        var pets = JSON.parse(petsJSON);

        res.send(pets[1]);
    });
});


app.use(function(req, res) {
    res.send('404, not found');
});

app.listen(port, function() {
    console.log('Listening on port', port);
});
