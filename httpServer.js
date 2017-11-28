const http = require('http');

const server = http.createServer((req, res) => {
  if (req.method === 'GET') {
      read(req, res, req.url.split('/')[2]);
  }
});

let readCounts = 0;

function read(req, res, index) {
  readCounts++;
  require('fs').readFile('./pets.json', (err, data) => {
    if (err) {
      console.error(err);
      process.exit(1);
    } else {
      data = JSON.parse(data);
      if (index) {
        if (index < data.length && index >= 0) {
          res.write(JSON.stringify(data[index]));
        } else {
          console.error('Usage: node pets.js read INDEX');
          process.exit(1);
        }
      } else {
        res.write(JSON.stringify(data));
      }
    }
    readCounts--;
    if (readCounts <=0) {
      res.end();
    }
  });
}

function error() {

}

server.listen(3000);
