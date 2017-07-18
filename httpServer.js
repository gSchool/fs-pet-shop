'use strict';

const fs = require('fs');
const http = require('http');
const path = require('path');

const petsPath = path.join(__dirname, 'pets.json');

const server = http.createServer((req, res) => {
  if (req.method === 'GET' && req.url === '/pets') {
    fs.readFile(petsPath, 'utf8', (err, petsJSON) => {
      if (err) {
        console.error(err.stack);

        res.statusCode = 500;
        res.setHeader('Content-Type', 'text/plain');
        res.end('Internal Server Error');

        return;
      }

      res.setHeader('Content-Type', 'application/json');
      res.end(petsJSON);

    });
  }
  else if (req.method === 'GET' && req.url === '/pets/0') {
    fs.readFile(petsPath, 'utf8', (err, petsJSON) => {
      if (err) {
        console.error(err.stack);

        res.statusCode = 500;
        res.setHeader('Content-Type', 'text/plain');
        res.end('Internal Server Error');

        return;
      }

      const pets = JSON.parse(petsJSON);
      const petJSON = JSON.stringify(pets[0]);

      res.setHeader('Content-Type', 'application/json');
      res.end(petJSON);

    });
  }


  else if (req.method === 'GET' && req.url === '/pets/1') {
    fs.readFile(petsPath, 'utf8', (err, petsJSON) => {
      if (err) {
        console.error(err.stack);

        res.statusCode = 500;
        res.setHeader('Content-Type', 'text/plain');
        res.end('Internal Server Error');

        return;
      }

      const pets = JSON.parse(petsJSON);
      const petJSON = JSON.stringify(pets[1]);

      res.setHeader('Content-Type', 'application/json');
      res.end(petJSON);

    });
  }


  else {
    res.statusCode = 404;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Not Found');
  }
});


const port = 8000;

server.listen(port, () => {
  console.log(`Listening on port ${port}`);
});


module.exports = server;
