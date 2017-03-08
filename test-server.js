var http = require('http');
var port = 8000;
var fs = require('fs');

http.createServer(function(req, res) {
  //var index = req.url.split('/')[2];
  fs.readFile('pets.json', 'utf8', function(err, data) {
    data = JSON.parse(data);
    //var length = data.length;

  if (req.url === '/pets') {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.end(data);
    };

  if (req.url === '/pets/0') {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(data[0]));
    };

  if (req.url === '/pets/1') {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(data[1]));

  } else {
    res.statusCode = 404;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Not Found')
    };
  })
}).listen(port)
