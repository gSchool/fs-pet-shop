const pets = require('./pets.json')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const fs = require('fs')
const morgan = require('morgan')
const PORT = process.env.PORT || 8000

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
// app.use(morgan('default'))

// LISTEN
app.listen(PORT, function () {
  console.log(`You are currently listening on PORT: ${PORT}`)
})

// GET PETS
app.get('/pets', function (req, res) {
  res.status(200).json(pets)
})

// GET PETS BY ID
app.get('/pets/:id', function (req, res) {

  const index = req.params.id
  if (index >= 0 && index < pets.length) {
    res.status(200).json(pets[index])
  }
  else {
    res.setHeader('Content-Type','text/plain')
    res.status(404).send('Not Found')
  }
})

// POST PETS
app.post('/pets/', function (req, res) {
  var petAge = parseInt(req.body.age)
  var petKind = req.body.kind
  var petName = req.body.name

  if (!isNaN(petAge) && !!petKind && !!petName) {

    newPet = {
      age: petAge,
      kind: petKind,
      name: petName
    }

    pets.push(newPet)
    fs.writeFileSync('./pets.json', JSON.stringify(pets))
    res.setHeader('Content-Type', 'application/json')
    res.status(200).send(pets[pets.length-1])
  }
  else {
    res.setHeader("Content-Type", "text/plain")
    res.status(400).send('Bad Request')
  }
})

// PATCH PETS
app.patch('/pets/:id', function (req, res) {
  const index = parseInt(req.params.id)

  if (index >=0 && index < pets.length) {

    if (isNaN(req.body.age)) {
      var petAge = pets[index].age
    } else {
      var petAge = parseInt(req.body.age)
    }
    if (!req.body.name) {
      var petName = pets[index].name
    } else {
      var petName = req.body.name
    }
    if (!req.body.kind) {
      var petKind = pets[index].kind
    } else {
      var petKind = req.body.kind
    }

    var updatedPet = {
      age: petAge,
      kind: petKind,
      name: petName
    }

    pets[index] = updatedPet

    fs.writeFileSync('./pets.json', JSON.stringify(pets))
    res.setHeader("Content-Type", "application/json")
    res.status(200).send(pets[index])
  }

  else {
    res.setHeader("Content-Type", "text/plain")
    res.status(400).send('Bad Request')
  }
})

// DELETE PET
app.delete('/pets/:id', function (req, res) {
  const index = parseInt(req.params.id)
  if (index >= 0 && index < pets.length) {
    var deletedPet = pets.splice(index, 1)

    fs.writeFileSync('./pets.json', JSON.stringify(pets))
    res.status(200).json(deletedPet[0])
  }
  else {
    res.setHeader("Content-Type", "text/plain")
    res.status(404).send('Not Found')
  }
})

module.exports = app
