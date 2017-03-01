
const server = require('http')
const bodyParser = require('body-parser')
const fs = require('fs')
var allPets = require('./pets.json')

var PORT = 8000

// server.use(bodyParser.json())

server.listen(PORT, function () {
    console.log('Server listening on port ' + PORT)
});

server.get('/pets', (req, res) => {
  res.status(200).json(allPets)
})

server.get('/pets/:id', (req, res) => {
  var id = req.params.id
  if (req.params.id < 0 || req.params.id >= allPets.length) {
    res.statuscode = 404
    res.setHeader('Content-Type', /text\/plain/)
    res.send('Not Found')
    // Content-Type: text/plain;
    // res.send(404, 'Content-Type', /text\/plain/)
  } else {
  res.status(200).json(allPets[id])
  }
})

module.exports = server
