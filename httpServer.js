const pets = require('./pets2.json')
const bodyParser = require('body-parser')
const http = require('http')
const fs = require('fs')
const PORT = process.env.PORT || 8000

const server = http.createServer(function (req, res) {

  const index = req.url.substring(req.url.lastIndexOf("/") + 1, req.url.length)

  if (index === 'pets') {
    res.writeHead(200, {"Content-Type": "application/json"})
    res.end(JSON.stringify(pets))
  }
  else if (index >= 0 && index < pets.length) {
    res.writeHead(200, {"Content-Type": "application/json"})
    res.end(JSON.stringify(pets[index]))
  }
  else {
    res.writeHead(404, {"Content-Type": "text/plain"})
    res.end('Not Found')
  }
})

server.listen(PORT, (err) => {
  if (err) {
    return console.log('Something bad happened.', err)
  }
  console.log(`Server listening on ${PORT}`)
})

module.exports = server
