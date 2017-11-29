const fs = require('fs');
const http = require('http');
const URL = require('url');
let petObj = {};


function callback(request, response) {
  console.log(URL.parse(request.url, true).pathname.toString().slice(6));
  if (URL.parse(request.url, true).pathname.toString().slice(0,5) !== '/pets') {
    response.writeHead(404, { 'Content-Type': 'text/plain'});
    response.end('Not Found', 'utf8');
  }

  fs.readFile('./pets.json', 'utf8', (err, data) => {
    if (err) throw err;
    petArr = JSON.parse(data);
    indexSpot = URL.parse(request.url, true).pathname.toString().slice(6);
    if (isNaN(indexSpot)) {
      response.writeHead(404, { 'Content-Type': 'text/plain'});
      response.end('Not Found', 'utf8');
    }
    indexSpot = parseInt(indexSpot);
    if ((URL.parse(request.url, true).pathname.toString().length === 5) || (URL.parse(request.url, true).pathname.toString().length === 6)) {
      response.writeHead(200, { 'Content-Type': 'application/json'});
      response.end(JSON.stringify(petArr), 'utf8');
    } else {
      if ((indexSpot >= 0) && (indexSpot < petArr.length)) {
        response.writeHead(200, { 'Content-Type': 'application/json'});
        response.end(JSON.stringify(petArr[indexSpot]), 'utf8');
      } else {
        response.writeHead(404, { 'Content-Type': 'text/plain'});
        response.end('Not Found', 'utf8');
      }
    }
  });

}

let server = http.createServer(callback);
server.listen(8888);

module.exports = server;
