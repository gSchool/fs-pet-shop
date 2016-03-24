var fs = require('fs');
var path = require('path');
var petsPath = path.join(__dirname, 'pets.json');

routes = {
  '/pets': function(req, res){
    res.setHeader('Content-Type', 'application/json');
    res.statusCode = 200;
    fs.readFile(petsPath, 'utf8', function(err, data){
      if (err) {
        throw err;
      }
      res.end(data);
    });
  },
  '/pets/0': function(req, res){
    res.setHeader('Content-Type', 'application/json');
    res.statusCode = 200;
    fs.readFile(petsPath, 'utf8', function(err, data){
      if (err) {
        throw err;
      }
      var pets = JSON.parse(data);
      res.end(JSON.stringify(pets[0]));
    });
  },
  '/pets/1': function(req, res){
    res.setHeader('Content-Type', 'application/json');
    res.statusCode = 200;
    fs.readFile(petsPath, 'utf8', function(err, data){
      if (err) {
        throw err;
      }
      var pets = JSON.parse(data);
      res.end(JSON.stringify(pets[1]));
    })
  },
  '/pets/2': function(req, res){
    res.setHeader('Content-Type', 'text/plain');
    res.statusCode = 404;
    fs.readFile(petsPath, 'utf8', function(err, data){
      if (err) {
        throw err;
      }
      var pets = JSON.parse(data);
      res.end('Not found. Go away.');
    });
  },
  '/pets/-1': function(req, res){
    res.setHeader('Content-Type', 'text/plain');
    res.statusCode = 404;
    fs.readFile(petsPath, 'utf8', function(err, data){
      if (err) {
        throw err;
      }
      var pets = JSON.parse(data);
      res.end('Not found. Go away.');
    });
  },
}


module.exports = routes;
