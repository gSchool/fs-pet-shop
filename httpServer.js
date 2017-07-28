'use strict';

const http = require('http');
let fs = require('fs');
const path = require('path');
const petsPath = path.join(__dirname, 'pets.json');
const petRegExp = /pets\/?(.*)/;

const server = http.createServer((req, res) => {
  const whichPet = req.url.split('/');
  //whichPet[2] will specify the index of the intended pet in pets.json

  if (req.method === 'GET' && petRegExp.test(req.url)) {
      fs.readFile(petsPath, 'utf8', (err, petsJSON) => {
      const pets = JSON.parse(petsJSON);

      if (err) {
        console.error(err.stack);
        res.statusCode = 500;
        res.setHeader('Content-Type', 'text/plain');
        res.end('Internal service error.');
        return;
      }

      //whichPet.length of 2 returns all results
      if (whichPet.length < 3) {
        res.statusCode = 200;
        res.setHeader('Content-type', 'application/json');
        res.end(petsJSON);
      }
      else if (whichPet[2] < 0 || whichPet[2] >= pets.length) {
        res.statusCode = 404;
        res.setHeader('Content-Type', 'text/plain');
        res.end('Not Found');
        console.log("this animal doesn't exist--index too big or small");
      }

      else {
        const petJSON = JSON.stringify(pets[whichPet[2]])

        res.statusCode = 200;
        res.setHeader('Content-type', 'application/json');
        res.end(petJSON);
      }
    });

  }

  else {
    res.statusCode = 404;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Not found');
  }
});

const port = 8000;

server.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

module.exports = server;
