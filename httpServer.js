"use strict";
const fs = require("fs");
const http = require("http");
const path = require("path");

const petsPath = path.join(__dirname, "pets.json");

const server = http.createServer(function (req, res){
  if (req.method === get){
    if (req.url === '/\/pets.*/'){

      console.log(req.url);
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
