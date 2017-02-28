/* eslint-disable no-param-reassign */
require('dotenv').config();
const fs = require('fs');
const path = require('path');
const http = require('http');

const port = process.env.PORT || 8080;
const dataPath = path.join(__dirname, 'pets.json');
const petRegExp = /^\/pets\/(.*)$/;
const server = http.createServer();


server.on('request', (req, res) => {
  console.log(`Incoming ${req.method} Request to ${req.url}`);
  if (req.method === 'GET' && req.url === '/pets') {
    fs.readFile(dataPath, 'utf8', (err, petsJSON) => {
      if (err) {
        console.error(err);
        res.statusCode = 500;
        res.setHeader('Content-Type', 'text/plain');
        res.end('Internal Server Error');
      }

      res.setHeader('Content-Type', 'application/json');
      res.end(petsJSON);
    });
  } else if (req.method === 'GET' && petRegExp.test(req.url)) {
    fs.readFile(dataPath, 'utf8', (err, petsJSON) => {
      if (err) {
        console.error(err);
        res.statusCode = 500;
        res.setHeader('Content-Type', 'text/plain');
        res.end('Internal Server Error');
      }

      const pets = JSON.parse(petsJSON);
      const match = req.url.match(petRegExp)[1];
      const index = Number.parseInt(match, 10);

      if (Number.isNaN(index) || index < 0 || index >= pets.length) {
        res.statusCode = 404;
        res.setHeader('Content-Type', 'text/plain');
        res.end('Not Found');
        return;
      }

      const petJSON = JSON.stringify(pets[index]);

      res.setHeader('Content-Type', 'application/json');
      res.end(petJSON);
    });
  } else if (req.method === 'POST' && req.url === '/pets') {
    fs.readFile(dataPath, 'utf8', (err, petsJSON) => {
      if (err) {
        console.error(err);
        res.statusCode = 500;
        res.setHeader('Content-Type', 'text/plain');
        res.end('Internal Server Error');
      }
      let body = [];

      req.on('data', (chunk) => {
        body.push(chunk);
      }).on('end', () => {
        body = Buffer.concat(body).toString();
      });

      console.log('petsJSON: ', petsJSON);
      const pets = JSON.parse(petsJSON);
      const pet = body;
      console.log('pet: ', pet);
      console.log('pets: ', pets);
    });
    // res.statusCode = 201;
    // res.setHeader('Content-Type', 'application/json');
    // res.end(petsJSON);
  } else {
    res.statusCode = 404;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Not Found');
  }
});

server.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

module.exports = server;
