const http = require('http');
const fs = require('fs');

let readCounts = 0;
function read(req, res, index) {
  readCounts++;
  fs.readFile('./pets.json', (err, data) => {
    if (err) {
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end(err);
      console.error(err);
    } else {
      const pets = JSON.parse(data);
      if (index) {
        if (index < pets.length && index >= 0) {
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.write(JSON.stringify(pets[index]));
        } else {
          res.writeHead(404, { 'Content-Type': 'text/plain' });
          res.end('Not Found');
          console.error('Usage: node pets.js read INDEX');
        }
      } else {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.write(JSON.stringify(pets));
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
    let pet;
    try {
      pet = JSON.parse(body);
    } catch (e) {
      console.error(e);
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end('File Write Error');
      process.exit(1);
    }
    if (pet && pet.hasOwnProperty('name') && pet.hasOwnProperty('age') && pet.hasOwnProperty('kind')) {
      fs.readFile('./pets.json', (err, data) => {
        if (err) {
          res.writeHead(500, { 'Content-Type': 'text/plain' });
          res.end('File Read Error');
        } else {
          const list = JSON.parse(data);
          list.push(pet);
          fs.writeFile('./pets.json', JSON.stringify(list), (error) => {
            if (error) {
              res.writeHead(500, { 'Content-Type': 'text/plain' });
              res.end('File Write Error');
            } else {
              res.write(JSON.stringify(pet));
              res.end();
            }
          });
        }
      });
    } else {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('Not Found');
    }
  });
}


const server = http.createServer((req, res) => {
  const route = req.url.split('/');
  route.splice(0, 1);
  if (route[0] === 'pets') {
    switch (req.method) {
      case 'GET': read(req, res, route[1]); break;
      case 'POST': create(req, res); break;
      default:
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Not Found');
    }
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
  }
});

server.listen(3000);
