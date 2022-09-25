"use strict";

const { response } = require("express");
const { application } = require("express");
const express = require("express");
const app = express();
application.use(express.json());

//require the path directory
var fs = require("fs");
var path = require("path");
var petsPath = path.join(__dirname, "pets.json");

//require the http module and create port
var port = 8000;

//handle the request with routes
app.get("/pets", (req, res) => {
  //logic
  fs.readFile(petsPath, "utf-8", function (err, petsJSON) {
    if (err) {
      console.log(err);
      response.status(500);
      response.send(err);
    } else {
      res.status(201);
      res.send(petsJSON);
    }
  });
});

app.get("/pets/0", (req, res) => {
  //logic
  fs.readFile(petsPath, "utf8", function (err, petsJSON) {
    if (err) {
      console.log(err);
      response.status(500);
      response.send(err);
    } else {
      var pets = JSON.parse(petsJSON);
      var petsData = JSON.stringify(pets[0]);

      res.status(201);
      res.send(petsData);
    }
  });
});

app.get("/pets/1", (req, res) => {
  //logic
  fs.readFile(petsPath, "utf8", function (err, petsJSON) {
    if (err) {
      console.log(err);
      response.status(500);
      response.send(err);
    } else {
      var pets = JSON.parse(petsJSON);
      var petsData = JSON.stringify(pets[1]);
      res.status(201);
      res.send(petsData);
    }
  });
});

//listening on port
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
