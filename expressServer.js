const fs = require('fs');
const express = require('express');
const app = express();
const port = process.env.PORT || 8888;

let petObj = {};

app.disable('x-powered-by');

app.get('/pets', (req, res) => {
  fs.readFile('./pets.json', 'utf8', (err, data) => {
    if (err) throw err;
    petArr = JSON.parse(data);
    res.type('application/json');
    res.send(JSON.stringify(petArr));
  });
});


app.get('/pets/:id', (req, res) => {
  var filterInt = function(value) {
  if (/^(\-|\+)?([0-9]+|Infinity)$/.test(value))
    return Number(value);
  return NaN;
  }
  let indexSpot = filterInt(req.params.id);
  console.log(isNaN(indexSpot));
  if (!isNaN(indexSpot)) {
    fs.readFile('./pets.json', 'utf8', (err, data) => {
      if (err) {res.sendStatus(500)};
      petArr = JSON.parse(data);
      if (indexSpot<0 || indexSpot>=petArr.length) {
        res.sendStatus(404);
      } else {
        petObj = petArr[indexSpot];
        console.log(petObj);
//        res.type('application/json');
        res.send(petObj);
      }
    });
  }
});

app.use((req, res) => {
  res.sendStatus(404);
});

app.listen(port, () => {
  console.log('Listening on port', port);
});

module.exports = app;
