const express = require('express');
const router = express.Router();
const low = require('lowdb');
const fileAsync = require('lowdb/lib/storages/file-async');
const db = low('./pets.json', {
  storage: fileAsync
});

router.get('/pets', (req, res) => {
  const pets= db.identity();
  res.send(pets);
});

router.get('/pets/:id', (req, res) => {
  const petId = req.params.id;
  var petArray = db.identity().value();
  if (typeof petArray[parseInt(petId)] === 'undefined') {
    res.sendStatus(404);
  } else {
    const singlePet = db.get(petId);
    res.send(singlePet);
  }
});

router.post('/pets', (req, res) => {
  db.identity()
    .push(req.body)
    .last()
    .write()
    .then(newPet => {
      if (req.body.age === '' || req.body.kind === '' || req.body.name === '') {
        res.set('Content-Type', 'text/plain');
        res.status(400).send('Bad Request');
      } else {
        res.status(200).send(newPet);
      }
    })
    .catch(err => {
      console.log(err);
      res.status(404).send();
    });
});

router.patch('/pets/:id', (req, res) => {
  const petId = parseInt(req.params.id);
  var petArray = db.identity().value();
  if (typeof petArray[petId] === 'undefined') {
    res.sendStatus(404);
  }
  var currentPet = petArray[petId];

  if (!req.body.age || !req.body.kind || !req.body.name) {
    if (req.body.age) {
      currentPet.age = req.body.age;
    }
    if (process.argv[4]) {
      currentPet.kind = req.body.kind;
    }
    if (process.argv[5]) {
      currentPet.name = req.body.name;
    }
  } else {
    currentPet = req.body;
  }
  petArray[petId] = currentPet;

  db.identity()
    .assign(petArray)
    .write()
    .then(updatedPet => {
      res.set('Content-Type', 'application/json');
      res.status(200).send(updatedPet[petId]);
    })
    .catch(err => {
      console.log(err);
      res.status(404).send()
    });
});

router.delete('/pets/:id', (req, res) => {
  const petId = parseInt(req.params.id);
  var petArray = db.identity().value();
  if (typeof petArray[petId] === 'undefined') {
    res.sendStatus(404);
  }
  petArray.splice(petId, 1);
  db.identity()
    .assign(petArray)
    .write()
    .then(deletedPet => {
      res.set('Content-Type', 'application/json');
      res.status(204).send(deletedPet[petId]);
    })
    .catch(err => {
      console.log(err);
      res.set('Content-Type', 'application/json');
      res.status(404).send()
    });
});

module.exports = router
