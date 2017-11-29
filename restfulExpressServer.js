const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const basicauth = require('basicauth-middleware')

const app = express();
const port = process.env.PORT || 8000;

app.use(bodyParser.json());
app.use(basicauth('admin', 'meowmix', '"Required"'));

app.get('/pets', (req, res) => {
  fs.readFile('./pets.json', (err, data) => {
    if (err) {
      res.sendStatus(500);
    } else {
      try {
        res.send(JSON.parse(data));
      } catch (e) {
        res.sendStatus(500);
      }
    }
  });
});

app.get('/pets/:id', (req, res) => {
  fs.readFile('./pets.json', (err, data) => {
    if (err) {
      res.sendStatus(500);
    } else {
      const id = Number.parseInt(req.params.id);
      let pets;
      try {
        pets = JSON.parse(data);
      } catch (e) {
        res.sendStatus(500);
      }
      if (id >= 0 && id < pets.length) {
        res.send(pets[id]);
      } else {
        res.sendStatus(404);
      }
    }
  });
});

app.post('/pets', (req, res) => {
  fs.readFile('./pets.json', (err, data) => {
    if (err) {
      res.sendStatus(500);
    } else {
      let pets;
      try {
        pets = JSON.parse(data);
      } catch (e) {
        res.sendStatus(500);
      }
      const pet = req.body;
      if (!Number.isNaN(pet.age) && pet.name && pet.kind) {
        pets.push(pet);
        fs.writeFile('./pets.json', JSON.stringify(pets), (error) => {
          if (error) {
            res.sendStatus(500);
          } else {
            res.send(req.body);
          }
        });
      } else {
        res.sendStatus(400);
      }
    }
  });
});

app.delete('/pets/:id', (req, res) => {
  fs.readFile('./pets.json', (err, data) => {
    if (err) {
      res.sendStatus(500);
    } else {
      const id = Number.parseInt(req.params.id);
      let pets;
      try {
        pets = JSON.parse(data);
      } catch (e) {
        res.sendStatus(500);
      }
      if (id >= 0 && id < pets.length) {
        const pet = pets.splice(id, 1)[0];
        fs.writeFile('./pets.json', JSON.stringify(pets), (error) => {
          if (error) {
            res.sendStatus(500);
          } else {
            res.send(pet);
          }
        });
      } else {
        res.sendStatus(404);
      }
    }
  });
});

app.patch('/pets/:id', (req, res) => {
  fs.readFile('./pets.json', (err, data) => {
    if (err) {
      res.sendStatus(500);
    } else {
      const id = Number.parseInt(req.params.id);
      const patch = req.body;
      let pets;
      try {
        pets = JSON.parse(data);
      } catch (e) {
        res.sendStatus(500);
      }
      if (id >= 0 && id < pets.length) {
        const pet = pets[id];
        const keys = Object.keys(patch);
        for (let i = 0; i < keys.length; i++) {
          switch (keys[i]) {
            case 'name':
              pet.name = patch.name;
              break;
            case 'kind':
              pet.kind = patch.kind;
              break;
            case 'age':
              if (!Number.isNaN(Number.parseInt(patch.age))) {
                pet.age = patch.age;
              } else {
                res.sendStatus(400);
              }
              break;
            default: res.sendStatus(400);
          }
        }
        pets[id] = pet;
        fs.writeFile('./pets.json', JSON.stringify(pets), (error) => {
          if (error) {
            res.sendStatus(500);
          } else {
            res.send(pet);
          }
        });
      } else {
        res.sendStatus(400);
      }
    }
  });
});

app.use((req, res) => {
  res.sendStatus(404);
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});

module.exports = app;
