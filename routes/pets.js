let fs = require('fs');
let express = require('express');
let router = express.Router();
let bodyParser = require('body-parser');
let port = process.env.PORT || 8888;

let petObj = {};

let filterInt = function(value) {
    if (/^(\-|\+)?([0-9]+|Infinity)$/.test(value))
      return Number(value);
    return NaN;
  };

router.get('/', (req, res) => {
  fs.readFile('./pets.json', 'utf8', (err, data) => {
    if (err) throw err;
    petArr = JSON.parse(data);
    res.type('application/json');
    res.send(JSON.stringify(petArr));
  });
});

router.get('/:id', (req, res) => {
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

router.post('/', (req, res) => {
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



module.exports = router;
