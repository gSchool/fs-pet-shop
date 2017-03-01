const express = require('express')
const pets = require('./pets.json')
const server = express()
const bodyParser = require('body-parser')

server.use(bodyParser.json())

server.listen(8000, function () {
  console.log('Server listening on port 8000')
})

server.get('/pets', function (req, res) {
  res.status(200).json(pets)
})




module.exports = server
