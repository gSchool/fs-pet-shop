"use strict";
let fs = require("fs");
const http = require("http");
const path = require("path");

const petsPath = path.join(__dirname, "pets.json");
// const petRegEx =  /pets\/(.*)$/;
const server = http.createServer(function (req, res){
  const petUrl = req.url;
  const petNumb = petUrl.slice(6);
  if (req.method === "GET"){
    if (req.url === "/pets"){
      fs.readFile(petsPath, "utf8", function (err, petsJSON) {
        if (err) {
          console.error(err.stack);
          res.statusCode = 500;
          res.setHeader('Content-Type', 'text/plain');
          res.end('Internal Server Error');
        }
        else {
        res.setHeader('Content-Type', 'application/json');
        res.end(petsJSON);
        }
      });
    }
    else if (req.url === "/pets/") {
      res.statusCode = 404;
      res.setHeader('Content-Type', 'text/plain');
      res.end('Not Found');
    }
    else if (petNumb > 1 || petNumb < 0){
      res.statusCode = 404;
      res.setHeader('Content-Type', 'text/plain');
      res.end('Not Found');
    }
    else{
      fs.readFile(petsPath, "utf8", function (err, petsJSON){
        if (err) {
          console.error(err.stack);
          res.statusCode = 500;
          res.setHeader('Content-Type', 'text/plain');
          res.end('Internal Server Error');
        }
        else {
          let pets = JSON.parse(petsJSON);
          let petJSON = JSON.stringify(pets[petNumb]);
          res.setHeader('Content-Type', 'application/json');
          res.end(petJSON);
        }
      });

    }


  }
  else {
    res.statusCode = 404;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Not Found');
  }
});


module.exports = server;
