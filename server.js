'use strict'

var express = require('express');
var app = express();
var port = process.env.PORT || 8000
var pets = require('./pets.json')
var ejs = require('ejs')
var bodyParser = require('body-parser');

var fs = require('fs');
var path = require('path');

var petsDB = path.join(__dirname, 'pets.json');


app.set("view engine", "ejs");
app.use(express.static('public'));
app.use(bodyParser.urlencoded({
    extended: false
}));


app.get('/', function(req, res) {
    res.send("hello")
})

app.get('/pets', function(req, res) {
    fs.readFile(petsDB, 'utf8', function(err, data) {
        if (err) {
            res.render(req.err)
        }
        res.render('pets', {
            pets: JSON.parse(data)
        });
    })
})

app.post('/pets', function(req, res) {
    fs.readFile(petsDB, 'utf8', function(err, data) {
        var addPet = JSON.parse(data);
        addPet.push(req.body);
        var petsData = JSON.stringify(addPet)
        fs.writeFile(petsDB, petsData, function(err) {
            if (err) {
                res.sendStatus(404)
            }
            res.render('success', {
                pets: JSON.parse(data)
            })
        })
    })
})

app.get('/pets/new', function(req, res) {
    res.render('new')
})



app.get('/pets/:id/delete', function(req, res) {
    fs.readFile(petsDB, 'utf8', function(err, data) {
        var petRequest = req.params.id;
        var petParsed = JSON.parse(data);
        petParsed.splice(petRequest, 1);
        var formattedPets = JSON.stringify(petParsed);

        fs.writeFile(petsDB, formattedPets, function(err) {
            if (err) {
                res.sendStatus(404)
            }
            res.render('deleted', {
                pet: data
            })
        })

    })
})

app.get('/pets/:id', function(req, res) {
    var petID = req.params.id;
    var myPet = pets[petID];
    res.render("info", {
        petName: myPet,
        petID: petID
    })
})
app.listen(port, function() {
    console.log("listening on port", port);
})
