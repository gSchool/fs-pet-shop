const pets = require('./pets.json')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const fs = require('fs')
// const morgan = require('morgan')
const PORT = process.env.PORT || 8000

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
// app.use(morgan('tiny'))

// LISTEN
app.listen(PORT, function () {
  console.log(`You are currently listening on PORT: ${PORT}`)
})

// GET PETS
app.get('/pets', function (req, res) {
  res.status(200).json(pets)
  console.log(req.url)
})

// POST PETS
app.post('/pets/', function (req, res) {

  newPet = {
    age: parseInt(req.headers.age),
    kind: req.headers.kind,
    name: req.headers.name
  }

  pets.push(newPet)
  var petArray = JSON.stringify(pets)
  fs.writeFileSync('./pets.json',petArray)
  res.end()
})

app.patch('/pets/:id', function (req, res) {
  const petId = parseInt(req.params.id)
  $.get('pets[petId]')

  var petAge = parseInt(req.headers.age)
  var petKind = req.headers.kind
  var petName = req.headers.name

  if (petAge.isNaN() || !petKind || !petName) {
    res.status(404).send('Missing Parts')
  } else {
    newPet = {
      age: parseInt(req.headers.age),
      kind: req.headers.kind,
      name: req.headers.name
    }
    .assign(newPet)
    .write()
    .then(updatedPet => {
      res.send(updatedPet);
    })
    .catch(err => {
      console.log(err);
    })
    // var petArray = JSON.stringify(pets)
    // fs.writeFileSync('./pets.json',petArray)
    // res.end()
  }
})



module.exports = app

// app.use('/pets', function (req, res) {
//   res.send('Our first express program')
// })

// morgan.token('name', function (req, res) {
//   return req.headers['content-type']
// })
//
//
// app.get('/pets/:id', function (req, res) {
//   const index = req.url.substring(req.url.lastIndexOf('/')+1, req.url.length)
//   if (index >= 0 && index < req.url.length) {
//     res.status(200).json(pets[index])
//   } else {
//     res.writeHead(404, {"Content-Type": "text/plain"})
//     res.status(404).send('Not Found')
//   }
// })
//
// morgan.token('id', function getId(req) {
//   console.log(req.id);
// })



// var router = express.Router()
// router.get('/pets', function (req, res) {
//   res.json({ message: 'horray!'})
//   res.status(200).json(pets)
// })

// app.use('/api', router)
