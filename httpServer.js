'use strict';

let fs = require('fs');
const http = require('http');
const path = require('path');

const petsPath = path.join(__dirname, 'pets.json');

const server = http.createServer(function(req, res){
  let url = req.url;
  let urlArray = url.split('/');
  if (req.method === 'GET' && urlArray[1] === 'pets') {
    fs.readFile(petsPath, 'utf8', function(readErr, data) {
      if (readErr) {
        res.statusCode = 500;
        res.setHeader('Content-Type', 'text/plain');
        res.end('Internal Server Error');
      } else {
        if (urlArray[2]) {
          let petLoc = Number(urlArray[2]);
          let petList = JSON.parse(data);
          if (petLoc < 0 || petLoc >= petList.length || isNaN(petLoc)) {
            res.statusCode = 400;
            res.setHeader('Content-Type', 'text/plain');
            res.end('Bad Request');
            return;
          } else {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(petList[petLoc]));
            return;
          }
        } else {
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json')
          res.end(data);
        }
      }
    });
  } else {
    res.statusCode = 404;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Not Found');
  }

});

const port = 8000;

server.listen(port, function() {
  console.log(`Listening on port ${port}`);
});

module.exports = server;
