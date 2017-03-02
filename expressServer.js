const pets = require('./pets.json')
const express = require('express')
const server = express()
const bodyParser = require('body-parser')
const PORT = process.env.PORT || 8000

server.use(bodyParser.json())

server.listen(PORT, function () {
  console.log('Server listening on port 8000')
})

server.get('/pets', (req, res) => {
  res.status(200).json(pets)
})

server.get('/pets/:id', (req, res) => {
  const id = req.params.id
  if (id >= 0 && id < pets.length) {
    res.status(200).json(pets[id])
  }
  else {
    res.setHeader("Content-Type", "text/plain")
    res.status(404).send('Not Found')
  }
})

module.exports = server
