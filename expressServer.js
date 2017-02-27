'use strict'
const fs = require('fs');
const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const port = process.env.PORT || 8000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/pets', (req, res) => {
  fs.readFile('pets.json', (err, data) => {
    if (err) {
      return res.sendStatus(404)
    }
    const jsonData = JSON.parse(data); // aka jDatty
    res.send(jsonData)
  })
})

app.get('/pets/:id', (req, res) => {
  fs.readFile('pets.json', (err, data) => {
    if (err) {
      return res.sendStatus(404)
    }

    const jsonData = JSON.parse(data);
    if (!jsonData[Number(req.params.id)]) {
      return res.sendStatus(404)
    } else {
      res.send(jsonData[Number(req.params.id)])
    }

  })
})

app.post('/pets', (req, res) => {
  fs.readFile('pets.json', (err, data) => {
    if (err) {
      return res.sendStatus(500)
    }

    if (!req.body.name || !req.body.age || !req.body.kind) {
      return res.sendStatus(400)
    } else {
      const jsonData = JSON.parse(data);
      const newObj = {
        age: req.body.age,
        kind: req.body.kind,
        name: req.body.name
      };
      jsonData.push(newObj);
      const jsonStringify = JSON.stringify(jsonData);
      fs.writeFile('pets.json', jsonStringify, (err) => {
        if (err) {
          return res.sendStatus(500)
        }
        res.send(newObj)
      })
    }
  })
})

app.use( (req, res) => {
  res.sendStatus(404);
})

app.listen(port, () => {
  console.log("Listening on " + port)
})


module.exports = app;
