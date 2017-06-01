const http = require('http');
const routes = require('./routes');

const port = 8000;

const petRegExp = /^\/pets\/(.*)$/;




let server = http.createServer(function(req, res) {

    if (req.url === '/pets' || req.url.match(petRegExp)) {
        routes["/pets/"](req, res);

    } else {
        res.statusCode = 404;
        res.setHeader("Content-Type", "text/plain");
        res.end('Not Found');
    }



});

server.listen(port, function() {
    console.log(`Listening on port ${port}...`);
});

module.exports = server;
