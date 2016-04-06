'use strict';

const http = require('http');

const fs = require('fs');
const path = require('path');
const petsPath = path.join(__dirname, 'pets.json');


const handleRequest = function(req, res) {
  fs.readFile(petsPath, 'utf8', function(err, data) {
    const pets = JSON.parse(data);

    if (err) {
      throw err;
    }
    else if (req.url === '/pets') {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(pets));
    }
    else if (req.url === '/pets/0') {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(pets[0]));
    }
    else if (req.url === '/pets/1') {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(pets[1]));
    }
    else if (req.url === '/pets/2' || req.url === '/pets/-1') {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('Not Found');
    }
    else {
      res.end(404);
    }
  });
};

const port = process.env.PORT || 5000;

const server = http.createServer(handleRequest);

server.listen(port, () => {
  console.log('Listening...');
});
