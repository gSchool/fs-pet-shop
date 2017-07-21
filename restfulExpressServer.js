const express = require('express')
const app = express()
// const router = express.Router()
const bodyParser = require('body-parser')
const fs = require('fs')
const low = require('lowdb')
const fileAsync = require('lowdb/lib/storages/file-async')
const db = low('./pets2.json', {
  storage: fileAsync
})
require('dotenv').config()

const PORT = process.env.PORT || 8000
var http = require('http');
app.listen(PORT, ()=>{
  console.log('listening on port '+PORT);
})

app.use(bodyParser.json())




app.get('/pets', (req, res)=>{
  fs.readFile('./pets.json', 'utf8', (err, data) => {
    if (err) throw err
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.end(data);
  })
})

app.get('/pets/:index', (req, res)=>{
  var index = parseInt(req.params.index)
  fs.readFile('./pets2.json', 'utf8', (err, data) => {
    if (err) throw err
    var dataObj = JSON.parse(data)
    var pet = JSON.stringify(dataObj[index])

    if (index >= 0 && index <= dataObj.length-1) {
      res.writeHead(200, {'Content-Type': 'application/json'})
      res.end(pet)
    }else {
      res.writeHead(404, {'Content-Type': 'text/plain'})
      res.end('Not Found')
    }
  })
})

app.post('/pets', (req, res)=>{
  var newPet = req.body
  if (!newPet.name || !newPet.age || !newPet.kind) {
    res.header('Content-Type', 'text/plain');
    res.status(400).send('Bad Request');
  }else {
    fs.readFile('./pets2.json', 'utf8', (err, data) => {
      if (err) throw err
      var oldFile = JSON.parse(data)
      oldFile.push(newPet)
      var newFile = JSON.stringify(oldFile)
      fs.writeFile('./pets2.json', newFile, err=>{
        if (err) throw err
        res.header('Content-Type', 'application/json');
        res.status(200).send(newPet);
      })
    })
  }
})

app.patch('/pets/:id', (req, res)=>{
  fs.readFile('./pets.json', 'utf8', (err, data)=>{
    if (err) throw err
    var pets = JSON.parse(data)
    if (req.body.name) {
      pets[req.params.id].name = req.body.name
    }
    if (req.body.age) {
      pets[req.params.id].age = req.body.age
    }
    if (req.body.kind) {
      pets[req.params.id].kind = req.body.kind
    }

    fs.writeFile('./pets.json', JSON.stringify(pets), err=>{
      if (err) throw err
      res.header('Content-Type', 'application/json');
      res.status(200).send(pets[req.params.id]);
    })
  })
})

app.delete('/pets/:id', (req, res)=>{
  fs.readFile('./pets.json', 'utf8', (err, data)=>{
    if (err) throw err
    var pets = JSON.parse(data)
    var deletedPet = pets.splice(req.params.id, 1)

    fs.writeFile('./pets.json', JSON.stringify(pets), err=>{
      if (err) throw err
      res.header('Content-Type', 'application/json');
      res.status(200).send(deletedPet);
    })
  })
})

module.exports = app
