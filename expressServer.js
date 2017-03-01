const express = require('express')
const app = express()
const fs = require('fs')
var allPets = require('./pets.json')

var PORT = 8000

// app.use(bodyParser.json())

app.listen(PORT, function () {
    console.log('Server listening on port ' + PORT)
});

app.get('/pets', (req, res) => {
  res.status(200).json(allPets)
})

app.get('/pets/:id', (req, res) => {
  var id = req.params.id
  if (req.params.id < 0 || req.params.id >= allPets.length) {
    res.status(404).send('Not Found')
  } else {
    res.status(200).json(allPets[id])
  }
})

module.exports = app
