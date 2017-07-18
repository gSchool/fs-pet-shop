"use strict";
const fs = require("fs");
const http = require("http");
const path = require("path");

const petsPath = path.join(__dirname, "pets.json");

const server = http.createServer(function (req, res){
  if (req.method === "GET"){
    if (req.url === "/pets"){
      fs.readFile(petsPath, 'utf8', function (err, petsJSON) {
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

  }
  else {
    res.statusCode = 404;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Not found');
  }
});

const port = 8000;

server.listen(port, function(){
  console.log(`Listening on port ${port}`);
});

module.exports = server;
