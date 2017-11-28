const express = require('express');
const fs = require('fs');
const app = express();
const port = process.env.PORT || 8000;

app.get('/pets', (req, res) => {
  fs.readFile('./pets.json', (err, data) => {
    if (err) {
      res.sendStatus(500);
    } else {
      try {
        res.send(JSON.parse(data));
      } catch (e){
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
      let id = Number.parseInt(req.params.id);
      let pets = JSON.parse(data);
      if (id >= 0 && id < pets.length) {
        try {
          res.send(pets[id]);
        } catch (e){
          res.sendStatus(500);
        }
      } else {
        res.sendStatus(404);
      }
    }
  })
});

app.use((req, res) => {
  res.sendStatus(404);
});

app.listen(port, () => {
  console.log("listening on port " + port);
});

module.exports = app;
