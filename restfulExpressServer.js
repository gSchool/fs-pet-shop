const express = require('express')
const app = express()
var morgan = require('morgan')
const fs = require('fs')
const bodyParser = require('body-parser')
var allPets = require('./pets.json')

app.use(bodyParser.json())

var PORT = 8000

app.listen(PORT, function () {
    console.log('Server listening on port ' + PORT)
});

app.get('/pets', (req, res) => {
  res.status(200).json(allPets)
})

app.get('/pets/:id', (req, res) => {
  var id = req.params.id
  if (req.params.id < 0 || req.params.id >= allPets.length) {
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

module.exports = app
