const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const fs = require('fs')
const PORT = process.env.PORT || 8000;

app.get('/pets', function(req, res) {
    fs.readFile('./pets.json', function(err, data) {
        res.send(JSON.parse(data));
    })
})

app.get('/pets/:id', function(req, res) {
    var index = parseInt(req.params.id)
    if (typeof index !== 'number' || index < 0 || index >= 2) {
        console.log("ERR")
        res.header("Content-Type", "text/plain").status(404).send("Not Found")
    } else {
        fs.readFile('./pets.json', function(err, data) {
            res.send(JSON.parse(data)[index]);
        })
    }
})


module.exports = app;
