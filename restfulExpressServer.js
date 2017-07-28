let fs = require("fs");
const path = require("path");

const petPath = path.join(__dirname, "pets.json");

const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.disable("x-powered-by");

app.use(bodyParser.json());

function readFile(filePath, errCb, cb) {
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) { return errCb(500); }
    cb(data);
  });
}

function writeFile(filePath, data, errCb, cb) {
  fs.writeFile(filePath, data, (err) => {
    if (err) { return errCb(500); }
    cb();
  });
}

app.get("/pets", (req, res) => {
  readFile(petPath, res.sendStatus, (data) =>{
    const pets = JSON.parse(data);

    res.send(pets);
  }); 
});

app.get("/pets/:id", (req, res) => {
  const id = parseInt(req.params.id);

  if (isNaN(id)) { return res.sendStatus(400); }

  readFile(petPath, res.sendStatus, (data) => {
    const pets = JSON.parse(data);
    
    if (id < 0 || id >= pets.length) { return res.sendStatus(404); }

    res.send(pets[id]);
  });
}); 

app.post("/pets", (req, res) => {
  const name = req.body.name;
  const age = parseInt(req.body.age);
  const kind = req.body.kind;

  if (!name || !age || !kind || isNaN(age)) { return res.sendStatus(400); }

  readFile(petPath, res.sendStatus, (data) => {
    let pets = JSON.parse(data);
    const newPet = {name: name, age: age, kind: kind};

    pets.push(newPet);
    pets = JSON.stringify(pets);

    writeFile(petPath, pets, res.sendStatus, () => {
      res.send(newPet);
    });
  });
});

app.patch("/pets/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const name = req.body.name;
  const age = parseInt(req.body.age);
  const kind = req.body.kind;

  if (!name && !age && !kind) { return res.sendStatus(400); }
  if (age && isNaN(age)) { return res.sendStatus(400); }
  if (isNaN(id)) { return res.sendStatus(400); }

  readFile(petPath, res.sendStatus, (data) => {
    const pets = JSON.parse(data);

    if (name) { pets[id].name = name; }
    if (age)  { pets[id].age = age;   }
    if (kind) { pets[id].kind = kind; }

    const petData = JSON.stringify(pets);

    writeFile(petPath, petData, res.sendStatus, () => {
      res.send(pets[id]);
    });
  });
});

app.delete("/pets/:id", (req, res) => {
  const id = parseInt(req.params.id);
  
  if (isNaN(id)) { return res.sendStatus(400); }

  readFile(petPath, res.sendStatus, (data) => {
    let pets = JSON.parse(data);

    if (id < 0 || id >= pets.length) { return res.sendStatus(404); }
    
    const delPet = pets[id];
    pets.splice(id, 1);

    pets = JSON.stringify(pets);

    writeFile(petPath, pets, res.sendStatus, () => {
      res.send(delPet);
    });
  });
});

app.use((req, res) => {
  res.sendStatus(404);
});

app.listen(8000, () => {
  console.log(`Listening on port 8000`);
});

module.exports = app;