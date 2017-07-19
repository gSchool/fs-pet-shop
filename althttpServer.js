"use strict";
const fs = require("fs");
const http = require("http");
const path = require("path");

const petsPath = path.join(__dirname, "pets.json");
const petRegEx =  /pets\/(.*)$/;
const server = http.createServer(function (req, res){
  if (req.method === "GET" && petRegEx.test(req.url)){
    let petNumb = petUrl.slice(6);
    if (req.url === "/pets"){
      fs.readFile(petsPath, 'utf8', function (err, petsJSON) {
        if (err) {
          console.error(err.stack);
          res.statusCode = 500;
          res.setHeader('Content-Type', 'text/plain');
          res.end('Internal Server Error');
        }
        else{
        res.setHeader('Content-Type', 'application/json');
        res.end(petsJSON);
        }
      });
    }
    else{
      console.log(petNumb.slice(6));

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
