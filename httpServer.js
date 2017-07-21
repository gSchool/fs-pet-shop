"use strict";

const fs = require("fs");
const http = require("http");
const path = require("path");

const pathPets = path.join(__dirname, "pets.json");

var iPets = null;

const server = http.createServer((req,res)=>{
  // if(req.method === "GET" && req.url === )
  //res.statusCode=200;
  //res.setHeader("Content-Type", "text/plain");

  fs.readFile(pathPets, "utf8", (err, data)=>{
    if(err) {
      console.error(err.stack);
      res.statusCode = 500;
      res.setHeader("Content-Type","text/plain");
      res.end("Internal Server Error");
      return;
    }

    //handle base case
    if(req.method === "GET" && req.url === "/pets") {
      res.statusCode = 200;
      res.setHeader("Content-Type","application/json");
      res.end( data );
      return;
    }

    //if not base case, move onto validating url
    var arrayCheckUrl = req.url.split("/");
    var testIsInteger = arrayCheckUrl[2];
    if(req.method === "GET" &&
      arrayCheckUrl.length === 3 &&
      arrayCheckUrl[0] === '' &&
      arrayCheckUrl[1] === "pets" &&
      !isNaN(testIsInteger) &&  Number.isInteger(Number(testIsInteger)))
    {
      //url is valid so check if inbounds but err out if not in bounds
      iPets = Number(arrayCheckUrl[2]);
      console.log(iPets)
      if(JSON.parse(data)[iPets] === undefined) {
        res.statusCode = 404;
        res.setHeader("Content-Type","text/plain");
        res.end("Not Found");
        return;
      } else {
        //return pet object
        res.statusCode = 200;
        res.setHeader("Content-Type","application/json");
        console.log("data iPets: ",JSON.parse(data)[iPets]);
        res.end(JSON.stringify(JSON.parse(data)[iPets]));
        return;
      }
    } else {
      //some other problem err out 500
      res.statusCode = 500;
      res.setHeader("Content-Type","text/plain");
      res.end("Internal Server Error");
      return;
    }
  });
});

const port = 8000;

server.listen(port, ()=> {
  console.log(`Listening on port ${port}`);
})

module.exports = server;
