var http = require('http');
var pets = require('./pets.json');

var routes = {
    '/pets': function(req, res) {
        res.setHeader('Content-Type', "text/plain");
        res.end(JSON.stringify(pets));
    },
    '/pets/0': function(req, res) {
        res.setHeader('Content-Type', "text/plain");
        res.end(JSON.stringify(pets[0]));
    },
    '/pets/1': function(req, res) {
        res.setHeader('Content-Type', "text/plain");
        res.end(JSON.stringify(pets[1]));
    }
}
module.exports = routes;
