const fs = require('fs');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const express = require('express');
const app = express();
const port = process.env.PORT || 8000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))
app.use(morgan('short'));

app.get('/pets', (req, res) => {
  fs.readFile('pets.json', (err, data) => {
    if (err) {
      console.error(err.stack);
      return res.sendStatus(500)
    }
    let pets = JSON.parse(data);
    res.send(pets)
  })
})

app.get('/pets/:id', (req, res) => {
  fs.readFile('pets.json', (err, data) => {
    if (err) res.sendStatus(404)
    let pets = JSON.parse(data);
    if (!pets[req.params.id]) {
      return res.sendStatus(404);
    } else {
      res.send(pets[req.params.id])
    }
  })
})

app.post('/pets', (req, res) => {
  fs.readFile('pets.json', (readErr, data) => {
    if (readErr) {
      console.error(readErr.stack);
      return res.sendStatus(500);
    }

    if (!req.body.age || !req.body.name || !req.body.name) {
      return res.sendStatus(400)
    } else {
      const pets = JSON.parse(data);
      const pet = {
        age: req.body.age,
        name: req.body.name,
        kind: req.body.kind
      };
      pets.push(pet)
      const petStringify = JSON.stringify(pets)
      fs.writeFile('pets.json', petStringify, (writeErr) => {
        if (writeErr) {
          console.error(writeErr.stack);
          return res.sendStatus(500);
        }

        res.send(pet)
      })
    }
  })
})

app.patch('/pets/:id', (req, res) => {
  fs.readFile('pets.json', (readErr, data) => {
    if (readErr) {
      console.error(readErr.stack);
      return res.sendStatus(500);
    }

    if (!req.body.age && !req.body.name && !req.body.kind) {
      return res.sendStatus(400)
    } else {
      const pets = JSON.parse(data);
      const pet = {
        age: req.body.age || pets[req.params.id].age,
        name: req.body.name || pets[req.params.id].name,
        kind: req.body.kind || pets[req.params.id].kind
      };
      pets[req.params.id] = pet
      const petStringify = JSON.stringify(pets)
      fs.writeFile('pets.json', petStringify, (writeErr) => {
        if (writeErr) {
          console.error(writeErr.stack)
          return res.sendStatus(500)
        }

        res.set('Content-type', 'application/json')
        res.send(pet)
      })
    }
  })
})

app.delete('/pets/:id', (req, res) => {
  fs.readFile('pets.json', (readErr, data) => {
    if (readErr) {
      console.error(readErr.stack);
      return res.sendStatus(500)
    }

    const pets = JSON.parse(data);
    const pet = pets.splice(req.params.id, 1)[0]
    const petStringify = JSON.stringify(pets);
    fs.writeFile('pets.json', petStringify, (writeErr) => {
      if (writeErr) {
        console.error(writeErr.stack);
        return res.sendStatus(500)
      }

      res.set('Content-type', 'application/json')
      res.send(pet)
    })
  })
})

app.use( (req, res) => {
  res.sendStatus(404)
})

app.listen(port, () => {
  console.log("Listening on " + port)
})

module.exports = app;
