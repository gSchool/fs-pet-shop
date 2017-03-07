const fs = require('fs')
const http = require('http')
const server = http.createServer()

server.on('request', function(req, res){
  if (req.method === 'GET') {
    if (req.url === '/pets') {
      // console.log("url = pets")
      fs.readFile('./pets.json', 'utf8', function (err, data) {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json')
        // res.body = data
        res.end(data)
      })
    } else if (req.url.slice(0, 6) === '/pets/') {
      var index = parseInt(req.url.slice(6, req.url.length))
      if (typeof index === 'NaN' || index < 0 || index >= 2) {
        res.statusCode = 404;
        res.setHeader('Content-Type', 'text/plain')
        res.end("Not Found")
      } else {
        fs.readFile('./pets.json', 'utf8', function (err, data) {
          var dataToSend = JSON.parse(data)
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify(dataToSend[index]))
        })
      }
    } else {
      res.statusCode = 404;
      res.setHeader('Content-Type', 'text/plain');
      res.end('Hey')
    }
  }

})

function getAll(result) {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'json')
  res.send(result)
}



module.exports = server
