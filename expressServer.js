const express = require('express')
const app = express()
const router = express.Router()
const fs = require('fs')

router.get('/pets', (req, res)=>{
  fs.readFile('./pets.json', 'utf8', (err, data) => {
    if (err) throw err
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.end(data);
  })
})

router.get('/pets/:index', (req, res)=>{
  var index = parseInt(req.params.index)
  fs.readFile('./pets.json', 'utf8', (err, data) => {
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

module.exports = router
