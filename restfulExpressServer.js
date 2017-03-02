const express = require('express')
require('dotenv').config()
const app = express()
const morgan = require('morgan')
const fs = require('fs')
const bodyParser = require('body-parser')
var allPets = require('./pets.json')

app.use(bodyParser.json())
// app.use(morgan('tiny'))

var PORT = process.env.PORT || 8000

app.listen(PORT, function () {
    console.log('Server listening on port ' + PORT)
});

app.get('/pets', (req, res) => {
  res.status(200).json(allPets)
})

app.get('/pets/:id', (req, res) => {
  var id = req.params.id
  if (id < 0 || id >= allPets.length) {
    res.writeHead(404, {"Content-Type": "/text\/plain/"})
    res.end('Not Found')
  } else {
    res.status(200).json(allPets[id])
  }
})

app.post('/pets', (req, res) => {

 if ((req.body.name != undefined) && (req.body.kind != undefined) && (req.body.age != undefined)) {
   if (isNaN(req.body.age)) {
     //bad request on age not being a num
     res.writeHead(400, {"Content-Type": "/text\/plain/"})
     res.end('Bad Request')
   } else {
     //GOOD POST request
     var nextItem = {
       "age": parseInt(req.body.age),
       "kind": req.body.kind,
       "name": req.body.name
     }
     allPets.push(nextItem)
     var stringPet = JSON.stringify(allPets)
     fs.writeFileSync('./pets.json', stringPet)
     res.send(nextItem)
   }
 }
 else {
   //on bad request for name,kind,age
   res.writeHead(400, {"Content-Type": "/text\/plain/"})
   res.end('Bad Request')
 }
})

app.patch('/pets/:id', (req, res) => {
  //update one of the items
  if (!isNaN(req.body.age)) {
    var id = parseInt(req.params.id)
    if (id < 0 || id >= allPets.length) {
      res.writeHead(404, {"Content-Type": "/text\/plain/"})
      res.end('Not Found')
    } else {
      //this is where I will update the patch

      var currentName = allPets[id].name
      var currentKind = allPets[id].kind
      var currentAge = allPets[id].age

      allPets[id].name = (req.body.name || allPets[id].name)
      allPets[id].kind = (req.body.kind || allPets[id].kind)
      allPets[id].age = (parseInt(req.body.age))

      var stringPet = JSON.stringify(allPets)
      fs.writeFileSync('./pets.json', stringPet)
      res.send(allPets[id])
    }
  } else if (req.body.name || req.body.kind){

    var id = parseInt(req.params.id)

    var currentName = allPets[id].name
    var currentKind = allPets[id].kind
    var currentAge = allPets[id].age

    allPets[id].name = (req.body.name || allPets[id].name)
    allPets[id].kind = (req.body.kind || allPets[id].kind)
    allPets[id].age = (allPets[id].age)

    var stringPet = JSON.stringify(allPets)
    fs.writeFileSync('./pets.json', stringPet)
    res.send(allPets[id])

  } else {
    res.writeHead(404, {"Content-Type": "/text\/plain/"})
    res.end('Please Input a Valid Input')
  }
})

app.delete('/pets/:id', (req, res) => {
  //this is where I will detele the user by ID
  var id = parseInt(req.params.id)

  if (req.params.id < 0 || req.params.id >= allPets.length) {
    res.writeHead(404, {"Content-Type": "/text\/plain/"})
    res.end('Not Found')
  } else {
    var itemToDelete = allPets[id]

    allPets.splice(id, 1)

    var stringPet = JSON.stringify(allPets)
    fs.writeFileSync('./pets.json', stringPet)

    res.status(200).json(itemToDelete)
  }

})

module.exports = app
