'use strict';

const bodyParser = require('body-parser');
const express = require('express');
<<<<<<< HEAD
let fs = require('fs');
=======
const fs = require('fs');
>>>>>>> 3d55aafe1a43d6ff48996a885cb22aea8c2928a7
const morgan = require('morgan');
const path = require('path');
const petsPATH = path.join(__dirname, 'pets.json');

const app = express();

app.use(morgan('short'));
app.use(bodyParser.json());

app.get('/pets', (req, res, next) => {
  fs.readFile(petsPATH, 'utf8', (err, petsJSON) => {
    if (err) {
      res.status(500);
      return next(err);
    }

    let pets = JSON.parse(petsJSON);
    res.send(pets);
  });
});

app.get('/pets/:id', (req, res, next) => {
  fs.readFile(petsPATH, 'utf8', (err, petsJSON) => {
    if (err) {
      res.status(500);
      return next(err);
    }

    let id = Number.parseInt(req.params.id);
    const pets = JSON.parse(petsJSON);
    const pet = pets[id];

<<<<<<< HEAD
    if (id < 0 || id >= pets.length || Number.isNaN(id) ) {
=======
    if (!id || id < 0 || id >= pets.length || Number.isNaN(id) ) {
>>>>>>> 3d55aafe1a43d6ff48996a885cb22aea8c2928a7
      res.status(404);
      return next(err);
    };

    res.send(pet);
  });
});

app.post('/pets', (req, res, next, err) => {
  const age = req.body.age;
  const name = req.body.name;
  const kind = req.body.kind;

  if (!age || !name || !kind || Number.isNaN(age)) {
    res.status(404);
    return next(err);
  }

  fs.readFile(petsPATH, 'utf8', (err, petsJSON) => {
    if (err) {
      res.status(500);
      return next(err);
    }

    let pets = JSON.parse(petsJSON);
    const newPet = {
      age: age,
      name: name,
      kind: kind
    };
    pets.push(newPet);
    pets = JSON.stringify(pets);

    fs.writeFile(petsPATH, pets, (err) => {
      if (err) {
        res.status(500);
        return next(err);
      };
      res.send(newPet);
    });

  });
});

app.patch('/pets/:id', (req, res, next) => {
<<<<<<< HEAD
  fs.readFile(petsPATH, 'utf8', (err, petsJSON) => {
    if (err) {
      return next({statusCode: 500, message:"There's been a server error."});
    };

    const id = Number.parseInt(req.params.id);
=======
  fs.readFile(petsPATH, 'utf8', (readErr, petsJSON) => {
    if (readErr) {
      res.status(500);
      return next(err);
    };

    console.log("in patch readFile");
    let id = Number.parseInt(req.params.id);
>>>>>>> 3d55aafe1a43d6ff48996a885cb22aea8c2928a7
    let pets = JSON.parse(petsJSON);

    if (id < 0 || id >= pets.length || Number.isNaN(id)) {
      res.status(404);
<<<<<<< HEAD
      return next({statusCode:404, message: "Not Found"})
    }
    const updatedPetInfo = req.body;
    const petToChange = pets[id];

//check to see whether any new information was submitted; if not, send a bad request error.
    if (Object.keys(updatedPetInfo) === 0) {
      return next({statusCode: 400, message:"Bad Request"})
    }

//compare new info submitted with the designated pet in pets; update any new information
    for (let key in updatedPetInfo) {
      if (petToChange.hasOwnProperty(key)) {
        if (key === "age" && Number.isNaN(Number.parseInt(updatedPetInfo[key]))) {
          return next({statusCode: 400, message:"Bad Request"})
        }
        petToChange[key] = updatedPetInfo[key];
      }
    }

    pets[id] = petToChange;
=======
      return next(readErr)
    }

    const age = Number.parseInt(req.body.age);
    const name = req.body.name;
    const kind = req.body.kind;
    const petToChange = pets[id];

    console.log(age, name, kind);
    console.log(Number.isNaN('tricky'));

    if (age && Number.isNaN(age)) {
      console.log("that's not a number of years");
      res.status(404);
      return next(readErr);
    }

    if (!name && !age && !kind) {
      res.status(400);
      return next(readErr)
    }

    if (name) {
      petToChange.name = name;
    }
    if (age) {
      petToChange.age = age;
    }
    if (kind) {
      petToChange.kind = kind;
    }

>>>>>>> 3d55aafe1a43d6ff48996a885cb22aea8c2928a7
    const newPetsJSON = JSON.stringify(pets);

    fs.writeFile(petsPATH, newPetsJSON, (writeErr) => {
      if (writeErr) {
        res.status(500);
        return next(writeErr)
      };

      res.send(petToChange);
<<<<<<< HEAD
    });
=======
    })


>>>>>>> 3d55aafe1a43d6ff48996a885cb22aea8c2928a7
  });

});

app.use((req, res, next) => {
  res.status(404);
  let err = {message: "Not Found"};
  next(err);
})

app.use((err, req, res, next) => {
<<<<<<< HEAD
  res.set({'Content-Type':'text/plain'})
  console.log(err);
  res.send(err.message)
=======
  console.log(err);
  res.send(err)
>>>>>>> 3d55aafe1a43d6ff48996a885cb22aea8c2928a7
});

const port = process.env.port || 8000;

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

module.exports = app;
