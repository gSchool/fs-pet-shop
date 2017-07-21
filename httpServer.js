const pets = require('./pets.json')
const http = require('http')
const bodyParser = require('body-parser');
const PORT = 8000;
const ft = require('fs')


var server = http.createServer(
  (req, res) => {
    var petInfo = req.url.split('/').pop();
    if (petInfo === "pets"){
      res.writeHead(200, {
        "Content-Type": "application/json"
      })
      res.end(JSON.stringify(pets))
    } else if (petInfo < 0 || petInfo >= pets.length){
      res.writeHead(404, {
        "Content-Type": "text/plain"
      })
      res.end('Not Found')
    } else if (petInfo >= 0 && petInfo - 1 <= pets.length){
      res.writeHead(200, {
        "Content-Type": "application/json"
      })
      res.end(JSON.stringify(pets[petInfo]))
    }
  })

  server.listen(process.env.PORT || PORT, function() {
    console.log("Running on port" + PORT)
  });

  module.exports = server;
