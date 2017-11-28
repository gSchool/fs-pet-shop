const http = require('http');

const server = http.createServer((req, res) => {
  if (req.method === 'GET') {
    read(req, res);
    read(req, res, 1);
    read(req, res, 0);
  }
});

let readCounts = 0;

function read(req, res, i) {
  readCounts++;
  require('fs').readFile('./pets.json', (err, data) => {
    if (err) {
      console.error(err);
      process.exit(1);
    } else {
      data = JSON.parse(data);
      if (process.argv[3]) {
        if (process.argv[3] < data.length && process.argv[3] >= 0) {
          res.write(JSON.stringify(data[process.argv[3]]));
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
