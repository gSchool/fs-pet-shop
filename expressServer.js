const fs = require('fs');
const express = require('express');
const app = express();
const port = process.env.PORT || 8000;

app.get('/pets', (req, res) => {
  fs.readFile('pets.json', (err, data) => {
    let jDatty = JSON.parse(data);

    res.send(jDatty)
  })
})

app.get('/pets/:id', (req, res) => {
  fs.readFile('pets.json', (err, data) => {
    if (err) {
      return res.sendStatus(404)
    }

    let jDatty = JSON.parse(data);
    if (!jDatty[req.params.id]) {
      res.set('Content-Type', 'text/plain')
      return res.sendStatus(404)
    } else {
      res.send(JSON.stringify(jDatty[req.params.id]))
    }

  })
})

app.use( (req, res) => {
  res.sendStatus(404);
})

app.listen(port, () => {
  console.log("Listening on " + port)
})


module.exports = app;
