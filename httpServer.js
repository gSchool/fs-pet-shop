const http = require('http');

const server = http.createServer((req, res) => {
  const route = req.url.split('/');
  route.splice(0, 1);
  if (route[0] === 'pets') {
    if (req.method === 'GET') {
      read(req, res, route[1]);
    }
  } else {
    res.writeHead(404, {'Content-Type': 'text/plain'});
    res.end('Not found');
  }
});

let readCounts = 0;

function read(req, res, index) {
  readCounts++;
  let err = false;
  require('fs').readFile('./pets.json', (err, data) => {
    if (err) {
      res.writeHead(500, {'Content-Type': 'text/plain'});
      res.end(err)
      err = true;
      console.error(err);
    } else {
      data = JSON.parse(data);
      if (index) {
        if (index < data.length && index >= 0) {
          res.writeHead(200, {'Content-Type': 'application/json'});
          res.write(JSON.stringify(data[index]));
        } else {
          res.writeHead(400, {'Content-Type': 'text/plain'});
          res.end('Invalid index');
          err = true;
          console.error('Usage: node pets.js read INDEX');
        }
      } else {
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.write(JSON.stringify(data));
      }
    }
    readCounts--;
    if (readCounts <= 0) {
      res.end();
    }
  });
}

server.listen(3000);
