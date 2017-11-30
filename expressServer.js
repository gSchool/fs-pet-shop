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
    res.send(JSON.stringify(petArr), );
  });
});

app.use((req, res) => {
  res.sendStatus(404);
});

app.listen(port, () => {
  console.log('Listening on port', port);
});

module.exports = app;
