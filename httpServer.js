'use strict';

const fs = require('fs');
const http = require('http');
const path = require('path');

const petsPath = path.join(__dirname, 'pets.json');

// Create a new HTTP server
const server = http.createServer((req, res) => {
  // Match request method and url before proceeding
  if (req.method === 'GET' && req.url.startsWith('/pets')) {
    fs.readFile(petsPath, 'utf8', (err, petsJSON) => {
      if (err) {
        console.error(err.stack);

        // If a read error occurred, send 500 response
        res.statusCode = 500;
        res.setHeader('Content-Type', 'text/plain');
        res.end('Internal Server Error');

        return; // return out of callback
      }
      var pets = JSON.parse(petsJSON);
      var pet = req.url[6]
        console.log(req.http)
      if(pets[pet] && typeof parseInt(pet) === 'number'){
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(pets[pet]));
        return;
      }else if (req.url === '/pets') {
        res.setHeader('Content-Type', 'application/json');
        res.end(petsJSON);
        return;
      }else {
        res.statusCode = 404;
        res.setHeader('Content-Type', 'text/plain');
        res.end('Not Found');
      }

    });
  }

  // If request method and url did not match, respond with 404
  else {
    res.statusCode = 404;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Not Found');
  }
});

const port = 8000;

// Tells node to start server loop listening for incoming HTTP requests
server.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
