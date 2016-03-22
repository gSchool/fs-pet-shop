var http = require('http');
var routes = require('./routes');
var fs = require('fs');
var path = require('path');

function handleRequest(req, res) {
  if(routes[req.url]){
    routes[req.url](req, res);
  } else {
    res.end("404, no such route")
  }
};

server = http.createServer(handleRequest);
server.listen(8080, 'localhost', function(){
  console.log("listening on port 8080");
});
