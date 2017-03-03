'use strict';
// believe we should be using httpie...do I need to add it to dependencies in package.json?
// const httpie = require('httpie');
const fs = require('fs');
const path = require('path');
const petsPath = path.join(__dirname, 'pets.json');
const http = require('http');
const PORT = process.env.PORT || 3005;

const petsData = 'pets.json';

const server = http.createServer((req, res) => {
  if (req.method === 'GET' && req.url === '/pets') {
    fs.readFile(petsPath, 'utf8', (err, petsJSON) => {
      if (err){
        console.error(err.stack);
        res.statusCode = 500;
        return res.end('ERROR');
      }
      res.setHeader('Content-Type', 'application/json');
      res.end(petsJSON);
    })
  }
  else if (req.method === 'GET' && req.url === '/pets/0') { fs.readFile(petsPath, 'utf8', (err, petsJSON) => {
    if (err){
      console.error(err.stack);
      res.statusCode = 500;
      return res.end('ERROR');
    }
      res.setHeader('Content-Type', 'application/json');
      var pets = JSON.parse(petsJSON);
      var petsJSON = JSON.stringify(pets[0]);

      res.end(petsJSON);
    })
  }
  else if (req.method === 'GET' && req.url === '/pets/1') { fs.readFile(petsPath, 'utf8', (err, petsJSON) => {
    if (err){
      console.error(err.stack);
      res.statusCode = 500;
      return res.end('ERROR');
    }
      res.setHeader('Content-Type', 'application/json');
      var pets = JSON.parse(petsJSON);
      var petsJSON = JSON.stringify(pets[1]);

      res.end(petsJSON);
    })
  }

  else {
    res.writeHead(404, {
      'Content-Type':"text/plain"
    })
    // res.setHeader('Content-Type', 'text-plain');
    res.statusCode = 404;
    res.end('Not Found');
  }
})

server.listen(PORT, function() {
  console.log(`listening on port - ${PORT}`);
});

// server.get('pets', (req, res) =>
//     const listOfPets = petsData.get
// )
//
















module.exports = server;
