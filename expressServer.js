const fs = require('fs');
const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const port = process.env.PORT || 8888;

let petObj = {};

app.disable('x-powered-by');
app.use(bodyParser.json());

const filterInt = function(value) {
    if (/^(\-|\+)?([0-9]+|Infinity)$/.test(value))
      return Number(value);
    return NaN;
  };


app.get('/pets', (req, res) => {
  fs.readFile('./pets.json', 'utf8', (err, data) => {
    if (err) throw err;
    petArr = JSON.parse(data);
    res.type('application/json');
    res.send(JSON.stringify(petArr));
  });
});


app.get('/pets/:id', (req, res) => {
  let indexSpot = filterInt(req.params.id);
  if (!isNaN(indexSpot)) {
    fs.readFile('./pets.json', 'utf8', (err, data) => {
      if (err) {
        console.error(err);
        res.sendStatus(500);
      };
      petArr = JSON.parse(data);
      if (indexSpot<0 || indexSpot>=petArr.length) {
        res.sendStatus(404);
      } else {
        petObj = petArr[indexSpot];
        res.send(petObj);
      }
    });
  }
});

app.post('/pets/', (req, res) => {
  petObj = req.body;
  console.log(petObj);
  let age = filterInt(req.body.age);
  if (!isNaN(age) && (req.body.name) && (req.body.kind)) {
    fs.readFile('./pets.json', 'utf8', (err, data) => {
      if (err) {res.sendStatus(500)};
      petArr = JSON.parse(data);
      petArr.push(petObj);
      let output = JSON.stringify(petArr);
      fs.writeFile('./pets.json', output, (err) => {
        if (err) {
          console.error(err);
          res.sendStatus(500);
        };
        res.send(petObj);
      });
    });
  } else {
    res.sendStatus(400);
  }
});

app.use((req, res) => {
  res.sendStatus(404);
});

app.listen(port, () => {
  console.log('Listening on port', port);
});

module.exports = app;
