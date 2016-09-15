var http = require('http');
var routes = require('./routes.js');


function handleRequest(req, res) {
    if (routes[req.url]) {
        routes[req.url](req, res);
    } else {
        res.setHeader('Content-Type', 'text/plain');
        res.end('Route 404, no such route.');
    }
}

var server = http.createServer(handleRequest);

server.listen(8080, 'localhost', function() {
    console.log('Listening on port 8080');
})
