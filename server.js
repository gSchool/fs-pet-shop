var http = require ('http');

var fs = require('fs');
var path = require('path');
var petsPath = path.join(__dirname, 'pets.json');

var petRegExp = /^\/pets\/(.*)$/;

var handleRequest = function (req, res){
  fs.readFile(petsPath, 'utf8', function(err, data){
    var pets = JSON.parse(data);

    if (err){
      throw err;
    }
    else if (req.url === '/pets'){
      res.writeHead(200, {'Content-Type': 'application/json'});
      res.end(JSON.stringify(pets));

    }
    else if (req.url === '/pets/0'){
      res.writeHead(200, {'Content-Type': 'application/json'});
      res.end(JSON.stringify(pets[0]));
    }
    else if (req.url === '/pets/1'){
      res.writeHead(200, {'Content-Type': 'application/json'});
      res.end(JSON.stringify(pets[1]));
    }
    else if (req.url === '/pets/2' || req.url === '/pets/-1'){
      res.writeHead(404, {'Content-Type': 'text/plain'});
      res.end("Not Found");
    }
  });
}

const port = process.env.PORT || 5000;
var server = http.createServer(handleRequest);
server.listen(5000, function(){
  console.log('Listening...')
})
