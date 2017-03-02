const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')
const fs = require('fs')

module.exports = app

app.listen(8000)

app.use(bodyParser.json())

app.get('/pets', function(req, res){
  fs.readFile('./pets.json', function (err, data) {
    res.send(JSON.parse(data));
  })
})



app.get('/pets/:id', function(req, res){
  var index = parseInt(req.params.id)
  fs.readFile('./pets.json', function (err, data) {
    var parsedData = JSON.parse(data)
    if (typeof index === 'NaN' || index < 0 || !parsedData[index])  {
      res.header("Content-Type", "text/plain").status(404).send("Not Found")
    } else {
      res.header("Content-Type", "application/json").send(parsedData[index]);
    }
  })
})

app.post('/pets', function(req, res) {
  if (typeof parseInt(req.body.age) === "number" && req.body.kind && req.body.name) {
    fs.readFile('./pets.json', function(err, data) {
      var jsonOb = JSON.parse(data)
      var dataToPost = { age: parseInt(req.body.age), kind: req.body.kind, name: req.body.name }
      jsonOb.push(dataToPost)
      fs.writeFile('./pets.json', JSON.stringify(jsonOb), function(err, data) {
        if (err) {
          res.status(500).send("Internal Server Error")
          return err
        } else {
          res.json(dataToPost)
        }
      })

    })
  } else {
    res.header("Content-Type", "text/plain").status(400).send("Bad Request")
  }

})

app.patch('/pets/:id', function(req, res) {
  fs.readFile('./pets.json', 'utf8', function(err, data) {
    if (err) {
      return err
    }
    var jsonOb = JSON.parse(data)
    var specificPet = jsonOb[req.params.id]
    if (req.body.age) {
      specificPet.age = parseInt(req.body.age)
    }
    if (req.body.kind) {
      specificPet.kind = req.body.kind
    }
    if (req.body.name) {
      specificPet.name = req.body.name
    }

    fs.writeFile('./pets.json', JSON.stringify(jsonOb), function(err, data) {
      // console.log("file written?")
      if (err) {
        res.status(500).send("Internal Server Error")
        return err
      } else {
        res.send(jsonOb[req.params.id])
      }
    })

  })

})

app.delete('/pets/:id', function(req, res) {
  fs.readFile('./pets.json', 'utf8', function(err, data) {
    var jsonOb = JSON.parse(data)
    var obWithoutPet = jsonOb.filter(function(ob) {
      return !(ob === jsonOb[req.params.id])
    })
    fs.writeFile('./pets.json', JSON.stringify(obWithoutPet), function(err, data) {
      if (err) {
        return err
      } else {
        res.json(jsonOb[req.params.id])
      }
    })

  })

})
