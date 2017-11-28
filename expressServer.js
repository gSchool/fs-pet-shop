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
      try {
        res.send(JSON.parse(data)[req.params.id]);
      } catch (e){
        res.sendStatus(500);
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
