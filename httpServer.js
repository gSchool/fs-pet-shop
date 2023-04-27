
const port = process.env.PORT || 3000;

import { createServer } from 'http';
import { readFile } from 'fs';


const server = createServer((req, res) => {
  console.log("run")
  if (req.url === '/pets' || req.url === '/pets/') {
    readFile(('pets.json'), 'utf8', (err, data) => {
      if (err) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Internal Server Error');
        return;
      }
      const pets = JSON.parse(data);
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(pets));
    });
  } else if (req.url.startsWith('/pets/')) {
    const index = parseInt(req.url.substring(6));
    console.log(index);
    if (isNaN(index)) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('Not Found');
      return;
    }
    readFile(('pets.json'), 'utf8', (err, data) => {
      if (err) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Internal Server Error');
        return;
      }
      const pets = JSON.parse(data);
      if (index < 0 || index >= pets.length) {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Not Found');
        return;
      }
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(pets[index]));
    });
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
  }
});

server.listen(port, function() {
  console.log('Listening on port', port);
});
