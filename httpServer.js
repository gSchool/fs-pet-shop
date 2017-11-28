const http = require('http');

const server = http.createServer((req, res) => {
  const route = req.url.split('/');
  route.splice(0, 1);
  if (route[0] === 'pets') {
    switch (req.method) {
      case 'GET': read(req, res, route[1]); break;
      case 'POST': create(req, res); break;
      default:
        res.writeHead(404, {'Content-Type': 'text/plain'});
        res.end('Not Found');
    }
  } else {
    res.writeHead(404, {'Content-Type': 'text/plain'});
    res.end('Not Found');
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
          res.writeHead(404, {'Content-Type': 'text/plain'});
          res.end('Not Found');
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

function create(req, res) {
  let body = '';
  req.on('data', (data) => {
    body += data;
  });
  req.on('end', () => {
    require('fs').readFile('./pets.json', (err, data) => {
      if (err) {
        res.writeHead(500, {'Content-Type': 'text/plain'});
        res.end('File Read Error');
      } else {
        let pet = JSON.parse(body);
        let list = JSON.parse(data);
        list.push(pet);
        require('fs').writeFile('./pets.json', JSON.stringify(list), (err) => {
          if (err) {
            res.writeHead(500, {'Content-Type': 'text/plain'});
            res.end('File Write Error');
          } else {
            res.write(JSON.stringify(pet));
            res.end();
          }
        });
      }
    });
  });
}

server.listen(3000);
