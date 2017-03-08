var express = require('express');
var app = express();
var pets = require('./pets.json');
var fs = require('fs');

app.use(require('morgan')('tiny'));
app.use(require('body-parser').json());


app.get('/pets', (req, res, next) => {
  res.status(200).send(pets);
});

app.get('/pets/:index', (req, res, next) => {
  let index = parseInt(req.params.index)
  if (pets.length < index  || index < 0) {
    res.status(404).send('Not Found');
  } else {
    res.status(200).send(pets[index]);
  }
});

app.post('/pets', (req, res) => {
  let newPet = req.body;
  if (!newPet.age || !newPet.kind || !newPet.name) {
    res.status(404).send({
      message: 'Bad Request'
    })
  } else {
    pets.push(newPet);
    res.status(200).send(newPet);
  }
});

app.put('/pets/:index' , (req, res, next) => {
  let index = parseInt(req.params.index)
  if (pets.length < index || index < 0) {
    res.status(404).send({
      message: 'Index does not match our records.'
    })
  }
  let newPet = req.body
  if (!newPet.age || !newPet.kind || !newPet.name) {
    res.status(404).send({
      message: 'Bad Request'
    })
  }
  pets[index] = newPet;
  res.status(200).send(newPet);
});

app.delete('/pets/:index', (req,res, next) => {
  let index = parseInt(req.params.index);
  if (pets.length < index || index < 0) {
    res.status(404).send({
      message: 'Index does not match our records.'
    })
  }
  var petDel = pets.splice(index, 1);
  res.status(200).send(petDel)
});

app.listen(3000);
