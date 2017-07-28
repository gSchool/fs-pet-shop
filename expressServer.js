const fs = require("fs");
const path = require("path");

const petPath = path.join(__dirname, "pets.json");

const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.disable("x-powered-by");

app.use(bodyParser.json());

function handleError(err, res) {
  console.log(err);
  res.sendStatus(500);
}

app.get("/pets", (req, res) => {
  fs.readFile(petPath, "utf8", (err, data) => {
    if (err) { handleError(err, res); return; }
    
    const pets = JSON.parse(data);
    res.send(pets);
  });
});

app.get("/pets/:id", (req, res) => {
  fs.readFile(petPath, "utf8", (err, data) => {
    if (err) { handleError(err, res); return; }
    
    const id = parseInt(req.params.id);
    const pets = JSON.parse(data);

    if (id < 0 || id >= pets.length || isNaN(id)) {
      return res.sendStatus(404);
    }
    res.send(pets[id]);
  });
});

app.post("/pets", (req, res) => {
  const name = req.body.name;
  const age = parseInt(req.body.age);
  const kind = req.body.kind;

  if (!name || !age || !kind || isNaN(age)) { res.sendStatus(400); }

  fs.readFile(petPath, "utf8", (err, data) => {
    if (err) { handleError(err, res); return; }
    
    const pets = JSON.parse(data);
    pets.push({name:name, age:age, kind:kind});

    const petsData = JSON.stringify(pets);
    fs.writeFile(petPath, petsData, (err) => {
      if (err) { handleError(err, res); }

      res.send({name:name, age:age, kind:kind});
    });
  });
});

app.use((req, res) => {
  res.sendStatus(404);
});

const port = 8000;

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

module.exports = app;