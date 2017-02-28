const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const fs = require('fs')

module.exports = app

app.get('/pets', function(req, res){
  fs.readFile('./pets.json', function (err, data) {
    res.send(JSON.parse(data));
  })
})

app.get('/pets/:id', function(req, res){
  var index = parseInt(req.params.id)
  console.log(index)
  if (typeof index === 'NaN' || index < 0 || index >= 2) {
    console.log("failing on these ones")
    res.header("Content-Type", "text/plain").status(404).send("Not Found")
  } else {
    fs.readFile('./pets.json', function (err, data) {
      res.send(JSON.parse(data)[index]);
    })
  }
})
